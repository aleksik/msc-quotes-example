import { fetchJSON, createEl } from './utils.js'

(() => {

  const OMDB_API_KEY = '610bcae1'
  const MS_API_URL = 'https://cors-anywhere.herokuapp.com/https://mediasignal-quotes.herokuapp.com'
  const OMDB_API_URL = 'http://www.omdbapi.com'

  const fetchMovies = fetchJSON(MS_API_URL + '/movies')
  const fetchQuotes = fetchJSON(MS_API_URL + '/quotes')

  Promise.all([fetchMovies, fetchQuotes])

    // Merge movies and quotes
    .then(([movies, quotes]) => quotes.map(quote => ({
      ...quote,
      movie: movies.find(movie => movie.id === quote.movie)
    })))

    // Sort by score
    .then(quotes => quotes.sort((a, b) => {
      if (a.score < b.score) return 1
      if (a.score > b.score) return -1
      return 0
    }))

    // Render
    .then(quotes => {

      const container = document.getElementById('container');

      return quotes.map(quote => {

        const el = createEl('div', { 
          class: 'Quote'
        }, container)
      
        createEl('blockquote', {
          textContent: quote.content
        }, el)

        createEl('span', {
          class: 'movie',
          textContent: quote.movie.title
        }, el)

        createEl('span', {
          class: 'score',
          title: 'Score',
          textContent: quote.score + ' / 10'
        }, el)

        return { ...quote, el }

      })
    })

    // Bonus: maybe add some images?
    .then(quotes => {

      quotes.forEach(quote => {
        fetchJSON(OMDB_API_URL, {
          t: quote.movie.title,
          apikey: OMDB_API_KEY
        })
          .then(response => {
            if (response.Poster) {
              const img = new Image
              img.onload = () => quote.el.appendChild(img)
              img.src = response.Poster
            }
          })
        })

        return quotes
    })

    // Hide loader
    .then(_ => document.body.classList.remove('loading'))

    .catch(e => console.error('Something went wrong...', e))

})()
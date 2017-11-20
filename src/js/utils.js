/**
 * Fetch JSON-document
 * @param {string} url 
 * @param {object} queryParams 
 */
const fetchJSON = (url, queryParams = {}) => {
  const queryString = Object.keys(queryParams).map(key => {
    return `${encodeURIComponent(key)}=${encodeURIComponent(queryParams[key])}`
  })
  return fetch(url + (queryString.length > 0 ? `?${queryString.join('&')}` : ''))
    .then(response => response.json())
}

/**
 * Create and HTML element
 * @param {string} tagName 
 * @param {Object} attributes 
 * @param {Node} parent 
 */
const createEl = (tagName, attributes = {}, parent) => {
  const el = document.createElement(tagName)
  Object.keys(attributes).forEach(key => {
    if (key in el) {
      el[key] = attributes[key]
    } else {
      el.setAttribute(key, attributes[key])
    }
  })
  if (parent && parent.appendChild) parent.appendChild(el)
  return el
}

export { fetchJSON, createEl }
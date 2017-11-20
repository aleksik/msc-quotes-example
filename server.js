const express = require('express')
const serveStatic = require('serve-static')
const PORT = process.env.PORT || 3000
const app = express()

app.use(serveStatic('src', { index: 'index.html' }))
app.listen(PORT)
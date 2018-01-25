const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

express()
  .use(express.static(path.join(__dirname, 'src')))
  .use(express.static(path.join(__dirname, 'build', 'contracts')))
  .get('/', (req, res) => res.render(path.join(__dirname, 'src/index.html')))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))

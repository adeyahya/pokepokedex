const express = require('express')
const next = require('next')

const port = process.env.PORT || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const routes = require('./routes')
const handle = routes.getRequestHandler(app)
const referrerPolicy = require('referrer-policy')
const fetch = require('isomorphic-unfetch')

app.prepare()
.then(() => {
  const server = express()
  server.use(referrerPolicy({ policy: 'same-origin' }))
  server.get('/api/pokemon', async (req, res) => {
    const offset = req.query.offset ? '?offset=' + req.query.offset : ''
    const resp = await fetch(`http://pokeapi.salestock.net/api/v2/pokemon/${offset}`)
    const data = await resp.json()
    if (resp.status === 200)
      return res.json(data)

    return res.status(resp.status).json({message: 'error'})
  })

  server.get('/api/pokemon/:id', async (req, res) => {
    const resp = await fetch(`http://pokeapi.salestock.net/api/v2/pokemon/${req.params.id}`)
    const data = await resp.json()
    if (resp.status === 200)
      return res.json(data)

    return res.status(resp.status).json({message: 'error'})
  })

  server.get('/api/ability/:name', async (req, res) => {
    const resp = await fetch(`http://pokeapi.salestock.net/api/v2/ability/${req.params.name}`)
    const data = await resp.json()
    if (resp.status === 200)
      return res.json(data)

    return res.status(resp.status).json({message: 'error'})
  })

  server.get('/api/species/:name', async (req, res) => {
    const resp = await fetch(`http://pokeapi.salestock.net/api/v2/pokemon-species/${req.params.name}`)
    const data = await resp.json()
    if (resp.status === 200)
      return res.json(data)

    return res.status(resp.status).json({message: 'error'})
  })

  server.get('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})

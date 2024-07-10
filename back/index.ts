/* eslint-disable @typescript-eslint/no-var-requires */
const express = require('express')
const bodyParser = require('body-parser')
const db = require('./queries.ts')
const cors = require('cors')

const app = express()
const port = 3000

app.use(cors())
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' })
})

// COMMENTS
app.get('/comments', db.getComments)
app.post('/comments', db.createComment)
app.post('/comments/reply', db.createReply)
app.put('/comments/:id', db.editComment)
app.delete('/comments/:id', db.deleteComment)


app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})

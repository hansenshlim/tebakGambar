const express = require('express')
const cors = require('cors')
const http = require('http').createServer(app)
const io = require('socket.io')(http)


const app = express()
const port = process.env.PORT || 3000

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

io.on('connection', (socket) => {
    console.log('a user connected')
})

http.listen(port, () => console.log(`listening on ${port}`))
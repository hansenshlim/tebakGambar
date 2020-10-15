const express = require('express')
const cors = require('cors')
const app = express()
const http = require('http').createServer(app)
const io = require('socket.io')(http)
const port = process.env.PORT || 3000

let users = []

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

io.on('connection', (socket) => {
    console.log('a user connected')

    socket.on('user-connect', (username) => {
        // console.log(data)
        users.push(username)

        io.emit('onlineUser', (users))
    })
})

http.listen(port, () => console.log(`listening on ${port}`))
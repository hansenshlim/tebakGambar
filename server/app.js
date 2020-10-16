const express = require('express')
const app = express()
const cors = require('cors')
const http = require('http').createServer(app)
const io = require('socket.io')(http)


const port = process.env.PORT || 3000


const questions = [
{
    id: 2,
    image_url: "https://cdn-image.hipwee.com/wp-content/uploads/2017/01/hipwee-tebak2-750x750.jpg",
    answer: "sedang pameran"
},
{
    id: 3,
    image_url: "https://cdn-image.hipwee.com/wp-content/uploads/2017/01/hipwee-tebak3-750x750.jpg",
    answer: "pinjam bantal"
},
{
    id: 4,
    image_url: "https://cdn-image.hipwee.com/wp-content/uploads/2017/01/hipwee-tebak4.jpg",
    answer: "pria dungu"
},
{
    id: 5,
    image_url: "https://cdn-image.hipwee.com/wp-content/uploads/2017/01/hipwee-tebak5.jpg",
    answer: "selalu sayang"
},
{
    id: 6,
    image_url: "https://cdn-image.hipwee.com/wp-content/uploads/2017/01/hipwee-tebak6-750x750.jpg",
    answer: "masih betah sendiri"
},
{
    id: 7,
    image_url: "https://cdn-image.hipwee.com/wp-content/uploads/2017/01/hipwee-tebak7.jpg",
    answer: "rekening gendut"
},
{
    id: 8,
    image_url: "https://cdn-image.hipwee.com/wp-content/uploads/2017/01/hipwee-tebak8.jpg",
    answer: "mantab jiwa"
},
{
    id: 9,
    image_url: "https://cdn-image.hipwee.com/wp-content/uploads/2017/01/hipwee-tebak9.jpg",
    answer: "makalah akuntansi"
},
{
    id: 10,
    image_url: "https://cdn-image.hipwee.com/wp-content/uploads/2017/01/hipwee-tebak10-750x750.jpg",
    answer: "supir mobil tinja sedang makan daging"
},
{
    id: 11,
    image_url: "https://cdn-image.hipwee.com/wp-content/uploads/2017/01/hipwee-tebak11.jpg",
    answer: "surat edaran asli penangkapan pejabat nakal"
},
{
    id: 12,
    image_url: "https://cdn-image.hipwee.com/wp-content/uploads/2017/01/hipwee-tebak12.jpg",
    answer: "kadar ketampanan wajah otomatis naik ketika beribadah"
}]

const answer = []


let users = []


app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

io.on('connection', (socket) => {
    console.log('a user connected')
    socket.on('getQuestion', () => {
        console.log('ini get questionnya');
        let question = questions[Math.floor(Math.random() * questions.length)]
        io.emit('GET_QUESTION', question)
    })

    socket.on('user-connect', (username) => {
        users.push(username)

        io.emit('ONLINE_USER', (users))
    })

    socket.on('checkAnswer', (payload) => {
        console.log('ini Answernya');
        let output = questions.find(el => el.answer === payload.answer)
        console.log(output)
        if(!output || output.id !== payload.id) {
            console.log('salah');
            users = []
            socket.emit('WRONG_ANSWER')
          } else {
            console.log('benar');
            users = []
            socket.broadcast.emit('WRONG_ANSWER')
            socket.emit('RIGHT_ANSWER')
          }
    })
})

http.listen(port, () => console.log(`listening on ${port}`))
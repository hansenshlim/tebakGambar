<template>
  <section class="home">
    <StatusBar
      :users="users"
    />
    <div v-if="!status && users.length > 1">
    <h1 class="mt-5">Guess the Picture Below</h1>
    <img :src="image.image_url" alt="waiting for others"
    width="540" height="300"><br>
    <form @submit.prevent="sendAnswer"> <br>
    <input v-model="answer" type="text"> <br>
    <button type="submit" class="btn btn-info mt-3">Answer!</button>
    </form>
    </div>
    <div v-else-if="status == 'wrong'">
    <h3 class="mt-5">You Lose</h3>
      <button @click.prevent="toLogin" class="btn btn-primary mt-3">Play Again</button>
    </div>
    <div v-else-if="status == 'right'">
    <h3 class="mt-5">You Win</h3>
        <button @click.prevent="toLogin" class="btn btn-primary mt-3">Play Again</button>
    </div>
    <div v-else-if="users.length <= 1">
    <h3 class="mt-5">Waiting for others</h3>
    </div>
  </section>
</template>

<script>
// @ is an alias to /src
import StatusBar from '../components/StatusBar'

export default {
  name: 'Home',
  components: {
    StatusBar
  },
  data() {
    return {
      answer: '',
      image: '',
      users: [],
      status: '',
      user: ''
    }
  },
  methods: {
    sendAnswer () {
      console.log(`ini method ngirim jawaban : "${this.answer}"`)
      let payload = {
        id: this.image.id,
        answer: this.answer
      }
      this.$socket.emit('checkAnswer', payload)
      this.answer = ''
    },
    fetchDataImage () {
        this.$socket.emit('getQuestion')
    },
    toLogin () {
      this.users = []
      this.$router.push({name: 'LoginPage'})
    }
  },
  created () {
      this.user = localStorage.username
      this.fetchDataImage()
  },
  sockets: {
    getQuestion (question) {
      this.image = question
    },
    onlineUser (data) {
      this.users = data
    },
    wrongAnswer () {
      this.status = 'wrong'
    },
    rightAnswer () {
      this.status = 'right'
    }
    
  }

}
</script>

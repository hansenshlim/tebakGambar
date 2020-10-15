<template>
  <section class="home">
    <div v-if="!status">
    <h1 >Guess the Picture Below</h1>
    <img :src="image.image_url" alt="waiting for others"
    width="540" height="300"><br>
    <form @submit.prevent="sendAnswer"> <br>
    <input v-model="answer" type="text"> <br>
    <button type="submit" class="btn btn-info mt-3">Answer!</button>
    </form>
    </div>
    <div v-else-if="status == 'wrong'">
    <h3 >You Lose</h3>
    </div>
    <div v-else-if="status == 'right'">
    <h3 >You Win</h3>
    </div>
  </section>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
  components: {
  },
  data() {
    return {
      answer: '',
      image: '',
      users: [],
      status: ''
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
    }
  },
  created () {
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

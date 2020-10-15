<template>
  <section class="home">
    <h1>Guess the Picture Below</h1>
    <img :src="image.image_url" alt="image"
    width="540" height="300"><br>
    <form @submit.prevent="sendAnswer"> <br>
    <input v-model="answer" type="text"> <br>
    <button type="submit" class="btn btn-info mt-3">Answer!</button>
    </form>
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
      users: []
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
    console.log(this.users)
  },
  sockets: {
    getQuestion (question) {
      this.image = question
    },
    onlineUser (data) {
      this.users = data
    },
    
  }

}
</script>

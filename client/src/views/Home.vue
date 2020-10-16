<template>
  <section class="home">
    <StatusBar
      :users="users"
    />
    <div v-if="status == 'right'">
    <h3 class="mt-5">Right Answer</h3>
        <button @click.prevent="nextRound" class="btn btn-primary mt-3">Next Round</button>
    </div>

    <div v-else-if="users.length <= 1">
    <h3 class="mt-5">Waiting for others</h3>
    </div>
    <div v-else-if="status == 'lose'">
    <h3 class="mt-5">You Lose</h3>
      <button @click.prevent="toLogin" class="btn btn-primary mt-3">Play Again</button>
    </div>
    <div v-else-if="status == 'wrong'">
    <h3 class="mt-5">Wrong Answer</h3>
        <button @click.prevent="nextRound" class="btn btn-primary mt-3">Next Round</button>
    </div>

    <div v-else-if="status == 'win'">
    <h3 class="mt-5">You Win</h3>
        <button @click.prevent="toLogin" class="btn btn-primary mt-3">Play Again</button>
    </div>

    <div v-else-if="status != 'win' && users.length > 1">
    <h1 class="mt-5">Guess the Picture Below</h1>
    <img :src="image.image_url" alt="waiting for others"
    width="540" height="300"><br>
    <form @submit.prevent="sendAnswer"> <br>
    <input v-model="answer" type="text"> <br>
    <button type="submit" class="btn btn-info mt-3">Answer!</button>
    </form>
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
      user: ''
    }
  },
  computed: {
    image () {
      return this.$store.state.image
    },
    status () {
      return this.$store.state.status
    },
    users () {
      return this.$store.state.users
    },
    point () {
      return this.$store.state.point
    }
  },
  methods: {
    sendAnswer () {
      console.log(`ini method ngirim jawaban : "${this.answer}"`)
      let payload = {
        id: this.image.id,
        answer: this.answer,
        point: this.point
      }
      this.$socket.emit('checkAnswer', payload)
      this.answer = ''
    },
    fetchDataImage () {
      this.$socket.emit('getQuestion', this.status)
      this.$store.commit('changeStatus')
    },
    toLogin () {
      this.$store.commit('changeStatus')
      this.$store.commit('emptyUsers')
      this.$router.push({name: 'LoginPage'})
    },
    nextRound () {
      // console.log(this.status)
      // console.log(this.point)
      this.fetchDataImage ()
    }
  },
  created () {
      this.user = localStorage.username
      this.fetchDataImage()
  },

}
</script>

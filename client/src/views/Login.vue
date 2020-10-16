<template>
  <section id="login-page" class="row justify-content-center mt-5">
        <div class="col-6 shadow-lg p-3 bg-white rounded">
            <h1 style="text-align: center;">Tebak Gambar</h1>
            <form @submit.prevent="login">
                <div class="form-group">
                    <label for="login-username">Enter Your Username:</label>
                    <input v-model="username" type="text" class="form-control" id="login-username">
                </div>
                <button type="submit" class="btn btn-primary">Join Game</button>
            </form>
        </div>
    </section>
</template>

<script>
export default {
    name: 'LoginPage',
    data() {
        return {
            username: ''
        }
    },
    methods: {
        login () {
            let payload = {
                username: this.username
            }
            this.$socket.emit('user-connect', payload)
            localStorage.setItem('username', this.username)
            this.$router.push({ name: 'Home' })
        }
    }
}
</script>

<style>

</style>
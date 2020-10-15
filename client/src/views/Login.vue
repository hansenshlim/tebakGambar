<template>
  <section id="login-page" class="row justify-content-center mt-5">
        <div class="col-6 shadow-lg p-3 bg-white rounded">
            <h1 style="text-align: center;">Tebak Gambar</h1>
            <form @submit.prevent="login">
                <div class="form-group">
                    <label for="login-username">Enter Your Username:</label>
                    <input v-model="username" type="username" class="form-control" id="login-username">
                </div>
                <button type="submit" class="btn btn-primary">Join Game</button>
            </form><br>
        </div>
    </section>
</template>

<script>
export default {
    name: 'LoginPage'
}
</script>

<style>

</style>
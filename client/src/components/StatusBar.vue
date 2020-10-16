<template>
  <header class="d-flex justify-content-between align-content-center bg-dark" style="color: white; padding: 20px">
      <h3 class="mt-0">Me : {{user}}</h3>
      <div>
      <h5>Playing:<span v-for="(user,idx) in users" :key="idx" class="ml-3">{{user.username}},</span>
      </h5>
      </div>
  </header>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: ['users'],
  data () {
    return {
      user: localStorage.username
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>

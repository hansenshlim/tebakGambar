import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueSocketIO from 'vue-socket.io'
import store from './store'

Vue.config.productionTip = false

Vue.use(new VueSocketIO({
  debug: false,
  connection: 'https://tebakgambar1.herokuapp.com/',
  vuex: {
    store,
    mutationPrefix: 'SOCKET_'
  }
}))

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

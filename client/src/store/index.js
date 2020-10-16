import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    image: '',
    status: '',
    users: []
  },
  mutations: {
    'SOCKET_GET_QUESTION' (state, payload) {
      state.image = payload
    },
    'SOCKET_WRONG_ANSWER' (state) {
      state.status = 'wrong'
    },
    'SOCKET_RIGHT_ANSWER' (state) {
      state.status = 'right'
    },
    'SOCKET_ONLINE_USER' (state, payload) {
      state.users = payload
    }
  },
  actions: {
  },
  modules: {
  }
})

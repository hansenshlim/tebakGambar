import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    image: '',
    status: '',
    users: [],
    point: 0
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
      state.point += 1
    },
    'SOCKET_ONLINE_USER' (state, payload) {
      state.users = payload
    },
    'SOCKET_LOSE_CONDITION' (state) {
      state.status = 'lose'
    },
    'SOCKET_WIN_CONDITION' (state) {
      state.status = 'win'
    },
    changeStatus(state) {
      state.status = ''
    },
    emptyUsers(state) {
      state.users = []
      state.point = 0
    }
  },
  actions: {
  },
  modules: {
  }
})

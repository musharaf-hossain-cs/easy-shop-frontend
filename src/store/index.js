import Vue from 'vue'
import Vuex from 'vuex'
import io from 'socket.io-client'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    server: '192.168.6.102:3000',
    socket: io('192.168.6.102:3000')
  },
  getters: {
    getServer: state => {
      return state.server;
    },
    getSocket: state => {
      return state.socket;
    }
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})

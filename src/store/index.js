import Vue from 'vue'
import Vuex from 'vuex'
import io from 'socket.io-client'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    server: '192.168.6.102:3000',
    socket: io('192.168.6.102:3000'),
    User: null,
    isAdmin: false,
    products: []
  },
  getters: {
    getServer: state => {
      return state.server;
    },
    getSocket: state => {
      return state.socket;
    },
    getUser: state => {
      return state.User;
    },
    isAdmin: state => {
      return state.isAdmin;
    },
    getProducts: (state) => {
      return state.products;
    }
  },
  mutations: {
    setUser(state,user){
      state.User = user;
      console.log(user);
    },
    setProducts(state,products){
      state.products = products;
    },
    setAdmin(state,status){
      state.isAdmin = status;
    }
  },
  actions: {
  },
  modules: {
  }
})

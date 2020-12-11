import Vue from 'vue'
import Vuex from 'vuex'
import io from 'socket.io-client'

import * as getters from './getters';
import * as mutations from './mutations';
import * as actions from './actions';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    server: '192.168.6.102:3000',
    socket: io('192.168.6.102:3000'),
    User: null,
    isAdmin: false,
    products: null,
    currentCart: [],
    selectedJobForApplication: null,
    isDeliveryBoy: false
  },
  getters,
  mutations,
  actions,
  modules: {
  }
})

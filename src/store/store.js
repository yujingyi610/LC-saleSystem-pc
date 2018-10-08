import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex);


const store = new Vuex.Store({
  state: {
    userBtn : 'init',
    token: ''
  },
  mutations: {
    setUserBtn(state,data) {
      state.userBtn = data;
    },
    SET_TOKEN(state, data) {
      state.token = data;
    }
  }
})

export default store;

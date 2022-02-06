import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loading:{
      titulo: '',
      estado : false
    },
    dataLoginUser : {
      username: null,
      auth: false
    }
  },
  mutations: {
    mostrarLoading(state, payload){
      state.loading.titulo = payload.titulo
      state.loading.estado = true
    },
    ocultarLoading(state){
      state.loading.estado = false
    },
    login(state, username, token) {
      state.dataLoginUser.auth = true;
      state.dataLoginUser.username = username;
    },
    logout(state) {
      state.dataLoginUser.auth = false;
      state.dataLoginUser.username = null;
    }
  },
  actions: {
    login({ commit },username, token){
      commit("login", username, token);
    },
    logout({ commit }){
      commit("logout");
    }
  },
  modules: {
  }
})

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
      initialName : null,
      email : null,
      auth: false
    },
    objectsPermissions : []
  },
  mutations: {
    mostrarLoading(state, payload){
      state.loading.titulo = payload.titulo
      state.loading.estado = true
    },
    ocultarLoading(state){
      state.loading.estado = false
    },
    login(state, userLogin, token) {
      state.dataLoginUser.auth = true;
      state.dataLoginUser.username = userLogin.username;
      state.dataLoginUser.email = userLogin.email;
    },
    setInitialName(state, initialName ){
      state.dataLoginUser.initialName = initialName;
    },
    logout(state) {
      state.dataLoginUser.auth = false;
      state.dataLoginUser.username = null;
    },
    setObjectsPermissions(state, objectPropertys ){
      state.objectsPermissions = objectPropertys;
    }
  },
  actions: {
    login({ commit },userLogin, token){
      commit("login", userLogin, token);
    },
    setInitialName({ commit }, initialName ){
      commit("setInitialName", initialName);
    },
    logout({ commit }){
      commit("logout");
    },
    setObjectsPermissions({ commit },objectPropertys ){
      commit("setObjectsPermissions", objectPropertys);
    }
  },
  modules: {
  }
})

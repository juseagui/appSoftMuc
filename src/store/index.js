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
    objectsPermissions : [],
    navigateObject : {
      objeIdActual : 0
    },
    process : {
      activityActual : {},
      listState : [
        { code : 1, description : 'Iniciado' },
        { code : 2, description : 'En proceso' },
        { code : 3, description : 'Ganada' },
        { code : 4, description : 'Perdida' }
      ]
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
    },
    setObjectsActual(state, objeIdActual ){
      state.navigateObject.objeIdActual = objeIdActual;
    },
    setActivityActual(state, activityActual ){
      state.process.activityActual = activityActual;
    },

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
    },
    setObjectsActual({ commit },objeIdActual ){
      commit("setObjectsActual", objeIdActual);
    },
    setActivityActual({ commit },activityActual ){
      commit("setActivityActual", activityActual);
    }
  },
  modules: {
  }
})

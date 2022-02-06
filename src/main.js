import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import axios from 'axios'
import VueAxios from 'vue-axios'
import i18n from './i18n'
import VueGoogleCharts from 'vue-google-charts'
//import storage from './storage'

Vue.config.productionTip = false

Vue.use(VueAxios, axios)

//pasar a constantes
axios.defaults.baseURL = 'http://localhost:8000/'

var token = localStorage.getItem('token');

if(token)
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.state.dataLoginUser.auth) {
      next();
    } else {
      next({ name: "" });
    }
  } else {
    next();
  }
});

new Vue({
  router,
  store,
  vuetify,
  i18n,
  VueGoogleCharts,
  //storage,
  render: h => h(App)
}).$mount('#app')

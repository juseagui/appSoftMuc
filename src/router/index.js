import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/general/:idObject',
    name: 'General',
    meta: {
      requiresAuth: true
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/General/ListGeneral.vue')
  },
  {
    path: '/object/:idObject',
    name: 'Object',
    meta: {
      requiresAuth: true
    },
    component: () => import(/* webpackChunkName: "about" */ '../views/Object/ListObjects.vue')
  },
  {
    path: '/process/:idObject',
    name: 'Process',
    meta: {
      requiresAuth: true
    },
    component: () => import('../views/Process/ListProcess.vue')
  },
  {
    path: '/home/',
    name: 'Home',
    meta: {
      requiresAuth: true
    },
    component: () => import('../views/Report/HomeReport.vue')
  },
  {
    path: '/user/:idObject/userDetail/:idDetail',
    name: 'User',
    meta: {
      requiresAuth: true
    },
    component: () => import('../views/User/User.vue')
  },
  {
    path: '/general/:idObject/detail/:idDetail',
    name: 'DetailGeneral',
    meta: {
      requiresAuth: true
    },
    component: () => import('../views/General/DetailGeneral.vue')
  },
  {
    path: '/object/:idObject/detail/:idDetail',
    name: 'DetailObject',
    meta: {
      requiresAuth: true
    },
    component: () => import('../views/Object/DetailObject.vue')
  },
  
  {
    path: '/system',
    name: 'SystemGeneral',
    meta: {
      requiresAuth: true
    },
    component: () => import('../views/General/SystemGeneral.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _78a9aa72 = () => interopDefault(import('../pages/404.vue' /* webpackChunkName: "pages/404" */))
const _5e0866c2 = () => interopDefault(import('../pages/users.vue' /* webpackChunkName: "pages/users" */))
const _6790f6dc = () => interopDefault(import('../pages/users/login.vue' /* webpackChunkName: "pages/users/login" */))
const _62d740fd = () => interopDefault(import('../pages/users/resetPassword.vue' /* webpackChunkName: "pages/users/resetPassword" */))
const _601db098 = () => interopDefault(import('../pages/content/search.vue' /* webpackChunkName: "pages/content/search" */))
const _29d09514 = () => interopDefault(import('../pages/content/components/PatentBox.vue' /* webpackChunkName: "pages/content/components/PatentBox" */))
const _189e8c8c = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))
const _32b7eb4e = () => interopDefault(import('~/pages/users.vue' /* webpackChunkName: "" */))
const _6175e268 = () => interopDefault(import('~/pages/users/login.vue' /* webpackChunkName: "" */))
const _200de089 = () => interopDefault(import('~/pages/users/resetPassword.vue' /* webpackChunkName: "" */))
const _46a000a8 = () => interopDefault(import('~/pages/content/search.vue' /* webpackChunkName: "" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/qiance/'),
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/:lang([a-z-]{3})?404",
    component: _78a9aa72,
    name: "404"
  }, {
    path: "/:lang([a-z-]{3})?users",
    component: _5e0866c2,
    name: "users",
    children: [{
      path: "login",
      component: _6790f6dc,
      name: "users-login"
    }, {
      path: "resetPassword",
      component: _62d740fd,
      name: "users-resetPassword"
    }]
  }, {
    path: "/:lang([a-z-]{3})?content/search",
    component: _601db098,
    name: "content-search"
  }, {
    path: "/:lang([a-z-]{3})?content/components/PatentBox",
    component: _29d09514,
    name: "content-components-PatentBox"
  }, {
    path: "/",
    component: _189e8c8c,
    name: "index"
  }, {
    path: "/:lang([a-z-]{3})?",
    component: _189e8c8c,
    name: "home"
  }, {
    path: "/:lang([a-z-]{3})?users",
    component: _32b7eb4e,
    name: "usersCenter",
    children: [{
      path: "register",
      component: _6175e268,
      name: "regMobile"
    }, {
      path: "login",
      component: _6175e268,
      name: "userLogin"
    }]
  }, {
    path: "/:lang([a-z-]{3})?retrieve",
    component: _200de089,
    name: "resetPassword"
  }, {
    path: "/:lang([a-z-]{3})?search",
    component: _46a000a8,
    meta: {"isLogin":true},
    name: "searchContent"
  }, {
    path: "/:lang([a-z-]{3})?404",
    component: _78a9aa72,
    name: "notFound"
  }, {
    path: "/:lang([a-z-]{3})?*",
    redirect: "/404"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}

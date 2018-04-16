import Vue from 'vue'
import Router from 'vue-router'

import Index from 'pages/index/index'
import Login from 'pages/login/login'
import Register from 'pages/register/register'
import UserAdmin from 'pages/userAdmin/userAdmin'
import Postlist from 'pages/postlist/postlist'
import Mdeditor from 'pages/mdeditor/mdeditor'
import Publish from 'pages/publish/publish'
import Test from 'pages/test'

Vue.use(Router)

const router = new Router({
  routes: [

    {
      path: '/',
      redirect: '/index'
    },
    {
      path: '/login',
      name: 'login',
      meta: {
        isLogin: true
      },
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      meta: {
        isLogin: true
      },
      component: Register
    },
    {
      path: '/index',
      name: 'index',
      component: Index
    },
    {
      path: '/userAdmin',
      name: 'userAdmin',
      meta: {
        requireAuth: true
      },
      component: UserAdmin
    },
    {
      path: '/postlist',
      name: 'postlist',
      meta: {
        requireAuth: true
      },
      component: Postlist
    },
    {
      path: '/mdeditor',
      name: 'mdeditor',
      meta: {
        requireAuth: true
      },
      component: Mdeditor
    },
    {
      path: '/publish',
      name: 'publish',
      meta: {
        requireAuth: true
      },
      component: Publish
    },
    {
      path: '/test',
      name: 'test',
      component: Test
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    if (document.cookie.indexOf('userId') >= 0) {
      next()
    } else {
      next({
        path: '/login',
        query: {redirect: to.fullPath}
      })
    }
  } else {
    next()
  }
  if (to.meta.isLogin) {
    if (document.cookie.indexOf('userId') >= 0) {
      next({
        path: '/index'
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router


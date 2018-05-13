import Vue from 'vue'
import Router from 'vue-router'
import bus from '@/services/bus'
import { routes } from './routes'
import loggedIn from '@/services/auth'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes
})

Vue.router = router

router.beforeEach((to, from, next) => {
  bus.$emit('loader', true)
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (loggedIn()) {
      next()
    } else {
      next({ name: 'Login' })
    }
  } else {
    next()
  }
  next()
})

// router.afterEach((to, from) => {
//   bus.$emit('loader', false)
// })

export default router

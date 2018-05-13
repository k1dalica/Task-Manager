import Vue from 'vue'
import Vuex from 'vuex'
import userModule from './user'
import tasksModule from './tasks'
import commentsModule from './comments'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    userModule,
    tasksModule,
    commentsModule
  }
})

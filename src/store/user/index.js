import * as types from './types'
import Vue from 'vue'
import { errorHandler } from '@/services/http'

import { loginUser, getUser, getUsers, getUserByName } from '@/services/api/user'

const state = {
  loggedIn: false,
  user: null,
  users: []
}

const getters = {
  loggedIn: state => state.loggedIn,
  user: state => state.user,
  users: state => state.users
}

const actions = {
  getUserByName ({ commit }, name) {
    return getUserByName(name)
      .then(user => {
        return user[0]
      })
      .catch(err => errorHandler(err))
  },
  getUsers ({ commit }) {
    return getUsers()
      .then(users => {
        commit(types.SET_USERS, users)
      })
      .catch(err => errorHandler(err))
  },
  loginUser ({ commit, dispatch }, payload) {
    return loginUser(payload)
      .then(userdata => {
        let user = userdata[0]
        return new Promise((resolve, reject) => {
          if (userdata.length === 1) {
            dispatch('rememberUser', user.id)
            commit(types.SET_USER, user)
            resolve(user)
          } else {
            reject(new Error('Wrong username/password combination !'))
          }
        })
      })
      .catch(err => errorHandler(err))
  },
  getUserData ({ commit, dispatch }, id) {
    return getUser(id)
      .then(user => {
        if (user) {
          commit(types.SET_USER, user)
          return true
        } else {
          dispatch('logoutUser')
          return false
        }
      })
      .catch(err => {
        errorHandler(err)
        dispatch('logoutUser')
        return false
      })
  },
  rememberUser ({ commit }, id) {
    localStorage.setItem('userid', id)
  },
  logoutUser ({ commit }) {
    localStorage.removeItem('userid')
    Vue.router.push({ name: 'Login' })
    return commit(types.SET_USER, null)
  }
}

const mutations = {
  [ types.SET_USER ] (state, user) {
    state.user = user
    state.loggedIn = (user !== null)
  },
  [ types.SET_USERS ] (state, users) {
    state.users = users
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}

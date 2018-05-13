import * as types from './types'

import { getTasks, getTask, createTask, editTask, deleteTask } from '@/services/api/tasks'

const state = {
  tasks: [],
  task: null
}

const getters = {
  tasks: state => state.tasks,
  task: state => state.task
}

const actions = {
  editTask ({ commit }, params) {
    return editTask(params)
      .then(res => {
        commit(types.SET_TASK, res)
      })
      .catch(err => console.log(err))
  },
  createTask ({ commit }, params) {
    return createTask(params)
      .then(res => res)
      .catch(err => console.log(err))
  },
  deleteTask ({ commit }, id) {
    return deleteTask(id)
      .then(res => res)
      .catch(err => console.log(err))
  },
  getAllTasks ({ commit, dispatch }, username) {
    const a = dispatch('getTasks', { username, param: 'author' })
    const b = dispatch('getTasks', { username, param: 'assignee' })

    return Promise.all([a, b]).then(values => {
      let created = values[0]
      let assigned = values[1]
      dispatch('removeDuplicateTasks', { created, assigned })
        .then(res => {
          commit(types.SET_TASKS, res)
        })
    })
  },
  removeDuplicateTasks ({ commit }, { created, assigned }) {
    let list = created
    assigned.forEach(task => {
      let alreadyInsered = false
      created.forEach(t => {
        if (t.id === task.id) {
          alreadyInsered = true
        }
      })
      if (!alreadyInsered) {
        list.push(task)
      }
    })
    return list
  },
  getTasks ({ commit }, { username, param }) {
    let params = new URLSearchParams()
    params.append(param, username)
    return getTasks(params)
      .then(res => {
        commit(types.SET_TASKS, res)
        return res
      })
      .catch(err => console.log(err))
  },
  getTask ({ commit }, id) {
    return getTask(id)
      .then(res => {
        commit(types.SET_TASK, res)
      })
      .catch(err => err)
  }
}

const mutations = {
  [ types.SET_TASKS ] (state, tasks) {
    state.tasks = tasks
  },
  [ types.SET_TASK ] (state, task) {
    state.task = task
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}

import * as types from './types'

import { getComments, addComment, deleteComment, editComment } from '@/services/api/comments'

const state = {
  comments: []
}

const getters = {
  comments: state => state.comments
}

const actions = {
  editComment ({ commit }, params) {
    return editComment(params)
      .then(() => {
        return commit(types.EDIT_COMMENT, params)
      })
      .catch(err => console.log(err))
  },
  deleteComment ({ commit }, id) {
    return deleteComment(id)
      .then(() => {
        return commit(types.REMOVE_COMMENT, id)
      })
      .catch(err => console.log(err))
  },
  addComment ({ commit }, params) {
    return addComment(params)
      .then(comment => {
        return commit(types.ADD_COMMENT, comment)
      })
      .catch(err => console.log(err))
  },
  getComments ({ commit }, id) {
    let params = new URLSearchParams()
    params.append('taskId', id)
    return getComments(params)
      .then(res => {
        return commit(types.SET_COMMENTS, res)
      })
      .catch(err => {
        commit(types.SET_COMMENTS, [])
        console.log(err)
      })
  }
}

const mutations = {
  [ types.SET_COMMENTS ] (state, comments) {
    state.comments = comments
  },
  [ types.REMOVE_COMMENT ] (state, id) {
    let list = []
    state.comments.forEach(comment => {
      if (comment.id !== id) {
        list.push(comment)
      }
    })
    state.comments = list
  },
  [ types.EDIT_COMMENT ] (state, comment) {
    let list = state.comments.map(c => {
      return (c.id === comment.id) ? comment : c
    })
    state.comments = list
  },
  [ types.ADD_COMMENT ] (state, comment) {
    state.comments.push(comment)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}

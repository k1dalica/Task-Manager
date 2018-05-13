import store from '@/store'

const loggedIn = () => {
  const state = store.getters
  const id = localStorage.getItem('userid')
  if (id === null) {
    return false
  } else if (!state.loggedIn && id) {
    store.dispatch('getUserData', id)
    return id
  } else {
    return id
  }
}

// function getToken () {
//   let token = JSON.parse(window.localStorage.getItem(JWT_TOKEN_NAME))
//   if (token === null) {
//     return false
//   } else if (!store.state.userModule.user && token !== null) {
//     store.dispatch('getUser')
//     return token
//   } else {
//     return token
//   }
// }

export default loggedIn

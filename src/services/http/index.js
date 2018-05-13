import axios from 'axios'
// import bus from '@/services/bus'

axios.defaults.baseURL = 'http://localhost:3000/'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.headers.put['Content-Type'] = 'application/x-www-form-urlencoded'

export function responseTransformer (response) {
  return response ? response.data : null
}

// export function errorTransformer (error, { showMessage = false } = {}) {
//   // if (showMessage) {
//   //   bus.$emit('error-notification/show', { error: errorMessage.error })
//   // }

//   // throw errorMessage
// }

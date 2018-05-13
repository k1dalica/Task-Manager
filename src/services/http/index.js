import axios from 'axios'
import bus from '@/services/bus'

axios.defaults.baseURL = 'http://localhost:3000/'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.headers.put['Content-Type'] = 'application/x-www-form-urlencoded'

export function responseTransformer (response) {
  return response ? response.data : null
}

export function errorHandler (error) {
  const status = error.response.status
  let message = ''
  const title = 'Error'
  if (status === 500) {
    message = 'There was a problem on the server, please try again later!'
  } else if (status === 404) {
    message = 'The data you provided isn\'t valid.'
  } else {
    message = 'An error occurred, please try again...'
  }

  bus.$emit('message', {
    title: title,
    message: message
  })
}

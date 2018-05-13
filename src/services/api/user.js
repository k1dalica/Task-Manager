import http from 'axios'
import { responseTransformer } from '@/services/http'

export function loginUser (params) {
  let uri = params.toString()
  return http
    .get(`users?${uri}`)
    .then(responseTransformer)
    .catch(error => console.log(error))
}

export function getUser (id) {
  return http
    .get(`users/${id}`)
    .then(responseTransformer)
    .catch(error => console.log(error))
}

export function getUserByName (name) {
  return http
    .get(`users?username=${name}`)
    .then(responseTransformer)
    .catch(error => console.log(error))
}

export function getUsers () {
  return http
    .get(`users`)
    .then(responseTransformer)
    .catch(error => console.log(error))
}

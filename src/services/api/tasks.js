import http from 'axios'
import { responseTransformer } from '@/services/http'

export function getTasks (params) {
  return http
    .get(`tasks?${params}`)
    .then(responseTransformer)
    .catch(error => console.log(error))
}

export function getTask (id) {
  return http
    .get(`tasks/${id}`)
    .then(responseTransformer)
    .catch(error => console.log(error))
}

export function deleteTask (id) {
  return http
    .delete(`tasks/${id}`)
    .then(responseTransformer)
    .catch(error => console.log(error))
}

export function createTask (params) {
  return http
    .post(`tasks`, params)
    .then(responseTransformer)
    .catch(error => console.log(error))
}

export function editTask (params) {
  return http
    .put(`tasks/${params.id}`, params)
    .then(responseTransformer)
    .catch(error => console.log(error))
}

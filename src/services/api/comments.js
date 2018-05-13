import http from 'axios'
import { responseTransformer } from '@/services/http'

export function getComments (params) {
  return http
    .get(`comments?${params}`)
    .then(responseTransformer)
    .catch(error => console.log(error))
}

export function addComment (params) {
  return http
    .post(`comments`, params)
    .then(responseTransformer)
    .catch(error => console.log(error))
}

export function deleteComment (id) {
  return http
    .delete(`comments/${id}`)
    .then(responseTransformer)
    .catch(error => console.log(error))
}

export function editComment (params) {
  return http
    .put(`comments/${params.id}`, params)
    .then(responseTransformer)
    .catch(error => console.log(error))
}

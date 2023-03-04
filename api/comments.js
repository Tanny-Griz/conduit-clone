import axios from '@/api/axios'

export default {
  getComments (slug) {
    return axios.get(`/articles/${slug}/comments`)
      .then(response => response.data.comments)
  },
  deleteComment (slug, id) {
    return axios.delete(`/articles/${slug}/comments/${id}`)
  },
  createComment (slug, body) {
    return axios.post(`/articles/${slug}/comments`,
      { comment: body })
      .then(response => response.data.comments)
  }
}

import axios from '@/api/axios'

export default {
  getArticle (slug) {
    return axios.get(`/articles/${slug}`)
      .then(response => response.data.article)
  },

  deleteArticle (slug) {
    return axios.delete(`/articles/${slug}`)
  },

  createArticle (articleInput) {
    return axios.post('/articles', { article: articleInput })
      .then(response => response.data.article)
  },

  updateArticle (slug, articleInput) {
    return axios.put(`/articles/${slug}`, articleInput)
      .then(response => response.data.article)
  }
}

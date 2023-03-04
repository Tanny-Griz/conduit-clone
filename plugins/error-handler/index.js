/**
 * Global Axios Error Handler
 */

const errorHandler = ({ $axios, redirect }) => {
  $axios.onError((error) => {
    if (error.response.status === 500) {
      redirect('/')
    }
  })
}

export default errorHandler

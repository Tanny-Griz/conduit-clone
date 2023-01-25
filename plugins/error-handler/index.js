/**
 * Global Axios Error Handler
 */

const errorHandler = ({ $axios, redirect, route }) => {
  $axios.onError((error) => {
    console.log('error', error)
  })
}

export default errorHandler

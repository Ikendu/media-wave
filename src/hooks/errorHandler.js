// File: errorHandling.js

export const handleAxiosError = (error) => {
  if (error.response && error.response.data && error.response.data.email) {
    return error.response.data.email.join(', ')
  } else {
    return error.message
  }
}
export const handleLoginError = (error) => {
  if (error.response && error.response.data && error.response.data.detail) {
    return error.response.data.detail
  } else {
    return error.message
  }
}
export const handleGenericError = (error) => {
  if (error?.response) {
    // The request was made, but the server responded with an error
    const { data, message, status } = error.response
    if(status === 500){
      return 'Internal server error'
    }
    return (
      data?.Error?.join(',') ||
      data?.email?.join(',') ||
      // data ||
      data?.message ||
      data?.detail ||
      data?.Error?.join(',') ||
      data?.error?.join(',') ||
      data?.verification_code?.join(',') ||
      message
    )
  } else if (error?.message) {
    // The request was made, but no response was received
    return error.message
  } else if (error?.request) {
    // The request was made, but no response was received
    return 'No response received from the server.'
  } else {
    // Something happened in setting up the request that triggered an Error
    // console.log("error")
    return 'An unexpected error occurred.'
  }
}

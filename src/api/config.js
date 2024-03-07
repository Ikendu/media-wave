import axios from 'axios'
import { Cookies } from 'react-cookie'

const cookies = new Cookies()
const token = cookies.get('access_token')

export const API_URL = 'https://api.andromedia.cc/api/v1/'

// console.log(token)
export default function init() {
  axios.defaults.baseURL = API_URL
  axios.defaults.withCredentials = false

  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
  }
}

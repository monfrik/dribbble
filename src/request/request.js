import axios from 'axios'

let requestQueue = []
let lastRequest = {}
const service = axios.create({
  baseURL: process.env.BASE_API, // api base_url
})

service.interceptors.response.use(
  response => {
    lastRequest = {}
    return response
  },
  async error => {
    if (error.response && error.response.status === 401) {
      return new Promise((resolve, reject) => {
        lastRequest.resolve = resolve
        lastRequest.reject = reject
        requestQueue.push({resolve, reject, config: error.config})
      })
    }
  }
)
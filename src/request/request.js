import axios from 'axios'
import {store} from '../store/index.js'

let lastRequest = {}
const service = axios.create({
  baseURL: process.env.BASE_API
})

function serviceDecorator(config) {
  return new Promise(async function (resolve, reject) {
    try {
      const response = await service(config)
      resolve(response)
    } catch (error) {
      console.log(`Error in request: ${error}`)
      reject(error)
    }
  })
}
service.interceptors.request.use(config => {
    config.headers = {
      accept: 'application/json'
    }
    const token = store.getters.ACCESS_TOKEN
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  }, 
  error => {
    console.log(`Error in request: ${error}`) // for debug
    return Promise.reject(error)
})

service.interceptors.response.use(
  response => {
    lastRequest = {}
    return response
  },
  async error => {
    if (error.response && error.response.status === 401 || error.response.status === 403 || error.response.status === 400) {
      return false
    }
  }
)

export default serviceDecorator
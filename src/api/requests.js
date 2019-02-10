import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://audiadis.tech/api/v1/',
  timeout: 1000,
  withCredentials: false,
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
})

const responseBody = res => res

const requests = {
  del: async url => responseBody(await instance.delete(url)),
  get: async (url, params = {}) => responseBody(await instance.get(url, { params })),
  put: async (url, body) => responseBody(await instance.put(url, body)),
  post: async (url, body) => responseBody(await instance.post(url, body)),
}

export default requests

import { message } from "antd"
import axios from "axios"

const baseURL = import.meta.env.VITE_APP_URL

class Request {
  constructor() {
    this.instance = axios.create({
      baseURL,
      timeout: 30000
    })

    this.instance.interceptors.request.use(config => {
      return config
    }, error => {})
    this.instance.interceptors.response.use(response => {
      const { data } = response
      if (data.message === 'success') {
        return data
      } else {
        message.error(data.data || '系统错误，稍后再试')
        return data
      }
    }, error => {
      const data = error.response.data
      message.error(data.data || '系统错误')
      return data
    })
  }

  get(url, params) {
    return this.instance.get(url, { params })
  }

  post(url, body) {
    return this.instance.post(url, body)
  }
}


export default new Request()
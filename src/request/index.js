import { message } from "antd"
import axios from "axios"
import { refreshToken } from "./services"
import { useNavigate } from "react-router-dom"

export const baseURL = import.meta.env.VITE_APP_URL

class Request {
  constructor() {
    this.instance = axios.create({
      baseURL,
      timeout: 30000,
    })

    // 请求拦截器
    this.instance.interceptors.request.use(
      (config) => {
        const token = window.localStorage.getItem("access_token") || ""
        config.headers.authorization = `Bearer ${token}`
        return config
      },
      (error) => {}
    )

    // 响应拦截器
    this.instance.interceptors.response.use(
      (response) => {
        const { data } = response
        if (data.message === "success") {
          if (typeof data.data === "string") {
            message.success(data.data)
          }
        } else if (data.message === "error") {
          message.error(data.data || "系统错误，稍后再试")
        }
        return data
      },
      (error) => {
        const data = error.response.data
        if (data.message === "error") {
          message.error(data.data || "系统错误")
        } else if (data.message === "invalid") {
          // 刷新token
          getNewToken()
        } else if (data.message === "refused") {
          // 重新登录
          useBackLogin()
        }
        return data
      }
    )
  }

  get(url, params = {}) {
    return this.instance.get(url, { params })
  }

  post(url, body) {
    return this.instance.post(url, body)
  }
}

// 返回登录页面
function useBackLogin() {
  window.localStorage.removeItem("access_token")
  window.localStorage.removeItem("refresh_token")
  window.localStorage.removeItem("user_info")
  message.error("登录失效，请重新登录")
  setTimeout(() => {
    window.location.href = "/login"
  }, 1500)
}
// 刷新token
async function getNewToken() {
  const res = await refreshToken()
  if (res.message === "success") {
    const { accessToken, refreshToken, userInfo } = res.data

    window.localStorage.setItem("access_token", accessToken)
    window.localStorage.setItem("refresh_token", refreshToken)
    window.localStorage.setItem("user_info", JSON.stringify(userInfo))
    message.success("重新登录成功")

    setTimeout(() => {
      navigate("/")
    }, 1500)
  }
}

export default new Request()

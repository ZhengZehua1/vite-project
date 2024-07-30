// import router from '@/router'
import axios from 'axios'
// 创建axios 实例
const request = axios.create({
  baseURL:import.meta.env.VITE_API_BASE === 'development' ? '/api' : import.meta.env.VITE_API_URL, 
  timeout: 50000 // 超时时间
})

// 请求 拦截器
request.interceptors.request.use(
  config => {
    // const token = store.getters.token
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`
    // }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 响应拦截器
request.interceptors.response.use(
  response => {
    if (response.data instanceof Blob) {
      return response.data
    }
    // if (!response.data.success) {
    //   Message.error(response.data.message)
    //   return Promise.reject(response.data.message)
    // } else {
    //   return response.data
    // }
    return response.data
  },
  error => {
    // if (error.response.status === 401) {
    //   Message.info('登录过期，请重新登录')
    //   removeToken()
    //   router.push('/login')
    // }
    return Promise.reject(error)
  }
)
export default request

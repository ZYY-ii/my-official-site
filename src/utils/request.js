import axios from 'axios'
import { Message } from 'element-ui'
import router from '@/router/index.js' // 官网通常不需要，可注释

// 创建 axios 实例
const service = axios.create({
  // 🔑 使用环境变量，开发环境 /api，生产环境 /api 或绝对路径
  baseURL: process.env.VUE_APP_API_BASE_URL || '/api',
  timeout: 10000, // 请求超时时间
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  }
})

// ================= 请求拦截器 =================
service.interceptors.request.use(
  config => {
    // 1. 可以在这里显示 Loading（配合 NProgress 或自定义指令）
    // NProgress.start()

    // 2. 携带 Token（如果后续有后台登录）
    const token = localStorage.getItem('token')
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }

    // 3. 防重复请求（可选）
    // 取消同一接口的 pending 请求
    return config
  },
  error => {
    console.error('请求拦截器错误:', error)
    Message.error('请求配置错误')
    return Promise.reject(error)
  }
)

// ================= 响应拦截器 =================
service.interceptors.response.use(
  response => {
    // 关闭 Loading
    // NProgress.done()

    const res = response.data

    //  根据你的后端返回结构调整判断逻辑
    // 假设后端统一返回格式：{ code: 200, data: {}, msg: "success" }
    if (res.code === 200 || res.code === 0 || res.code === undefined) {
      return res // 直接返回 data 字段或整个 res
    } else {
      // 业务错误处理
      Message.error(res.msg || '请求失败')
      
      // 特殊状态码处理（如 token 过期）
      if (res.code === 401) {
        localStorage.removeItem('token')
        // router.push('/login') // 官网通常不需要，可注释
      }
      return Promise.reject(new Error(res.msg || 'Error'))
    }
  },
  error => {
    // NProgress.done()
    console.error('响应拦截器错误:', error)
    
    let message = '网络异常，请稍后重试'
    if (error.response) {
      switch (error.response.status) {
        case 400: message = '请求参数错误'; break
        case 401: message = '未授权，请重新登录'; break
        case 403: message = '拒绝访问'; break
        case 404: message = '请求接口不存在'; break
        case 500: message = '服务器内部错误'; break
        default: message = error.response.data?.msg || '请求失败'
      }
    } else if (error.message.includes('timeout')) {
      message = '请求超时'
    }
    
    Message.error(message)
    return Promise.reject(error)
  }
)

export default service
import axios from "axios";
axios.defaults.baseURL = "/api";
// axios.defaults.headers.post['Content-Type'] = 'application/json';
let request = axios.create({})
// http request 拦截器
request.interceptors.request.use(
  config => {
    //为请求头加上token
    const token = window.sessionStorage.getItem('token')
    if (token) { // 判断是否存在token，如果存在的话，则每个http header都加上token
      // config.headers.X_token = token  //请求头加上token
    }
    return config
  },
  err => {
    return Promise.reject(err)
  })

// http response 拦截器
request.interceptors.response.use(
  response => {
    //拦截响应，做统一处理
    return response
  },
  //接口错误状态处理，也就是说无响应时的处理
  error => {
    return Promise.reject(error.response.status) // 返回接口返回的错误信息
  })

export default request

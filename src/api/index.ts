import axios from "axios";
import {BASE_URL} from "../constant";
import {Toast} from "antd-mobile";

let requestCount = 0;

function showLoading() {
  if (requestCount === 0) {
    Toast.show({
      content: '加载中…',
      icon: "loading",
      duration: 0,
    });
  }
  requestCount++;
}

// 隐藏loading
function hideLoading() {
  requestCount--;
  if (requestCount === 0) {
    Toast.clear()
  }
}

axios.defaults.baseURL = process.env.NODE_ENV === 'development' ? "http://localhost:3000/" : BASE_URL;
let request = axios.create({})
// http request 拦截器
request.interceptors.request.use(
  config => {
    //为请求头加上token
    config.headers = {
      Authorization: window.localStorage.getItem('token') || '',
    }
    showLoading();
    return config
  },
  err => {
    return Promise.reject(err)
  })

// http response 拦截器
request.interceptors.response.use(
  response => {
    hideLoading();
    //拦截响应，做统一处理
    return response.data
  },
  //接口错误状态处理，也就是说无响应时的处理
  error => {
    hideLoading();
    const codeMaps: Record<string, { msg: string; url?: string }> = {
      '401': {
        msg: '缓存过期，请重新登录',
        url: '/middle',
      },
      '403': {
        msg: '数据加载失败',
      },
      '500': {
        msg: '服务器出错',
      },
      '504': {
        msg: '网关超时',
      },
    };
    try {
      const {msg, url} = codeMaps[error.response.status];
      url && window.history.pushState(null, '', url);
      Toast.show({
        content: `${msg}!`,
      });
    } catch (e) {
      Toast.show({
        content: `发生错误${error.response.status}!`,
      });
    }
    return Promise.reject(error.response.status) // 返回接口返回的错误信息
  })

export default request

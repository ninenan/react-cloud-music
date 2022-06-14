import axios from 'axios'

export const BASE_URL = `http://192.168.1.103:4000`;

const aInstance = axios.create({
  baseURL: BASE_URL
});

// 添加响应请求拦截器
aInstance.interceptors.response.use(
  res => res.data,
  err => {
    console.log('err', err)
  }
);

export default aInstance

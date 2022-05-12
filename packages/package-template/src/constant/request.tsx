import { notification } from 'antd';
import axios, { AxiosError } from 'axios';

const Api = axios.create({
  baseURL: '/api/',
  withCredentials: true,
  timeout: 15000,
});

Api.interceptors.response.use(
  (resp) => resp,
  (error: AxiosError<any>) => {
    notification.error(error.request?.responseText);
    return Promise.reject(error);
  }
);

export default Api;

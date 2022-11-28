/*
 ** services/api.ts
 ** apiService
 ** Vue3 TS boilerplate web app | 2022
 */

import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

interface Interceptor<T> {
  (value: AxiosRequestConfig<T>):
    | AxiosRequestConfig<T>
    | Promise<AxiosRequestConfig<T>>;
}

const baseURI: string = import.meta.env.VITE_API_URI;

const apiClient: AxiosInstance = axios.create({
  baseURL: baseURI,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
    dataType: 'json'
  }
});

const apiWrapper = {
  instance: apiClient,

  responseHeaders: (response: AxiosResponse) => response.headers,

  responseBody: (response: AxiosResponse) => response.data,

  get: async function (url: string, params: Record<string, unknown> = {}) {
    try {
      const response: AxiosResponse = await this.instance.get(url, { params });
      return this.responseBody(response);
    } catch (error) {
      if (axios.isAxiosError(error)) throw error;
      throw new Error('Axios GET error : error type is not AxiosError');
    }
  },

  post: async function (
    url: string,
    data?: Record<string, unknown>,
    config?: AxiosRequestConfig
  ) {
    try {
      const response: AxiosResponse = await this.instance.post(
        url,
        data,
        config
      );
      return this.responseBody(response);
    } catch (error) {
      if (axios.isAxiosError(error)) throw error;
      throw new Error('Axios POST error : error type is not AxiosError');
    }
  },

  patch: async function (
    url: string,
    data?: Record<string, unknown>,
    config?: AxiosRequestConfig
  ) {
    try {
      const response: AxiosResponse = await this.instance.patch(
        url,
        data,
        config
      );
      return this.responseBody(response);
    } catch (error) {
      if (axios.isAxiosError(error)) throw error;
      throw new Error('Axios PATCH error : error type is not AxiosError');
    }
  },

  delete: async function (url: string, params: Record<string, unknown> = {}) {
    try {
      const response: AxiosResponse = await this.instance.delete(url, {
        params
      });
      return this.responseBody(response);
    } catch (error) {
      if (axios.isAxiosError(error)) throw error;
      throw new Error('Axios DELETE error : error type is not AxiosError');
    }
  }
};

const _isAPIRequest = (config: AxiosRequestConfig) => {
  if (config) {
    return (
      `${config.baseURL}${config.url}`.indexOf(import.meta.env.VITE_API_URI) >
      -1
    );
  }
  return false;
};

const _setInterceptor = <T>(interceptor: Interceptor<T>) => {
  apiWrapper.instance.interceptors.request.use(interceptor, undefined, {
    synchronous: true
  });
};

const setInterceptor = (authToken: string) => {
  _setInterceptor((config: AxiosRequestConfig) => {
    if (!config.headers) config.headers = {};
    if (_isAPIRequest(config)) config.headers['Authorization'] = authToken;
    return config;
  });
  return Promise.resolve();
};

export default apiClient;
export { apiWrapper, setInterceptor };

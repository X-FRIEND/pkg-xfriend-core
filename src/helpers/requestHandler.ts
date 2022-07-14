import { Axios, AxiosRequestConfig } from 'axios';

export type RTracer = {
  id: () => string;
}

export type RequestHeadersT = {
    config: {
      headers: {
        'x-transaction-id': string;
        'x-consumer-service': string;
    }
  }
} & AxiosRequestConfig;

export type OnErrorT = (error: Error) => void;

export type RequestInterceptorT = (config: RequestHeadersT, rTracer: RTracer) => RequestHeadersT;

export type SetupAxiosT = (axios: Axios, rTracer: RTracer) => Axios;

export type SetupAxiosDefaultT = {
  setupAxios: SetupAxiosT
};

const requestInterceptor: RequestInterceptorT = (config, rTracer) => {
  config.headers['x-transaction-id'] = rTracer.id();
  config.headers['x-consumer-service'] = process.env.SERVICE_NAME || process.env.SERVICE;
  return config;
};

const onError: OnErrorT = (error) => { throw error; };

const setupAxios: SetupAxiosT = (axios, rTracer) => {
  axios.interceptors.request.use(config => requestInterceptor(config as RequestHeadersT, rTracer), error => onError(error));
  return axios;
};

export default {
  setupAxios: (axios, rTracer) => setupAxios(axios, rTracer),
  requestInterceptor,
  onError
} as SetupAxiosDefaultT;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const requestInterceptor = (config, rTracer) => {
    config.headers['x-transaction-id'] = rTracer.id();
    config.headers['x-consumer-service'] = process.env.SERVICE_NAME || process.env.SERVICE;
    return config;
};
const onError = (error) => { throw error; };
const setupAxios = (axios, rTracer) => {
    axios.interceptors.request.use(config => requestInterceptor(config, rTracer), error => onError(error));
    return axios;
};
exports.default = {
    setupAxios: (axios, rTracer) => setupAxios(axios, rTracer),
    requestInterceptor,
    onError
};

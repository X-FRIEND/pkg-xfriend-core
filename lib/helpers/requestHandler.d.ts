import { Axios, AxiosRequestConfig } from 'axios';
export declare type RTracer = {
    id: () => string;
};
export declare type RequestHeadersT = {
    config: {
        headers: {
            'x-transaction-id': string;
            'x-consumer-service': string;
        };
    };
} & AxiosRequestConfig;
export declare type OnErrorT = (error: Error) => void;
export declare type RequestInterceptorT = (config: RequestHeadersT, rTracer: RTracer) => RequestHeadersT;
export declare type SetupAxiosT = (axios: Axios, rTracer: RTracer) => Axios;
export declare type SetupAxiosDefaultT = {
    setupAxios: SetupAxiosT;
};
declare const _default: SetupAxiosDefaultT;
export default _default;

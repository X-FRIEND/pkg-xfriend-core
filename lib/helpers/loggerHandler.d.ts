export declare type LogT = {
    message: string;
    processId?: string;
    start?: Date;
    statusCode?: number;
    event?: object;
    responseObject?: object;
    error?: object;
    path?: string;
    body?: string;
    headers?: object;
    httpMethod?: string;
    application?: string;
    environment?: string;
};
export declare type LoggerHandlerT = (logT: LogT) => object;
export declare const loggerHandler: LoggerHandlerT;

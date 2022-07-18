export declare type responseTimesT = {
    [key: string]: unknown;
};
export declare type ErrT = {
    message: string;
    stack?: string;
} & Error;
export declare type MakeRequestT = (func: Promise<unknown>, application: string, responseTimes: responseTimesT) => Promise<unknown> | Error;
declare const makeRequest: MakeRequestT;
export default makeRequest;

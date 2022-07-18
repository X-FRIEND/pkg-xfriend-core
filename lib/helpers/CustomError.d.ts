export declare type GetDefaultErrorTypeT = (statusCode: number) => string;
export declare type CustomErrorT = {
    statusCode: number | null;
    type: string | null;
    additionalData: string | null;
    serviceResponseTime: string | null;
    serviceStatusCode: string | null;
    serviceURL: string | null;
    serviceReference: string | null;
    error: Error | null;
} & Error;
export declare type ErrorResultT = Pick<CustomErrorT, "type" | "message" | "statusCode" | "additionalData">;
export declare type IsCustomErrorT = (error: Error) => boolean;
export interface ICustomError {
    toResponseData: () => {
        error: ErrorResultT;
    };
}
declare class CustomError extends Error implements ICustomError {
    statusCode: number;
    type: unknown;
    additionalData: string;
    serviceResponseTime: unknown;
    serviceStatusCode: unknown;
    serviceURL: unknown;
    serviceReference: unknown;
    constructor({ statusCode, message, type, additionalData, error, serviceResponseTime, serviceStatusCode, serviceURL, serviceReference, }: CustomErrorT);
    toResponseData(): {
        error: Pick<CustomErrorT, "type" | "message" | "statusCode" | "additionalData">;
    };
    static isCustomError(error: Error): boolean;
}
export default CustomError;

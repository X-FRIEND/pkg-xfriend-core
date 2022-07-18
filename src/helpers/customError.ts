import { common } from "../common";
import errorConstants from "./customErrorConstants";

export type GetDefaultErrorTypeT = (statusCode: number) => string;

export type CustomErrorT = {
  statusCode: number | null;
  type: string | null;
  additionalData: string | null;
  serviceResponseTime: string | null;
  serviceStatusCode: string | null;
  serviceURL: string | null;
  serviceReference: string | null;
  error: Error | null;
} & Error;

export type ErrorResultT = Pick<CustomErrorT, "type" | "message" | "statusCode" | "additionalData">;

export type IsCustomErrorT = (error: Error) => boolean;

export interface ICustomError {
  toResponseData: () => { error: ErrorResultT};
}


const getDefaultErrorType: GetDefaultErrorTypeT = (statusCode) => {
  const errorType = errorConstants.DefaultErrorType.get(statusCode);
  const  defaultErrorType =  errorConstants.ErrorType.GenericError;
  return errorType || defaultErrorType; 
}

class CustomError extends Error implements ICustomError {
  statusCode: number;
  type: unknown;
  additionalData: string;
  serviceResponseTime: unknown;
  serviceStatusCode: unknown;
  serviceURL: unknown;
  serviceReference: unknown;
  
  constructor({
    statusCode = null,
    message = null,
    type = null,
    additionalData = null,
    error = null,
    serviceResponseTime = null,
    serviceStatusCode = null,
    serviceURL = null,
    serviceReference = null,
  }: CustomErrorT) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
    this.type = type || getDefaultErrorType(this.statusCode);
    this.additionalData = additionalData;

    if (error instanceof Error) {
      this.stack = error.stack;
    }
    this.serviceResponseTime = serviceResponseTime;
    this.serviceStatusCode = serviceStatusCode;
    this.serviceURL = serviceURL;
    this.serviceReference = serviceReference;

    common.removeEmptyFields(this);
  }
  
  toResponseData() {
    const result = {
      error: {
        message: this.message,
        statusCode: this.statusCode,
        type: this.type,
      } as Pick<CustomErrorT, "type" | "message" | "statusCode" | "additionalData">,
    };
    if (this.additionalData) {
      result.error.additionalData = this.additionalData;
    }
    return result;
  }

  static isCustomError (error: Error): boolean {
    return error instanceof CustomError;
  }
}


export default {
  CustomError,
  StatusCode: errorConstants.StatusCode,
  ErrorType: errorConstants.ErrorType,
};

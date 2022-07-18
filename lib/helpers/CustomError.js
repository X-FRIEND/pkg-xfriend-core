"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("../common");
const customErrorConstants_1 = __importDefault(require("./customErrorConstants"));
const getDefaultErrorType = (statusCode) => {
    const errorType = customErrorConstants_1.default.DefaultErrorType.get(statusCode);
    const defaultErrorType = customErrorConstants_1.default.ErrorType.GenericError;
    return errorType || defaultErrorType;
};
class CustomError extends Error {
    constructor({ statusCode = null, message = null, type = null, additionalData = null, error = null, serviceResponseTime = null, serviceStatusCode = null, serviceURL = null, serviceReference = null, }) {
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
        common_1.common.removeEmptyFields(this);
    }
    toResponseData() {
        const result = {
            error: {
                message: this.message,
                statusCode: this.statusCode,
                type: this.type,
            },
        };
        if (this.additionalData) {
            result.error.additionalData = this.additionalData;
        }
        return result;
    }
    static isCustomError(error) {
        return error instanceof CustomError;
    }
}
exports.default = CustomError;

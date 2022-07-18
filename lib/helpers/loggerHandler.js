"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loggerHandler = void 0;
const common_1 = require("../common");
const loggerHandler = ({ message = null, processId = null, start = new Date(), statusCode = null, event = {}, responseObject = {}, error = {}, path = null, body = '', headers = {}, httpMethod = null, application = null, environment = null, }) => {
    try {
        const bodyLog = body || common_1.common.getProperty("body", event);
        const headersLog = headers || common_1.common.getProperty("headers", event);
        const headersNormalized = common_1.common.normalizeProperties(headersLog, []);
        const logObject = {
            processId,
            application,
            environment,
            message,
            date: new Date(),
            duration: new Date().getTime() - new Date(start).getTime(),
            statusCode,
            path: path,
            body: bodyLog,
            userAgent: common_1.common.getProperty("user-agent", headersNormalized),
            consumerKey: common_1.common.getProperty("consumer-key", headersNormalized),
            headers: JSON.stringify(headersNormalized),
            method: httpMethod || common_1.common.getProperty("httpMethod", event),
            errorMessage: common_1.common.getProperty("message", error),
            errorStack: common_1.common.getProperty("stack", error),
            resLength: responseObject
                ? Buffer.byteLength(JSON.stringify(responseObject))
                : "0",
            resBody: responseObject,
        };
        return common_1.common.removeEmptyFields(logObject);
    }
    catch (error) {
        console.error(error);
        return {};
    }
};
exports.loggerHandler = loggerHandler;

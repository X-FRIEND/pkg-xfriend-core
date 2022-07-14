import { common } from "../common";

export type LogT = {
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
}

export type LoggerHandlerT = (logT: LogT) => object;

export const loggerHandler: LoggerHandlerT = ({
  message = null,
  processId = null,
  start = new Date(),
  statusCode = null,
  event = {},
  responseObject = {},
  error = {},
  path = null,
  body = '',
  headers = {},
  httpMethod = null,
  application = null,
  environment = null,
}) => {
  try {
    const bodyLog = body || common.getProperty("body", event) as string;
    const headersLog = headers || common.getProperty("headers", event) as object;
    const headersNormalized = common.normalizeProperties(headersLog, []
    );

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
      userAgent: common.getProperty("user-agent", headersNormalized),
      consumerKey: common.getProperty("consumer-key", headersNormalized),
      headers: JSON.stringify(headersNormalized),
      method: httpMethod || common.getProperty("httpMethod", event),
      errorMessage: common.getProperty("message", error),
      errorStack: common.getProperty("stack", error),
      resLength: responseObject
        ? Buffer.byteLength(JSON.stringify(responseObject))
        : "0",
      resBody: responseObject,
    };

    return common.removeEmptyFields(logObject);
  } catch (error) {
    console.error(error);
    return {};
  }
};

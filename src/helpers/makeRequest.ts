import logger from "./logger";

export type responseTimesT = {
  [key: string]: unknown;
}

export type ErrT = {
  message: string;
  stack?: string;
} & Error;

export type MakeRequestT = (func: Promise<unknown>, application: string, responseTimes: responseTimesT) => Promise<unknown> | Error;

const makeRequest: MakeRequestT = async (func, application, responseTimes) => {
  const isLogVerboseEnabled =
    process.env.PKG_XFRIEND_CORE_LOG_VERBOSE === "true";

  try {
    const startTime = Date.now();
    const response = await func;

    responseTimes[application] = Date.now() - startTime;

    if (isLogVerboseEnabled)
      logger.info(
        `makeRequest | ${application} | Time: ${responseTimes[application]}ms`
      );
    return response;
  } catch (error) {
    const err = error as ErrT;
    if (isLogVerboseEnabled)
      logger.error(
        `makeRequest | ${application} | Error: [${err.message}]. Stack: [${err.stack}]`
      );
    throw err;
  }
};

export default makeRequest;

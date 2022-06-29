"use strict";
const logger = require("./logger");

const makeRequest = async (func, application, responseTimes) => {
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
  } catch (err) {
    if (isLogVerboseEnabled)
      console.log(
        `makeRequest | ${application} | Error: [${err.message}]. Stack: [${err.stack}]`
      );
    throw err;
  }
};

module.exports = {
  makeRequest,
};

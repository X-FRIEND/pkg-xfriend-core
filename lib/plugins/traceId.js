"use strict";

const uuid = require("uuid");

const onRequest = async (request, h) => {
  if (!request.headers["x-transaction-id"]) {
    request.headers["x-transaction-id"] =
      request.headers["x-amzn-trace-id"] || uuid.v1();
  }

  return h.continue;
};

const setupServer = (server) => {
  server.ext("onRequest", onRequest);
};

module.exports = {
  setupServer: (server) => setupServer(server),
};

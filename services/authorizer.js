"use strict";

const axios = require("axios");

const authorizerService = (() => {
  const get = async ({ token, consumerSystem, userId }) => {
    const host = process.env.AUTHORIZER_HOST || process.env.URL_AUTHORIZER;
    const kubernetesHost =
      "http://kubernetes-app.x-friendbr.digital/api/bfbmsauthorizer";
    const swarmHost = "http://nginx-x-frienddigital/api/bfbmsauthorizer";
    const defaultHost =
      process.env.USE_ROUTE_PREFIX === "true" ? kubernetesHost : swarmHost;

    const instance = axios.create({
      baseURL: host || defaultHost,
      headers: {
        "x-consumer-system": consumerSystem,
        "x-user-id": userId,
      },
      timeout: 10000,
    });

    instance.defaults.headers.token = token;
    const response = await instance.get("/v1/authorizers");
    return response.data;
  };

  return { get };
})();

module.exports = authorizerService;

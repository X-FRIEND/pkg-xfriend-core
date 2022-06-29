'use strict';

const coreHealthCheck = require('./healthCheckCore');

module.exports = (pjson, path = '/health') => ({
  pkg: pjson,
  async register(server, options) {
    server.route({
      method: 'GET',
      path,
      async handler(request, h) {

        const data = await coreHealthCheck(request.query.v, options, pjson);

        return h.response(data).code(data.status);
      },
    });
  },
});

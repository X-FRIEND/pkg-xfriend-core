'use strict';

const uuidv4 = require('uuid/v4');

const onRequest = async (request, h) => {

  if (!request.headers['x-transaction-id']) {
    request.headers['x-transaction-id'] = request.headers['x-amzn-trace-id'] || uuidv4();
  }
  
  return h.continue;
};

const setupServer = (server) => {
  server.ext('onRequest', onRequest);    
};

module.exports = {
  setupServer: (server) => setupServer(server),
};

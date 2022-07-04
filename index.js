module.exports = {

  //COMMONS
  BaseFunction: require("./common/baseFunction"),
  BaseHttpFunction: require("./common/baseHttpFunction"),

  //HELPERS
  Logger: require("./helpers/logger"),
  EsLogger: require('./helpers/esLogger'),
  LoggerHandler: require('./helpers/loggerHandler'),
  Utility: require("./helpers/utility"),
  Cache: require('./helpers/memcached'),
  Redis: require('./helpers/redis'),
  ResponseHandler: require('./helpers/responseHandler'),
  RequestHandler: require('./helpers/requestHandler'),
  Errors: require('./helpers/customError'),
  MakeRequest: require('./helpers/makeRequest'),

  //SERVICES
  TokenLogin: require("./services/tokenLogin"),
  AWS: require("./services/aws"),
  Authorizer: require("./services/authorizer"),
  QaData: require("./services/qadata"),

  //PLUGINS
  Authorizing: require("./plugins/authorizing"),
  HealthCheck: require('./plugins/healthCheck'),
  HealthCheckCore: require('./plugins/healthCheckCore'),
  TraceId: require('./plugins/traceId'),
};

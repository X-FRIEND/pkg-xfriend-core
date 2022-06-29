'use strict';

const authorizer = require('../services/authorizer');
const getProperty = require('../common/getProperty');
const ResponseHandler = require('../helpers/responseHandler');

const Authorizing = () => {
  const softStrategyName = 'x-friendSoftTokenAuth';
  const hardStrategyName = 'x-friendHardTokenAuth';

  const softAuthenticate = (request, nextAction) => authenticate(request, nextAction, true);

  const hardAuthenticate = (request, nextAction) => authenticate(request, nextAction, false);

  const xFriendSoftTokenScheme = () => ({ credentials: null, isValid: false, authenticate: softAuthenticate });

  const xFriendHardTokenScheme = () => ({ credentials: null, isValid: false, authenticate: hardAuthenticate });

  const isValidSignature = (signatureId, credentials) => {
    if (!signatureId) return true;

    const signature = credentials.signatureList.filter(id => id === signatureId);

    return !!signature.length;
  }

  const logError = ({ request, error, response }) => ResponseHandler.errorHandler({
    payload: {},
    request,
    error,
    response,
  });

  const authenticate = async (request, nextAction, continueRequest) => {

    const { headers, query, params } = request;
    const { authorization } = headers;
    const consumerSystem = headers['x-consumer-system'];
    const userId = headers['x-user-id'];
    const signature = query['signature'] || headers['signature'] || headers['signature-id'] || params['signature'];
    const unauthorized = { message: 'unauthorized' };
    const badGateway = { message: 'badGateway' };
    const statusUnauthorized = 401;
    const statusBadGateway = 502;

    if (continueRequest && !authorization) {
      return nextAction.continue;
    }

    try {
      const credentials = await authorizer.get({ token: authorization, consumerSystem, userId });

      if (!isValidSignature(signature, credentials)) {
        if (continueRequest) {
          return nextAction.continue;
        }

        return nextAction
          .response(unauthorized)
          .code(statusUnauthorized)
          .takeover();
      }

      request.auth.isAuthorized = true;
      return nextAction.authenticated({ credentials });
    } catch (error) {
      if (getProperty('response.status', error) === statusUnauthorized) {
        if (continueRequest) return nextAction.continue;

        logError({
          error,
          request,
          response: unauthorized,
        })
        return nextAction
          .response(unauthorized)
          .code(statusUnauthorized)
          .takeover();
      }

      logError({
        error,
        request,
        response: badGateway,
      })

      return nextAction
        .response(badGateway)
        .code(statusBadGateway)
        .takeover();
    }
  };

  const setupPlugin = async (server) => {
    server.auth.scheme(softStrategyName, xFriendSoftTokenScheme);
    server.auth.scheme(hardStrategyName, xFriendHardTokenScheme);
    await server.auth.strategy('x-friend-soft-authorizer', softStrategyName, { xFriendSoftTokenScheme });
    await server.auth.strategy('x-friend-hard-authorizer', hardStrategyName, { xFriendHardTokenScheme });
  };

  return {
    setupPlugin,
  };
};

module.exports = Authorizing;
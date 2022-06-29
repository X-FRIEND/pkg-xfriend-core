const Errors = require("../../helpers/customError");

const getOriginalError = () => {
  const error = new Error("Original Axios error");
  error.statusCode = 404;
  error.response = { headers: [] };
  error.response.headers["x-response-time"] = 5000;
  error.config = {
    baseURL: "http://swarm.x-friendbr.digital/api/bfbmscms",
    url: "http://swarm.x-friendbr.digital/api/bfbmscms/v1/proxy-cache/api/jsonws/x-friend.conteudo/get-conteudos-new/groupId/20152/folderId/40626677666/languageId/pt_BR",
  };
  return error;
};

module.exports = {
  originalError: getOriginalError(),

  errorFull: {
    type: Errors.ErrorType.ParseError,
    message: "Custom Error Test",
    statusCode: Errors.StatusCode.InternalServerError,
    additionalData: { test: "OK" },
    error: getOriginalError(),
  },

  error: {
    type: Errors.ErrorType.ParseError,
    message: "Custom Error Test",
    statusCode: Errors.StatusCode.InternalServerError,
    additionalData: { test: "OK" },
  },

  errorBasic: {
    statusCode: Errors.StatusCode.Unauthorized,
  },
};

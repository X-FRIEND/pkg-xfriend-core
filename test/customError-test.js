"use strict";

require("dotenv").config();

const expect = require("chai").expect;
const mocha = require("mocha");
const Errors = require("../lib/helpers/customError");
const errorData = require("./mocks/customError-data");
const responseHandler = require("../lib/helpers/responseHandler");
const Boom = require("@hapi/boom");

mocha.describe("Custom Error tests", function () {
  mocha.it("Custom Error with all properties and original Axios error", () => {
    const error = new Errors.CustomError(errorData.errorFull);

    expect(error.type).to.be.equal("ParseError");
    expect(error.message).to.be.equal("Custom Error Test");
    expect(error.statusCode).to.be.equal(500);
    expect(error.additionalData.test).to.be.equal("OK");
    expect(error.serviceStatusCode).to.be.equal(404);
    expect(error.serviceResponseTime).to.be.equal(5000);
    expect(error.serviceReference).to.be.equal("bfbmscms");
    expect(error.serviceURL).to.be.equal(
      "http://swarm.x-friendbr.digital/api/bfbmscms/v1/proxy-cache/api/jsonws/x-friend.conteudo/get-conteudos-new/groupId/20152/folderId/40626677666/languageId/pt_BR"
    );
    expect(error.stack).contains("Error: Original Axios error");
  });

  mocha.it("Custom Error without original error", () => {
    const error = new Errors.CustomError(errorData.error);

    expect(error.serviceStatusCode).to.be.undefined;
    expect(error.serviceResponseTime).to.be.undefined;
    expect(error.serviceReference).to.be.undefined;
    expect(error.serviceURL).to.be.undefined;
    expect(error.stack).not.contains("Error: Original Axios error");
  });

  mocha.it("Custom Error using only HTTP Status Code", () => {
    const error = new Errors.CustomError(errorData.errorBasic);

    expect(error.type).to.be.equal("Unauthorized");
    expect(error.message).to.be.equal("Unauthorized Error");
    expect(error.statusCode).to.be.equal(401);
    expect(error.stack).contains("Error: Unauthorized Error");
  });
});

mocha.describe("CustomError processing in responseHandler Helper", function () {
  mocha.it("toResponseData() result, simulating a MicroService return", () => {
    const error = new Errors.CustomError(errorData.errorFull);
    const payload = {};
    const request = { headers: {}, info: {} };
    const resultData = responseHandler.errorHandler({
      payload,
      request,
      error,
    });

    expect(resultData.error.type).to.be.equal("ParseError");
    expect(resultData.error.message).to.be.equal("Custom Error Test");
    expect(resultData.error.statusCode).to.be.equal(500);
    expect(resultData.error.additionalData.test).to.be.equal("OK");
    expect(resultData.error.serviceStatusCode).to.be.undefined;
    expect(resultData.error.serviceResponseTime).to.be.undefined;
    expect(resultData.error.serviceReference).to.be.undefined;
    expect(resultData.error.serviceURL).to.be.undefined;
    expect(resultData.error.stack).to.be.undefined;
  });

  mocha.it("toResponseData() result, simulating a Lambda return", () => {
    const error = new Errors.CustomError(errorData.errorFull);
    const event = { headers: {} };
    const start = {};
    const config = { logs: {}, logger: {}, environment: {} };

    const resultData = responseHandler.errorHandler({
      event,
      start,
      config,
      error,
    });
    const body = JSON.parse(resultData.body);

    expect(resultData.statusCode).to.be.equal(500);
    expect(body.error.type).to.be.equal("ParseError");
    expect(body.error.message).to.be.equal("Custom Error Test");
    expect(body.error.statusCode).to.be.equal(500);
    expect(body.error.additionalData.test).to.be.equal("OK");
    expect(body.error.serviceStatusCode).to.be.undefined;
    expect(body.error.serviceResponseTime).to.be.undefined;
    expect(body.error.serviceReference).to.be.undefined;
    expect(body.error.serviceURL).to.be.undefined;
    expect(body.error.stack).to.be.undefined;
  });
});

mocha.describe(
  "Standard Error processing in responseHandler Helper",
  function () {
    mocha.it(
      "responsHandler with standard error, simulating a MicroService return",
      () => {
        const error = new Error("Standard error");
        const payload = {};
        const request = { headers: {}, info: {} };
        const resultData = responseHandler.errorHandler({
          payload,
          request,
          error,
        });

        expect(resultData.statusCode).to.be.equal(500);
        expect(resultData.result.message).to.be.equal("Standard error");
        expect(resultData.result.stack).not.to.be.undefined;
      }
    );

    mocha.it(
      "responsHandler with standard error, simulating a Lambda return",
      () => {
        const error = new Error("Standard error");
        const event = { headers: {} };
        const start = {};
        const config = { logs: {}, logger: {}, environment: {} };

        const resultData = responseHandler.errorHandler({
          event,
          start,
          config,
          error,
        });
        const body = JSON.parse(resultData.body);

        expect(resultData.statusCode).to.be.equal(500);
        expect(body.message).to.be.equal("Standard error");
        expect(body.stack).not.be.undefined;
      }
    );
  }
);

mocha.describe.skip("CustomError using Boom object", function () {
  mocha.it("Create a CustomError using a Boom object", () => {
    const boomObject = Boom.unauthorized("Usuário não autenticado"); // Utilizar o número desta linha de código (130:29) no primeiro teste
    const error = new Errors.CustomError({
      error: boomObject,
    });

    expect(error.stack).contains("customError-test.js:130:29"); // Colocar o número da linha onde o Boom foi instanciado (130:29), para diferencir da stack do CustomError
    expect(error.type).to.be.equal("Unauthorized");
    expect(error.message).to.be.equal("Usuário não autenticado");
    expect(error.statusCode).to.be.equal(401);
  });
});

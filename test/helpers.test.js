"use strict";

const expect = require("chai").expect;
const assert = require("chai").assert;
const mocha = require("mocha");
const _sinon = require("sinon");
const helpers = require("../lib").helpers;
const winston = require("../lib/helpers/winstonLogConsole").default;
const axios = require("axios");

mocha.describe("Healpers Function tests", () => {
  const errorMake = {
    message: "test",
    statusCode: 500,
    error: new Error("test"),
  };

  const resultMake = {
    error: {
      message: "test",
      statusCode: 500,
      type: "GenericError",
    },
  };

  mocha.describe("Test makeRequest", () => {
    process.env.PKG_XFRIEND_CORE_LOG_VERBOSE = true;
    mocha.it("should return a promise", () => {
      const request = _sinon.stub().resolves({});
      const result = helpers.makeRequest(request, "test", {});
      expect(result).to.be.a("promise");
    });
    mocha.it("should call request with correct params", async () => {
      const requestMake = _sinon.stub().resolves({
        statusCode: 200,
      });
      const result = await helpers.makeRequest(requestMake, "test", {});
      expect(await result()).to.be.deep.equal({ statusCode: 200 });
    });
    mocha.it("should return error", async () => {
      const result = await helpers.makeRequest().catch((err) => err);
      expect(result).to.be.property("message");
    });
  });

  mocha.describe("Test requestHandler", () => {
    process.env.SERVICE = "test";
    const axiosMake = _sinon.spy(axios);
    const rTrace = {
      id: _sinon.stub().returns("1234567890"),
    };
    mocha.it("should call request with correct params", async () => {
      process.env.SERVICE_NAME = "test";
      const setupAxios = helpers.requestHandler.setupAxios(axiosMake, rTrace);
      const requestInterceptor = helpers.requestHandler.requestInterceptor(
        { headers: {} },
        rTrace
      );
      expect(setupAxios).to.be.a("function");
      expect(requestInterceptor).to.be.deep.equal({
        headers: {
          "x-transaction-id": rTrace.id(),
          "x-consumer-service": "test",
        },
      });
    });
    mocha.it("should have error success", async () => {
      const customError = new helpers.customError.CustomError(errorMake);
      try {
        const customError = new helpers.customError.CustomError(errorMake);
        helpers.requestHandler.onError(customError);
      } catch (err) {
        expect(err).to.be.instanceof(helpers.customError.CustomError);
      }
    });
  });

  mocha.describe("Test customError", () => {
    mocha.it("should call request with correct params", async () => {
      const customError = new helpers.customError.CustomError(errorMake);
      const toResponseData = customError.toResponseData();
      expect(customError).to.be.instanceof(Error);
      expect(customError).to.be.instanceof(helpers.customError.CustomError);
      expect(toResponseData).to.be.deep.equal(resultMake);
      expect(helpers.customError.CustomError.isCustomError(customError)).to.be
        .true;
    });
  });

  mocha.describe("Test Logger", () => {
    mocha.setup(() => {
      _sinon.spy(winston, "info");
      _sinon.spy(winston, "error");
      _sinon.spy(winston, "debug");
      _sinon.spy(winston, "verbose");
      _sinon.spy(winston, "warn");
    });
    mocha.it("should return success when log info", () => {
      helpers.logger.info({ message: "test message success" });
      assert(winston.info.calledOnce);
    });

    mocha.it("should return success when log error", () => {
      helpers.logger.error({
        message: "test message error",
        error: new Error("error"),
      });
      assert(winston.error.calledOnce);
    });

    mocha.it("should return success when log debug", () => {
      helpers.logger.debug({ message: "test message debug" });
      assert(winston.debug.calledOnce);
    });

    mocha.it("should return success when log verbose", () => {
      helpers.logger.verbose({ message: "test message verbose" });
      assert(winston.verbose.calledOnce);
    });

    mocha.it("should return success when log warn", () => {
      helpers.logger.warn({ message: "test message warn" });
      assert(winston.warn.calledOnce);
    });

    mocha.afterEach(() => {
      winston.info.restore();
      winston.error.restore();
      winston.debug.restore();
      winston.verbose.restore();
      winston.warn.restore();
    });
  });
});

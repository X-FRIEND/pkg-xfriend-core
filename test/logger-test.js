const assert = require("chai").assert;
const mocha = require("mocha");
const _sinon = require("sinon");
const { Logger } = require("../index");
const winston = require("../lib/helpers/winstonLogConsole");

mocha.describe("Logger tests", () => {
  mocha.setup(() => {
    _sinon.spy(winston, "info");
    _sinon.spy(winston, "error");
    _sinon.spy(winston, "debug");
    _sinon.spy(winston, "silly");
    _sinon.spy(winston, "verbose");
    _sinon.spy(winston, "warn");
  });

  mocha.it("should return success when log info", () => {
    Logger.info({ message: "success" });
    assert(winston.info.calledOnce);
  });

  mocha.it("should return success when log error", () => {
    Logger.error({ message: "error", error: new Error("error") });
    assert(winston.error.calledOnce);
  });

  mocha.it("should return success when log debug", () => {
    Logger.debug({ message: "debug" });
    assert(winston.debug.calledOnce);
  });

  mocha.it("should return success when log silly", () => {
    Logger.silly({ message: "silly" });
    assert(winston.silly.calledOnce);
  });

  mocha.it("should return success when log verbose", () => {
    Logger.verbose({ message: "verbose" });
    assert(winston.verbose.calledOnce);
  });

  mocha.it("should return success when log warn", () => {
    Logger.warn({ message: "warn" });
    assert(winston.warn.calledOnce);
  });

  mocha.afterEach(() => {
    winston.info.restore();
    winston.error.restore();
    winston.debug.restore();
    winston.silly.restore();
    winston.verbose.restore();
    winston.warn.restore();
  });
});

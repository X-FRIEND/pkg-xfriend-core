"use strict";

require("dotenv").config();

const expect = require("chai").expect;
const assert = require("chai").assert;
const mocha = require("mocha");
const _sinon = require("sinon");
const mongoose = require("mongoose");
const BlankFunction = require("./mocks/blank-function");
const logger = require("../lib/helpers/logger-deprecated");

mocha.describe.skip("Base Function tests", function () {
  var sinon;
  let lib;

  mocha.beforeEach(function () {
    sinon = _sinon.sandbox.create();
  });

  mocha.afterEach(function () {
    // Restore all the things made through the sandbox
    sinon.restore();
  });

  mocha.it("Test database connect with success", (done) => {
    lib = new BlankFunction();

    //STUB de banco de dados com sucesso
    sinon
      .stub(mongoose, "connect")
      .withArgs(process.env.MONGO_URI)
      .returns(
        new Promise(function (resolve) {
          return resolve();
        })
      );

    lib
      .connectDB()
      .then(function () {
        expect(lib.processId).to.not.equal(null);
        expect(lib.isDatabaseConnected).to.equal(true);
        done();
      })
      .catch(function () {
        assert.ok(false);
        done();
      });
  });

  mocha.it("Test database disconnect when finish is called", (done) => {
    lib = new BlankFunction();

    lib.isDatabaseConnected = true;

    lib.finish(null, {});

    expect(lib.isDatabaseConnected).to.equal(false);
    done();
  });

  mocha.it("Test database connect with error", (done) => {
    lib = new BlankFunction();

    //STUB de banco de dados com sucesso
    sinon
      .stub(mongoose, "connect")
      .withArgs(process.env.MONGO_URI)
      .returns(
        new Promise(function (resolve, reject) {
          return reject("database error");
        })
      );

    lib
      .connectDB()
      .then(function () {
        assert.ok(false);
        done();
      })
      .catch(function () {
        expect(lib.processId).to.not.equal(null);
        expect(lib.isDatabaseConnected).to.equal(false);
        done();
      });
  });

  mocha.it("Test if processId is generated", function () {
    const logSpy = sinon.spy(BlankFunction.prototype, "addContextProperty");
    lib = new BlankFunction();
    assert(logSpy.calledOnce);
    expect(logSpy.args[0][0]).to.be.equals("processId");
  });

  mocha.it("Test if processId is repassed to the logger", () => {
    lib = new BlankFunction({ contextProperties: { processId: 1 } });
    expect(logger.contextProperties.processId).to.be.equal(1);
  });

  mocha.it("Test if isFtp and subProcessId is repassed to the logger", () => {
    lib = new BlankFunction({
      contextProperties: { isFtp: true, subProcessId: 123 },
    });
    expect(lib.contextProperties.isFtp).to.be.equal(true);
    expect(logger.contextProperties.subProcessId).to.be.equal(123);
  });

  mocha.it("Test if recall step function is repassed to the logger", () => {
    lib = new BlankFunction({
      contextProperties: { recallStepFunction: true },
    });
    lib.addContextProperty("recallStepFunction", true);
    expect(logger.contextProperties.recallStepFunction).to.be.equal(true);
  });

  mocha.it("Test if processId is repassed to the another Function", () => {
    const logSpy = sinon.spy(BlankFunction.prototype, "finishFunction");
    lib = new BlankFunction();
    lib.addContextProperty("processId", 0);
    lib.finish(null, { anotherProperty: 1 });

    expect(logSpy.args[0][0]).to.be.equal(null);
    expect(logSpy.args[0][1].anotherProperty).to.be.equal(1);
  });

  mocha.it("Test callback error", () => {
    const logSpy = sinon.spy(BlankFunction.prototype, "finishFunction");
    lib = new BlankFunction({
      contextProperties: { processId: 0, recallStepFunction: true },
    });
    lib.finish("Error", { anotherProperty: 1 });

    expect(logSpy.args[0][0]).to.be.equal("Error");
    expect(logSpy.args[0][1].anotherProperty).to.be.equal(1);
    expect(logSpy.args[0][1].contextProperties.processId).to.be.equal(0);
    expect(logSpy.args[0][1].contextProperties.recallStepFunction).to.be.equal(
      true
    );
  });

  // Deixar para depois teste de erro de fechamento de conexao
  mocha.it("Test close database error", (done) => {
    lib = new BlankFunction({ processId: 0 });
    const logSpy = sinon.spy(lib.logger, "log");

    //STUB de banco de dados com sucesso
    sinon
      .stub(mongoose, "connect")
      .withArgs(process.env.MONGO_URI)
      .returns(
        new Promise(function (resolve) {
          return resolve();
        })
      );

    //STUB de banco de dados com erro
    sinon.stub(mongoose.connection, "close").yields("database error");

    lib
      .connectDB()
      .then(function () {
        lib.callback = function () {
          assert(!lib.isDatabaseConnected);
          assert(logSpy.calledWith("database error"));
          done();
        };

        lib.finish(null, { anotherProperty: 1 });
      })
      .catch(function () {
        assert(false);
        done();
      });
  });

  mocha.it('Test if the "Session" variable are going passed foward', (done) => {
    const logSpy = sinon.spy(BlankFunction.prototype, "finishFunction");

    lib = new BlankFunction({
      contextProperties: {
        processOwner: 1,
        partnerQueue: "QUEUENAME",
        subProcessId: 1,
      },
    });
    lib.finish(null, {});

    expect(logSpy.args[0][1].contextProperties.processOwner).to.be.equal(1);
    expect(logSpy.args[0][1].contextProperties.partnerQueue).to.be.equal(
      "QUEUENAME"
    );
    expect(logSpy.args[0][1].contextProperties.subProcessId).to.be.equal(1);

    done();
  });
});

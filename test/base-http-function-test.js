'use strict';

require('dotenv').config();

const expect = require("chai").expect;
const mocha = require("mocha");
const Boom = require("@hapi/boom");
const _sinon = require("sinon");
const BlankHttpFunction = require("./mocks/blank-http-function");
const BaseHttpFunction = require("../common/baseHttpFunction");
const mongoose = require('mongoose');
const tokenLogin = require('../services/tokenLogin');

mocha.describe('Base Http Function tests', function () {

  var sinon;
  let lib;

  mocha.beforeEach(function () {
    sinon = _sinon.sandbox.create();
  });

  mocha.afterEach(function () {
    // Restore all the things made through the sandbox
    sinon.restore();
  });

  mocha.it('Test if access token is not passed', () => {
    var baseFunction = new BaseHttpFunction();
    expect(baseFunction.getAccessTokenValue()).to.be.equal(null);
  });

  mocha.it('Test if access token header is valid', () => {

    var baseFunction = new BaseHttpFunction();

    baseFunction.event = { headers: [] };
    baseFunction.event.headers["accessToken"] = "TOKEN";
    expect(baseFunction.getAccessTokenValue()).to.be.equal("TOKEN");

    baseFunction.event = { headers: [] };
    baseFunction.event.headers["AccessToken"] = "TOKEN2";
    expect(baseFunction.getAccessTokenValue()).to.be.equal("TOKEN2");

  });

  mocha.it('Test if access token querystring is valid', () => {

    var baseFunction = new BaseHttpFunction();

    baseFunction.event = { queryStringParameters: { accessToken: "TOKEN" } };
    expect(baseFunction.getAccessTokenValue()).to.be.equal("TOKEN");

    baseFunction.event = { queryStringParameters: { AccessToken: "TOKEN2" } };
    expect(baseFunction.getAccessTokenValue()).to.be.equal("TOKEN2");

  });

  mocha.it('Test if context.succeed is called', () => {

    lib = new BlankHttpFunction();
    const logSpy = sinon.spy(lib.context, "succeed");
    let data = { "anotherProperty": 1 };
    lib.finishFunction(data)

    expect(logSpy.calledOnce);
    expect(logSpy.args[0][0]).to.be.deep.equal(lib.getApiGatewayResponse(200, lib.processId, data));

  });

  mocha.it('Test callback error', () => {

    const logSpy = sinon.spy(BlankHttpFunction.prototype, "finishFunctionWithError");
    lib = new BlankHttpFunction({ contextProperties: { "processId": 0 } });
    lib.finishFunctionWithError("Error", new Error("Something wrong"));

    expect(logSpy.args[0][0]).to.be.equal("Error");
    expect((logSpy.args[0][1] instanceof Error)).to.be.true;
  });

  mocha.it('Test boom error', () => {

    const logSpy = sinon.spy(BlankHttpFunction.prototype, "finishFunctionWithError");
    lib = new BlankHttpFunction({ contextProperties: { "processId": 0 } });
    lib.finishFunctionWithError("Error", Boom.badRequest("Test Bad Request"));

    expect(logSpy.args[0][0]).to.be.equal("Error");
    expect((logSpy.args[0][1] instanceof Boom)).to.be.true;
  });

  mocha.it('Test passing wrong type of object', () => {

    const logSpy = sinon.spy(BlankHttpFunction.prototype, "finishFunctionWithError");
    lib = new BlankHttpFunction({ contextProperties: { "processId": 0 } });
    const contextSpy = sinon.spy(lib.context, "fail");
    lib.finishFunctionWithError("Error", { "some": "wrong" });

    expect(logSpy.args[0][0]).to.be.equal("Error");
    expect(contextSpy.args[0][0].statusCode).to.be.equal(500);
  });

  mocha.it('Test warmup called', (done) => {

    var callback = function (error, success) {
      expect(error).to.be.equal(null);
      expect(success).to.equal("Lambda is warm!");
      done();
    }

    lib = new BlankHttpFunction({ source: 'serverless-plugin-warmup' }, null, callback);
    lib.run();

  });

  mocha.it('Test run with customer token', (done) => {

    sinon.stub(mongoose, 'connect').withArgs(process.env.MONGO_URI).returns(new Promise(function (resolve) {
      return resolve();
    }));

    sinon.stub(mongoose.connection, 'close').returns(new Promise(function (resolve) {
      return resolve();
    }));

    sinon.stub(tokenLogin, 'getToken').returns(new Promise(function (resolve) {
      return resolve(172193417);
    }));

    const logSpy = sinon.spy(BlankHttpFunction.prototype, "getAccessTokenValue");
    lib = new BlankHttpFunction({ contextProperties: { "processId": 0 } });
    lib.event = { queryStringParameters: { accessToken: "YOUj2xqwEwiAiPt0ehDXl8MziizB2wMlIyCGhItdqmjBlzuiFsAFZLSMaG6nHKVl", signature: 172193417 } };

    lib.context.succeed = function (result) {
      expect(logSpy.getCall(0).returnValue).to.be.equal("YOUj2xqwEwiAiPt0ehDXl8MziizB2wMlIyCGhItdqmjBlzuiFsAFZLSMaG6nHKVl");
      expect(lib.event.customerId).to.be.equal(172193417);
      expect(result).to.be.not.equal(null);
      done();
    }

    lib.run("Error", { "anotherProperty": 1 })

  });

  mocha.it('Test run with no customer token', (done) => {

    sinon.stub(mongoose, 'connect').withArgs(process.env.MONGO_URI).returns(new Promise(function (resolve) {
      return resolve();
    }));

    sinon.stub(mongoose.connection, 'close').returns(new Promise(function (resolve) {
      return resolve();
    }));

    const logSpy = sinon.spy(BlankHttpFunction.prototype, "getAccessTokenValue");
    lib = new BlankHttpFunction({ contextProperties: { "processId": 0 } });

    lib.context.succeed = function (result) {
      expect(logSpy.getCall(0).returnValue).to.be.equal(null);
      expect(result).to.be.not.equal(null);
      done();
    }

    lib.run("Error", { "anotherProperty": 1 })

  });

});

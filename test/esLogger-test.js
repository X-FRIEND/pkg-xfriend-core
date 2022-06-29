const assert = require('chai').assert;
const mocha = require("mocha");
const _sinon = require("sinon");
const { EsLogger } = require('../index');
const esLogger = EsLogger({});

const esClient = require('../helpers/esClient');

mocha.describe('ES Logger tests', () => {
  mocha.setup(() => {
    _sinon.spy(esClient, 'call');
  });

  mocha.it('should return success when elastic search log info', () => {
    esLogger.info({ message: 'success' });
    assert(esClient.call.calledOnce);
  });

  mocha.it('should return success when elastic search log error', () => {
    esLogger.error({ message: 'error', error: new Error('error') });
    assert(esClient.call.calledOnce);
  });

  mocha.it('should return success when elastic search log debug', () => {
    esLogger.debug({ message: 'debug' });
    assert(esClient.call.calledOnce);
  });

  mocha.it('should return success when elastic search log silly', () => {
    esLogger.silly({ message: 'silly' });
    assert(esClient.call.calledOnce);
  });

  mocha.it('should return success when elastic search log verbose', () => {
    esLogger.verbose({ message: 'verbose' });
    assert(esClient.call.calledOnce);
  });

  mocha.it('should return success when elastic search log warn', () => {
    esLogger.warn({ message: 'warn' });
    assert(esClient.call.calledOnce);
  });

  mocha.afterEach(() => {
    esClient.call.restore();
  })
});

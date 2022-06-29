const assert = require('chai').assert;
const mocha = require("mocha");
const _sinon = require("sinon");
const { Cache } = require('../index');
const cache = Cache({});

mocha.describe('ES Logger tests', () => {
  mocha.setup(() => {
    _sinon.spy(cache, 'get');
    _sinon.spy(cache, 'set');
    _sinon.spy(cache, 'remove');
  });

  mocha.it('should return success when get cache', async () => {
    await cache.get({ message: 'success' });
    assert(cache.get.calledOnce);
  });

  mocha.it('should return success when set cache', async () => {
    await cache.set({ message: 'success' });
    assert(cache.set.calledOnce);
  });

  mocha.it('should return success when remove cache', async () => {
    await cache.remove({ message: 'success' });
    assert(cache.remove.calledOnce);
  });

  mocha.afterEach(() => {
    cache.get.restore();
    cache.set.restore();
    cache.remove.restore();
  })
});

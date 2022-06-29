const { promisify } = require("util");
const Redis = require("ioredis");
const RedisScan = require("node-redis-scan");
const logger = require("./logger");

/**
 * X-FRIEND Redis Client Wrapper
 *
 * @param {boolean} options.enabled Enable/Disable Redis
 * @param {string} options.namespace Set a prefix to all keys before save or retrieves data from redis
 * @param {string} options.urlPrimary Connection string for redis server node. Should be used if cluster option is false
 * @param {string} options.urlReadOnly Connection string for read only redis server node. Should be used if cluster option is false
 * @param {boolean} options.cluster Enable/Disable Redis as Cluster. Requires clusterNode option
 * @param {Array} options.clusterNodes A list of objects with nodes data of a cluster. Ex.: [{ host: '', port: '' }]. Requires cluster option to be true
 *
 * Other options for ioredis package can be informed in options params @see https://github.com/luin/ioredis for more information.
 */
const createRedisClient = (options) => {
  if (options.namespace) options.keyPrefix = `${options.namespace}:`;

  const clients = {};
  if (options.cluster) {
    clients.reader = new Redis.Cluster(options.clusterNodes, {
      ...options,
      redisOptions: options,
    });
    clients.writer = clients.reader;
  } else {
    clients.reader = new Redis(options.urlReadOnly, options);
    clients.writer = new Redis(options.urlPrimary, options);
  }
  clients.scanner = new RedisScan(clients.reader);

  return {
    enabled: [undefined, true, 1, "true", "1"].includes(options.enabled),
    namespace: options.keyPrefix || "",
    clients,
  };
};

class Factory {
  constructor({ enabled, namespace, clients }) {
    this.enabled = enabled;
    this.namespace = namespace;
    this.setClients(clients);
    this.setMessages();
    this.setMethods();
  }

  setClients({ reader, writer, scanner }) {
    this.reader = reader;
    this.writer = writer;
    this.scanner = scanner;
  }

  setMessages() {
    this.disabledMessage = `Redis is disabled. {method} data from key/pattern '{key}' will return null`;
    this.errorMessage = `Error on Redis {method} key '{key}': {message}`;
  }

  setMethods() {
    this.setAsync = promisify(this.writer.set).bind(this.writer);
    this.delAsync = promisify(this.writer.del).bind(this.writer);
    this.unlinkAsync = promisify(this.writer.unlink).bind(this.writer);
    this.getAsync = promisify(this.reader.get).bind(this.reader);
    this.scanAsync = promisify(this.scanner.scan).bind(this.scanner);
    this.keysAsync = promisify(this.reader.keys).bind(this.reader);
  }

  get(key, ...args) {
    const method = "GET";
    if (!this.enabled) {
      logger.info({
        message: this.disabledMessage
          .replace("{method}", method)
          .replace("{key}", key),
      });
      return Promise.resolve(null);
    }
    try {
      return this.getAsync(key, ...args);
    } catch (error) {
      logger.error({
        message: this.errorMessage
          .replace("{method}", method)
          .replace("{key}", key)
          .replace("{message}", error.message),
      });
      throw error;
    }
  }

  set(key, value, ...args) {
    const method = "SET";
    if (!this.enabled) {
      logger.info({
        message: this.disabledMessage
          .replace("{method}", method)
          .replace("{key}", key),
      });
      return Promise.resolve(null);
    }
    try {
      return this.setAsync(key, value, ...args);
    } catch (error) {
      logger.error({
        message: this.errorMessage
          .replace("{method}", method)
          .replace("{key}", key)
          .replace("{message}", error.message),
      });
      throw error;
    }
  }

  del(key) {
    const method = "DEL";
    if (!this.enabled) {
      logger.info({
        message: this.disabledMessage
          .replace("{method}", method)
          .replace("{key}", key),
      });
      return Promise.resolve(null);
    }
    try {
      return this.delAsync(key);
    } catch (error) {
      logger.error({
        message: this.errorMessage
          .replace("{method}", method)
          .replace("{key}", key)
          .replace("{message}", error.message),
      });
      throw error;
    }
  }

  scan(pattern, options = {}) {
    const method = "SCAN";
    if (!this.enabled) {
      logger.info({
        message: this.disabledMessage
          .replace("{method}", method)
          .replace("{key}", pattern),
      });
      return Promise.resolve(null);
    }
    try {
      return this.scanAsync(`${this.namespace}${pattern}`, options);
    } catch (error) {
      logger.error({
        message: this.errorMessage
          .replace("{method}", method)
          .replace("{key}", pattern)
          .replace("{message}", error.message),
      });
      throw error;
    }
  }

  unlink(key) {
    const method = "UNLINK";
    if (!this.enabled) {
      logger.info({
        message: this.disabledMessage
          .replace("{method}", method)
          .replace("{key}", key),
      });
      return Promise.resolve(null);
    }
    try {
      return this.unlinkAsync(key);
    } catch (error) {
      logger.error({
        message: this.errorMessage
          .replace("{method}", method)
          .replace("{key}", key)
          .replace("{message}", error.message),
      });
      throw error;
    }
  }

  deletePattern(pattern, options = {}) {
    const method = "DEL_PATTERN";
    if (!this.enabled) {
      logger.info({
        message: this.disabledMessage
          .replace("{method}", method)
          .replace("{key}", pattern),
      });
      return Promise.resolve(null);
    }
    try {
      let patternList;
      if (Array.isArray(pattern)) {
        patternList = pattern;
      } else if (typeof pattern === "string") {
        patternList = [pattern];
      } else {
        throw new Error("Invalid pattern");
      }
      return Promise.all(
        patternList.map((el) =>
          this.scanAsync(`${this.namespace}${el}`, options)
        )
      ).then((data) => {
        data
          .reduce((acc, el) => [...acc, ...el], [])
          .map((el) => this.unlink(el.replace(this.namespace, "")));
      });
    } catch (error) {
      logger.error({
        message: this.errorMessage
          .replace("{method}", method)
          .replace("{key}", pattern)
          .replace("{message}", error.message),
      });
      throw error;
    }
  }
}

module.exports = (options) => new Factory(createRedisClient(options));

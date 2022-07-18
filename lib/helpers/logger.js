"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const loggerHandler_1 = require("./loggerHandler");
const winstonLogConsole_1 = __importDefault(require("./winstonLogConsole"));
const error = (log) => winstonLogConsole_1.default.error(typeof log === 'string' ? log : (0, loggerHandler_1.loggerHandler)(log));
const warn = (log) => winstonLogConsole_1.default.warn(typeof log === 'string' ? log : (0, loggerHandler_1.loggerHandler)(log));
const info = (log) => winstonLogConsole_1.default.info(typeof log === 'string' ? log : (0, loggerHandler_1.loggerHandler)(log));
const verbose = (log) => winstonLogConsole_1.default.verbose(typeof log === 'string' ? log : (0, loggerHandler_1.loggerHandler)(log));
const debug = (log) => winstonLogConsole_1.default.debug(typeof log === 'string' ? log : (0, loggerHandler_1.loggerHandler)(log));
exports.default = {
    error,
    warn,
    info,
    verbose,
    debug,
};

import { loggerHandler, LogT } from "./loggerHandler";
import winstonLogConsole from "./winstonLogConsole";

const error = (log: LogT | string) => winstonLogConsole.error(typeof log === 'string' ? log : loggerHandler(log));

const warn = (log: LogT | string) => winstonLogConsole.warn(typeof log === 'string' ? log : loggerHandler(log));

const info = (log: LogT  | string) => winstonLogConsole.info(typeof log === 'string' ? log : loggerHandler(log));

const verbose = (log: LogT  | string) => winstonLogConsole.verbose(typeof log === 'string' ? log : loggerHandler(log));

const debug = (log: LogT  | string) => winstonLogConsole.debug(typeof log === 'string' ? log : loggerHandler(log));

export default {
  error,
  warn,
  info,
  verbose,
  debug,
};

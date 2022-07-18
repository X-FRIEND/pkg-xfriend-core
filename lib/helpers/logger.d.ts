import { LogT } from "./loggerHandler";
declare const _default: {
    error: (log: string | LogT) => import("winston").Logger;
    warn: (log: string | LogT) => import("winston").Logger;
    info: (log: string | LogT) => import("winston").Logger;
    verbose: (log: string | LogT) => import("winston").Logger;
    debug: (log: string | LogT) => import("winston").Logger;
};
export default _default;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizeProperties = void 0;
const normalizeProperties = (obj, ignoredKeys) => {
    if (!obj)
        return null;
    const objParams = obj;
    const keys = Object.keys(obj);
    const validKeys = keys.filter((key) => !ignoredKeys.includes(key.toLowerCase()));
    return validKeys.reduce((acc, key) => {
        const keyLower = key.toLowerCase();
        const value = objParams[key];
        acc[keyLower] = value;
        return acc;
    }, {});
};
exports.normalizeProperties = normalizeProperties;

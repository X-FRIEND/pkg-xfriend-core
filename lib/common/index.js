"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.common = void 0;
const getProperty_1 = require("./getProperty");
const normalizeProperties_1 = require("./normalizeProperties");
const removeEmptyFields_1 = require("./removeEmptyFields");
exports.common = {
    removeEmptyFields: removeEmptyFields_1.removeEmptyFields,
    getProperty: getProperty_1.prop,
    normalizeProperties: normalizeProperties_1.normalizeProperties,
};

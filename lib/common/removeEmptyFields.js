"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeEmptyFields = void 0;
const removeEmptyFields = (data, removeListener = []) => {
    const removeFieldsList = [
        ...removeListener,
        {},
        [],
        "{}",
        '"{}"',
        "[]",
        '"[]"',
        "null",
        '"null"',
    ];
    const obj = data;
    return Object.keys(data).reduce((acc, key) => {
        const value = obj[key];
        if (value && !removeFieldsList.includes(JSON.stringify(value))) {
            acc[key] = obj[key];
        }
        return acc;
    }, {});
};
exports.removeEmptyFields = removeEmptyFields;

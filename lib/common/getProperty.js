"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prop = void 0;
const get = (obj, prop, ...props) => {
    if (!Object.keys(obj).length) {
        return null;
    }
    const index = prop;
    const val = obj[index];
    if (!props.length || !val) {
        return val;
    }
    return get(val, props[0], ...props.slice(1));
};
const propertyPathToArray = (path = "") => path.replace(/\[/g, ".").replace(/\]/g, "").split(".");
const prop = (path, obj) => {
    const getProperty = [...propertyPathToArray(path)];
    return get(obj, getProperty[0], ...getProperty.slice(1));
};
exports.prop = prop;

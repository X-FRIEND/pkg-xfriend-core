export type ObjT = {
  [key: string]: unknown;
} & object

export type GetT = (obj: ObjT, prop: unknown, props?: Array<string> | string) => string | unknown;

export type PropertyPathToArrayT = (path: string) => Array<string>;

export type PropT = (path: string, obj: object) => string | unknown;

const get: GetT = (obj, prop, ...props) => {
  if (!Object.keys(obj).length) {
    return null;
  }
  
  const index = prop as string; 
  const val = obj[index];

  if (!props.length || !val) {
    return val;
  }

  
  return get(val as ObjT, props[0], ...props.slice(1));
};

const propertyPathToArray: PropertyPathToArrayT = (path = "") =>
  path.replace(/\[/g, ".").replace(/\]/g, "").split(".");

export const prop: PropT = (path, obj) => { 
  
  const getProperty = [...propertyPathToArray(path)]

  return get(obj as ObjT, getProperty[0], ...getProperty.slice(1));
};

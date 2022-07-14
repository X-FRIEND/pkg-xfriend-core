export type ObjT = {
  [key: string]: string | number | unknown;
};

export type NormalizePropertiesT = (data: object, ignoredKeys: Array<string>) => object | null;

export const normalizeProperties: NormalizePropertiesT = (obj, ignoredKeys) => {
  if (!obj) return null;

  const  objParams  = obj as ObjT;

  const keys = Object.keys(obj);

  const validKeys = keys.filter(
    (key) => !ignoredKeys.includes(key.toLowerCase())
  );

  return validKeys.reduce((acc, key) => {
    const keyLower = key.toLowerCase();
    const value = objParams[key];
    acc[keyLower] = value;
    return acc;
  }, {} as ObjT);
};

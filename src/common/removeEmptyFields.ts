
export type ObjT = {
  [key: string]: string | number | boolean | null | undefined;
}

export type RemoveEmptyFieldsT = (data: object, removeListener?: Array<string>) => object;

export const removeEmptyFields: RemoveEmptyFieldsT = (data, removeListener = []) => {
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
  ]
  const obj = data as ObjT;
  return Object.keys(data).reduce((acc, key) => {
    const value = obj[key];
    if (value && !removeFieldsList.includes(JSON.stringify(value))) {
      acc[key] = obj[key];
    }
    return acc;
  }, {} as ObjT);
};

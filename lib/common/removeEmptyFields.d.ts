export declare type ObjT = {
    [key: string]: string | number | boolean | null | undefined;
};
export declare type RemoveEmptyFieldsT = (data: object, removeListener?: Array<string>) => object;
export declare const removeEmptyFields: RemoveEmptyFieldsT;

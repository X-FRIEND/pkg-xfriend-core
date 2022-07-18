export declare type ObjT = {
    [key: string]: string | number | unknown;
};
export declare type NormalizePropertiesT = (data: object, ignoredKeys: Array<string>) => object | null;
export declare const normalizeProperties: NormalizePropertiesT;

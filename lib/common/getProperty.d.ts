export declare type ObjT = {
    [key: string]: unknown;
} & object;
export declare type GetT = (obj: ObjT, prop: unknown, props?: Array<string> | string) => string | unknown;
export declare type PropertyPathToArrayT = (path: string) => Array<string>;
export declare type PropT = (path: string, obj: object) => string | unknown;
export declare const prop: PropT;

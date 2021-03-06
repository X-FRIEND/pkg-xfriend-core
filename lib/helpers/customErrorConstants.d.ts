declare const _default: {
    StatusCode: {
        readonly OK: 200;
        readonly Created: 201;
        readonly Accepted: 202;
        readonly NonAuthoritativeInformation: 203;
        readonly NoContent: 204;
        readonly ResetContent: 205;
        readonly PartialContent: 206;
        readonly MultiStatus: 207;
        readonly AlreadyReported: 208;
        readonly IMUsed: 226;
        readonly MultipleChoices: 300;
        readonly MovedPermanently: 301;
        readonly Found: 302;
        readonly SeeOther: 303;
        readonly NotModified: 304;
        readonly UseProxy: 305;
        readonly TemporaryRedirect: 307;
        readonly PermanentRedirect: 308;
        readonly BadRequest: 400;
        readonly Unauthorized: 401;
        readonly PaymentRequired: 402;
        readonly Forbidden: 403;
        readonly NotFound: 404;
        readonly MethodNotAllowed: 405;
        readonly NotAcceptable: 406;
        readonly ProxyAuthenticationRequired: 407;
        readonly RequestTimeout: 408;
        readonly Conflict: 409;
        readonly Gone: 410;
        readonly LengthRequired: 411;
        readonly PreconditionFailed: 412;
        readonly PayloadTooLarge: 413;
        readonly URITooLong: 414;
        readonly UnsupportedMediaType: 415;
        readonly RangeNotSatisfiable: 416;
        readonly ExpectationFailed: 417;
        readonly MisdirectedRequest: 421;
        readonly UnprocessableEntity: 422;
        readonly Locked: 423;
        readonly FailedDependency: 424;
        readonly TooEarly: 425;
        readonly UpgradeRequired: 426;
        readonly PreconditionRequired: 428;
        readonly TooManyRequests: 429;
        readonly RequestHeaderFieldsTooLarge: 431;
        readonly UnavailableForLegalReasons: 451;
        readonly InternalServerError: 500;
        readonly NotImplemented: 501;
        readonly BadGateway: 502;
        readonly ServiceUnavailable: 503;
        readonly GatewayTimeout: 504;
        readonly HTTPVersionNotSupported: 505;
        readonly VariantAlsoNegotiates: 506;
        readonly InsufficientStorage: 507;
        readonly LoopDetected: 508;
        readonly NotExtended: 510;
        readonly NetworkAuthenticationRequired: 511;
    };
    ErrorType: Readonly<{
        BadRequest: string;
        Unauthorized: string;
        PaymentRequired: string;
        Forbidden: string;
        NotFound: string;
        MethodNotAllowed: string;
        NotAcceptable: string;
        ProxyAuthenticationRequired: string;
        RequestTimeout: string;
        Conflict: string;
        Gone: string;
        LengthRequired: string;
        PreconditionFailed: string;
        PayloadTooLarge: string;
        URITooLong: string;
        UnsupportedMediaType: string;
        RangeNotSatisfiable: string;
        ExpectationFailed: string;
        MisdirectedRequest: string;
        UnprocessableEntity: string;
        Locked: string;
        FailedDependency: string;
        TooEarly: string;
        UpgradeRequired: string;
        PreconditionRequired: string;
        TooManyRequests: string;
        RequestHeaderFieldsTooLarge: string;
        UnavailableForLegalReasons: string;
        InternalServerError: string;
        NotImplemented: string;
        BadGateway: string;
        ServiceUnavailable: string;
        GatewayTimeout: string;
        HTTPVersionNotSupported: string;
        VariantAlsoNegotiates: string;
        InsufficientStorage: string;
        LoopDetected: string;
        NotExtended: string;
        NetworkAuthenticationRequired: string;
        GenericError: string;
        ParseError: string;
        ResourceEmpty: string;
        ResourceUnavailable: string;
        TimeOut: string;
    }>;
    GenericErrorMessage: string;
    DefaultErrorType: Map<number, string>;
};
export default _default;

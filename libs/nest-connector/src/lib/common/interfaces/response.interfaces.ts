import { HttpClientErrorStatus, HttpServerErrorStatus, HttpSuccessStatus } from "../enums";
import { ErrorResponseCode, HttpStatus, ResponseCode, SuccessResponseCode } from "../types";

export interface HttpResponse {
    statusCode: HttpStatus;
    code: ResponseCode;
    message: string;
    description?: string;
}

// noinspection JSUnusedGlobalSymbols
export interface SuccessResponse extends HttpResponse {
    statusCode: HttpSuccessStatus;
    code: SuccessResponseCode;
}

export interface ErrorResponse extends HttpResponse {
    statusCode: HttpClientErrorStatus | HttpServerErrorStatus;
    code: ErrorResponseCode;
}

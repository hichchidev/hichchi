import { HttpClientErrorStatus, HttpServerErrorStatus, HttpSuccessStatus } from "../enums";
import { HttpStatus } from "../types";

export interface HttpResponse {
    statusCode: HttpStatus;
    code: string;
    message: string;
    description?: string;
}

// noinspection JSUnusedGlobalSymbols
export interface SuccessResponse extends HttpResponse {
    statusCode: HttpSuccessStatus;
}

export interface ErrorResponse extends HttpResponse {
    statusCode: HttpClientErrorStatus | HttpServerErrorStatus;
}

// noinspection JSUnusedGlobalSymbols

import { HttpSuccessStatus } from "../enums";
import { SuccessResponses } from "../responses";
import { SuccessResponse } from "../interfaces";
import { LooseAutocomplete } from "@hichchi/utils";
import { AuthSuccessResponseCode } from "../../auth";

export class SuccessResponseDto implements SuccessResponse {
    statusCode: HttpSuccessStatus;

    code: LooseAutocomplete<AuthSuccessResponseCode>;

    message: string;

    description?: string;

    constructor(message?: string, code?: string, status?: HttpSuccessStatus, description?: string);

    constructor(response: SuccessResponse);

    constructor(
        responseOrMessage?: string | SuccessResponse,
        code?: string,
        status?: HttpSuccessStatus,
        description?: string,
    ) {
        if (typeof responseOrMessage === "string") {
            this.code = code || "SUCCESS";
            this.message = responseOrMessage || SuccessResponses.SUCCESS.message;
            this.statusCode = status || SuccessResponses.SUCCESS.statusCode;
            this.description = description || SuccessResponses.SUCCESS.description;
        } else {
            this.code = responseOrMessage?.code || "SUCCESS";
            this.message = responseOrMessage?.message || SuccessResponses.SUCCESS.message;
            this.statusCode = responseOrMessage?.statusCode || SuccessResponses.SUCCESS.statusCode;
            this.description = responseOrMessage?.description || SuccessResponses.SUCCESS.description;
        }
    }
}

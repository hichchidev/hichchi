// noinspection JSUnusedGlobalSymbols

import { IsArray, IsNotEmpty, IsUUID } from "class-validator";
import { Errors } from "../responses";
import { toErrString } from "../converters";

export class BulkDeleteDto {
    @IsUUID(4, { each: true, message: toErrString(Errors.E_400_INVALID_UUID).message })
    @IsArray(toErrString(Errors.E_400_NOT_ID_ARRAY))
    @IsNotEmpty(toErrString(Errors.E_400_EMPTY_IDS))
    ids: string[];
}

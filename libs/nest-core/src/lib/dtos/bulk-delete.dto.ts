// noinspection JSUnusedGlobalSymbols

import { IsArray, IsNotEmpty, IsUUID } from "class-validator";
import { toErrString } from "../converters";
import { BulkDeleteDto as IBulkDeleteDto, EntityId } from "@hichchi/nest-connector/crud";
import { Errors } from "@hichchi/nest-connector";

export class BulkDeleteDto implements IBulkDeleteDto {
    @IsUUID(4, { each: true, message: toErrString(Errors.E_400_INVALID_UUID).message })
    @IsArray(toErrString(Errors.E_400_NOT_ID_ARRAY))
    @IsNotEmpty(toErrString(Errors.E_400_EMPTY_IDS))
    ids: EntityId[];
}

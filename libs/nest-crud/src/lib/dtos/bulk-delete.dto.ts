// noinspection JSUnusedGlobalSymbols

import { IsArray, IsNotEmpty, IsUUID } from "class-validator";
import { EntityId } from "@hichchi/nest-connector/crud";
import { Dto } from "@hichchi/nest-core";
import { BulkDeleteBody } from "@hichchi/nest-connector/auth";
import { DEFAULT_UUID_VERSION } from "@hichchi/nest-connector";

@Dto()
export class BulkDeleteDto implements BulkDeleteBody {
    @IsUUID(DEFAULT_UUID_VERSION)
    @IsArray()
    @IsNotEmpty()
    ids: EntityId[];
}

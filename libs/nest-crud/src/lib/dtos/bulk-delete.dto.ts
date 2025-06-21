// noinspection JSUnusedGlobalSymbols

import { IsArray, IsNotEmpty, IsUUID } from "class-validator";
import { EntityId } from "@hichchi/nest-connector/crud";
import { Dto } from "@hichchi/nest-core";
import { BulkDeleteBody } from "@hichchi/nest-connector/auth";

@Dto()
export class BulkDeleteDto implements BulkDeleteBody {
    @IsUUID(4)
    @IsArray()
    @IsNotEmpty()
    ids: EntityId[];
}

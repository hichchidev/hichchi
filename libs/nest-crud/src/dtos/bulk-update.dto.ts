// noinspection JSUnusedGlobalSymbols

import { IsArray, IsNotEmpty, IsUUID } from "class-validator";
import { EntityDeepPartial, EntityId } from "@hichchi/nest-connector/crud";
import { Dto } from "@hichchi/nest-core";
import { BulkUpdateBody } from "@hichchi/nest-connector/auth";
import { DEFAULT_UUID_VERSION } from "@hichchi/nest-connector";

@Dto()
export class BulkUpdateDto<Entity> implements BulkUpdateBody<Entity> {
    @IsUUID(DEFAULT_UUID_VERSION, { each: true })
    @IsArray()
    @IsNotEmpty()
    ids: EntityId[];

    @IsNotEmpty()
    dto: EntityDeepPartial<Entity>;
}

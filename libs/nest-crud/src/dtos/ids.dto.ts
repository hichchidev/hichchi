// noinspection JSUnusedGlobalSymbols

import { IsArray, IsNotEmpty, IsUUID } from "class-validator";
import { EntityId } from "@hichchi/nest-connector/crud";
import { Dto } from "@hichchi/nest-core";
import { IdsBody } from "@hichchi/nest-connector/auth";
import { DEFAULT_UUID_VERSION } from "@hichchi/nest-connector";

@Dto()
export class IdsDto implements IdsBody {
    @IsUUID(DEFAULT_UUID_VERSION, { each: true })
    @IsArray()
    @IsNotEmpty()
    ids: EntityId[];
}

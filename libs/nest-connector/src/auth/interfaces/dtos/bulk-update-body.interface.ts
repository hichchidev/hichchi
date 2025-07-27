import { EntityDeepPartial, EntityId } from "../../../crud/types";

export interface BulkUpdateBody<T> {
    ids: EntityId[];
    dto: EntityDeepPartial<T>;
}

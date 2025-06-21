import { EntityId } from "../../../crud/types";

export interface BulkDeleteBody {
    ids: EntityId[];
}

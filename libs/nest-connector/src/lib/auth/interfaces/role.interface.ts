import { EntityId } from "../../crud/types";

export interface Role {
    id: EntityId;
    name: string;
    permissions: string[];
    priority?: number;
}

// noinspection ES6PreferShortImport
import { User } from "../../common/user-entity.interface";
import { EntityId } from "../types";

export interface Model {
    id: EntityId;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date | null;
    createdById?: string | null;
    createdBy?: User | null;
    updatedById?: string | null;
    updatedBy?: User | null;
    deletedById?: string | null;
    deletedBy?: User | null;
}

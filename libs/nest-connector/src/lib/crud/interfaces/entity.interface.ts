// noinspection ES6PreferShortImport
import { UserInfo } from "../../common/user-entity.interface";
import { EntityId } from "../types";

export interface Model {
    id: EntityId;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date | null;
    createdById?: string | null;
    createdBy?: UserInfo | null;
    updatedById?: string | null;
    updatedBy?: UserInfo | null;
    deletedById?: string | null;
    deletedBy?: UserInfo | null;
}

export interface ModelExtension {
    id: EntityId;
}

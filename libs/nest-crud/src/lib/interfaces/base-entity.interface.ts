import { IByUser } from "@hichchi/nest-core";

export interface IBaseEntity {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date | null;
    createdById?: string | null;
    createdBy?: IByUser | null;
    updatedById?: string | null;
    updatedBy?: IByUser | null;
    deletedById?: string | null;
    deletedBy?: IByUser | null;
}

import { IUserEntity } from "@hichchi/nest-core";

export interface IBaseEntity {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date | null;
    createdById?: string | null;
    createdBy?: IUserEntity | null;
    updatedById?: string | null;
    updatedBy?: IUserEntity | null;
    deletedById?: string | null;
    deletedBy?: IUserEntity | null;
}

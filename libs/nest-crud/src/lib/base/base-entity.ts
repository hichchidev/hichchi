import { AfterLoad, Column, DeleteDateColumn, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { IUserEntity } from "@hichchi/nest-core";
import { IBaseEntity } from "../interfaces";

export const BaseEntityTemplateRelations = ["createdBy", "updatedBy", "deletedBy"];

export class BaseEntity implements IBaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ nullable: false, default: () => "CURRENT_TIMESTAMP" })
    createdAt: Date;

    @Column({ nullable: false, default: () => "CURRENT_TIMESTAMP" })
    updatedAt: Date;

    @DeleteDateColumn({ type: "timestamp" })
    deletedAt?: Date;

    @Column({ nullable: true })
    createdById?: string;

    @ManyToOne("users")
    @JoinColumn()
    createdBy?: IUserEntity;

    @Column({ nullable: true })
    updatedById?: string;

    @ManyToOne("users")
    @JoinColumn()
    updatedBy?: IUserEntity;

    @Column({ nullable: true })
    deletedById?: string;

    @ManyToOne("users")
    @JoinColumn()
    deletedBy?: IUserEntity;

    @AfterLoad()
    afterLoad?(): void {
        if (this.createdBy) {
            this.createdBy = this.#mapUserEntity(this.createdBy);
        }
        if (this.updatedBy) {
            this.updatedBy = this.#mapUserEntity(this.updatedBy);
        }
        if (this.deletedBy) {
            this.deletedBy = this.#mapUserEntity(this.deletedBy);
        }
    }

    #mapUserEntity(user: IUserEntity): IUserEntity {
        return {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            fullName: user.fullName,
        };
    }
}

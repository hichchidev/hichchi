import { AfterLoad, Column, DeleteDateColumn, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserInfo } from "@hichchi/nest-connector";
import { EntityId, Model } from "@hichchi/nest-connector/crud";

export const BaseEntityTemplateRelations = ["createdBy", "updatedBy", "deletedBy"];

export class BaseEntity implements Model {
    @PrimaryGeneratedColumn("uuid")
    id: EntityId;

    @Column({ nullable: false, default: () => "CURRENT_TIMESTAMP" })
    createdAt: Date;

    @Column({ nullable: false, default: () => "CURRENT_TIMESTAMP" })
    updatedAt: Date;

    @DeleteDateColumn({ type: "timestamp" })
    deletedAt?: Date;

    @Column({ nullable: true })
    createdById?: EntityId;

    @ManyToOne("users")
    @JoinColumn()
    createdBy?: UserInfo;

    @Column({ nullable: true })
    updatedById?: EntityId;

    @ManyToOne("users")
    @JoinColumn()
    updatedBy?: UserInfo;

    @Column({ nullable: true })
    deletedById?: EntityId;

    @ManyToOne("users")
    @JoinColumn()
    deletedBy?: UserInfo;

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

    #mapUserEntity(user: UserInfo): UserInfo {
        return {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            fullName: user.fullName,
        };
    }
}

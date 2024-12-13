import { BeforeInsert, BeforeUpdate, Column } from "typeorm";
import { BaseEntity } from "./base-entity";
import { IUserEntity } from "@hichchi/nest-core";

export class HichchiUserEntity extends BaseEntity implements IUserEntity {
    @Column({ nullable: false })
    firstName: string;

    @Column({ nullable: false })
    lastName: string;

    @Column({ nullable: false })
    fullName: string;

    @BeforeInsert()
    @BeforeUpdate()
    beforeInsert?(): void {
        this.fullName = `${this.firstName} ${this.lastName}`;
    }
}

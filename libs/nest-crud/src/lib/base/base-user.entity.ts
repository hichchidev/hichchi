import { BeforeInsert, BeforeUpdate, Column } from "typeorm";
import { BaseEntity } from "./base-entity";
import { User } from "@hichchi/nest-connector";

export class HichchiUserEntity extends BaseEntity implements User {
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

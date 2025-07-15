import { Column, OneToOne } from "typeorm";
import { BaseEntityExtension, HichchiEntityExtension, HichchiJoinColumn } from "@hichchi/nest-crud";
import { EntityId } from "@hichchi/nest-connector/crud";
import { AppEntity } from "../../core/enums";
import { UserEntity } from "./user.entity";
import { Address } from "../interfaces";

@HichchiEntityExtension(AppEntity.ADDRESSES)
export class AddressEntity extends BaseEntityExtension implements Address {
    @Column({ type: "varchar", nullable: true })
    street: string | null;

    @Column({ type: "varchar", nullable: true })
    city: string | null;

    @Column({ type: "varchar", nullable: true })
    state: string | null;

    @Column({ type: "varchar", nullable: true })
    zip: string | null;

    @Column({ type: "varchar", nullable: true })
    country: string | null;

    @OneToOne(() => UserEntity, user => user.address)
    @HichchiJoinColumn()
    user: UserEntity | null;

    @Column({ nullable: true })
    userId: EntityId | null;
}

import { BaseEntityExtension, HichchiEntityExtension, HichchiJoinColumn } from "@hichchi/nest-crud";
import { Column, OneToOne } from "typeorm";
import { UserEntity } from "./user.entity";

@HichchiEntityExtension("address")
export class AddressEntity extends BaseEntityExtension {
    @Column()
    street: string;

    @Column()
    city: string;

    @Column()
    state: string;

    @Column()
    zipCode: string;

    @Column()
    country: string;

    @OneToOne(() => UserEntity)
    @HichchiJoinColumn()
    user: UserEntity;
}

import { BaseEntity, HichchiEntity } from "@hichchi/nest-crud";
import { Column } from "typeorm";

@HichchiEntity("address")
export class AddressEntity extends BaseEntity {
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
}

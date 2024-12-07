import { HichchiEntity, HichchiUserEntity, USER_ENTITY_TABLE_NAME } from "@hichchi/nest-crud";
import { Column } from "typeorm";

@HichchiEntity(USER_ENTITY_TABLE_NAME, ["email"])
export class UserEntity extends HichchiUserEntity {
    @Column()
    email: string;
}

import { IViewDto } from "@hichchi/nest-core";
import { User } from "@hichchi/nest-connector/auth";

export class ViewUserDto implements IViewDto {
    formatDataSet(user: User): User {
        return user;
    }
}

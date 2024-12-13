import { IViewDto } from "@hichchi/nest-core";
import { IAuthUserEntity } from "../interfaces";

export class ViewDto implements IViewDto {
    formatDataSet(user: IAuthUserEntity): IAuthUserEntity {
        return user;
    }
}

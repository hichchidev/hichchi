import { Injectable } from "@nestjs/common";
import { UserEntity } from "../entities";
import { CrudService } from "@hichchi/nest-crud";
import { UserRepository } from "../repositories";

@Injectable()
export class UserService extends CrudService<UserEntity> {
    constructor(readonly userRepository: UserRepository) {
        super(userRepository);
    }
}

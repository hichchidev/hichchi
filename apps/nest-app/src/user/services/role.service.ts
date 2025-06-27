import { CrudService } from "@hichchi/nest-crud";
import { RoleEntity } from "../entities";
import { RoleRepository } from "../repositories";
import { Injectable } from "@nestjs/common";

@Injectable()
export class RoleService extends CrudService<RoleEntity> {
    constructor(readonly repository: RoleRepository) {
        super(repository);
    }
}

import { BaseRepository, HichchiRepository, Repository, InjectRepository } from "@hichchi/nest-crud";
import { RoleEntity } from "../entities";

@HichchiRepository(RoleEntity)
export class RoleRepository extends BaseRepository<RoleEntity> {
    constructor(@InjectRepository(RoleEntity) repository: Repository<RoleEntity>) {
        super(repository);
    }
}

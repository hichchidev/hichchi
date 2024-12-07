import { UserEntity } from "../entities";
import { BaseRepository, HichchiRepository, Repository, InjectRepository } from "@hichchi/nest-crud";

@HichchiRepository(UserEntity)
export class UserRepository extends BaseRepository<UserEntity> {
    constructor(@InjectRepository(UserEntity) repository: Repository<UserEntity>) {
        super(repository);
    }
}

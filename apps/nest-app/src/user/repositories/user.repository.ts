import { UserEntity } from "../entities";
import { BaseRepository, HichchiRepository, Repository, InjectRepository } from "@hichchi/nest-crud";

@HichchiRepository(UserEntity)
/**
 * Repository wrapper for user-specific data access operations.
 */
export class UserRepository extends BaseRepository<UserEntity> {
    constructor(@InjectRepository(UserEntity) repository: Repository<UserEntity>) {
        super(repository);
    }

    async test(): Promise<UserEntity[]> {
        const [suppliers] = await this.getMany({ where: { role: { name: "admin" } } });
        return suppliers;
    }
}

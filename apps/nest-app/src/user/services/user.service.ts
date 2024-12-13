import { Injectable, Logger } from "@nestjs/common";
import { CrudService } from "@hichchi/nest-crud";
import { GoogleProfile, IAuthUserEntity, IUserService, RegType } from "@hichchi/nest-auth";
import { UserEntity } from "../entities";
import { UserRepository } from "../repositories";
import { RegisterUserDto } from "../dto";

@Injectable()
export class UserService extends CrudService<UserEntity> implements IUserService {
    constructor(readonly userRepository: UserRepository) {
        super(userRepository);
    }

    getUserById(id: string): Promise<IAuthUserEntity | null> {
        return this.userRepository.get(id);
    }

    getUserByEmail(email: string): Promise<UserEntity | null> {
        return this.userRepository.getOne({ where: { email } });
    }

    getUserByAuthField(authFieldValue: string): Promise<UserEntity | null> {
        return this.userRepository.getOne({ where: { id: authFieldValue } });
    }

    getUserByUsername(username: string): Promise<UserEntity | null> {
        return this.userRepository.getOne({ where: { username } });
    }

    getUserByUsernameOrEmail(username: string): Promise<UserEntity | null> {
        return this.userRepository.getOne({ where: [{ username }, { email: username }] });
    }

    sendPasswordResetEmail(email: string, token: string | number): Promise<boolean> {
        Logger.log(`Sending password reset email to ${email} with token: ${token}`);
        return Promise.resolve(false);
    }

    sendVerificationEmail(userId: string | number, token: string | number): Promise<boolean> {
        Logger.log(`Sending verification email to user with id: ${userId} with token: ${token}`);
        return Promise.resolve(false);
    }

    registerUser(userDto: RegisterUserDto, regType: RegType, profileData?: GoogleProfile): Promise<IAuthUserEntity> {
        return this.userRepository.saveAndGet({ ...userDto, regType, profileData });
    }

    updateUserById(id: string, userDto: Partial<IAuthUserEntity>): Promise<IAuthUserEntity> {
        return this.userRepository.updateAndGet(id, { password: userDto.password });
    }
}

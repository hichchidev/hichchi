import { CrudService } from "@hichchi/nest-crud";
import { GoogleProfile, IUserService, SignUpDto } from "@hichchi/nest-auth";
import { AuthProvider, VerifyToken } from "@hichchi/nest-connector/auth";
import { UserRepository } from "../repositories";
import { EntityId } from "@hichchi/nest-connector/crud";
import { LoggerService } from "@hichchi/nest-core";
import { Injectable } from "@nestjs/common";
import { User } from "../interfaces";

@Injectable()
export class UserService extends CrudService<User> implements IUserService {
    constructor(readonly userRepository: UserRepository) {
        super(userRepository);
    }

    getUserById(id: EntityId): Promise<User | null> {
        return this.get(id);
    }

    getUserByEmail(email: string): Promise<User | null> {
        return this.getOne({ where: { email } });
    }

    getUserByAuthField(authFieldValue: EntityId): Promise<User | null> {
        return this.getOne({ where: { id: authFieldValue } });
    }

    // getUserByUsername(username: string): Promise<User | null> {
    //     return this.getOne({ where: { username } });
    // }

    // getUserByUsernameOrEmail(username: string): Promise<User | null> {
    //     return this.getOne({ where: [{ username }, { email: username }] });
    // }

    sendPasswordResetEmail(email: string, token: VerifyToken): Promise<boolean> {
        LoggerService.log(`Sending password reset email to ${email} with token: ${token}`);
        return Promise.resolve(false);
    }

    sendVerificationEmail(userId: EntityId, token: VerifyToken): Promise<boolean> {
        LoggerService.log(`Sending verification email to user with id: ${userId} with token: ${token}`);
        return Promise.resolve(false);
    }

    signUpUser(userDto: SignUpDto, signUpType: AuthProvider, profileData?: GoogleProfile): Promise<User | null> {
        return this.save({ ...userDto, signUpType, profileData });
    }

    updateUserById(id: EntityId, userDto: Partial<User>): Promise<User> {
        return this.update(id, { password: userDto.password });
    }
}

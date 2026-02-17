import { CrudService } from "@hichchi/nest-crud";
import { IUserService, SignUpDto } from "@hichchi/nest-auth";
import { AuthProvider, GoogleProfile, VerifyToken } from "@hichchi/nest-connector/auth";
import { UserRepository } from "../repositories";
import { EntityId } from "@hichchi/nest-connector/crud";
import { LoggerService } from "@hichchi/nest-core";
import { Injectable } from "@nestjs/common";
import { User } from "../interfaces";

@Injectable()
/**
 * User domain service that bridges auth flows and CRUD operations.
 */
export class UserService extends CrudService<User> implements IUserService {
    constructor(readonly userRepository: UserRepository) {
        super(userRepository);
    }

    async getUserById(id: EntityId): Promise<User | null> {
        try {
            return await this.get(id, {
                relations: ["role", "createdBy", "updatedBy", "deletedBy"],
            });
        } catch {
            return null;
        }
    }

    async getUserByEmail(email: string): Promise<User | null> {
        try {
            return await this.getOne({ where: { email }, relations: ["role", "createdBy", "updatedBy", "deletedBy"] });
        } catch {
            return null;
        }
    }

    async getUserByAuthField(authFieldValue: EntityId): Promise<User | null> {
        try {
            return await this.getOne({
                where: { id: authFieldValue },
                relations: ["role", "createdBy", "updatedBy", "deletedBy"],
            });
        } catch {
            return null;
        }
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

    async signUpUser(userDto: SignUpDto, signUpType: AuthProvider, profileData?: GoogleProfile): Promise<User | null> {
        try {
            return await this.save(
                { ...userDto, signUpType, profileData },
                { relations: ["role", "createdBy", "updatedBy", "deletedBy"] },
            );
        } catch {
            return null;
        }
    }

    async updateUserById(id: EntityId, userDto: Partial<User>): Promise<User | null> {
        try {
            return await this.update(
                id,
                { password: userDto.password },
                { relations: ["role", "createdBy", "updatedBy", "deletedBy"] },
            );
        } catch {
            return null;
        }
    }
}

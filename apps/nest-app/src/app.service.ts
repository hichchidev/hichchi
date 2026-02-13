import { Injectable } from "@nestjs/common";
import { RoleService, UserService } from "./user/services";
import { AppEndpoint, PermissionAction, RoleName, RolePermission, SensitiveActions } from "./core/enums";
import { getEnumValues } from "@hichchi/utils";
import { AuthService } from "@hichchi/nest-auth";
import configuration from "./core/config/configuration";
import { faker } from "@faker-js/faker/locale/en";

@Injectable()
/**
 * Provides application-level setup routines such as seeding default roles and users.
 */
export class AppService {
    constructor(
        private readonly roleService: RoleService,
        private readonly userService: UserService,
    ) {}

    // noinspection JSUnusedGlobalSymbols
    async seed(): Promise<void> {
        let roles = await this.roleService.getRepository().find();
        if (!roles.length) {
            // eslint-disable-next-line require-atomic-updates
            roles = await this.roleService.saveMany([
                {
                    name: RoleName.ADMIN,
                    permissions: getEnumValues(RolePermission),
                    priority: 1,
                },
                {
                    name: RoleName.USER,
                    permissions: getEnumValues(RolePermission).filter(
                        p =>
                            p.startsWith(AppEndpoint.USER) &&
                            p.split(":").every(a => !SensitiveActions.includes(a as PermissionAction)),
                    ),
                    priority: 2,
                },
            ]);
        }

        if (roles.length && !(await this.userService.getRepository().findOneBy({ role: { name: RoleName.ADMIN } }))) {
            const password = AuthService.generateHash(configuration().app.defaultPassword);
            await this.userService.save({
                firstName: "Super",
                lastName: "Admin",
                email: "admin@hichchi.com",
                password,
                emailVerified: true,
                role: roles.find(r => r.name === RoleName.ADMIN),
            });

            await this.userService.saveMany(
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                Array.from({ length: 100 }).map(_ => {
                    const firstName = faker.person.firstName();
                    const lastName = faker.person.lastName();

                    return {
                        firstName,
                        lastName,
                        email: faker.internet.email({ firstName, lastName }),
                        password,
                        emailVerified: true,
                        role: roles.find(r => r.name === RoleName.USER),
                    };
                }),
            );
        }
    }
}

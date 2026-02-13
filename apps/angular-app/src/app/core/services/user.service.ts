import { Injectable } from "@angular/core";
import { CrudHttpService } from "@hichchi/ngx-utils";
import { User } from "../interfaces";
import { RoleName } from "../enums";
import { PaginatedResponse } from "@hichchi/nest-connector/crud";

@Injectable({
    providedIn: "root",
})
export class UserService extends CrudHttpService<User> {
    constructor() {
        super();

        // eslint-disable-next-line no-void
        void this.getUsers();
    }

    async getUsers(): Promise<void> {
        const users = await this.get<PaginatedResponse<User>>("user", {
            promise: true,
            search: {
                value: "",
                fields: {
                    fullName: true,
                },
            },
            pagination: {
                page: 1,
                limit: 10,
            },
            sort: {
                firstName: "asc",
                lastName: "asc",
            },
            filter: {
                role: {
                    name: RoleName.USER,
                },
            },
        });
        // eslint-disable-next-line no-console
        console.log(users);
    }
}

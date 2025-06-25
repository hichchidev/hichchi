import { Role } from "../interfaces";

export function isRoleObject<R extends string = string>(role?: Role<R> | R): role is Role<R> {
    return Boolean(role) && Boolean("name" in (role as Role<R>));
}

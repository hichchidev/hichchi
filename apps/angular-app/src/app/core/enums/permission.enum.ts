// noinspection JSUnusedGlobalSymbols

import { AppEndpoint } from "./app-endpoint.enum";
import { PermissionAction } from "./permission-action.enum";

export enum RolePermission {
    ROLE_LIST = `${AppEndpoint.ROLE}:${PermissionAction.LIST}`,
    ROLE_READ = `${AppEndpoint.ROLE}:${PermissionAction.VIEW}`,
    ROLE_CREATE = `${AppEndpoint.ROLE}:${PermissionAction.CREATE}`,
    ROLE_UPDATE = `${AppEndpoint.ROLE}:${PermissionAction.UPDATE}`,
    ROLE_DELETE = `${AppEndpoint.ROLE}:${PermissionAction.DELETE}`,

    USER_LIST = `${AppEndpoint.USER}:${PermissionAction.LIST}`,
    USER_READ = `${AppEndpoint.USER}:${PermissionAction.VIEW}`,
    USER_CREATE = `${AppEndpoint.USER}:${PermissionAction.CREATE}`,
    USER_UPDATE = `${AppEndpoint.USER}:${PermissionAction.UPDATE}`,
    USER_DELETE = `${AppEndpoint.USER}:${PermissionAction.DELETE}`,
}

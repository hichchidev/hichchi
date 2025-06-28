// noinspection JSUnusedGlobalSymbols

export enum PermissionAction {
    LIST = "list",
    VIEW = "view",
    CREATE = "create",
    UPDATE = "update",
    DELETE = "delete",
}

export const NonSensitiveActions = [PermissionAction.LIST, PermissionAction.VIEW];

export const SensitiveActions = [PermissionAction.CREATE, PermissionAction.UPDATE, PermissionAction.DELETE];

export interface IRoleEntity {
    id: string | number;
    name: string;
    permissions: string[];
    priority?: number;
}

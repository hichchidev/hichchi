export interface Role {
    id: string | number;
    name: string;
    permissions: string[];
    priority?: number;
}

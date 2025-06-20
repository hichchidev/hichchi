import { DatabaseTypes } from "../types/database.types";

export interface ConnectionOptions {
    type: DatabaseTypes;
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
    entities: string[];
    migrations: string[];
    charset?: string;
    synchronize?: boolean;
    legacySpatialSupport?: boolean;
    autoLoadEntities?: boolean;
}

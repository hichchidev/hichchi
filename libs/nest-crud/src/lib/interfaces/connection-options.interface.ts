import { DatabaseTypes } from "../types/database.types";

export interface IConnectionOptions {
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
    keepConnectionAlive?: boolean;
    autoLoadEntities?: boolean;
}

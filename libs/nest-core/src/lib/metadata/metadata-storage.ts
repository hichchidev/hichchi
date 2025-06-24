// noinspection JSUnusedGlobalSymbols

import { singular, Type } from "@hichchi/utils";
import { getGlobal } from "../utils";

interface HichchiMetaDtoInfo {
    entity?: Type;
    name?: string;
}

interface HichchiMetaDto extends HichchiMetaDtoInfo {
    target: Type;
}

interface HichchiMetaEntity {
    entity: Type;
    tableName: string;
    name: string;
    unique: string[];
}

export class HichchiMetadata {
    private validationDtos: Map<Type, HichchiMetaDtoInfo> = new Map();

    private entities: Map<Type, HichchiMetaEntity> = new Map();

    private store = new Map<Type, Map<string, unknown>>();

    addValidationDto(dto: Type, name: string): void;

    addValidationDto(dto: Type, entity: Type): void;

    addValidationDto(dto: Type, nameOrEntity: string | Type): void {
        if (typeof nameOrEntity === "string") {
            this.validationDtos.set(dto, { name: nameOrEntity });
            return;
        }
        this.validationDtos.set(dto, { entity: nameOrEntity });
    }

    getValidationDtos(): Type[] {
        return Array.from(this.validationDtos.keys());
    }

    getValidationDtoInfo(dto: Type): HichchiMetaDtoInfo | undefined {
        return this.validationDtos.get(dto);
    }

    getDtoMetaOfInstance(instance: unknown): HichchiMetaDto | undefined {
        const dto = Array.from(this.validationDtos.keys()).find(dto => instance instanceof dto);
        if (!dto) {
            return undefined;
        }
        return {
            target: dto,
            ...this.getValidationDtoInfo(dto),
        };
    }

    addEntity(entity: Type, tableName: string, unique: string[]): void {
        this.entities.set(entity, { entity, tableName, name: singular(tableName), unique });
    }

    getEntityName(entity: Type): string | undefined {
        return this.entities.get(entity)?.name;
    }

    getEntityUnique(entity: Type): string[] | undefined {
        return this.entities.get(entity)?.unique;
    }

    isHichchiEntity(entity: Type): boolean | undefined {
        return this.entities.has(entity);
    }

    setMetadata(target: Type, propertyKey: string, value: unknown): void {
        const item = (this.store.get(target) as Map<string, unknown>) || new Map<string, unknown>();
        item.set(propertyKey, value);
        this.store.set(target, item);
    }

    getMetadata<T>(target: Type, propertyKey: string): T {
        return this.store.get(target)?.get(propertyKey) as T;
    }
}

export function hichchiMetadata(): HichchiMetadata {
    const global = getGlobal() as { hichchiMetadataStorage?: HichchiMetadata } & typeof globalThis & {};

    if (!global.hichchiMetadataStorage) {
        global.hichchiMetadataStorage = new HichchiMetadata();
    }

    return global.hichchiMetadataStorage;
}

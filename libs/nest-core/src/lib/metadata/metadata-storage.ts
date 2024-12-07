// noinspection JSUnusedGlobalSymbols

import { Type } from "@nestjs/common";
import { getGlobal } from "../utils/get-global";
import { singular } from "@hichchi/utils";

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

    addValidationDto(dto: Type, meta: string | Type): void {
        if (typeof meta === "string") {
            this.validationDtos.set(dto, { name: meta });
            return;
        }
        this.validationDtos.set(dto, { entity: meta });
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
}

export function hichchiMetadata(): HichchiMetadata {
    const global = getGlobal();

    if (!global.hichchiMetadataStorage) {
        global.hichchiMetadataStorage = new HichchiMetadata();
    }

    return global.hichchiMetadataStorage;
}

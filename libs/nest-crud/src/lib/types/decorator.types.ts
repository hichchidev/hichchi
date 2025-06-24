import { Type } from "@hichchi/utils";
import { BaseEntity, BaseEntityExtension } from "../base";

export type EntityDecorator = (target: Type<BaseEntity>) => void;

export type EntityExtensionDecorator = (target: Type<BaseEntityExtension>) => void;

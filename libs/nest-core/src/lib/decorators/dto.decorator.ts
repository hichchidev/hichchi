/* eslint-disable @typescript-eslint/no-unsafe-function-type */
import { hichchiMetadata } from "../metadata";
import { Type } from "@nestjs/common";

/**
 * Dto decorator
 * @param {string} name The name of the DTO
 * @returns {ClassDecorator}
 */
export function Dto(name: string): ClassDecorator {
    return function <T extends Function>(target: Function): T | void {
        hichchiMetadata().addValidationDto(target as Type, name);
    };
}

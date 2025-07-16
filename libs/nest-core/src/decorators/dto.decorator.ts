/* eslint-disable @typescript-eslint/no-unsafe-function-type */
import { hichchiMetadata } from "../metadata";
import { Type } from "@nestjs/common";

/**
 * Decorator that registers a class as a validation DTO with the Hichchi metadata system
 *
 * This decorator marks a class as a Data Transfer Object (DTO) and registers it with
 * the Hichchi metadata system. DTOs are used to define the shape of data for validation
 * purposes, especially in request/response handling.
 *
 * When a class is decorated with @Dto(), it becomes available for metadata retrieval
 * through methods like getValidationDtos(), getValidationDtoInfo(), or getDtoMetaOfInstance().
 *
 * @param {string} [name] - Optional name to associate with the DTO. If not provided, an empty string is used.
 * @returns {ClassDecorator} A decorator function that registers the target class as a validation DTO
 *
 * @example
 * ```typescript
 * // Basic usage with no name
 * @Dto()
 * export class CreateUserDto {
 *   @IsString()
 *   @IsNotEmpty()
 *   name: string;
 *
 *   @IsEmail()
 *   email: string;
 * }
 * ```
 *
 * @example
 * ```typescript
 * // Usage with a custom name
 * @Dto('user-creation')
 * export class CreateUserDto {
 *   @IsString()
 *   name: string;
 *
 *   @IsEmail()
 *   email: string;
 * }
 * ```
 *
 * @see {@link hichchiMetadata} The metadata storage system that this decorator interacts with
 */
export function Dto(name?: string): ClassDecorator {
    return function <T extends Function>(target: Function): T | void {
        hichchiMetadata().addValidationDto(target as Type, name || "");
    };
}

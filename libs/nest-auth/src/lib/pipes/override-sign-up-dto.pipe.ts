// noinspection JSValidateJSDoc

import { Inject, Injectable, PipeTransform } from "@nestjs/common";
import { throwValidationErrors, validateDto, validationPipeExceptionFactory } from "@hichchi/nest-core";
import { SignUpDto } from "../dtos";
import { AuthOptions } from "../interfaces";
import { AUTH_OPTIONS } from "../tokens";

/**
 * Pipe for validating and transforming sign up DTOs.
 *
 * This pipe validates incoming sign up data against either the default SignUpDto
 * or a custom DTO provided in the auth options. It handles validation errors according
 * to the configured exception factory or falls back to default error handling.
 *
 * @example
 * ```typescript
 * // In a controller
 * @Post('sign-up')
 * signUp(@Body(OverrideSignUpDtoPipe) dto: SignUpDto) {
 *   return this.authService.signUp(dto);
 * }
 * ```
 */
@Injectable()
export class OverrideSignUpDtoPipe implements PipeTransform {
    /**
     * Creates an instance of OverrideSignUpDtoPipe.
     *
     * @param {AuthOptions} options - The authentication options injected from AUTH_OPTIONS token
     *                               Contains configuration for validation, custom DTOs, and exception handling
     */
    constructor(@Inject(AUTH_OPTIONS) private readonly options: AuthOptions) {}

    /**
     * Transforms and validates the incoming value against the sign up DTO.
     *
     * This method validates the incoming data against either the custom signUpDto
     * specified in auth options or the default SignUpDto. It handles validation errors
     * using the configured exception factory or default error handling mechanisms.
     *
     * @param {object} value - The incoming data to validate and transform
     * @returns {Promise<SignUpDto>} The validated and transformed DTO instance
     *
     * @throws {BadRequestException} If validation fails and no custom exception factory is provided
     * @throws {Exception} Custom exception if a validation exception factory is provided
     */
    async transform(value: object): Promise<SignUpDto> {
        const instanceOrErrors = await validateDto(this.options.signUpDto || SignUpDto, value);
        if (Array.isArray(instanceOrErrors)) {
            if (this.options.validationExceptionFactory) {
                if (typeof this.options.validationExceptionFactory === "function") {
                    throw this.options.validationExceptionFactory(instanceOrErrors);
                }

                throw validationPipeExceptionFactory(instanceOrErrors);
            } else {
                throwValidationErrors(instanceOrErrors);
            }
        } else {
            return instanceOrErrors;
        }
    }
}

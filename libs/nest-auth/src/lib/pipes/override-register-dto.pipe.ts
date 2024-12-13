import { Inject, Injectable, PipeTransform } from "@nestjs/common";
import { throwValidationErrors, validateDto, validationPipeExceptionFactory } from "@hichchi/nest-core";
import { RegisterDto } from "../dtos";
import { AuthOptions } from "../interfaces";
import { AUTH_OPTIONS } from "../tokens";

@Injectable()
export class OverrideRegisterDtoPipe implements PipeTransform {
    constructor(@Inject(AUTH_OPTIONS) private readonly options: AuthOptions) {}

    async transform(value: object): Promise<RegisterDto> {
        const instanceOrErrors = await validateDto(this.options.registerDto || RegisterDto, value);
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

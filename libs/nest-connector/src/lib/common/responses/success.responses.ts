import { HttpSuccessStatus, CommonSuccessResponseCode } from "../enums";
import { SuccessResponse } from "../interfaces";

/**
 * Collection of standardized common success responses
 *
 * This constant maps each common success response code to its corresponding
 * standardized success response object. The responses include HTTP status codes,
 * success codes, and human-readable messages.
 *
 * Key features:
 * - Standardized success response format following the SuccessResponse interface
 * - Generic success response for common operations
 * - Consistent success message formatting across the application
 * - Extensible structure for adding more specific success responses as needed
 *
 * Currently, this collection contains a single generic success response (SUCCESS),
 * but it can be extended with more specific success responses as the application
 * grows and more detailed success states need to be communicated.
 *
 * @example
 * ```typescript
 * // Using a success response in a controller
 * import { SuccessResponses } from '@hichchi/nest-connector';
 * import { Controller, Get } from '@nestjs/common';
 *
 * @Controller('items')
 * export class ItemsController {
 *   @Get()
 *   findAll() {
 *     // Return a generic success response
 *     return SuccessResponses.SUCCESS;
 *   }
 * }
 * ```
 *
 * @example
 * ```typescript
 * // Using a success response in a service
 * import { SuccessResponses } from '@hichchi/nest-connector';
 * import { Injectable } from '@nestjs/common';
 *
 * @Injectable()
 * export class DataService {
 *   processData(data: any) {
 *     // Process data logic...
 *     return SuccessResponses.SUCCESS;
 *   }
 * }
 * ```
 *
 * @type {{ [key in CommonSuccessResponseCode]: SuccessResponse }}
 *
 * @see {@link CommonSuccessResponseCode} For all available success codes
 * @see {@link SuccessResponse} For the structure of success response objects
 * @see {@link SuccessResponseDto} For a class-based approach to success responses
 * @see {@link Errors} Complementary error responses for error handling
 */
const SuccessResponses: { [key in CommonSuccessResponseCode]: SuccessResponse } = {
    [CommonSuccessResponseCode.SUCCESS]: {
        statusCode: HttpSuccessStatus.OK,
        code: CommonSuccessResponseCode.SUCCESS,
        message: "Success",
        description: "Success",
    },
};

export { SuccessResponses };

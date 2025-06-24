import { SuccessResponse, HttpSuccessStatus, SuccessResponseDto } from "@hichchi/nest-connector";
import { toSentenceCase, toUpperCase } from "@hichchi/utils";

/**
 * Standardized success responses for CRUD operations
 *
 * This object provides a collection of standardized success response factories for
 * common CRUD operations. Each method creates a SuccessResponse with consistent
 * formatting for status codes, success codes, and messages.
 *
 * The success responses follow a consistent pattern:
 * - Status codes use standard HTTP success codes (200 for OK, 201 for Created)
 * - Success codes follow the format `ENTITY_STATUS_ACTION` in uppercase
 * - Messages are human-readable descriptions of the successful operation
 *
 * These standardized responses help ensure consistent success handling across
 * the application and provide clear, informative messages to API clients.
 *
 * @example
 * ```typescript
 * // In a service or controller
 * @Post()
 * async createUser(@Body() dto: CreateUserDto): Promise<SuccessResponse> {
 *   await this.userService.create(dto);
 *   return CrudSuccessResponses.CREATED('user');
 * }
 * ```
 *
 * @see {@link SuccessResponse} The success response structure
 * @see {@link HttpSuccessStatus} Enum of HTTP success status codes
 */
const CrudSuccessResponses = {
    /**
     * Success response for entity creation
     *
     * This method creates a standardized success response for entity creation operations.
     * It uses the HTTP 201 Created status code and generates a success code and message
     * based on the entity name.
     *
     * @param {string} entityName - The name of the entity that was created (e.g., 'user', 'product')
     * @returns {SuccessResponse} A formatted success response object
     *
     * @example
     * ```typescript
     * @Post()
     * async createUser(@Body() dto: CreateUserDto): Promise<SuccessResponse> {
     *   await this.userService.create(dto);
     *   return CrudSuccessResponses.CREATED('user');
     *   // Returns:
     *   // {
     *   //   statusCode: 201,
     *   //   code: "USER_201_CREATED",
     *   //   message: "User created successfully!"
     *   // }
     * }
     * ```
     *
     * @see {@link HttpSuccessStatus.CREATED} HTTP 201 Created status code
     * @see {@link SuccessResponseDto} Class used to create the response
     */
    CREATED: (entityName: string): SuccessResponse =>
        new SuccessResponseDto({
            statusCode: HttpSuccessStatus.CREATED,
            code: `${toUpperCase(entityName)}_${HttpSuccessStatus.CREATED}_CREATED`,
            message: `${toSentenceCase(entityName)} created successfully!`,
        }),
    /**
     * Success response for entity update
     *
     * This method creates a standardized success response for entity update operations.
     * It uses the HTTP 200 OK status code and generates a success code and message
     * based on the entity name.
     *
     * @param {string} entityName - The name of the entity that was updated (e.g., 'user', 'product')
     * @returns {SuccessResponse} A formatted success response object
     *
     * @example
     * ```typescript
     * @Put(':id')
     * async updateUser(
     *   @Param('id') id: string,
     *   @Body() dto: UpdateUserDto
     * ): Promise<SuccessResponse> {
     *   await this.userService.update(id, dto);
     *   return CrudSuccessResponses.UPDATE('user');
     *   // Returns:
     *   // {
     *   //   statusCode: 200,
     *   //   code: "USER_200_UPDATED",
     *   //   message: "User updated successfully!"
     *   // }
     * }
     * ```
     *
     * @see {@link HttpSuccessStatus.OK} HTTP 200 OK status code
     * @see {@link SuccessResponseDto} Class used to create the response
     */
    UPDATE: (entityName: string): SuccessResponse =>
        new SuccessResponseDto({
            statusCode: HttpSuccessStatus.OK,
            code: `${toUpperCase(entityName)}_${HttpSuccessStatus.OK}_UPDATED`,
            message: `${toSentenceCase(entityName)} updated successfully!`,
        }),
    /**
     * Success response for entity save operations
     *
     * This method creates a standardized success response for entity save operations,
     * which can include both creation and updates. It uses the HTTP 201 Created status
     * code and generates a success code and message based on the entity name.
     *
     * The SAVE response is typically used when the operation could either create a new
     * entity or update an existing one, depending on the context.
     *
     * @param {string} entityName - The name of the entity that was saved (e.g., 'user', 'product')
     * @returns {SuccessResponse} A formatted success response object
     *
     * @example
     * ```typescript
     * @Post('save')
     * async saveUser(@Body() dto: SaveUserDto): Promise<SuccessResponse> {
     *   // This method might create a new user or update an existing one
     *   await this.userService.save(dto);
     *   return CrudSuccessResponses.SAVE('user');
     *   // Returns:
     *   // {
     *   //   statusCode: 201,
     *   //   code: "USER_201_SAVED",
     *   //   message: "User saved successfully!"
     *   // }
     * }
     * ```
     *
     * @see {@link HttpSuccessStatus.CREATED} HTTP 201 Created status code
     * @see {@link SuccessResponseDto} Class used to create the response
     * @see {@link CREATED} More specific response for entity creation
     * @see {@link UPDATE} More specific response for entity updates
     */
    SAVE: (entityName: string): SuccessResponse =>
        new SuccessResponseDto({
            statusCode: HttpSuccessStatus.CREATED,
            code: `${toUpperCase(entityName)}_${HttpSuccessStatus.CREATED}_SAVED`,
            message: `${toSentenceCase(entityName)} saved successfully!`,
        }),
    /**
     * Success response for entity deletion
     *
     * This method creates a standardized success response for entity deletion operations.
     * It uses the HTTP 200 OK status code and generates a success code and message
     * based on the entity name.
     *
     * This response is suitable for both soft deletes (where the entity is marked as deleted
     * but remains in the database) and hard deletes (where the entity is permanently removed).
     *
     * @param {string} entityName - The name of the entity that was deleted (e.g., 'user', 'product')
     * @returns {SuccessResponse} A formatted success response object
     *
     * @example
     * ```typescript
     * @Delete(':id')
     * async deleteUser(@Param('id') id: string): Promise<SuccessResponse> {
     *   await this.userService.delete(id);
     *   return CrudSuccessResponses.DELETE('user');
     *   // Returns:
     *   // {
     *   //   statusCode: 200,
     *   //   code: "USER_200_DELETED",
     *   //   message: "User deleted successfully!"
     *   // }
     * }
     * ```
     *
     * @see {@link HttpSuccessStatus.OK} HTTP 200 OK status code
     * @see {@link SuccessResponseDto} Class used to create the response
     */
    DELETE: (entityName: string): SuccessResponse =>
        new SuccessResponseDto({
            statusCode: HttpSuccessStatus.OK,
            code: `${toUpperCase(entityName)}_${HttpSuccessStatus.OK}_DELETED`,
            message: `${toSentenceCase(entityName)} deleted successfully!`,
        }),
    /**
     * Generic success response
     *
     * This method creates a standardized success response for generic operations
     * that don't fit into the specific CRUD categories. It uses the HTTP 200 OK
     * status code and provides a simple "SUCCESS" code and "success" message.
     *
     * Unlike the other methods in this object, SUCCESS doesn't require an entity name
     * parameter since it's designed for generic, non-entity-specific operations.
     *
     * @returns {SuccessResponse} A formatted success response object
     *
     * @example
     * ```typescript
     * @Post('verify-email')
     * async verifyEmail(@Body() dto: VerifyEmailDto): Promise<SuccessResponse> {
     *   await this.authService.verifyEmail(dto.token);
     *   return CrudSuccessResponses.SUCCESS();
     *   // Returns:
     *   // {
     *   //   statusCode: 200,
     *   //   code: "SUCCESS",
     *   //   message: "success"
     *   // }
     * }
     * ```
     *
     * @see {@link HttpSuccessStatus.OK} HTTP 200 OK status code
     * @see {@link SuccessResponseDto} Class used to create the response
     */
    SUCCESS: (): SuccessResponse =>
        new SuccessResponseDto({
            statusCode: HttpSuccessStatus.OK,
            code: "SUCCESS",
            message: "success",
        }),
};

export { CrudSuccessResponses };

// noinspection JSUnusedGlobalSymbols

import { IsArray, IsNotEmpty, IsUUID } from "class-validator";
import { EntityId } from "@hichchi/nest-connector/crud";
import { Dto } from "@hichchi/nest-core";
import { BulkDeleteBody } from "@hichchi/nest-connector/auth";
import { DEFAULT_UUID_VERSION } from "@hichchi/nest-connector";

/**
 * Data Transfer Object for bulk deletion operations
 *
 * This DTO is used to validate and transfer data for bulk deletion operations.
 * It implements the BulkDeleteBody interface and adds validation decorators
 * to ensure that the ids array contains valid UUID values and is not empty.
 *
 * Use this DTO in controller methods that handle bulk deletion requests,
 * typically in DELETE endpoints that need to remove multiple entities at once.
 *
 * @example
 * ```typescript
 * // In a controller
 * @Delete()
 * async bulkDelete(@Body() dto: BulkDeleteDto): Promise<void> {
 *   await this.userService.deleteMany(dto.ids);
 *   return;
 * }
 * ```
 *
 * @example
 * ```typescript
 * // Client request body
 * {
 *   "ids": [
 *     "123e4567-e89b-12d3-a456-426614174000",
 *     "123e4567-e89b-12d3-a456-426614174001"
 *   ]
 * }
 * ```
 *
 * @see {@link BulkDeleteBody} The interface this DTO implements
 * @see {@link BaseRepository.deleteByIds} Method for soft-deleting multiple entities by IDs
 * @see {@link BaseRepository.hardDeleteByIds} Method for permanently deleting multiple entities by IDs
 */
@Dto()
export class BulkDeleteDto implements BulkDeleteBody {
    /**
     * Array of entity IDs to delete
     *
     * This property contains an array of UUIDs identifying the entities to be deleted.
     * It is validated to ensure:
     * - It is not empty (@IsNotEmpty)
     * - It is an array (@IsArray)
     * - All elements are valid UUIDs (@IsUUID)
     *
     * The array is passed to repository methods like deleteByIds or hardDeleteByIds
     * to perform the actual deletion operation.
     */

    @IsUUID(DEFAULT_UUID_VERSION, { each: true })
    @IsArray()
    @IsNotEmpty()
    ids: EntityId[];
}

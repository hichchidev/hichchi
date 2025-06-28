import { EntityId } from "../../../crud/types";

/**
 * Interface defining the body structure for bulk delete operations.
 *
 * This interface specifies the required properties for performing bulk deletion
 * of multiple entities in a single request. This is more efficient than making
 * individual delete requests for each entity and provides better performance
 * for operations that need to remove multiple records.
 *
 * The interface accepts an array of entity identifiers that should be deleted.
 * All specified entities will be removed in a single database transaction,
 * ensuring data consistency.
 *
 * @example
 * ```typescript
 * // Delete multiple users by their IDs
 * const bulkDelete: BulkDeleteBody = {
 *   ids: ['123e4567-e89b-12d3-a456-426614174000', '987fcdeb-51a2-43d1-b789-123456789abc']
 * };
 * ```
 *
 * @example
 * ```typescript
 * // Using in a service
 * async deleteMultipleEntities(entityIds: EntityId[]): Promise<void> {
 *   const body: BulkDeleteBody = { ids: entityIds };
 *   return this.entityService.bulkDelete(body);
 * }
 * ```
 *
 * @see {@link EntityId} Type representing entity identifier values
 */
export interface BulkDeleteBody {
    /**
     * Array of entity identifiers to be deleted.
     *
     * Each identifier in this array represents an entity that should be removed
     * from the system. The identifiers must be valid and correspond to existing
     * entities. Invalid or non-existent IDs may cause the operation to fail.
     */
    ids: EntityId[];
}

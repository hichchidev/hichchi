/**
 * Configuration type for defining unique constraints on entity fields.
 *
 * This type is used to specify unique constraints for entity properties in a
 * flexible, reusable way. It enables defining both simple unique constraints
 * for individual fields and composite unique constraints that span multiple fields.
 *
 * The type represents an object where:
 * - Each key is a constraint name or identifier
 * - Each value is either:
 *   - A single field name (string) for simple unique constraints
 *   - An array of field names (string[]) for composite unique constraints
 *
 * This configuration can be used with repository decorators and CRUD services
 * to automatically enforce unique constraints during entity creation and updates.
 *
 * @remarks
 * When implementing repository methods that handle entity creation or updates,
 * this configuration can be used to check if entities with the same unique
 * values already exist in the database before performing the operation.
 *
 * For composite unique constraints, all specified fields are considered together
 * as a single uniqueness constraint, meaning the combination of values must be unique.
 *
 * @example
 * ```typescript
 * // Simple unique constraint for a single field
 * const userUniqueOptions: EntityOptionUnique = {
 *   email: 'email'
 * };
 *
 * // Multiple individual unique constraints
 * const productUniqueOptions: EntityOptionUnique = {
 *   sku: 'sku',
 *   barcode: 'barcode'
 * };
 *
 * // Composite unique constraints
 * const orderItemUniqueOptions: EntityOptionUnique = {
 *   // A single order item can only have one product per order
 *   orderProduct: ['orderId', 'productId']
 * };
 *
 * // Mixed simple and composite constraints
 * const appointmentUniqueOptions: EntityOptionUnique = {
 *   code: 'appointmentCode', // Simple unique constraint
 *   timeSlot: ['doctorId', 'date', 'startTime'] // Composite unique constraint
 * };
 * ```
 */
export type EntityOptionUnique = { [key: string]: string | string[] };

// noinspection JSUnusedGlobalSymbols

import { PrimaryGeneratedColumn } from "typeorm";
import { EntityId, ModelExtension } from "@hichchi/nest-connector/crud";

/**
 * Base entity extension class that provides a minimal entity structure
 *
 * This class serves as a lightweight foundation for entity extensions or related models
 * that only need an ID field but don't require the full audit tracking capabilities of
 * the BaseEntity class. It implements the ModelExtension interface, which is a minimal
 * version of the Model interface.
 *
 * Entities created with BaseEntityExtension serve the purpose of extending entities created
 * with BaseEntity, as shown in the example where ProductImageEntity extends ProductEntity
 * through a one-to-one relationship. This pattern allows you to add additional properties
 * to an entity without modifying its core structure.
 *
 * Use this class when you need to create an entity that:
 * - Requires a UUID primary key
 * - Does not need creation, update, or deletion tracking
 * - Does not need user attribution for operations
 * - Extends an existing entity created with BaseEntity
 *
 * @example
 * ```typescript
 * @HichchiEntityExtension("product_images")
 * export class ProductImageEntity extends BaseEntityExtension {
 *   @Column()
 *   url: string;
 *
 *   @OneToOne(() => ProductEntity)
 *   @HichchiJoinColumn()
 *   product: ProductEntity;
 * }
 * ```
 *
 * @implements {ModelExtension} Interface from @hichchi/nest-connector/crud
 * @see {@link BaseEntity} The full entity class with comprehensive audit tracking
 * @see {@link HichchiEntityExtension} The decorator required for entity extensions
 * @see {@link HichchiJoinColumn} The decorator required for entity relationships
 */
export class BaseEntityExtension implements ModelExtension {
    /**
     * Unique identifier for the entity extension
     *
     * This UUID is automatically generated when the entity is created.
     * It serves as the primary key for the entity in the database.
     */
    @PrimaryGeneratedColumn("uuid")
    id: EntityId;
}

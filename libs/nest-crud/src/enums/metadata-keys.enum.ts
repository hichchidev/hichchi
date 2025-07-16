/**
 * Metadata Key Identifiers
 *
 * This enum defines keys used for storing and retrieving metadata about entities and their relationships
 * within the application. These metadata keys are used with TypeScript's reflection/decorator system
 * to attach additional information to classes and properties that can be accessed at runtime.
 *
 * The metadata system is a critical part of the framework's ability to implement features like
 * automatic validation, serialization/deserialization, relationship management, and other
 * entity-related functionalities without requiring excessive boilerplate code.
 */
export enum MetadataKeys {
    /**
     * Entity metadata key
     *
     * Used to mark and identify classes that represent database entities within the Hichchi framework.
     * When a class is decorated with entity-related decorators, metadata is stored under this key
     * containing information about the entity such as its table name, columns, indices, and other
     * database-related configuration.
     *
     * This metadata is used by the ORM layer to map between TypeScript classes and database tables.
     */
    HICHCHI_ENTITY = "hichchi-entity",

    /**
     * Foreign key relationship metadata key
     *
     * Used to store information about foreign key relationships between entities.
     * When a property is decorated as a relationship (like @ManyToOne, @OneToMany, etc.),
     * metadata about that relationship is stored under this key.
     *
     * This includes information such as the target entity type, cascade behavior,
     * eager/lazy loading settings, and other relationship configuration details.
     * The ORM uses this metadata to properly handle joins, cascades, and referential integrity.
     */
    HICHCHI_FOREIGN_KEY = "hichchi-foreign-key",
}

import { Role as HcRole, TenantSlug, User as HcUser } from "@hichchi/nest-connector/auth";
import { RoleName, RolePermission } from "../../core/enums";
import { EntityId, ModelExtension } from "@hichchi/nest-connector/crud";

/**
 * Interface representing a user's address information
 *
 * This interface extends the base ModelExtension to provide address-related
 * properties for users. It includes standard address components and establishes
 * a relationship with the User entity through foreign key references.
 *
 * All address fields are optional (nullable) to accommodate partial address
 * information or users who haven't provided complete address details.
 *
 * @interface Address
 * @extends ModelExtension Base model extension with common entity properties
 *
 * @example
 * ```typescript
 * const userAddress: Address = {
 *   id: "123e4567-e89b-12d3-a456-426614174000",
 *   street: "123 Main Street",
 *   city: "New York",
 *   state: "NY",
 *   zip: "10001",
 *   country: "USA",
 *   user: userEntity,
 *   userId: "456e7890-e89b-12d3-a456-426614174001",
 *   createdAt: new Date(),
 *   updatedAt: new Date(),
 *   deletedAt: null
 * };
 * ```
 *
 * @see {@link User} The user interface that references this address
 * @see {@link ModelExtension} The base interface this extends
 */
export interface Address extends ModelExtension {
    /**
     * Street address including house number and street name
     *
     * Contains the primary street address information. Can be null
     * if the user hasn't provided this information.
     */
    street: string | null;

    /**
     * City or municipality name
     *
     * The city where the address is located. Can be null if not provided.
     */
    city: string | null;

    /**
     * State, province, or region
     *
     * The administrative division (state, province, etc.) for the address.
     * Can be null if not applicable or not provided.
     */
    state: string | null;

    /**
     * Postal or ZIP code
     *
     * The postal code for mail delivery. Can be null if not provided
     * or not applicable in the country.
     */
    zip: string | null;

    /**
     * Country name or code
     *
     * The country where the address is located. Can be null if not provided.
     */
    country: string | null;

    /**
     * Reference to the user who owns this address
     *
     * Establishes the relationship between the address and its owner.
     * Can be null if the relationship is not loaded or doesn't exist.
     */
    user: User | null;

    /**
     * Foreign key reference to the user entity
     *
     * The unique identifier of the user who owns this address.
     * Used for database relationships and queries.
     */
    userId: EntityId | null;
}

/**
 * Interface representing a user role with permissions and relationships
 *
 * This interface extends the base HcRole interface to provide application-specific
 * role functionality. It includes a relationship to users who have this role,
 * enabling role-based access control and user management.
 *
 * The role system supports both predefined role names (RoleName enum) and
 * custom string-based roles for flexibility in different application contexts.
 *
 * @interface Role
 * @extends HcRole Base role interface with role name and permission generics
 *
 * @example
 * ```typescript
 * const adminRole: Role = {
 *   id: "123e4567-e89b-12d3-a456-426614174000",
 *   name: RoleName.ADMIN,
 *   permissions: [RolePermission.READ_USERS, RolePermission.WRITE_USERS],
 *   users: [user1, user2],
 *   createdAt: new Date(),
 *   updatedAt: new Date()
 * };
 * ```
 *
 * @see {@link User} The user interface that references this role
 * @see {@link RoleName} Enumeration of predefined role names
 * @see {@link RolePermission} Enumeration of available permissions
 * @see {@link HcRole} The base role interface this extends
 */
export interface Role extends HcRole<RoleName | string, RolePermission> {
    /**
     * Collection of users assigned to this role
     *
     * Provides access to all users who have been assigned this role.
     * Can be null if the relationship is not loaded or if no users
     * are currently assigned to this role.
     *
     * This is typically used for role management operations and
     * displaying role membership information.
     */
    users: User[] | null;
}

/**
 * Interface representing a complete user entity with authentication and profile data
 *
 * This interface extends the base HcUser interface to provide application-specific
 * user functionality. It includes required email field, role relationships, and
 * address information, creating a comprehensive user profile structure.
 *
 * The user entity serves as the central identity object throughout the application,
 * connecting authentication, authorization, and profile management features.
 *
 * @interface User
 * @extends HcUser Base user interface with role name and permission generics
 *
 * @example
 * ```typescript
 * const user: User = {
 *   id: "123e4567-e89b-12d3-a456-426614174000",
 *   firstName: "John",
 *   lastName: "Doe",
 *   fullName: "John Doe",
 *   email: "john.doe@example.com",
 *   username: "johndoe",
 *   emailVerified: true,
 *   signUpType: AuthProvider.LOCAL,
 *   role: adminRole,
 *   roleId: "456e7890-e89b-12d3-a456-426614174001",
 *   address: userAddress,
 *   addressId: "789e0123-e89b-12d3-a456-426614174002",
 *   profileData: { preferences: { theme: "dark" } },
 *   avatar: "/avatars/johndoe.jpg",
 *   createdAt: new Date(),
 *   updatedAt: new Date()
 * };
 * ```
 *
 * @see {@link Role} The role interface referenced by this user
 * @see {@link Address} The address interface referenced by this user
 * @see {@link RoleName} Enumeration of predefined role names
 * @see {@link RolePermission} Enumeration of available permissions
 * @see {@link HcUser} The base user interface this extends
 */
export interface User extends HcUser<RoleName | string, RolePermission, TenantSlug> {
    /**
     * The user's email address (required)
     *
     * Primary email address used for authentication and communication.
     * Unlike the base interface where email is optional, this application
     * requires all users to have an email address.
     */
    email: string;

    /**
     * The user's assigned role
     *
     * Determines the user's permissions and access levels within the system.
     * Can be null if no role has been assigned or if the relationship
     * is not loaded.
     */
    role: Role | null;

    /**
     * Foreign key reference to the user's role
     *
     * The unique identifier of the role assigned to this user.
     * Used for database relationships and role-based queries.
     */
    roleId: EntityId | null;

    /**
     * The user's address information
     *
     * Contains the user's physical address details. Can be null if
     * the user hasn't provided address information or if the relationship
     * is not loaded.
     */
    address: Address | null;

    /**
     * Foreign key reference to the user's address
     *
     * The unique identifier of the address associated with this user.
     * Used for database relationships and address-based queries.
     */
    addressId: EntityId | null;
}

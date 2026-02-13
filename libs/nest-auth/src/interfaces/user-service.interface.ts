import { Request } from "express";
import { AuthProvider, GoogleProfile, User, VerifyToken } from "@hichchi/nest-connector/auth";
import { EntityId } from "@hichchi/nest-connector/crud";
import { AuthUser } from "./auth-user.type";

/**
 * Interface defining event handlers for user-related authentication events.
 *
 * This interface provides optional event handler methods that can be implemented
 * to react to various authentication-related actions in the system. These handlers
 * allow for custom business logic to be executed at specific points in the
 * authentication flow, such as sending welcome emails after signup or tracking
 * login activity for security purposes.
 *
 * Each event handler receives the HTTP request object along with relevant context
 * data for the specific event. All handlers are optional, allowing implementations
 * to choose which events they need to handle.
 */
export interface UserServiceEvents {
    /**
     * Event handler triggered after a user sign-up attempt
     *
     * This handler is called after a user attempts to sign up, regardless of whether
     * the attempt was successful. If successful, the userId parameter will contain
     * the ID of the newly created user. If unsuccessful, the error parameter will
     * contain information about what went wrong.
     *
     * Common uses include:
     * - Sending welcome emails to new users
     * - Setting up initial user data or preferences
     * - Tracking sign-up analytics
     * - Logging failed sign-up attempts for security monitoring
     *
     * @param request - The Express request object from the sign-up attempt
     * @param userId - The ID of the newly created user (if sign-up was successful)
     * @param error - Error information (if sign-up failed)
     *
     * @see {@link signUpUser} Method that triggers this event
     * @see {@link User} User entity structure
     * @see {@link AuthProvider} Enum of sign-up methods
     */
    onSignUp?(request: Request, userId?: EntityId, error?: unknown): Promise<void>;

    /**
     * Event handler triggered when a user requests a new verification email
     *
     * This handler is called after a verification email has been resent to a user.
     * It provides an opportunity to perform additional actions such as logging,
     * rate limiting, or notifying administrators about repeated verification attempts.
     *
     * @param request - The Express request object
     * @param userId - The ID of the user requesting the verification email
     *
     * @see {@link sendVerificationEmail} Method that triggers this event
     * @see {@link VerifyToken} Token type used in verification emails
     */
    onResendVerificationEmail?(request: Request, userId: EntityId): Promise<void>;

    /**
     * Event handler triggered when a user verifies their email address
     *
     * This handler is called after a user attempts to verify their email address,
     * whether the verification was successful or not. The status parameter indicates
     * whether the verification succeeded.
     *
     * Common uses include:
     * - Updating user permissions or access levels after verification
     * - Sending follow-up emails with next steps
     * - Tracking verification success rates
     *
     * @param request - The Express request object
     * @param userId - The ID of the user verifying their email
     * @param status - Whether the verification was successful
     *
     * @see {@link User} User entity structure
     * @see {@link VerifyToken} Token type used in verification emails
     */
    onVerifyEmail?(request: Request, userId: EntityId, status: boolean): Promise<void>;

    /**
     * Event handler triggered after a user sign-in attempt
     *
     * This handler is called whenever a user attempts to sign in, regardless of whether
     * the attempt was successful. If successful, the authUser parameter will contain
     * the authenticated user information with tokens. If unsuccessful, the error parameter
     * will contain information about what went wrong.
     *
     * Common uses include:
     * - Logging successful/failed sign in attempts
     * - Updating user activity timestamps
     * - Tracking suspicious login patterns
     * - Sending notifications about new login activity
     *
     * @param request - The Express request object
     * @param authUser - The authenticated user with token information (if successful)
     * @param error - Error information (if sign-in failed)
     *
     * @see {@link AuthUser} Combined user and token information
     * @see {@link IJwtPayload} Structure of JWT token payload
     * @see {@link UserSession} Session information stored with the user
     */
    onSignIn?(request: Request, authUser?: AuthUser, error?: unknown): Promise<void>;

    /**
     * Event handler triggered after token refresh operations
     *
     * This handler is called when a user's authentication tokens are refreshed.
     * It provides an opportunity to log token refreshes, update analytics,
     * or perform additional security checks.
     *
     * @param request - The Express request object
     * @param authUser - The user with newly refreshed token information
     *
     * @see {@link AuthUser} Combined user and token information
     * @see {@link UserSession} Session information including tokens
     * @see {@link IJwtPayload} Structure of JWT token payload
     */
    onRefreshTokens?(request: Request, authUser?: AuthUser): Promise<void>;

    /**
     * Event handler triggered when current user information is requested
     *
     * This handler is called when the application retrieves information about
     * the currently authenticated user. It can be used for monitoring user activity
     * or implementing additional authorization checks.
     *
     * @param request - The Express request object
     * @param authUser - The authenticated user information (if available)
     * @param error - Error information (if retrieval failed)
     *
     * @see {@link AuthUser} Combined user and token information
     * @see {@link CacheUser} User information stored in cache
     * @see {@link UserExtra} Additional authentication-related user properties
     */
    onGetCurrentUser?(request: Request, authUser?: AuthUser, error?: unknown): Promise<void>;

    /**
     * Event handler triggered after a password change attempt
     *
     * This handler is called when a user attempts to change their password,
     * regardless of whether the attempt was successful. If successful, the authUser
     * parameter will contain the user information. If unsuccessful, the error parameter
     * will contain information about what went wrong.
     *
     * Common uses include:
     * - Sending password change confirmation emails
     * - Logging password changes for security auditing
     * - Invalidating other active sessions after password change
     *
     * @param request - The Express request object
     * @param authUser - The authenticated user information (if successful)
     * @param error - Error information (if password change failed)
     *
     * @see {@link updateUserById} Method that may trigger this event
     * @see {@link AuthUser} Combined user and token information
     * @see {@link UserSession} Session information including tokens
     */
    onChangePassword?(request: Request, authUser?: AuthUser, error?: unknown): Promise<void>;

    /**
     * Event handler triggered when a password reset is requested
     *
     * This handler is called after a user requests a password reset.
     * It provides an opportunity to log the request, implement additional
     * security measures, or track reset request patterns.
     *
     * @param request - The Express request object
     * @param userId - The ID of the user requesting the reset (if found)
     *
     * @see {@link sendPasswordResetEmail} Method that triggers this event
     * @see {@link VerifyToken} Token type used in reset emails
     */
    onRequestPasswordReset?(request: Request, userId?: EntityId): Promise<void>;

    /**
     * Event handler triggered when a password reset token is verified
     *
     * This handler is called when a user attempts to verify a password reset token.
     * It can be used to log verification attempts or implement additional security checks.
     *
     * @param request - The Express request object
     * @param userId - The ID of the user verifying the token (if valid)
     *
     * @see {@link VerifyToken} Token type used in reset process
     * @see {@link IJwtPayload} Structure of JWT token payload
     * @see {@link sendPasswordResetEmail} Related method for sending reset tokens
     */
    onVerifyResetPasswordToken?(request: Request, userId?: EntityId): Promise<void>;

    /**
     * Event handler triggered after a password is reset
     *
     * This handler is called after a user completes a password reset.
     * It provides an opportunity to send confirmation emails, log the event,
     * or invalidate other active sessions after the reset.
     *
     * @param request - The Express request object
     * @param userId - The ID of the user who reset their password
     *
     * @see {@link updateUserById} Method that may trigger this event
     * @see {@link onVerifyResetPasswordToken} Related event for token verification
     * @see {@link onRequestPasswordReset} Related event for reset requests
     */
    onResetPassword?(request: Request, userId?: EntityId): Promise<void>;

    /**
     * Event handler triggered after a sign-out attempt
     *
     * This handler is called when a user attempts to sign out, regardless of whether
     * the attempt was successful. If successful, the authUser parameter will contain
     * the user who signed out. If unsuccessful, the error parameter will contain
     * information about what went wrong.
     *
     * @param request - The Express request object
     * @param authUser - The user who signed out (if successful)
     * @param error - Error information (if sign-out failed)
     *
     * @see {@link AuthUser} Combined user and token information
     * @see {@link UserSession} Session information including tokens
     * @see {@link CacheUser} Related interface for users stored in cache with sessions
     */
    onSignOut?(request: Request, authUser?: AuthUser, error?: unknown): Promise<void>;

    /**
     * Generic event handler triggered after any authentication attempt
     *
     * This handler is called after any authentication attempt, regardless of
     * the specific strategy used or whether the attempt was successful.
     * It provides a central point for monitoring all authentication activity.
     *
     * @param request - The Express request object
     * @param authUser - The authenticated user (if successful)
     * @param error - Error information (if authentication failed)
     *
     * @see {@link AuthUser} Combined user and token information
     * @see {@link onAuthenticateJWT} Strategy-specific authentication event
     * @see {@link onAuthenticateGoogle} Strategy-specific authentication event
     */
    onAuthenticate?(request: Request, authUser?: AuthUser, error?: unknown): Promise<void>;

    /**
     * Event handler triggered after JWT authentication attempts
     *
     * This handler is called specifically when JWT authentication is attempted,
     * regardless of whether the attempt was successful. It allows for
     * strategy-specific monitoring and logging.
     *
     * @param request - The Express request object
     * @param authUser - The authenticated user (if successful)
     * @param error - Error information (if authentication failed)
     *
     * @see {@link AuthUser} Combined user and token information
     * @see {@link IJwtPayload} Structure of JWT token payload
     * @see {@link onAuthenticate} Generic authentication event
     */
    onAuthenticateJWT?(request: Request, authUser?: AuthUser, error?: unknown): Promise<void>;

    /**
     * Event handler triggered after Google OAuth authentication attempts
     *
     * This handler is called specifically when Google OAuth authentication is attempted,
     * regardless of whether the attempt was successful. It allows for
     * strategy-specific monitoring and logging.
     *
     * @param request - The Express request object
     * @param authUser - The authenticated user (if successful)
     * @param error - Error information (if authentication failed)
     *
     * @see {@link AuthUser} Combined user and token information
     * @see {@link GoogleProfile} Google user profile information
     * @see {@link onAuthenticate} Generic authentication event
     */
    onAuthenticateGoogle?(request: Request, authUser?: AuthUser, error?: unknown): Promise<void>;

    /**
     * Event handler triggered when a user is retrieved by token
     *
     * This handler is called when the application attempts to retrieve a user
     * based on an authentication token. It can be used for monitoring token usage
     * or implementing additional security checks.
     *
     * @param request - The Express request object
     * @param userId - The ID of the retrieved user (if successful)
     * @param error - Error information (if retrieval failed)
     *
     * @see {@link IJwtPayload} JWT token payload structure
     * @see {@link AuthUser} Combined user and token information
     * @see {@link getUserById} Method that may be used to retrieve the user
     */
    onGetUserByToken?(request: Request, userId?: EntityId, error?: unknown): Promise<void>;
}

/**
 * Interface defining core user management service capabilities
 *
 * The `IUserService` interface extends UserServiceEvents and defines the
 * essential methods required for managing users within the authentication system.
 * It provides methods for retrieving, creating, and updating users, as well as
 * sending authentication-related emails.
 *
 * Implementations of this interface serve as the bridge between the authentication
 * system and the underlying user data storage, allowing the auth system to work with
 * any user model that conforms to the base User interface.
 *
 * @extends UserServiceEvents
 *
 * @see {@link UserServiceEvents} Event handlers for authentication-related actions
 * @see {@link User} Base user interface with core user properties
 * @see {@link AuthUser} Combined interface for users with authentication tokens
 * @see {@link GoogleProfile} Profile information from Google OAuth
 */
export interface UserServiceActions {
    /**
     * Retrieve a user by their unique identifier
     *
     * This method is the primary way to look up a user in the system.
     * It should return the complete user object if found, or null if not found.
     *
     * @param id - The unique identifier of the user to retrieve
     * @param subdomain - Optional subdomain context for multi-tenant applications
     * @returns The user if found, null otherwise
     *
     * @see {@link User} Base user interface structure
     * @see {@link EntityId} Type for entity identifiers
     * @see {@link onGetUserByToken} Related event handler
     */
    getUserById(id: EntityId, subdomain?: string): Promise<User | null>;

    /**
     * Retrieve a user by their email address
     *
     * This method is used during email-based authentication flows to find
     * a user based on their email address.
     *
     * @param email - The email address to search for
     * @param subdomain - Optional subdomain context for multi-tenant applications
     * @returns The user if found, null otherwise
     *
     * @see {@link User} Base user interface structure
     * @see {@link sendPasswordResetEmail} Related method that may use this lookup
     * @see {@link getUserByUsernameOrEmail} Related lookup method
     */
    getUserByEmail(email: string, subdomain?: string): Promise<(User & { email: string }) | null>;

    /**
     * Retrieve a user by their username
     *
     * This optional method is used during username-based authentication flows
     * to find a user based on their username.
     *
     * @param username - The username to search for
     * @param subdomain - Optional subdomain context for multi-tenant applications
     * @returns The user if found, null otherwise
     *
     * @see {@link User} Base user interface structure
     * @see {@link getUserByUsernameOrEmail} Related lookup method
     * @see {@link UserExtra} Additional authentication-related user properties
     */
    getUserByUsername?(username: string, subdomain?: string): Promise<(User & { username: string }) | null>;

    /**
     * Retrieve a user by either username or email
     *
     * This optional method is used when the authentication system allows
     * users to sign in with either their username or email address.
     *
     * @param username - The username or email to search for
     * @param subdomain - Optional subdomain context for multi-tenant applications
     * @returns The user if found, null otherwise
     *
     * @see {@link User} Base user interface structure
     * @see {@link getUserByUsername} Related lookup method
     * @see {@link getUserByEmail} Related lookup method
     */
    getUserByUsernameOrEmail?(
        username: string,
        subdomain?: string,
    ): Promise<(User & { email: string; username: string }) | null>;

    /**
     * Retrieve a user by the configured authentication field
     *
     * This optional method is used when the authentication field is configurable
     * and can be something other than email or username. The specific field used
     * is determined by the authField setting in AuthOptions.
     *
     * @param authFieldValue - The value of the authentication field to search for
     * @param subdomain - Optional subdomain context for multi-tenant applications
     * @returns The user if found, null otherwise
     *
     * @see {@link User} Base user interface structure
     * @see {@link UserExtra} Interface containing authField and authFieldValue properties
     * @see {@link AuthField} Enum of standard authentication field options
     */
    getUserByAuthField?(authFieldValue: string | number, subdomain?: string): Promise<User | null>;

    /**
     * Create a new user account
     *
     * This method is called during the sign-up process to create a new user
     * in the system. It should create the user record and return the created user.
     *
     * @param {Partial<User>} userDto - The user data to create
     * @param {AuthProvider} signUpType - The method used for sign-up (local, Google, etc.)
     * @param {GoogleProfile} profile - Additional profile data from OAuth providers
     * @returns The created user
     *
     * @see {@link User} Base user interface structure
     * @see {@link AuthProvider} Enum of sign-up methods
     * @see {@link GoogleProfile} Google OAuth profile data structure
     * @see {@link onSignUp} Event handler triggered after signup
     */
    signUpUser(userDto: Partial<User>, signUpType: AuthProvider, profile?: GoogleProfile): Promise<User | null>;

    /**
     * Update an existing user account
     *
     * This method is used to update user information, such as when changing
     * passwords or updating profile details.
     *
     * @param id - The ID of the user to update
     * @param userDto - The user data to update
     * @param updatedBy - The user performing the update (for audit trails)
     * @returns The updated user
     *
     * @see {@link User} Base user interface structure
     * @see {@link EntityId} Type for entity identifiers
     * @see {@link onChangePassword} Related event that may be triggered
     * @see {@link onResetPassword} Related event that may be triggered
     */
    updateUserById(id: EntityId, userDto: Partial<User>, updatedBy: User): Promise<User>;

    /**
     * Send a password reset email to a user
     *
     * This optional method is called when a user requests a password reset.
     * It should send an email containing a link with the reset token.
     *
     * @param email - The email address to send the reset link to
     * @param token - The verification token to include in the email
     * @param subdomain - Optional subdomain context for multi-tenant applications
     * @returns Whether the email was successfully sent
     *
     * @see {@link VerifyToken} Token type for verification purposes
     * @see {@link onRequestPasswordReset} Event triggered when reset is requested
     * @see {@link getUserByEmail} Method used to find the user by email
     */
    sendPasswordResetEmail?(email: string, token: VerifyToken, subdomain?: string): Promise<boolean>;

    /**
     * Send an email verification email to a user
     *
     * This optional method is called when a user needs to verify their email address,
     * either during sign-up or when changing their email. It should send an email
     * containing a link with the verification token.
     *
     * @param userId - The ID of the user to send the verification email to
     * @param token - The verification token to include in the email
     * @param subdomain - Optional subdomain context for multi-tenant applications
     * @returns Whether the email was successfully sent
     *
     * @see {@link VerifyToken} Token type for verification purposes
     * @see {@link onResendVerificationEmail} Event triggered when verification email is resent
     * @see {@link onVerifyEmail} Event triggered when email is verified
     * @see {@link getUserById} Method used to find the user by ID
     */
    sendVerificationEmail?(userId: EntityId, token: VerifyToken, subdomain?: string): Promise<boolean>;
}

export interface IUserService extends UserServiceActions, UserServiceEvents {}

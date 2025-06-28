import { Directive, effect, inject, input, InputSignal, TemplateRef, ViewContainerRef } from "@angular/core";
import { isRoleObject, User } from "@hichchi/nest-connector/auth";
import { AuthState } from "../state";

/**
 * Angular structural directive for permission-based conditional rendering
 *
 * This directive conditionally displays or hides DOM elements based on the current user's permissions.
 * It integrates with the authentication state to check if the authenticated user has the required
 * permission to view the content. The directive uses Angular's structural directive pattern and
 * automatically updates when the user's authentication state or permissions change.
 *
 * The directive works by checking the user's role permissions against the required permission string.
 * If the user has the required permission, the template content is rendered; otherwise, it's removed
 * from the DOM.
 *
 * @example
 * ```html
 * <!-- Basic usage - show content only if user has 'users.read' permission -->
 * <div *hcPermission="'users.read'">
 *   <p>This content is only visible to users with read permission</p>
 * </div>
 * ```
 *
 * @example
 * ```html
 * <!-- Using with component properties -->
 * <button *hcPermission="'users.delete'" (click)="deleteUser()">
 *   Delete User
 * </button>
 * ```
 *
 * @example
 * ```html
 * <!-- Using with dynamic permissions -->
 * <ng-container *hcPermission="requiredPermission">
 *   <app-admin-panel></app-admin-panel>
 * </ng-container>
 * ```
 *
 * @example
 * ```typescript
 * // Component usage with dynamic permission
 * export class UserListComponent {
 *   requiredPermission = 'users.manage';
 * }
 * ```
 *
 * @see {@link AuthState} Authentication state service that provides user information
 * @see {@link User} User interface that contains role and permission information
 * @see {@link isRoleObject} Utility function to check if role is an object with permissions
 * @see {@link NgxHichchiAuthModule} Module that provides this directive
 */
@Directive({
    selector: "[hcPermission]",
})
export class PermissionDirective {
    /**
     * Template reference for the content to be conditionally rendered
     * @private
     */
    private templateRef = inject(TemplateRef);

    /**
     * View container reference for managing the template rendering
     * @private
     */
    private viewContainerRef = inject(ViewContainerRef);

    /**
     * Authentication state service for accessing current user information
     * @private
     */
    private authState = inject(AuthState);

    /**
     * Required permission string input signal
     *
     * This input defines the permission that the current user must have
     * for the template content to be displayed. The permission string
     * should match the permissions defined in the user's role.
     *
     * @example
     * ```html
     * <div *hcPermission="'users.read'">Content</div>
     * ```
     */
    hcPermission: InputSignal<string> = input.required<string>();

    /**
     * Constructor that sets up the permission checking effect
     *
     * Initializes an Angular effect that automatically re-evaluates permission
     * whenever the authentication state or required permission changes. This
     * ensures the UI stays in sync with the user's current permissions.
     */
    constructor() {
        effect(() => {
            if (this.hasPermission(this.authState.user(), this.hcPermission())) {
                if (this.viewContainerRef.length === 0) {
                    this.viewContainerRef.createEmbeddedView(this.templateRef);
                }
            } else {
                this.viewContainerRef.clear();
            }
        });
    }

    /**
     * Checks if the user has the required permission
     *
     * This method evaluates whether the provided user has the specified permission
     * by checking their role and associated permissions. It handles cases where
     * the user is null, has no role, or the role doesn't contain permissions.
     *
     * @param user - The user object to check permissions for, can be null
     * @param requiredPermission - The permission string that must be present in the user's role
     * @returns True if the user has the required permission, false otherwise
     *
     * @example
     * ```typescript
     * const hasPermission = this.hasPermission(currentUser, 'users.delete');
     * if (hasPermission) {
     *   // User can delete users
     * }
     * ```
     *
     * @private
     */
    private hasPermission(user: User | null, requiredPermission: string): boolean {
        if (!user || !user.role) {
            return false;
        }

        if (isRoleObject(user.role) && user.role.permissions) {
            return user.role.permissions.includes(requiredPermission);
        }

        return false;
    }
}

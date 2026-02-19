import { ModuleWithProviders, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AuthFormComponent } from "./components";
import { PermissionDirective } from "./directives";
import { AuthService } from "./services";
import { AuthConfig } from "./interfaces";
import { AUTH_CONFIG } from "./tokens";
import { ButtonComponent, HcCardComponent, HcSeparatorComponent } from "@hichchi/ngx-ui";

/**
 * Angular module for authentication functionality
 *
 * This module provides comprehensive authentication features for Angular applications,
 * including authentication forms, permission-based directives, and authentication services.
 * It integrates with the Hichchi authentication system and provides both components
 * and directives for building secure Angular applications.
 *
 * The module exports:
 * - AuthFormComponent: A ready-to-use authentication form component
 * - PermissionDirective: A structural directive for permission-based conditional rendering
 *
 * The module must be configured using the forRoot() method to provide the necessary
 * authentication configuration.
 *
 * Tenant handling:
 * - `tenant` can be provided in the configuration or dynamically set in requests
 *   via a custom HTTP header (`x-tenant`, controlled by `TENANT_HEADER_KEY`).
 * - This approach replaces previous subdomain-based tenant resolution.
 *
 * @example
 * ```typescript
 * // Basic module configuration
 * @NgModule({
 *   imports: [
 *     NgxHichchiAuthModule.forRoot({
 *       apiBaseURL: 'https://api.example.com'
 *     })
 *   ]
 * })
 * export class AppModule { }
 * ```
 *
 * @example
 * ```typescript
 * // Advanced configuration with custom authentication field
 * @NgModule({
 *   imports: [
 *     NgxHichchiAuthModule.forRoot({
 *       apiBaseURL: 'https://api.example.com',
 *       authField: AuthField.EMAIL
 *     })
 *   ]
 * })
 * export class AppModule { }
 * ```
 *
 * @example
 * ```typescript
 * // Optional static tenant header
 * @NgModule({
 *   imports: [
 *     NgxHichchiAuthModule.forRoot({
 *       apiBaseURL: 'https://api.example.com',
 *       tenant: 'tenant-a'
 *     })
 *   ]
 * })
 * export class AppModule { }
 * ```
 *
 * @see {@link AuthConfig} Configuration interface for the authentication module
 * @see {@link AuthFormComponent} Authentication form component
 * @see {@link PermissionDirective} Permission-based conditional rendering directive
 * @see {@link AuthService} Authentication service for managing user sessions
 */
@NgModule({
    declarations: [AuthFormComponent],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ButtonComponent,
        HcCardComponent,
        HcSeparatorComponent,
        PermissionDirective,
    ],
    exports: [AuthFormComponent, PermissionDirective],
})
/**
 * Root module for reusable authentication UI, directives, and providers.
 */
export class NgxHichchiAuthModule {
    /**
     * Configures the NgxHichchiAuthModule with the provided authentication configuration
     *
     * This static method sets up the module with the necessary providers and configuration
     * for authentication functionality. The configuration includes the `apiBaseURL` for
     * all authentication requests, and optionally a `tenant` string that is attached
     * to requests via the `TENANT_HEADER_KEY` header.
     *
     * @param config - The authentication configuration object containing API endpoints, tenant, and other settings
     * @returns A ModuleWithProviders object configured with authentication providers
     *
     * @example
     * ```typescript
     * // Basic configuration
     * NgxHichchiAuthModule.forRoot({
     *   apiBaseURL: 'https://api.example.com'
     * })
     * ```
     *
     * @example
     * ```typescript
     * // Configuration with environment variables and authentication field
     * NgxHichchiAuthModule.forRoot({
     *   apiBaseURL: environment.apiUrl,
     *   authField: AuthField.USERNAME
     * })
     * ```
     *
     * @example
     * ```typescript
     * // Configuration with static tenant
     * NgxHichchiAuthModule.forRoot({
     *   apiBaseURL: 'https://api.example.com',
     *   tenant: 'tenant-a'
     * })
     * ```
     *
     * @see {@link AuthConfig} Interface defining the configuration structure
     * @see {@link AUTH_CONFIG} Injection token for the authentication configuration
     * @see {@link AuthService} Service that uses the provided configuration
     */
    static forRoot(config: AuthConfig): ModuleWithProviders<NgxHichchiAuthModule> {
        return {
            ngModule: NgxHichchiAuthModule,
            providers: [{ provide: AUTH_CONFIG, useValue: config }, AuthService],
        };
    }
}

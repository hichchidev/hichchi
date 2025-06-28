/**
 * Injection token for authentication configuration
 *
 * This constant defines the injection token used by Angular's dependency injection
 * system to provide authentication configuration throughout the ngx-auth module.
 * It allows the AuthConfig interface to be injected into services and components
 * that need access to authentication settings.
 *
 * The token is used internally by the NgxHichchiAuthModule.forRoot() method to
 * register the authentication configuration as a provider, making it available
 * for injection in services like AuthService.
 *
 * This follows Angular's recommended pattern for providing configuration objects
 * to libraries and modules, ensuring type safety and proper dependency injection.
 *
 * @example
 * ```typescript
 * // Used internally by the module to provide configuration
 * @NgModule({
 *   providers: [
 *     { provide: AUTH_CONFIG, useValue: config },
 *     AuthService
 *   ]
 * })
 * export class NgxHichchiAuthModule {
 *   static forRoot(config: AuthConfig): ModuleWithProviders<NgxHichchiAuthModule> {
 *     return {
 *       ngModule: NgxHichchiAuthModule,
 *       providers: [
 *         { provide: AUTH_CONFIG, useValue: config },
 *         provideHttpClient(),
 *         AuthService
 *       ]
 *     };
 *   }
 * }
 * ```
 *
 * @example
 * ```typescript
 * // Injecting the configuration in a service
 * @Injectable()
 * export class AuthService {
 *   constructor(
 *     @Inject(AUTH_CONFIG) private readonly config: AuthConfig
 *   ) {
 *     console.log('API Base URL:', this.config.apiBaseURL);
 *     console.log('Auth Field:', this.config.authField);
 *   }
 * }
 * ```
 *
 * @example
 * ```typescript
 * // Using in a component (though typically not recommended)
 * @Component({
 *   selector: 'app-auth-info',
 *   template: `<p>API URL: {{ apiUrl }}</p>`
 * })
 * export class AuthInfoComponent {
 *   apiUrl: string;
 *
 *   constructor(@Inject(AUTH_CONFIG) private config: AuthConfig) {
 *     this.apiUrl = config.apiBaseURL;
 *   }
 * }
 * ```
 *
 * @see {@link AuthConfig} Interface that defines the structure of the configuration object
 * @see {@link NgxHichchiAuthModule} Module that uses this token to provide configuration
 * @see {@link AuthService} Service that injects this configuration
 */
export const AUTH_CONFIG = "AUTH_CONFIG";

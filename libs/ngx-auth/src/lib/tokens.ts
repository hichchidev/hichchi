import { InjectionToken } from "@angular/core";
import { AuthConfig } from "./interfaces";

/**
 * Injection token for the ngx-auth runtime configuration.
 *
 * This token is bound in `NgxHichchiAuthModule.forRoot(config)` as:
 * `{ provide: AUTH_CONFIG, useValue: config }`.
 * Consumers can inject it to access the same `AuthConfig` object
 * (for example `apiBaseURL` and optional `authField`).
 *
 * @example
 * ```typescript
 * NgxHichchiAuthModule.forRoot({
 *   apiBaseURL: "https://api.example.com",
 * });
 * ```
 *
 * @example
 * ```typescript
 * @Injectable()
 * export class ExampleService {
 *   constructor(@Inject(AUTH_CONFIG) private readonly config: AuthConfig) {
 *     console.log(this.config.apiBaseURL);
 *   }
 * }
 * ```
 *
 * @see {@link AuthConfig} Configuration contract provided through this token
 */
export const AUTH_CONFIG = new InjectionToken<AuthConfig>("AUTH_CONFIG");

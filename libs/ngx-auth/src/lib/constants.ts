/**
 * Width of the Google OAuth authentication popup window in pixels
 *
 * This constant defines the width of the popup window that opens during Google OAuth
 * authentication. The width is optimized to provide a good user experience while
 * ensuring the Google sign-in interface is fully visible and usable.
 *
 * @example
 * ```typescript
 * // Used internally in AuthService.googleSignIn()
 * const popup = window.open(
 *   googleAuthUrl,
 *   'google-login-popup',
 *   `width=${GOOGLE_AUTH_POPUP_WIDTH}, height=${GOOGLE_AUTH_POPUP_HEIGHT}`
 * );
 * ```
 *
 * @see {@link AuthService.googleSignIn} Method that uses this constant
 * @see {@link GOOGLE_AUTH_POPUP_HEIGHT} Related constant for popup height
 */
export const GOOGLE_AUTH_POPUP_WIDTH = 500;

/**
 * Height of the Google OAuth authentication popup window in pixels
 *
 * This constant defines the height of the popup window that opens during Google OAuth
 * authentication. The height is optimized to accommodate the Google sign-in interface
 * and provide sufficient space for user interaction.
 *
 * @example
 * ```typescript
 * // Used internally in AuthService.googleSignIn()
 * const popup = window.open(
 *   googleAuthUrl,
 *   'google-login-popup',
 *   `width=${GOOGLE_AUTH_POPUP_WIDTH}, height=${GOOGLE_AUTH_POPUP_HEIGHT}`
 * );
 * ```
 *
 * @see {@link AuthService.googleSignIn} Method that uses this constant
 * @see {@link GOOGLE_AUTH_POPUP_WIDTH} Related constant for popup width
 */
export const GOOGLE_AUTH_POPUP_HEIGHT = 600;

/**
 * Polling interval for checking Google OAuth popup status in milliseconds
 *
 * This constant defines how frequently (in milliseconds) the AuthService checks
 * the status of the Google OAuth popup window. The polling is used to detect
 * when the authentication process is complete or if the user has closed the popup.
 *
 * A shorter interval provides more responsive detection but uses more CPU resources.
 * The current value of 100ms provides a good balance between responsiveness and
 * performance.
 *
 * @example
 * ```typescript
 * // Used internally in AuthService.googleSignIn()
 * const interval = setInterval(() => {
 *   // Check popup status
 *   if (popup?.closed) {
 *     clearInterval(interval);
 *   }
 *   // Check for authentication completion
 * }, POPUP_POLLING_INTERVAL_MS);
 * ```
 *
 * @see {@link AuthService.googleSignIn} Method that uses this constant for popup polling
 */
export const POPUP_POLLING_INTERVAL_MS = 100;

/**
 * Key used to store authentication guard options in route data
 *
 * This constant defines the property name used to store authentication guard
 * configuration in Angular route data. It allows routes to specify custom
 * authentication requirements and behaviors.
 *
 * @example
 * ```typescript
 * // In route configuration
 * const routes: Routes = [
 *   {
 *     path: 'admin',
 *     component: AdminComponent,
 *     canActivate: [AuthGuard],
 *     data: {
 *       [AUTH_GUARD_OPTIONS_KEY]: {
 *         requiredPermissions: ['admin.read'],
 *         redirectTo: '/unauthorized'
 *       }
 *     }
 *   }
 * ];
 * ```
 *
 * @see {@link AuthGuardOption} Interface defining the structure of guard options
 */
export const AUTH_GUARD_OPTIONS_KEY = "authGuardOptions";

[**@hichchi/nest-connector**](../README.md)

---

[@hichchi/nest-connector](../README.md) / auth

# auth

## 📋 API Table of Contents

- [Enumerations](#enumerations)
  - [AuthEndpoint](#authendpoint)
  - [AuthErrorResponseCode](#autherrorresponsecode)
  - [AuthField](#authfield)
  - [AuthMethod](#authmethod)
  - [AuthProvider](#authprovider)
  - [AuthStrategy](#authstrategy)
  - [AuthSuccessResponseCode](#authsuccessresponsecode)
- [Functions](#functions)
  - [isRoleObject()](#isroleobject)
- [Interfaces](#interfaces)
  - [AuthResponse](#authresponse)
  - [BulkDeleteBody](#bulkdeletebody)
  - [EmailVerifyBody](#emailverifybody)
  - [GetAuthResponseBody](#getauthresponsebody)
  - [RefreshTokenBody](#refreshtokenbody)
  - [RequestResetBody](#requestresetbody)
  - [ResendEmailVerifyBody](#resendemailverifybody)
  - [ResetPasswordBody](#resetpasswordbody)
  - [ResetPasswordTokenVerifyBody](#resetpasswordtokenverifybody)
  - [Role\<R, P>](#roler-p)
  - [RoleBase\<R, P>](#rolebaser-p)
  - [SignInBody](#signinbody)
  - [SignUpBody](#signupbody)
  - [TokenResponse](#tokenresponse)
  - [Tokens](#tokens)
  - [UpdatePasswordBody](#updatepasswordbody)
  - [User\<R, P>](#userr-p)
  - [UserSession](#usersession)
- [Type Aliases](#type-aliases)
  - [AccessToken](#accesstoken)
  - [JWT](#jwt)
  - [RefreshToken](#refreshtoken)
  - [VerifyToken](#verifytoken)
- [Variables](#variables)
  - [AuthErrors](#autherrors)
  - [AuthSuccessResponses](#authsuccessresponses)

## Enumerations

### AuthEndpoint

Defined in: [lib/auth/enums/auth-endpoint.enum.ts:23](https://github.com/hichchidev/hichchi/blob/70fdee7ca8f6cceb9fa71d5e5e1eadc76e3aba50/libs/nest-connector/src/lib/auth/enums/auth-endpoint.enum.ts#L23)

Authentication Endpoints Enum

This enum defines all authentication-related endpoints used in the application.
Each value represents a specific API endpoint path segment for authentication operations.

Enum Values:

- `SIGN_UP`: User registration endpoint.
- `SIGN_IN`: Local authentication endpoint.
- `GOOGLE_SIGN_IN`: Initiates Google OAuth flow.
- `GOOGLE_CALLBACK`: Callback endpoint for Google OAuth.
- `AUTHENTICATE_SOCIAL`: Process social authentication data.
- `REFRESH_TOKEN`: Obtain a new access token using refresh token.
- `REQUEST_PASSWORD_RESET`: Request password reset link/code.
- `RESET_PASSWORD_VERIFY`: Verify password reset token/code.
- `RESEND_EMAIL_VERIFICATION`: Send verification email again.
- `VERIFY_EMAIL`: Confirm email verification.
- `RESET_PASSWORD`: Set new password after verification.
- `ME`: Get current authenticated user info.
- `CHANGE_PASSWORD`: Update user's password.
- `SIGN_OUT`: End user session/invalidate tokens.

#### Enumeration Members

<table>
<thead>
<tr>
<th>Enumeration Member</th>
<th>Value</th>
<th>Description</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="change_password"></a> `CHANGE_PASSWORD`

</td>
<td>

`"change-password"`

</td>
<td>

Update user's password

Allows authenticated users to change their password (requires current password).
This endpoint requires a valid JWT token and accepts both the current password
(for verification) and the new password. It validates the current password against
the stored credentials, and if valid, updates the user's password to the new value.
This endpoint is used for routine password changes by authenticated users, not for
password reset after forgetting credentials.

</td>
<td>

[lib/auth/enums/auth-endpoint.enum.ts:175](https://github.com/hichchidev/hichchi/blob/70fdee7ca8f6cceb9fa71d5e5e1eadc76e3aba50/libs/nest-connector/src/lib/auth/enums/auth-endpoint.enum.ts#L175)

</td>
</tr>
<tr>
<td>

<a id="get_auth_response"></a> `GET_AUTH_RESPONSE`

</td>
<td>

`"get-auth-response"`

</td>
<td>

Get authentication response from an existing token

This endpoint allows clients to retrieve a complete authentication response
using a previously issued JWT access token. It verifies the token,
retrieves the associated user information, generates new tokens,
and returns comprehensive authentication data.

This is useful for clients that need to exchange an existing token
for a complete authentication response containing user details and session information.

</td>
<td>

[lib/auth/enums/auth-endpoint.enum.ts:84](https://github.com/hichchidev/hichchi/blob/70fdee7ca8f6cceb9fa71d5e5e1eadc76e3aba50/libs/nest-connector/src/lib/auth/enums/auth-endpoint.enum.ts#L84)

</td>
</tr>
<tr>
<td>

<a id="google_callback"></a> `GOOGLE_CALLBACK`

</td>
<td>

`"google-callback"`

</td>
<td>

Callback endpoint for Google OAuth

Receives and processes authentication data after successful Google authentication.
This endpoint is called by Google's OAuth service after the user has successfully
authenticated. It extracts the authentication code, exchanges it for tokens,
and redirects the user to the original redirectUrl specified in the initial request,
passing the access token as a query parameter.

**See**

[GOOGLE_SIGN_IN](#google_sign_in) - The endpoint that initiates the OAuth flow

</td>
<td>

[lib/auth/enums/auth-endpoint.enum.ts:71](https://github.com/hichchidev/hichchi/blob/70fdee7ca8f6cceb9fa71d5e5e1eadc76e3aba50/libs/nest-connector/src/lib/auth/enums/auth-endpoint.enum.ts#L71)

</td>
</tr>
<tr>
<td>

<a id="google_sign_in"></a> `GOOGLE_SIGN_IN`

</td>
<td>

`"google-sign-in"`

</td>
<td>

Initiates Google OAuth flow

Redirects users to Google's authentication page to begin the OAuth process.
This endpoint starts the OAuth 2.0 flow with Google by redirecting the user
to Google's authentication page. It accepts a redirectUrl parameter that
specifies where to redirect after successful authentication.

The URL is stored in the OAuth state parameter to be used by the callback endpoint.

**See**

[GOOGLE_CALLBACK](#google_callback) - The endpoint that handles the OAuth callback

</td>
<td>

[lib/auth/enums/auth-endpoint.enum.ts:58](https://github.com/hichchidev/hichchi/blob/70fdee7ca8f6cceb9fa71d5e5e1eadc76e3aba50/libs/nest-connector/src/lib/auth/enums/auth-endpoint.enum.ts#L58)

</td>
</tr>
<tr>
<td>

<a id="me"></a> `ME`

</td>
<td>

`"me"`

</td>
<td>

Get current authenticated user info

Returns the profile and relevant information for the currently authenticated user.
This endpoint requires a valid JWT token and returns the user information associated
with that token. It allows client applications to retrieve up-to-date user data
for displaying profile information, checking permissions, or verifying authentication
status.

</td>
<td>

[lib/auth/enums/auth-endpoint.enum.ts:163](https://github.com/hichchidev/hichchi/blob/70fdee7ca8f6cceb9fa71d5e5e1eadc76e3aba50/libs/nest-connector/src/lib/auth/enums/auth-endpoint.enum.ts#L163)

</td>
</tr>
<tr>
<td>

<a id="refresh_token"></a> `REFRESH_TOKEN`

</td>
<td>

`"refresh-token"`

</td>
<td>

Obtain a new access token using refresh token

Allows clients to get a new access token without requiring re-authentication.
This endpoint accepts a valid refresh token and, if the token is valid and
not expired, issues new access and refresh tokens for continued authentication.

This enables longer user sessions without requiring frequent logins while still
maintaining security by using short-lived access tokens.

</td>
<td>

[lib/auth/enums/auth-endpoint.enum.ts:96](https://github.com/hichchidev/hichchi/blob/70fdee7ca8f6cceb9fa71d5e5e1eadc76e3aba50/libs/nest-connector/src/lib/auth/enums/auth-endpoint.enum.ts#L96)

</td>
</tr>
<tr>
<td>

<a id="request_password_reset"></a> `REQUEST_PASSWORD_RESET`

</td>
<td>

`"request-password-reset"`

</td>
<td>

Request password reset link/code

Initiates the password recovery process by sending reset instructions.
This endpoint accepts an email address, validates that it belongs to a registered
user, and sends a password reset link or code to that email address. For security,
it typically returns a success response regardless of whether the email exists
in the system to prevent email enumeration attacks.

</td>
<td>

[lib/auth/enums/auth-endpoint.enum.ts:107](https://github.com/hichchidev/hichchi/blob/70fdee7ca8f6cceb9fa71d5e5e1eadc76e3aba50/libs/nest-connector/src/lib/auth/enums/auth-endpoint.enum.ts#L107)

</td>
</tr>
<tr>
<td>

<a id="resend_email_verification"></a> `RESEND_EMAIL_VERIFICATION`

</td>
<td>

`"resend-email-verification"`

</td>
<td>

Send verification email again

Allows users to request a new verification email if the original expired or was lost.
This endpoint accepts an email address and, if it belongs to an unverified user,
generates a new verification token and sends a verification email to that address.
For security reasons, it typically returns a success response regardless of whether
the email exists or is already verified.

</td>
<td>

[lib/auth/enums/auth-endpoint.enum.ts:129](https://github.com/hichchidev/hichchi/blob/70fdee7ca8f6cceb9fa71d5e5e1eadc76e3aba50/libs/nest-connector/src/lib/auth/enums/auth-endpoint.enum.ts#L129)

</td>
</tr>
<tr>
<td>

<a id="reset_password"></a> `RESET_PASSWORD`

</td>
<td>

`"reset-password"`

</td>
<td>

Set new password after verification

Allows users to create a new password after identity verification.
This endpoint accepts a valid password reset token and a new password, then
updates the user's password if the token is valid. It should typically be called
after the token has been verified using the RESET_PASSWORD_VERIFY endpoint.
The endpoint invalidates the reset token after successful password reset to
prevent reuse.

</td>
<td>

[lib/auth/enums/auth-endpoint.enum.ts:152](https://github.com/hichchidev/hichchi/blob/70fdee7ca8f6cceb9fa71d5e5e1eadc76e3aba50/libs/nest-connector/src/lib/auth/enums/auth-endpoint.enum.ts#L152)

</td>
</tr>
<tr>
<td>

<a id="reset_password_verify"></a> `RESET_PASSWORD_VERIFY`

</td>
<td>

`"reset-password-verify"`

</td>
<td>

Verify password reset token/code

Validates the reset token before allowing password change.
This endpoint accepts a password reset token and verifies its validity without
actually resetting the password. This allows client applications to verify
a token before showing the password reset form to the user, improving user experience
by providing immediate feedback about expired or invalid tokens.

</td>
<td>

[lib/auth/enums/auth-endpoint.enum.ts:118](https://github.com/hichchidev/hichchi/blob/70fdee7ca8f6cceb9fa71d5e5e1eadc76e3aba50/libs/nest-connector/src/lib/auth/enums/auth-endpoint.enum.ts#L118)

</td>
</tr>
<tr>
<td>

<a id="sign_in"></a> `SIGN_IN`

</td>
<td>

`"sign-in"`

</td>
<td>

Local authentication endpoint

Authenticates users with username/email and password, returning authentication tokens.
This endpoint validates the provided credentials against stored user data and,
if valid, generates and returns access and refresh tokens for the authenticated session.

The endpoint also sets authentication cookies if configured to do so.

</td>
<td>

[lib/auth/enums/auth-endpoint.enum.ts:44](https://github.com/hichchidev/hichchi/blob/70fdee7ca8f6cceb9fa71d5e5e1eadc76e3aba50/libs/nest-connector/src/lib/auth/enums/auth-endpoint.enum.ts#L44)

</td>
</tr>
<tr>
<td>

<a id="sign_out"></a> `SIGN_OUT`

</td>
<td>

`"sign-out"`

</td>
<td>

End user session/invalidate tokens

Handles user logout by invalidating active authentication tokens.
This endpoint requires a valid JWT token and invalidates the current authentication
session by blacklisting or removing the refresh token, clearing authentication cookies
if they're being used, and performing any other cleanup necessary to terminate the
user session securely. After calling this endpoint, client applications should also
remove any locally stored tokens.

</td>
<td>

[lib/auth/enums/auth-endpoint.enum.ts:187](https://github.com/hichchidev/hichchi/blob/70fdee7ca8f6cceb9fa71d5e5e1eadc76e3aba50/libs/nest-connector/src/lib/auth/enums/auth-endpoint.enum.ts#L187)

</td>
</tr>
<tr>
<td>

<a id="sign_up"></a> `SIGN_UP`

</td>
<td>

`"sign-up"`

</td>
<td>

User registration endpoint

Handles new user account creation with provided credentials and profile information.
This endpoint accepts user registration data including email, password, and optional
profile details, then creates a new account in the system.

The endpoint may also trigger email verification, depending on configuration.

</td>
<td>

[lib/auth/enums/auth-endpoint.enum.ts:33](https://github.com/hichchidev/hichchi/blob/70fdee7ca8f6cceb9fa71d5e5e1eadc76e3aba50/libs/nest-connector/src/lib/auth/enums/auth-endpoint.enum.ts#L33)

</td>
</tr>
<tr>
<td>

<a id="verify_email"></a> `VERIFY_EMAIL`

</td>
<td>

`"verify-email"`

</td>
<td>

Confirm email verification

Processes the verification link clicked from email to confirm user's email address.
This endpoint is typically accessed via a link in the verification email sent to users.
It accepts a verification token, validates it, marks the user's email as verified if
the token is valid, and redirects the user to a configured URL with a query parameter
indicating whether the verification was successful.

</td>
<td>

[lib/auth/enums/auth-endpoint.enum.ts:140](https://github.com/hichchidev/hichchi/blob/70fdee7ca8f6cceb9fa71d5e5e1eadc76e3aba50/libs/nest-connector/src/lib/auth/enums/auth-endpoint.enum.ts#L140)

</td>
</tr>
</tbody>
</table>

---

### AuthErrorResponseCode

Defined in: [lib/auth/enums/auth-error-response.enum.ts:70](https://github.com/hichchidev/hichchi/blob/70fdee7ca8f6cceb9fa71d5e5e1eadc76e3aba50/libs/nest-connector/src/lib/auth/enums/auth-error-response.enum.ts#L70)

Authentication Error Response Codes Enum

This enum defines all error response codes related to authentication operations.
Each code represents a specific error condition that can occur during authentication
processes. The naming convention includes HTTP status codes (e.g., 400, 401, 403)
followed by a descriptive identifier.

The codes are organized by HTTP status categories:

- `400` series: Client errors (Bad Request, Unauthorized, Forbidden, Not Found, Conflict)
- `500` series: Server errors (Internal Server Error, Not Implemented)

Each prefix (`AUTH_` or `USER_`) indicates the domain of the error:

- `AUTH_`: Authentication service errors
- `USER_`: User management errors

Enum Values:

- `AUTH_400_EMAIL_ALREADY_VERIFIED`: Email already verified error.
- `AUTH_400_REDIRECT_URL_REQUIRED`: Redirect URL required error.
- `AUTH_401_CORS`: CORS error.
- `AUTH_401_INVALID_USERNAME_PASSWORD`: Invalid username/password combination.
- `AUTH_401_INVALID_EMAIL_PASSWORD`: Invalid email/password combination.
- `AUTH_401_INVALID_PASSWORD`: Invalid password.
- `AUTH_401_NOT_LOGGED_IN`: User not logged in.
- `AUTH_401_NOT_LOCAL`: Non-local authentication attempt.
- `AUTH_401_SOCIAL_SIGN_IN`: Social sign-in error.
- `AUTH_401_EMAIL_NOT_VERIFIED`: Email not verified.
- `AUTH_401_NOT_ACTIVE`: Account not active.
- `AUTH_401_TOKEN_NOT_SET`: Authentication token not set.
- `AUTH_401_REFRESH_TOKEN_NOT_SET`: Refresh token not set.
- `AUTH_401_INVALID_TOKEN`: Invalid authentication token.
- `AUTH_401_EXPIRED_TOKEN`: Expired authentication token.
- `AUTH_401_INVALID_VERIFICATION_TOKEN`: Invalid email verification token.
- `AUTH_401_INVALID_PASSWORD_RESET_TOKEN`: Invalid password reset token.
- `AUTH_401_INVALID_REFRESH_TOKEN`: Invalid refresh token.
- `AUTH_401_EXPIRED_REFRESH_TOKEN`: Expired refresh token.
- `AUTH_401_EXPIRED_OR_INVALID_PASSWORD_RESET_TOKEN`: Expired or invalid password reset token.
- `AUTH_401_UNKNOWN`: Unknown authentication error.
- `AUTH_403_PENDING`: Pending account approval.
- `AUTH_403_ACCOUNT_DISABLED`: Account disabled.
- `AUTH_403_ROLE_FORBIDDEN`: Insufficient role.
- `AUTH_403_PERMISSION_FORBIDDEN`: Insufficient role permissions.
- `AUTH_404_EMAIL`: Email not found.
- `AUTH_500_SIGN_UP`: Sign up error.
- `AUTH_500_SOCIAL_SIGN_UP`: Social sign up error.
- `AUTH_500_SIGN_IN`: Sign in error.
- `AUTH_500_SOCIAL_SIGN_IN`: Social sign in error.
- `AUTH_500_SOCIAL_SIGN_IN_CALLBACK`: Social sign in callback error.
- `AUTH_500_SIGN_OUT`: Sign out error.
- `AUTH_500_SEND_EMAIL_VERIFICATION`: Email verification sending error.
- `AUTH_500_VERIFY_EMAIL`: Email verification error.
- `AUTH_500_REQUEST_PASSWORD_RESET`: Password reset request error.
- `AUTH_500_PASSWORD_RESET`: Password reset error.
- `AUTH_500`: Generic authentication error.
- `AUTH_501_NOT_IMPLEMENTED`: Feature not implemented.
- `USER_400_EMPTY_EMAIL`: Empty email field.
- `USER_400_EMPTY_FNAME`: Empty first name field.
- `USER_400_EMPTY_LNAME`: Empty last name field.
- `USER_400_EMPTY_UNAME`: Empty username field.
- `USER_400_EMPTY_PASSWORD`: Empty password field.
- `USER_400_INVALID_EMAIL`: Invalid email format.
- `USER_400_NOT_EMPTY_UNAME`: Username should not be empty.
- `USER_400_NOT_EMPTY_PASSWORD`: Password should not be empty.
- `USER_400_NOT_EMPTY_SALT`: Salt should not be empty.
- `USER_403_SIGN_UP`: Sign up forbidden.
- `USER_404_ID`: User not found.
- `USER_409_EXIST_UNAME`: Username already exists.
- `USER_500_CREATE`: User creation error.

#### Enumeration Members

<table>
<thead>
<tr>
<th>Enumeration Member</th>
<th>Value</th>
<th>Description</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="auth_400_email_already_verified"></a> `AUTH_400_EMAIL_ALREADY_VERIFIED`

</td>
<td>

`"AUTH_400_EMAIL_ALREADY_VERIFIED"`

</td>
<td>

Email already verified error (400 Bad Request)

Occurs when attempting to verify an email that has already been verified.

</td>
<td>

[lib/auth/enums/auth-error-response.enum.ts:76](https://github.com/hichchidev/hichchi/blob/70fdee7ca8f6cceb9fa71d5e5e1eadc76e3aba50/libs/nest-connector/src/lib/auth/enums/auth-error-response.enum.ts#L76)

</td>
</tr>
<tr>
<td>

<a id="auth_400_redirect_url_required"></a> `AUTH_400_REDIRECT_URL_REQUIRED`

</td>
<td>

`"AUTH_400_REDIRECT_URL_REQUIRED"`

</td>
<td>

Redirect URL required error (400 Bad Request)

Occurs when a redirect URL is required for an operation but not provided.

</td>
<td>

[lib/auth/enums/auth-error-response.enum.ts:83](https://github.com/hichchidev/hichchi/blob/70fdee7ca8f6cceb9fa71d5e5e1eadc76e3aba50/libs/nest-connector/src/lib/auth/enums/auth-error-response.enum.ts#L83)

</td>
</tr>
<tr>
<td>

<a id="auth_401_cors"></a> `AUTH_401_CORS`

</td>
<td>

`"AUTH_401_CORS"`

</td>
<td>

CORS error (401 Unauthorized)

Occurs when a cross-origin request is not allowed due to security restrictions.

</td>
<td>

[lib/auth/enums/auth-error-response.enum.ts:90](https://github.com/hichchidev/hichchi/blob/70fdee7ca8f6cceb9fa71d5e5e1eadc76e3aba50/libs/nest-connector/src/lib/auth/enums/auth-error-response.enum.ts#L90)

</td>
</tr>
<tr>
<td>

<a id="auth_401_email_not_verified"></a> `AUTH_401_EMAIL_NOT_VERIFIED`

</td>
<td>

`"AUTH_401_EMAIL_NOT_VERIFIED"`

</td>
<td>

Email not verified (401 Unauthorized)

Occurs when attempting to access resources that require email verification
before the user has verified their email address.

</td>
<td>

[lib/auth/enums/auth-error-response.enum.ts:141](https://github.com/hichchidev/hichchi/blob/70fdee7ca8f6cceb9fa71d5e5e1eadc76e3aba50/libs/nest-connector/src/lib/auth/enums/auth-error-response.enum.ts#L141)

</td>
</tr>
<tr>
<td>

<a id="auth_401_expired_or_invalid_password_reset_token"></a> `AUTH_401_EXPIRED_OR_INVALID_PASSWORD_RESET_TOKEN`

</td>
<td>

`"AUTH_401_EXPIRED_OR_INVALID_PASSWORD_RESET_TOKEN"`

</td>
<td>

Expired or invalid password reset token (401 Unauthorized)

Occurs when attempting to reset a password with a token that is either invalid or expired.

</td>
<td>

[lib/auth/enums/auth-error-response.enum.ts:211](https://github.com/hichchidev/hichchi/blob/70fdee7ca8f6cceb9fa71d5e5e1eadc76e3aba50/libs/nest-connector/src/lib/auth/enums/auth-error-response.enum.ts#L211)

</td>
</tr>
<tr>
<td>

<a id="auth_401_expired_refresh_token"></a> `AUTH_401_EXPIRED_REFRESH_TOKEN`

</td>
<td>

`"AUTH_401_EXPIRED_REFRESH_TOKEN"`

</td>
<td>

Expired refresh token (401 Unauthorized)

Occurs when attempting to refresh an access token with an expired refresh token.

</td>
<td>

[lib/auth/enums/auth-error-response.enum.ts:204](https://github.com/hichchidev/hichchi/blob/70fdee7ca8f6cceb9fa71d5e5e1eadc76e3aba50/libs/nest-connector/src/lib/auth/enums/auth-error-response.enum.ts#L204)

</td>
</tr>
<tr>
<td>

<a id="auth_401_expired_token"></a> `AUTH_401_EXPIRED_TOKEN`

</td>
<td>

`"AUTH_401_EXPIRED_TOKEN"`

</td>
<td>

Expired authentication token (401 Unauthorized)

Occurs when the provided authentication token has expired.

</td>
<td>

[lib/auth/enums/auth-error-response.enum.ts:176](https://github.com/hichchidev/hichchi/blob/70fdee7ca8f6cceb9fa71d5e5e1eadc76e3aba50/libs/nest-connector/src/lib/auth/enums/auth-error-response.enum.ts#L176)

</td>
</tr>
<tr>
<td>

<a id="auth_401_invalid_email_password"></a> `AUTH_401_INVALID_EMAIL_PASSWORD`

</td>
<td>

`"AUTH_401_INVALID_EMAIL_PASSWORD"`

</td>
<td>

Invalid email/password combination (401 Unauthorized)

Occurs when authentication fails due to incorrect email and password combination.

</td>
<td>

[lib/auth/enums/auth-error-response.enum.ts:104](https://github.com/hichchidev/hichchi/blob/70fdee7ca8f6cceb9fa71d5e5e1eadc76e3aba50/libs/nest-connector/src/lib/auth/enums/auth-error-response.enum.ts#L104)

</td>
</tr>
<tr>
<td>

<a id="auth_401_invalid_password"></a> `AUTH_401_INVALID_PASSWORD`

</td>
<td>

`"AUTH_401_INVALID_PASSWORD"`

</td>
<td>

Invalid password (401 Unauthorized)

Occurs when authentication fails due to incorrect password.

</td>
<td>

[lib/auth/enums/auth-error-response.enum.ts:111](https://github.com/hichchidev/hichchi/blob/70fdee7ca8f6cceb9fa71d5e5e1eadc76e3aba50/libs/nest-connector/src/lib/auth/enums/auth-error-response.enum.ts#L111)

</td>
</tr>
<tr>
<td>

<a id="auth_401_invalid_password_reset_token"></a> `AUTH_401_INVALID_PASSWORD_RESET_TOKEN`

</td>
<td>

`"AUTH_401_INVALID_PASSWORD_RESET_TOKEN"`

</td>
<td>

Invalid password reset token (401 Unauthorized)

Occurs when attempting to reset a password with an invalid token.

</td>
<td>

[lib/auth/enums/auth-error-response.enum.ts:190](https://github.com/hichchidev/hichchi/blob/70fdee7ca8f6cceb9fa71d5e5e1eadc76e3aba50/libs/nest-connector/src/lib/auth/enums/auth-error-response.enum.ts#L190)

</td>
</tr>
<tr>
<td>

<a id="auth_401_invalid_refresh_token"></a> `AUTH_401_INVALID_REFRESH_TOKEN`

</td>
<td>

`"AUTH_401_INVALID_REFRESH_TOKEN"`

</td>
<td>

Invalid refresh token (401 Unauthorized)

Occurs when attempting to refresh an access token with an invalid refresh token.

</td>
<td>

[lib/auth/enums/auth-error-response.enum.ts:197](https://github.com/hichchidev/hichchi/blob/70fdee7ca8f6cceb9fa71d5e5e1eadc76e3aba50/libs/nest-connector/src/lib/auth/enums/auth-error-response.enum.ts#L197)

</td>
</tr>
<tr>
<td>

<a id="auth_401_invalid_token"></a> `AUTH_401_INVALID_TOKEN`

</td>
<td>

`"AUTH_401_INVALID_TOKEN"`

</td>
<td>

Invalid authentication token (401 Unauthorized)

Occurs when the provided authentication token is malformed or invalid.

</td>
<td>

[lib/auth/enums/auth-error-response.enum.ts:169](https://github.com/hichchidev/hichchi/blob/70fdee7ca8f6cceb9fa71d5e5e1eadc76e3aba50/libs/nest-connector/src/lib/auth/enums/auth-error-response.enum.ts#L169)

</td>
</tr>
<tr>
<td>

<a id="auth_401_invalid_username_password"></a> `AUTH_401_INVALID_USERNAME_PASSWORD`

</td>
<td>

`"AUTH_401_INVALID_USERNAME_PASSWORD"`

</td>
<td>

Invalid username/password combination (401 Unauthorized)

Occurs when authentication fails due to incorrect username and password combination.

</td>
<td>

[lib/auth/enums/auth-error-response.enum.ts:97](https://github.com/hichchidev/hichchi/blob/70fdee7ca8f6cceb9fa71d5e5e1eadc76e3aba50/libs/nest-connector/src/lib/auth/enums/auth-error-response.enum.ts#L97)

</td>
</tr>
<tr>
<td>

<a id="auth_401_invalid_verification_token"></a> `AUTH_401_INVALID_VERIFICATION_TOKEN`

</td>
<td>

`"AUTH_401_INVALID_VERIFICATION_TOKEN"`

</td>
<td>

Invalid email verification token (401 Unauthorized)

Occurs when attempting to verify an email with an invalid token.

</td>
<td>

[lib/auth/enums/auth-error-response.enum.ts:183](https://github.com/hichchidev/hichchi/blob/70fdee7ca8f6cceb9fa71d5e5e1eadc76e3aba50/libs/nest-connector/src/lib/auth/enums/auth-error-response.enum.ts#L183)

</td>
</tr>
<tr>
<td>

<a id="auth_401_not_active"></a> `AUTH_401_NOT_ACTIVE`

</td>
<td>

`"AUTH_401_NOT_ACTIVE"`

</td>
<td>

Account not active (401 Unauthorized)

Occurs when attempting to authenticate with an inactive account.

</td>
<td>

[lib/auth/enums/auth-error-response.enum.ts:148](https://github.com/hichchidev/hichchi/blob/70fdee7ca8f6cceb9fa71d5e5e1eadc76e3aba50/libs/nest-connector/src/lib/auth/enums/auth-error-response.enum.ts#L148)

</td>
</tr>
<tr>
<td>

<a id="auth_401_not_local"></a> `AUTH_401_NOT_LOCAL`

</td>
<td>

`"AUTH_401_NOT_LOCAL"`

</td>
<td>

Non-local authentication attempt (401 Unauthorized)

Occurs when attempting to use local authentication methods for an account
that was created using social authentication.

</td>
<td>

[lib/auth/enums/auth-error-response.enum.ts:126](https://github.com/hichchidev/hichchi/blob/70fdee7ca8f6cceb9fa71d5e5e1eadc76e3aba50/libs/nest-connector/src/lib/auth/enums/auth-error-response.enum.ts#L126)

</td>
</tr>
<tr>
<td>

<a id="auth_401_not_logged_in"></a> `AUTH_401_NOT_LOGGED_IN`

</td>
<td>

`"AUTH_401_NOT_LOGGED_IN"`

</td>
<td>

User not logged in (401 Unauthorized)

Occurs when accessing a protected resource without authentication.

</td>
<td>

[lib/auth/enums/auth-error-response.enum.ts:118](https://github.com/hichchidev/hichchi/blob/70fdee7ca8f6cceb9fa71d5e5e1eadc76e3aba50/libs/nest-connector/src/lib/auth/enums/auth-error-response.enum.ts#L118)

</td>
</tr>
<tr>
<td>

<a id="auth_401_refresh_token_not_set"></a> `AUTH_401_REFRESH_TOKEN_NOT_SET`

</td>
<td>

`"AUTH_401_REFRESH_TOKEN_NOT_SET"`

</td>
<td>

Refresh token not set (401 Unauthorized)

Occurs when attempting to refresh an access token without providing a refresh token.

</td>
<td>

[lib/auth/enums/auth-error-response.enum.ts:162](https://github.com/hichchidev/hichchi/blob/70fdee7ca8f6cceb9fa71d5e5e1eadc76e3aba50/libs/nest-connector/src/lib/auth/enums/auth-error-response.enum.ts#L162)

</td>
</tr>
<tr>
<td>

<a id="auth_401_social_sign_in"></a> `AUTH_401_SOCIAL_SIGN_IN`

</td>
<td>

`"AUTH_401_SOCIAL_SIGN_IN"`

</td>
<td>

Social sign-in error (401 Unauthorized)

Occurs when there is an issue with social authentication process.

</td>
<td>

[lib/auth/enums/auth-error-response.enum.ts:133](https://github.com/hichchidev/hichchi/blob/70fdee7ca8f6cceb9fa71d5e5e1eadc76e3aba50/libs/nest-connector/src/lib/auth/enums/auth-error-response.enum.ts#L133)

</td>
</tr>
<tr>
<td>

<a id="auth_401_token_not_set"></a> `AUTH_401_TOKEN_NOT_SET`

</td>
<td>

`"AUTH_401_TOKEN_NOT_SET"`

</td>
<td>

Authentication token not set (401 Unauthorized)

Occurs when no authentication token is provided for a protected resource.

</td>
<td>

[lib/auth/enums/auth-error-response.enum.ts:155](https://github.com/hichchidev/hichchi/blob/70fdee7ca8f6cceb9fa71d5e5e1eadc76e3aba50/libs/nest-connector/src/lib/auth/enums/auth-error-response.enum.ts#L155)

</td>
</tr>
<tr>
<td>

<a id="auth_401_unknown"></a> `AUTH_401_UNKNOWN`

</td>
<td>

`"AUTH_401_UNKNOWN"`

</td>
<td>

Unknown authentication error (401 Unauthorized)

Generic authentication error when the specific cause cannot be determined.

</td>
<td>

[lib/auth/enums/auth-error-response.enum.ts:218](https://github.com/hichchidev/hichchi/blob/70fdee7ca8f6cceb9fa71d5e5e1eadc76e3aba50/libs/nest-connector/src/lib/auth/enums/auth-error-response.enum.ts#L218)

</td>
</tr>
<tr>
<td>

<a id="auth_403_account_disabled"></a> `AUTH_403_ACCOUNT_DISABLED`

</td>
<td>

`"AUTH_403_ACCOUNT_DISABLED"`

</td>
<td>

Account disabled (403 Forbidden)

Occurs when attempting to authenticate with a disabled account.

</td>
<td>

[lib/auth/enums/auth-error-response.enum.ts:232](https://github.com/hichchidev/hichchi/blob/70fdee7ca8f6cceb9fa71d5e5e1eadc76e3aba50/libs/nest-connector/src/lib/auth/enums/auth-error-response.enum.ts#L232)

</td>
</tr>
<tr>
<td>

<a id="auth_403_pending"></a> `AUTH_403_PENDING`

</td>
<td>

`"AUTH_403_PENDING"`

</td>
<td>

Pending account approval (403 Forbidden)

Occurs when attempting to access resources with an account that is still pending approval.

</td>
<td>

[lib/auth/enums/auth-error-response.enum.ts:225](https://github.com/hichchidev/hichchi/blob/70fdee7ca8f6cceb9fa71d5e5e1eadc76e3aba50/libs/nest-connector/src/lib/auth/enums/auth-error-response.enum.ts#L225)

</td>
</tr>
<tr>
<td>

<a id="auth_403_permission_forbidden"></a> `AUTH_403_PERMISSION_FORBIDDEN`

</td>
<td>

`"AUTH_403_PERMISSION_FORBIDDEN"`

</td>
<td>

Insufficient role permissions (403 Forbidden)

Occurs when a user attempts to access a resource that requires higher privileges.

</td>
<td>

[lib/auth/enums/auth-error-response.enum.ts:246](https://github.com/hichchidev/hichchi/blob/70fdee7ca8f6cceb9fa71d5e5e1eadc76e3aba50/libs/nest-connector/src/lib/auth/enums/auth-error-response.enum.ts#L246)

</td>
</tr>
<tr>
<td>

<a id="auth_403_role_forbidden"></a> `AUTH_403_ROLE_FORBIDDEN`

</td>
<td>

`"AUTH_403_ROLE_FORBIDDEN"`

</td>
<td>

Insufficient role (403 Forbidden)

Occurs when a user attempts to access a resource that requires higher privileges.

</td>
<td>

[lib/auth/enums/auth-error-response.enum.ts:239](https://github.com/hichchidev/hichchi/blob/70fdee7ca8f6cceb9fa71d5e5e1eadc76e3aba50/libs/nest-connector/src/lib/auth/enums/auth-error-response.enum.ts#L239)

</td>
</tr>
<tr>
<td>

<a id="auth_404_email"></a> `AUTH_404_EMAIL`

</td>
<td>

`"AUTH_404_EMAIL"`

</td>
<td>

Email not found (404 Not Found)

Occurs when attempting operations on an email address that doesn't exist in the system.

</td>
<td>

[lib/auth/enums/auth-error-response.enum.ts:253](https://github.com/hichchidev/hichchi/blob/70fdee7ca8f6cceb9fa71d5e5e1eadc76e3aba50/libs/nest-connector/src/lib/auth/enums/auth-error-response.enum.ts#L253)

</td>
</tr>
<tr>
<td>

<a id="auth_500"></a> `AUTH_500`

</td>
<td>

`"AUTH_500"`

</td>
<td>

Generic authentication error (500 Internal Server Error)

Generic server-side error in the authentication service.

</td>
<td>

[lib/auth/enums/auth-error-response.enum.ts:331](https://github.com/hichchidev/hichchi/blob/70fdee7ca8f6cceb9fa71d5e5e1eadc76e3aba50/libs/nest-connector/src/lib/auth/enums/auth-error-response.enum.ts#L331)

</td>
</tr>
<tr>
<td>

<a id="auth_500_password_reset"></a> `AUTH_500_PASSWORD_RESET`

</td>
<td>

`"AUTH_500_PASSWORD_RESET"`

</td>
<td>

Password reset error (500 Internal Server Error)

Occurs when there is a server-side error processing a password reset.

</td>
<td>

[lib/auth/enums/auth-error-response.enum.ts:324](https://github.com/hichchidev/hichchi/blob/70fdee7ca8f6cceb9fa71d5e5e1eadc76e3aba50/libs/nest-connector/src/lib/auth/enums/auth-error-response.enum.ts#L324)

</td>
</tr>
<tr>
<td>

<a id="auth_500_request_password_reset"></a> `AUTH_500_REQUEST_PASSWORD_RESET`

</td>
<td>

`"AUTH_500_REQUEST_PASSWORD_RESET"`

</td>
<td>

Password reset request error (500 Internal Server Error)

Occurs when there is a server-side error processing a password reset request.

</td>
<td>

[lib/auth/enums/auth-error-response.enum.ts:317](https://github.com/hichchidev/hichchi/blob/70fdee7ca8f6cceb9fa71d5e5e1eadc76e3aba50/libs/nest-connector/src/lib/auth/enums/auth-error-response.enum.ts#L317)

</td>
</tr>
<tr>
<td>

<a id="auth_500_send_email_verification"></a> `AUTH_500_SEND_EMAIL_VERIFICATION`

</td>
<td>

`"AUTH_500_SEND_EMAIL_VERIFICATION"`

</td>
<td>

Email verification sending error (500 Internal Server Error)

Occurs when there is a server-side error sending the verification email.

</td>
<td>

[lib/auth/enums/auth-error-response.enum.ts:303](https://github.com/hichchidev/hichchi/blob/70fdee7ca8f6cceb9fa71d5e5e1eadc76e3aba50/libs/nest-connector/src/lib/auth/enums/auth-error-response.enum.ts#L303)

</td>
</tr>
<tr>
<td>

<a id="auth_500_sign_in"></a> `AUTH_500_SIGN_IN`

</td>
<td>

`"AUTH_500_SIGN_IN"`

</td>
<td>

Sign in error (500 Internal Server Error)

Occurs when there is a server-side error during the authentication process.

</td>
<td>

[lib/auth/enums/auth-error-response.enum.ts:274](https://github.com/hichchidev/hichchi/blob/70fdee7ca8f6cceb9fa71d5e5e1eadc76e3aba50/libs/nest-connector/src/lib/auth/enums/auth-error-response.enum.ts#L274)

</td>
</tr>
<tr>
<td>

<a id="auth_500_sign_out"></a> `AUTH_500_SIGN_OUT`

</td>
<td>

`"AUTH_500_SIGN_OUT"`

</td>
<td>

Sign out error (500 Internal Server Error)

Occurs when there is a server-side error during the sign-out process,
such as failure to clear sessions, tokens, or other authentication data.

</td>
<td>

[lib/auth/enums/auth-error-response.enum.ts:296](https://github.com/hichchidev/hichchi/blob/70fdee7ca8f6cceb9fa71d5e5e1eadc76e3aba50/libs/nest-connector/src/lib/auth/enums/auth-error-response.enum.ts#L296)

</td>
</tr>
<tr>
<td>

<a id="auth_500_sign_up"></a> `AUTH_500_SIGN_UP`

</td>
<td>

`"AUTH_500_SIGN_UP"`

</td>
<td>

Sign up error (500 Internal Server Error)

Occurs when there is a server-side error during the registration process.

</td>
<td>

[lib/auth/enums/auth-error-response.enum.ts:260](https://github.com/hichchidev/hichchi/blob/70fdee7ca8f6cceb9fa71d5e5e1eadc76e3aba50/libs/nest-connector/src/lib/auth/enums/auth-error-response.enum.ts#L260)

</td>
</tr>
<tr>
<td>

<a id="auth_500_social_sign_in"></a> `AUTH_500_SOCIAL_SIGN_IN`

</td>
<td>

`"AUTH_500_SOCIAL_SIGN_IN"`

</td>
<td>

Social sign in error (500 Internal Server Error)

Occurs when there is a server-side error during social authentication.

</td>
<td>

[lib/auth/enums/auth-error-response.enum.ts:281](https://github.com/hichchidev/hichchi/blob/70fdee7ca8f6cceb9fa71d5e5e1eadc76e3aba50/libs/nest-connector/src/lib/auth/enums/auth-error-response.enum.ts#L281)

</td>
</tr>
<tr>
<td>

<a id="auth_500_social_sign_in_callback"></a> `AUTH_500_SOCIAL_SIGN_IN_CALLBACK`

</td>
<td>

`"AUTH_500_SOCIAL_SIGN_IN_CALLBACK"`

</td>
<td>

Social sign in callback error (500 Internal Server Error)

Occurs when there is a server-side error processing the social authentication callback.

</td>
<td>

[lib/auth/enums/auth-error-response.enum.ts:288](https://github.com/hichchidev/hichchi/blob/70fdee7ca8f6cceb9fa71d5e5e1eadc76e3aba50/libs/nest-connector/src/lib/auth/enums/auth-error-response.enum.ts#L288)

</td>
</tr>
<tr>
<td>

<a id="auth_500_social_sign_up"></a> `AUTH_500_SOCIAL_SIGN_UP`

</td>
<td>

`"AUTH_500_SOCIAL_SIGN_UP"`

</td>
<td>

Social sign up error (500 Internal Server Error)

Occurs when there is a server-side error during social registration.

</td>
<td>

[lib/auth/enums/auth-error-response.enum.ts:267](https://github.com/hichchidev/hichchi/blob/70fdee7ca8f6cceb9fa71d5e5e1eadc76e3aba50/libs/nest-connector/src/lib/auth/enums/auth-error-response.enum.ts#L267)

</td>
</tr>
<tr>
<td>

<a id="auth_500_verify_email"></a> `AUTH_500_VERIFY_EMAIL`

</td>
<td>

`"AUTH_500_VERIFY_EMAIL"`

</td>
<td>

Email verification error (500 Internal Server Error)

Occurs when there is a server-side error processing the email verification.

</td>
<td>

[lib/auth/enums/auth-error-response.enum.ts:310](https://github.com/hichchidev/hichchi/blob/70fdee7ca8f6cceb9fa71d5e5e1eadc76e3aba50/libs/nest-connector/src/lib/auth/enums/auth-error-response.enum.ts#L310)

</td>
</tr>
<tr>
<td>

<a id="auth_501_not_implemented"></a> `AUTH_501_NOT_IMPLEMENTED`

</td>
<td>

`"AUTH_501_NOT_IMPLEMENTED"`

</td>
<td>

Feature not implemented (501 Not Implemented)

Occurs when attempting to use an authentication feature that is not yet implemented.

</td>
<td>

[lib/auth/enums/auth-error-response.enum.ts:338](https://github.com/hichchidev/hichchi/blob/70fdee7ca8f6cceb9fa71d5e5e1eadc76e3aba50/libs/nest-connector/src/lib/auth/enums/auth-error-response.enum.ts#L338)

</td>
</tr>
<tr>
<td>

<a id="user_400_empty_email"></a> `USER_400_EMPTY_EMAIL`

</td>
<td>

`"USER_400_EMPTY_EMAIL"`

</td>
<td>

Empty email field (400 Bad Request)

Occurs when the email field is required but not provided.

</td>
<td>

[lib/auth/enums/auth-error-response.enum.ts:345](https://github.com/hichchidev/hichchi/blob/70fdee7ca8f6cceb9fa71d5e5e1eadc76e3aba50/libs/nest-connector/src/lib/auth/enums/auth-error-response.enum.ts#L345)

</td>
</tr>
<tr>
<td>

<a id="user_400_empty_fname"></a> `USER_400_EMPTY_FNAME`

</td>
<td>

`"USER_400_EMPTY_FNAME"`

</td>
<td>

Empty first name field (400 Bad Request)

Occurs when the first name field is required but not provided.

</td>
<td>

[lib/auth/enums/auth-error-response.enum.ts:352](https://github.com/hichchidev/hichchi/blob/70fdee7ca8f6cceb9fa71d5e5e1eadc76e3aba50/libs/nest-connector/src/lib/auth/enums/auth-error-response.enum.ts#L352)

</td>
</tr>
<tr>
<td>

<a id="user_400_empty_lname"></a> `USER_400_EMPTY_LNAME`

</td>
<td>

`"USER_400_EMPTY_LNAME"`

</td>
<td>

Empty last name field (400 Bad Request)

Occurs when the last name field is required but not provided.

</td>
<td>

[lib/auth/enums/auth-error-response.enum.ts:359](https://github.com/hichchidev/hichchi/blob/70fdee7ca8f6cceb9fa71d5e5e1eadc76e3aba50/libs/nest-connector/src/lib/auth/enums/auth-error-response.enum.ts#L359)

</td>
</tr>
<tr>
<td>

<a id="user_400_empty_password"></a> `USER_400_EMPTY_PASSWORD`

</td>
<td>

`"USER_400_EMPTY_PASSWORD"`

</td>
<td>

Empty password field (400 Bad Request)

Occurs when the password field is required but not provided.

</td>
<td>

[lib/auth/enums/auth-error-response.enum.ts:373](https://github.com/hichchidev/hichchi/blob/70fdee7ca8f6cceb9fa71d5e5e1eadc76e3aba50/libs/nest-connector/src/lib/auth/enums/auth-error-response.enum.ts#L373)

</td>
</tr>
<tr>
<td>

<a id="user_400_empty_uname"></a> `USER_400_EMPTY_UNAME`

</td>
<td>

`"USER_400_EMPTY_UNAME"`

</td>
<td>

Empty username field (400 Bad Request)

Occurs when the username field is required but not provided.

</td>
<td>

[lib/auth/enums/auth-error-response.enum.ts:366](https://github.com/hichchidev/hichchi/blob/70fdee7ca8f6cceb9fa71d5e5e1eadc76e3aba50/libs/nest-connector/src/lib/auth/enums/auth-error-response.enum.ts#L366)

</td>
</tr>
<tr>
<td>

<a id="user_400_invalid_email"></a> `USER_400_INVALID_EMAIL`

</td>
<td>

`"USER_400_INVALID_EMAIL"`

</td>
<td>

Invalid email format (400 Bad Request)

Occurs when the provided email address doesn't match a valid email format.

</td>
<td>

[lib/auth/enums/auth-error-response.enum.ts:380](https://github.com/hichchidev/hichchi/blob/70fdee7ca8f6cceb9fa71d5e5e1eadc76e3aba50/libs/nest-connector/src/lib/auth/enums/auth-error-response.enum.ts#L380)

</td>
</tr>
<tr>
<td>

<a id="user_400_not_empty_password"></a> `USER_400_NOT_EMPTY_PASSWORD`

</td>
<td>

`"USER_400_NOT_EMPTY_PASSWORD"`

</td>
<td>

Password should not be empty (400 Bad Request)

Validation error when password is expected to have a value.

</td>
<td>

[lib/auth/enums/auth-error-response.enum.ts:394](https://github.com/hichchidev/hichchi/blob/70fdee7ca8f6cceb9fa71d5e5e1eadc76e3aba50/libs/nest-connector/src/lib/auth/enums/auth-error-response.enum.ts#L394)

</td>
</tr>
<tr>
<td>

<a id="user_400_not_empty_salt"></a> `USER_400_NOT_EMPTY_SALT`

</td>
<td>

`"USER_400_NOT_EMPTY_SALT"`

</td>
<td>

Salt should not be empty (400 Bad Request)

Validation error when password salt is expected to have a value.

</td>
<td>

[lib/auth/enums/auth-error-response.enum.ts:401](https://github.com/hichchidev/hichchi/blob/70fdee7ca8f6cceb9fa71d5e5e1eadc76e3aba50/libs/nest-connector/src/lib/auth/enums/auth-error-response.enum.ts#L401)

</td>
</tr>
<tr>
<td>

<a id="user_400_not_empty_uname"></a> `USER_400_NOT_EMPTY_UNAME`

</td>
<td>

`"USER_400_NOT_EMPTY_UNAME"`

</td>
<td>

Username should not be empty (400 Bad Request)

Validation error when username is expected to have a value.

</td>
<td>

[lib/auth/enums/auth-error-response.enum.ts:387](https://github.com/hichchidev/hichchi/blob/70fdee7ca8f6cceb9fa71d5e5e1eadc76e3aba50/libs/nest-connector/src/lib/auth/enums/auth-error-response.enum.ts#L387)

</td>
</tr>
<tr>
<td>

<a id="user_403_sign_up"></a> `USER_403_SIGN_UP`

</td>
<td>

`"USER_403_SIGN_UP"`

</td>
<td>

Sign up forbidden (403 Forbidden)

Occurs when registration is currently not allowed or restricted.

</td>
<td>

[lib/auth/enums/auth-error-response.enum.ts:408](https://github.com/hichchidev/hichchi/blob/70fdee7ca8f6cceb9fa71d5e5e1eadc76e3aba50/libs/nest-connector/src/lib/auth/enums/auth-error-response.enum.ts#L408)

</td>
</tr>
<tr>
<td>

<a id="user_404_id"></a> `USER_404_ID`

</td>
<td>

`"USER_404_ID"`

</td>
<td>

User not found (404 Not Found)

Occurs when attempting operations on a user that doesn't exist.

</td>
<td>

[lib/auth/enums/auth-error-response.enum.ts:415](https://github.com/hichchidev/hichchi/blob/70fdee7ca8f6cceb9fa71d5e5e1eadc76e3aba50/libs/nest-connector/src/lib/auth/enums/auth-error-response.enum.ts#L415)

</td>
</tr>
<tr>
<td>

<a id="user_409_exist_uname"></a> `USER_409_EXIST_UNAME`

</td>
<td>

`"USER_409_EXIST_UNAME"`

</td>
<td>

Username already exists (409 Conflict)

Occurs when attempting to create a user with a username that is already taken.

</td>
<td>

[lib/auth/enums/auth-error-response.enum.ts:422](https://github.com/hichchidev/hichchi/blob/70fdee7ca8f6cceb9fa71d5e5e1eadc76e3aba50/libs/nest-connector/src/lib/auth/enums/auth-error-response.enum.ts#L422)

</td>
</tr>
<tr>
<td>

<a id="user_500_create"></a> `USER_500_CREATE`

</td>
<td>

`"USER_500_CREATE"`

</td>
<td>

User creation error (500 Internal Server Error)

Occurs when there is a server-side error creating a new user account.

</td>
<td>

[lib/auth/enums/auth-error-response.enum.ts:429](https://github.com/hichchidev/hichchi/blob/70fdee7ca8f6cceb9fa71d5e5e1eadc76e3aba50/libs/nest-connector/src/lib/auth/enums/auth-error-response.enum.ts#L429)

</td>
</tr>
</tbody>
</table>

---

### AuthField

Defined in: [lib/auth/enums/auth-field.enum.ts:13](https://github.com/hichchidev/hichchi/blob/70fdee7ca8f6cceb9fa71d5e5e1eadc76e3aba50/libs/nest-connector/src/lib/auth/enums/auth-field.enum.ts#L13)

Enum representing authentication fields used for user identification.

This enum is used to specify the type of identifier required
for authentication processes. Each value represents a different
approach to identifying users during authentication.

Enum Values:

- `USERNAME`: Authentication using the user's unique username.
- `EMAIL`: Authentication using the user's email address.
- `BOTH`: Authentication using either username or email address.

#### Enumeration Members

<table>
<thead>
<tr>
<th>Enumeration Member</th>
<th>Value</th>
<th>Description</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="both"></a> `BOTH`

</td>
<td>

`"both"`

</td>
<td>

Combined username/email authentication

Users can authenticate using either their username or email address.
This provides flexibility for users to sign in with whichever identifier they remember.
Implementation requires checking both fields when authenticating.

</td>
<td>

[lib/auth/enums/auth-field.enum.ts:39](https://github.com/hichchidev/hichchi/blob/70fdee7ca8f6cceb9fa71d5e5e1eadc76e3aba50/libs/nest-connector/src/lib/auth/enums/auth-field.enum.ts#L39)

</td>
</tr>
<tr>
<td>

<a id="email"></a> `EMAIL`

</td>
<td>

`"email"`

</td>
<td>

Email-based authentication

Users authenticate using their email address.
This is the most common approach as email addresses are unique
and provide a way to contact users for account verification and recovery.

</td>
<td>

[lib/auth/enums/auth-field.enum.ts:30](https://github.com/hichchidev/hichchi/blob/70fdee7ca8f6cceb9fa71d5e5e1eadc76e3aba50/libs/nest-connector/src/lib/auth/enums/auth-field.enum.ts#L30)

</td>
</tr>
<tr>
<td>

<a id="username"></a> `USERNAME`

</td>
<td>

`"username"`

</td>
<td>

Username-based authentication

Users authenticate using their unique username.
This is useful for applications where email addresses are not required
or where users prefer to sign in with a chosen identifier.

</td>
<td>

[lib/auth/enums/auth-field.enum.ts:21](https://github.com/hichchidev/hichchi/blob/70fdee7ca8f6cceb9fa71d5e5e1eadc76e3aba50/libs/nest-connector/src/lib/auth/enums/auth-field.enum.ts#L21)

</td>
</tr>
</tbody>
</table>

---

### AuthMethod

Defined in: [lib/auth/enums/auth-method.enum.ts:10](https://github.com/hichchidev/hichchi/blob/70fdee7ca8f6cceb9fa71d5e5e1eadc76e3aba50/libs/nest-connector/src/lib/auth/enums/auth-method.enum.ts#L10)

Enumeration representing the supported authentication methods.

This enum provides two authentication strategies:

- `COOKIE`: Utilizes cookies for storing and transmitting authentication tokens.
- `JWT`: Employs JSON Web Tokens for authentication, typically passed via headers.

Use this enum to specify the desired authentication method in your application.

#### Enumeration Members

<table>
<thead>
<tr>
<th>Enumeration Member</th>
<th>Value</th>
<th>Description</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="cookie"></a> `COOKIE`

</td>
<td>

`"cookie"`

</td>
<td>

Cookie-based authentication

Authentication tokens are stored in HTTP cookies and automatically included in requests.
This method provides better security against XSS attacks but requires proper cookie configuration.

</td>
<td>

[lib/auth/enums/auth-method.enum.ts:17](https://github.com/hichchidev/hichchi/blob/70fdee7ca8f6cceb9fa71d5e5e1eadc76e3aba50/libs/nest-connector/src/lib/auth/enums/auth-method.enum.ts#L17)

</td>
</tr>
<tr>
<td>

<a id="jwt"></a> `JWT`

</td>
<td>

`"jwt"`

</td>
<td>

JWT-based authentication

Authentication tokens are typically stored client-side (localStorage/sessionStorage) and
manually included in request headers. This method provides more flexibility but requires
careful implementation to prevent token theft via XSS.

</td>
<td>

[lib/auth/enums/auth-method.enum.ts:26](https://github.com/hichchidev/hichchi/blob/70fdee7ca8f6cceb9fa71d5e5e1eadc76e3aba50/libs/nest-connector/src/lib/auth/enums/auth-method.enum.ts#L26)

</td>
</tr>
</tbody>
</table>

---

### AuthProvider

Defined in: [lib/auth/enums/auth-provider.enum.ts:10](https://github.com/hichchidev/hichchi/blob/70fdee7ca8f6cceb9fa71d5e5e1eadc76e3aba50/libs/nest-connector/src/lib/auth/enums/auth-provider.enum.ts#L10)

Sign Up Type Enum

This enum represents the different methods by which a user can sign up in the application.
It is used to track how a user account was created and to apply different business rules
based on the sign up method (e.g., email verification requirements).

#### Enumeration Members

<table>
<thead>
<tr>
<th>Enumeration Member</th>
<th>Value</th>
<th>Description</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="facebook"></a> `FACEBOOK`

</td>
<td>

`"facebook"`

</td>
<td>

Facebook OAuth Sign Up

Users who sign up by authenticating through their Facebook account.
These users typically have pre-verified email addresses.

</td>
<td>

[lib/auth/enums/auth-provider.enum.ts:33](https://github.com/hichchidev/hichchi/blob/70fdee7ca8f6cceb9fa71d5e5e1eadc76e3aba50/libs/nest-connector/src/lib/auth/enums/auth-provider.enum.ts#L33)

</td>
</tr>
<tr>
<td>

<a id="google"></a> `GOOGLE`

</td>
<td>

`"google"`

</td>
<td>

Google OAuth Sign Up

Users who sign up by authenticating through their Google account.
These users typically have pre-verified email addresses.

</td>
<td>

[lib/auth/enums/auth-provider.enum.ts:25](https://github.com/hichchidev/hichchi/blob/70fdee7ca8f6cceb9fa71d5e5e1eadc76e3aba50/libs/nest-connector/src/lib/auth/enums/auth-provider.enum.ts#L25)

</td>
</tr>
<tr>
<td>

<a id="local"></a> `LOCAL`

</td>
<td>

`"local"`

</td>
<td>

Local Sign Up with email and password

Users who sign up directly on the application with an email and password.
These users typically need to verify their email address.

</td>
<td>

[lib/auth/enums/auth-provider.enum.ts:17](https://github.com/hichchidev/hichchi/blob/70fdee7ca8f6cceb9fa71d5e5e1eadc76e3aba50/libs/nest-connector/src/lib/auth/enums/auth-provider.enum.ts#L17)

</td>
</tr>
</tbody>
</table>

---

### AuthStrategy

Defined in: [lib/auth/enums/auth-strategy.enum.ts:16](https://github.com/hichchidev/hichchi/blob/70fdee7ca8f6cceb9fa71d5e5e1eadc76e3aba50/libs/nest-connector/src/lib/auth/enums/auth-strategy.enum.ts#L16)

Enum representing the different authentication strategies available.

This enum is used to specify the type of authentication mechanism
employed within the application. Each strategy corresponds to a
distinct method of authenticating users.

Enum Values:

- `LOCAL`: Authentication using local credentials (e.g., username and password).
- `JWT`: Authentication using JSON Web Tokens.
- `GOOGLE`: Authentication via Google OAuth.
- `FACEBOOK`: Authentication via Facebook OAuth.

#### Enumeration Members

<table>
<thead>
<tr>
<th>Enumeration Member</th>
<th>Value</th>
<th>Description</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="facebook-1"></a> `FACEBOOK`

</td>
<td>

`"facebook"`

</td>
<td>

Facebook OAuth authentication strategy

Enables authentication through Facebook accounts. Similar to Google OAuth, this strategy
relies on Facebook's identity provider to authenticate users and return their profile information.

</td>
<td>

[lib/auth/enums/auth-strategy.enum.ts:48](https://github.com/hichchidev/hichchi/blob/70fdee7ca8f6cceb9fa71d5e5e1eadc76e3aba50/libs/nest-connector/src/lib/auth/enums/auth-strategy.enum.ts#L48)

</td>
</tr>
<tr>
<td>

<a id="google-1"></a> `GOOGLE`

</td>
<td>

`"google"`

</td>
<td>

Google OAuth authentication strategy

Allows users to sign in using their Google accounts. This strategy delegates the authentication
process to Google's identity service and receives user information upon successful authentication.

</td>
<td>

[lib/auth/enums/auth-strategy.enum.ts:40](https://github.com/hichchidev/hichchi/blob/70fdee7ca8f6cceb9fa71d5e5e1eadc76e3aba50/libs/nest-connector/src/lib/auth/enums/auth-strategy.enum.ts#L40)

</td>
</tr>
<tr>
<td>

<a id="jwt-1"></a> `JWT`

</td>
<td>

`"jwt"`

</td>
<td>

JWT authentication strategy

Uses JSON Web Tokens for authentication and authorization. Tokens contain encoded user
information and are validated on the server side. Typically used for stateless authentication
in RESTful APIs.

</td>
<td>

[lib/auth/enums/auth-strategy.enum.ts:32](https://github.com/hichchidev/hichchi/blob/70fdee7ca8f6cceb9fa71d5e5e1eadc76e3aba50/libs/nest-connector/src/lib/auth/enums/auth-strategy.enum.ts#L32)

</td>
</tr>
<tr>
<td>

<a id="local-1"></a> `LOCAL`

</td>
<td>

`"local"`

</td>
<td>

Local authentication strategy

Authenticates users using username/email and password stored in the application's database.
This is the most basic form of authentication that doesn't rely on third-party services.

</td>
<td>

[lib/auth/enums/auth-strategy.enum.ts:23](https://github.com/hichchidev/hichchi/blob/70fdee7ca8f6cceb9fa71d5e5e1eadc76e3aba50/libs/nest-connector/src/lib/auth/enums/auth-strategy.enum.ts#L23)

</td>
</tr>
</tbody>
</table>

---

### AuthSuccessResponseCode

Defined in: [lib/auth/enums/auth-success-response.enum.ts:18](https://github.com/hichchidev/hichchi/blob/70fdee7ca8f6cceb9fa71d5e5e1eadc76e3aba50/libs/nest-connector/src/lib/auth/enums/auth-success-response.enum.ts#L18)

Authentication Success Response Codes Enum

This enum defines success response codes specific to authentication operations.
Each code represents a specific successful outcome from an authentication-related action.
The naming convention includes HTTP status codes (e.g., 200, 201) for clarity.

Enum Values:

- `AUTH_201_ACCOUNT_CREATED_REQUIRE_VERIFY`: Account created but requires email verification.
- `AUTH_201_ACCOUNT_CREATED`: Account successfully created without verification requirement.
- `AUTH_201_EMAIL_VERIFIED`: Email address successfully verified.
- `AUTH_200_EMAIL_VERIFICATION_SENT`: Email verification message sent successfully.
- `AUTH_200_PASSWORD_RESET_EMAIL_SENT`: Password reset email sent successfully.
- `AUTH_200_PASSWORD_RESET_TOKEN_VALID`: Password reset token validated successfully.
- `AUTH_200_PASSWORD_RESET_SUCCESS`: Password reset completed successfully.
- `AUTH_200_SIGNED_OUT`: User successfully signed out of the system.

#### Enumeration Members

<table>
<thead>
<tr>
<th>Enumeration Member</th>
<th>Value</th>
<th>Description</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="auth_200_email_verification_sent"></a> `AUTH_200_EMAIL_VERIFICATION_SENT`

</td>
<td>

`"AUTH_200_EMAIL_VERIFICATION_SENT"`

</td>
<td>

Email verification message sent successfully

Indicates that an email containing verification instructions has been
successfully sent to the user's email address.

</td>
<td>

[lib/auth/enums/auth-success-response.enum.ts:49](https://github.com/hichchidev/hichchi/blob/70fdee7ca8f6cceb9fa71d5e5e1eadc76e3aba50/libs/nest-connector/src/lib/auth/enums/auth-success-response.enum.ts#L49)

</td>
</tr>
<tr>
<td>

<a id="auth_200_password_reset_email_sent"></a> `AUTH_200_PASSWORD_RESET_EMAIL_SENT`

</td>
<td>

`"AUTH_200_PASSWORD_RESET_EMAIL_SENT"`

</td>
<td>

Password reset email sent successfully

Indicates that an email containing password reset instructions has been
successfully sent to the user's email address.

</td>
<td>

[lib/auth/enums/auth-success-response.enum.ts:57](https://github.com/hichchidev/hichchi/blob/70fdee7ca8f6cceb9fa71d5e5e1eadc76e3aba50/libs/nest-connector/src/lib/auth/enums/auth-success-response.enum.ts#L57)

</td>
</tr>
<tr>
<td>

<a id="auth_200_password_reset_success"></a> `AUTH_200_PASSWORD_RESET_SUCCESS`

</td>
<td>

`"AUTH_200_PASSWORD_RESET_SUCCESS"`

</td>
<td>

Password reset completed successfully

Indicates that a user's password has been successfully reset and updated
in the system. The user can now login with their new password.

</td>
<td>

[lib/auth/enums/auth-success-response.enum.ts:73](https://github.com/hichchidev/hichchi/blob/70fdee7ca8f6cceb9fa71d5e5e1eadc76e3aba50/libs/nest-connector/src/lib/auth/enums/auth-success-response.enum.ts#L73)

</td>
</tr>
<tr>
<td>

<a id="auth_200_password_reset_token_valid"></a> `AUTH_200_PASSWORD_RESET_TOKEN_VALID`

</td>
<td>

`"AUTH_200_PASSWORD_RESET_TOKEN_VALID"`

</td>
<td>

Password reset token validated successfully

Indicates that a password reset token provided by the user has been
verified and is valid for proceeding with the password reset process.

</td>
<td>

[lib/auth/enums/auth-success-response.enum.ts:65](https://github.com/hichchidev/hichchi/blob/70fdee7ca8f6cceb9fa71d5e5e1eadc76e3aba50/libs/nest-connector/src/lib/auth/enums/auth-success-response.enum.ts#L65)

</td>
</tr>
<tr>
<td>

<a id="auth_200_signed_out"></a> `AUTH_200_SIGNED_OUT`

</td>
<td>

`"AUTH_200_SIGNED_OUT"`

</td>
<td>

User signed out successfully

Indicates that a user has been successfully signed out of the system,
their session has been terminated, and authentication tokens have been
invalidated. Any authentication cookies would also be cleared.

</td>
<td>

[lib/auth/enums/auth-success-response.enum.ts:82](https://github.com/hichchidev/hichchi/blob/70fdee7ca8f6cceb9fa71d5e5e1eadc76e3aba50/libs/nest-connector/src/lib/auth/enums/auth-success-response.enum.ts#L82)

</td>
</tr>
<tr>
<td>

<a id="auth_201_account_created"></a> `AUTH_201_ACCOUNT_CREATED`

</td>
<td>

`"AUTH_201_ACCOUNT_CREATED"`

</td>
<td>

Account successfully created without verification requirement

Indicates a new user account was successfully created and is immediately
active without requiring additional verification steps.

</td>
<td>

[lib/auth/enums/auth-success-response.enum.ts:33](https://github.com/hichchidev/hichchi/blob/70fdee7ca8f6cceb9fa71d5e5e1eadc76e3aba50/libs/nest-connector/src/lib/auth/enums/auth-success-response.enum.ts#L33)

</td>
</tr>
<tr>
<td>

<a id="auth_201_account_created_require_verify"></a> `AUTH_201_ACCOUNT_CREATED_REQUIRE_VERIFY`

</td>
<td>

`"AUTH_201_ACCOUNT_CREATED_REQUIRE_VERIFY"`

</td>
<td>

Account created but requires email verification

Indicates a new user account was successfully created, but the user
must verify their email address before they can fully access the system.

</td>
<td>

[lib/auth/enums/auth-success-response.enum.ts:25](https://github.com/hichchidev/hichchi/blob/70fdee7ca8f6cceb9fa71d5e5e1eadc76e3aba50/libs/nest-connector/src/lib/auth/enums/auth-success-response.enum.ts#L25)

</td>
</tr>
<tr>
<td>

<a id="auth_201_email_verified"></a> `AUTH_201_EMAIL_VERIFIED`

</td>
<td>

`"AUTH_201_EMAIL_VERIFIED"`

</td>
<td>

Email address successfully verified

Indicates that a user's email address has been successfully verified,
enabling full access to account features that require verification.

</td>
<td>

[lib/auth/enums/auth-success-response.enum.ts:41](https://github.com/hichchidev/hichchi/blob/70fdee7ca8f6cceb9fa71d5e5e1eadc76e3aba50/libs/nest-connector/src/lib/auth/enums/auth-success-response.enum.ts#L41)

</td>
</tr>
</tbody>
</table>

## Functions

### isRoleObject()

```ts
function isRoleObject<R>(role): role is Role<R, string>;
```

Defined in: [lib/auth/utils/auth.utils.ts:59](https://github.com/hichchidev/hichchi/blob/70fdee7ca8f6cceb9fa71d5e5e1eadc76e3aba50/libs/nest-connector/src/lib/auth/utils/auth.utils.ts#L59)

Type guard function to check if a role is a Role object or a string

This utility function determines whether the provided role parameter is a Role object
(containing properties like name, permissions, etc.) or just a string representation
of the role name. It's commonly used in authentication and authorization logic to
handle different role formats consistently.

The function performs a type-safe check by verifying that the role exists and
contains a "name" property, which is characteristic of Role objects.

#### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
<th>Default type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`R` _extends_ `string`

</td>
<td>

`string`

</td>
<td>

The type of role string (defaults to string)

</td>
</tr>
</tbody>
</table>

#### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`role`

</td>
<td>

`null` | `R` | [`Role`](#role)<`R`, `string`>

</td>
<td>

The role to check, can be a Role object, string, or null

</td>
</tr>
</tbody>
</table>

#### Returns

`role is Role<R, string>`

True if the role is a Role object, false if it's a string or null

#### Examples

```typescript
// With a Role object
const roleObject: Role = {
  name: "admin",
  permissions: ["users.read", "users.write"],
};

if (isRoleObject(roleObject)) {
  console.log("Role name:", roleObject.name);
  console.log("Permissions:", roleObject.permissions);
}
```

```typescript
// With a string role
const roleString = "admin";

if (isRoleObject(roleString)) {
  // This won't execute because roleString is just a string
  console.log("Role object:", roleString.name);
} else {
  console.log("Role string:", roleString);
}
```

```typescript
// In a permission check function
function hasPermission(
  userRole: Role | string,
  requiredPermission: string,
): boolean {
  if (isRoleObject(userRole)) {
    return userRole.permissions?.includes(requiredPermission) ?? false;
  }
  // Handle string role case
  return false;
}
```

#### See

[Role](#role) Interface defining the structure of role objects

## Interfaces

### AuthResponse

Defined in: [lib/auth/interfaces/response.interfaces.ts:25](https://github.com/hichchidev/hichchi/blob/70fdee7ca8f6cceb9fa71d5e5e1eadc76e3aba50/libs/nest-connector/src/lib/auth/interfaces/response.interfaces.ts#L25)

Interface representing the complete authentication response data.

The `AuthResponse` interface combines token information, selected session data,
and the authenticated user details. This comprehensive structure is typically
returned to clients after successful authentication operations like sign-in,
token refresh, or social authentication.

This interface is designed to provide clients with all necessary information
to maintain an authenticated session while excluding sensitive or internal
properties not needed by the client.

AuthResponse

#### See

- [TokenResponse](#tokenresponse) Interface for token-related information
- [UserSession](#usersession) Interface for session-related information
- [User](#user-1) Interface for user profile information

#### Extends

- [`TokenResponse`](#tokenresponse).[`UserSession`](#usersession)

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
<th>Description</th>
<th>Inherited from</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="accesstoken"></a> `accessToken`

</td>
<td>

[`AccessToken`](#accesstoken-5)

</td>
<td>

The access token used for authenticating API requests.

Access tokens are typically short-lived (minutes to hours) JWT tokens that
contain encoded user information and permissions. They should be included
in API requests to protected endpoints, usually in an Authorization header.

The token is a string branded as `AccessToken` for type safety.

**See**

[AccessToken](#accesstoken-5) Branded type for access tokens

</td>
<td>

[`UserSession`](#usersession).[`accessToken`](#accesstoken-4)

</td>
<td>

[lib/auth/interfaces/tokens.interface.ts:36](https://github.com/hichchidev/hichchi/blob/70fdee7ca8f6cceb9fa71d5e5e1eadc76e3aba50/libs/nest-connector/src/lib/auth/interfaces/tokens.interface.ts#L36)

</td>
</tr>
<tr>
<td>

<a id="accesstokenexpireson"></a> `accessTokenExpiresOn`

</td>
<td>

`Date`

</td>
<td>

The date and time when the access token expires.

Clients can use this information to schedule token refreshes before
the access token expires, preventing authentication failures during
active user sessions.

The expiration time is determined by the JWT token's 'exp' claim and
configured through the authentication service options.

</td>
<td>

[`TokenResponse`](#tokenresponse).[`accessTokenExpiresOn`](#accesstokenexpireson-1)

</td>
<td>

[lib/auth/interfaces/token-response.interface.ts:33](https://github.com/hichchidev/hichchi/blob/70fdee7ca8f6cceb9fa71d5e5e1eadc76e3aba50/libs/nest-connector/src/lib/auth/interfaces/token-response.interface.ts#L33)

</td>
</tr>
<tr>
<td>

<a id="authprovider-1"></a> `authProvider?`

</td>
<td>

[`AuthProvider`](#authprovider)

</td>
<td>

The authentication provider used for this session.
Indicates how the user was authenticated (e.g., local, Google).

Optional: Defaults to the application's primary authentication provider if not specified.

**See**

[AuthProvider](#authprovider) Enum of supported authentication type

</td>
<td>

[`UserSession`](#usersession).[`authProvider`](#authprovider-2)

</td>
<td>

[lib/auth/interfaces/user-session.interface.ts:68](https://github.com/hichchidev/hichchi/blob/70fdee7ca8f6cceb9fa71d5e5e1eadc76e3aba50/libs/nest-connector/src/lib/auth/interfaces/user-session.interface.ts#L68)

</td>
</tr>
<tr>
<td>

<a id="authproviderid"></a> `authProviderId?`

</td>
<td>

`string`

</td>
<td>

The unique identifier representing the user in the context of the auth provider.
For example, this could be a Google user ID for sessions authenticated via Google OAuth.

Optional: Only relevant for third-party authentication providers.

</td>
<td>

[`UserSession`](#usersession).[`authProviderId`](#authproviderid-1)

</td>
<td>

[lib/auth/interfaces/user-session.interface.ts:76](https://github.com/hichchidev/hichchi/blob/70fdee7ca8f6cceb9fa71d5e5e1eadc76e3aba50/libs/nest-connector/src/lib/auth/interfaces/user-session.interface.ts#L76)

</td>
</tr>
<tr>
<td>

<a id="frontendurl"></a> `frontendUrl?`

</td>
<td>

`string`

</td>
<td>

The base URL for the frontend application associated with this session.
Used for generating correct redirect URLs for multi-frontend applications.

Optional: May be omitted for API-only usage or when a default frontend URL is configured.

</td>
<td>

[`UserSession`](#usersession).[`frontendUrl`](#frontendurl-1)

</td>
<td>

[lib/auth/interfaces/user-session.interface.ts:58](https://github.com/hichchidev/hichchi/blob/70fdee7ca8f6cceb9fa71d5e5e1eadc76e3aba50/libs/nest-connector/src/lib/auth/interfaces/user-session.interface.ts#L58)

</td>
</tr>
<tr>
<td>

<a id="refreshtoken"></a> `refreshToken`

</td>
<td>

[`RefreshToken`](#refreshtoken-5)

</td>
<td>

The refresh token used to obtain new access tokens.

Refresh tokens are typically longer-lived (days to weeks) tokens that enable
clients to obtain new access tokens when the current one expires, without
requiring the user to re-authenticate. These tokens should be handled with
extra security precautions as they represent longer-term authentication power.

The token is a string branded as `RefreshToken` for type safety.

**See**

[RefreshToken](#refreshtoken-5) Branded type for refresh tokens

</td>
<td>

[`UserSession`](#usersession).[`refreshToken`](#refreshtoken-4)

</td>
<td>

[lib/auth/interfaces/tokens.interface.ts:50](https://github.com/hichchidev/hichchi/blob/70fdee7ca8f6cceb9fa71d5e5e1eadc76e3aba50/libs/nest-connector/src/lib/auth/interfaces/tokens.interface.ts#L50)

</td>
</tr>
<tr>
<td>

<a id="refreshtokenexpireson"></a> `refreshTokenExpiresOn`

</td>
<td>

`Date`

</td>
<td>

The date and time when the refresh token expires.

Refresh tokens typically have a longer lifespan than access tokens.
When a refresh token expires, the user will need to re-authenticate
with their credentials.

The expiration time is configured through the authentication service options
and represents the maximum duration of a user's session without re-authentication.

</td>
<td>

[`TokenResponse`](#tokenresponse).[`refreshTokenExpiresOn`](#refreshtokenexpireson-1)

</td>
<td>

[lib/auth/interfaces/token-response.interface.ts:45](https://github.com/hichchidev/hichchi/blob/70fdee7ca8f6cceb9fa71d5e5e1eadc76e3aba50/libs/nest-connector/src/lib/auth/interfaces/token-response.interface.ts#L45)

</td>
</tr>
<tr>
<td>

<a id="sessionid"></a> `sessionId`

</td>
<td>

`string`

</td>
<td>

A unique identifier for this specific user session.
Used to distinguish between multiple active sessions for the same user.

</td>
<td>

[`UserSession`](#usersession).[`sessionId`](#sessionid-1)

</td>
<td>

[lib/auth/interfaces/user-session.interface.ts:26](https://github.com/hichchidev/hichchi/blob/70fdee7ca8f6cceb9fa71d5e5e1eadc76e3aba50/libs/nest-connector/src/lib/auth/interfaces/user-session.interface.ts#L26)

</td>
</tr>
<tr>
<td>

<a id="socketid"></a> `socketId?`

</td>
<td>

`string`

</td>
<td>

The identifier for a websocket connection associated with this session.
Used for real-time communication features if applicable.

Optional: This may not be present if the session doesn't have an active socket connection.

</td>
<td>

[`UserSession`](#usersession).[`socketId`](#socketid-1)

</td>
<td>

[lib/auth/interfaces/user-session.interface.ts:50](https://github.com/hichchidev/hichchi/blob/70fdee7ca8f6cceb9fa71d5e5e1eadc76e3aba50/libs/nest-connector/src/lib/auth/interfaces/user-session.interface.ts#L50)

</td>
</tr>
<tr>
<td>

<a id="user"></a> `user`

</td>
<td>

[`User`](#user-1)

</td>
<td>

The authenticated user's profile information.

This contains the core user data needed by client applications,
such as user ID, display name, and other profile details.
Sensitive data like password hashes are excluded.

**See**

[User](#user-1) Interface for user profile information

</td>
<td>

‐

</td>
<td>

[lib/auth/interfaces/response.interfaces.ts:35](https://github.com/hichchidev/hichchi/blob/70fdee7ca8f6cceb9fa71d5e5e1eadc76e3aba50/libs/nest-connector/src/lib/auth/interfaces/response.interfaces.ts#L35)

</td>
</tr>
</tbody>
</table>

---

### BulkDeleteBody

Defined in: [lib/auth/interfaces/dtos/bulk-delete-body.interface.ts:34](https://github.com/hichchidev/hichchi/blob/70fdee7ca8f6cceb9fa71d5e5e1eadc76e3aba50/libs/nest-connector/src/lib/auth/interfaces/dtos/bulk-delete-body.interface.ts#L34)

Interface defining the body structure for bulk delete operations.

This interface specifies the required properties for performing bulk deletion
of multiple entities in a single request. This is more efficient than making
individual delete requests for each entity and provides better performance
for operations that need to remove multiple records.

The interface accepts an array of entity identifiers that should be deleted.
All specified entities will be removed in a single database transaction,
ensuring data consistency.

#### Examples

```typescript
// Delete multiple users by their IDs
const bulkDelete: BulkDeleteBody = {
  ids: [
    "123e4567-e89b-12d3-a456-426614174000",
    "987fcdeb-51a2-43d1-b789-123456789abc",
  ],
};
```

```typescript
// Using in a service
async deleteMultipleEntities(entityIds: EntityId[]): Promise<void> {
  const body: BulkDeleteBody = { ids: entityIds };
  return this.entityService.bulkDelete(body);
}
```

#### See

[EntityId](../crud/README.md#entityid) Type representing entity identifier values

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
<th>Description</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="ids"></a> `ids`

</td>
<td>

[`EntityId`](../crud/README.md#entityid)\[]

</td>
<td>

Array of entity identifiers to be deleted.

Each identifier in this array represents an entity that should be removed
from the system. The identifiers must be valid and correspond to existing
entities. Invalid or non-existent IDs may cause the operation to fail.

</td>
<td>

[lib/auth/interfaces/dtos/bulk-delete-body.interface.ts:42](https://github.com/hichchidev/hichchi/blob/70fdee7ca8f6cceb9fa71d5e5e1eadc76e3aba50/libs/nest-connector/src/lib/auth/interfaces/dtos/bulk-delete-body.interface.ts#L42)

</td>
</tr>
</tbody>
</table>

---

### EmailVerifyBody

Defined in: [lib/auth/interfaces/dtos/email-verify-body.interface.ts:43](https://github.com/hichchidev/hichchi/blob/70fdee7ca8f6cceb9fa71d5e5e1eadc76e3aba50/libs/nest-connector/src/lib/auth/interfaces/dtos/email-verify-body.interface.ts#L43)

Interface defining the body structure for email verification requests.

This interface specifies the required and optional properties for verifying
a user's email address using a verification token. Email verification is a
critical security measure to confirm user identity and prevent account abuse.

The verification process typically involves sending a token to the user's email
address, which they then submit back to the system to confirm ownership of
the email account.

#### Examples

```typescript
// Basic email verification
const verifyRequest: EmailVerifyBody = {
  token: "a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6",
};
```

```typescript
// Email verification with redirect URL
const verifyWithRedirect: EmailVerifyBody = {
  token: "a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6",
  redirectUrl: "https://myapp.com/dashboard",
};
```

```typescript
// Using in a service
async verifyUserEmail(token: VerifyToken, redirectUrl?: string): Promise<void> {
  const body: EmailVerifyBody = { token, redirectUrl };
  return this.authService.verifyEmail(body);
}
```

#### See

- [VerifyToken](#verifytoken) Type representing verification token strings
- [ResendEmailVerifyBody](#resendemailverifybody) Related interface for resending verification emails

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
<th>Description</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="redirecturl"></a> `redirectUrl?`

</td>
<td>

`string`

</td>
<td>

Optional URL to redirect the user to after successful verification.

When provided, the user will be redirected to this URL after their email
is successfully verified. This is useful for directing users to a specific
page in the application, such as a welcome page or dashboard.

</td>
<td>

[lib/auth/interfaces/dtos/email-verify-body.interface.ts:60](https://github.com/hichchidev/hichchi/blob/70fdee7ca8f6cceb9fa71d5e5e1eadc76e3aba50/libs/nest-connector/src/lib/auth/interfaces/dtos/email-verify-body.interface.ts#L60)

</td>
</tr>
<tr>
<td>

<a id="token"></a> `token`

</td>
<td>

[`VerifyToken`](#verifytoken)

</td>
<td>

The verification token sent to the user's email address.

This token is generated when a user registers or requests email verification
and is sent to their email address. It must be submitted to complete the
verification process and confirm ownership of the email account.

</td>
<td>

[lib/auth/interfaces/dtos/email-verify-body.interface.ts:51](https://github.com/hichchidev/hichchi/blob/70fdee7ca8f6cceb9fa71d5e5e1eadc76e3aba50/libs/nest-connector/src/lib/auth/interfaces/dtos/email-verify-body.interface.ts#L51)

</td>
</tr>
</tbody>
</table>

---

### GetAuthResponseBody

Defined in: [lib/auth/interfaces/dtos/get-auth-response-body.interface.ts:50](https://github.com/hichchidev/hichchi/blob/70fdee7ca8f6cceb9fa71d5e5e1eadc76e3aba50/libs/nest-connector/src/lib/auth/interfaces/dtos/get-auth-response-body.interface.ts#L50)

Interface defining the body structure for the Get Auth Response endpoint.

This interface specifies the required properties for retrieving a complete
authentication response using a previously issued access token. This endpoint
is typically used after OAuth authentication flows (like Google sign-in) to
exchange an access token for full user information and session data.

The endpoint validates the provided access token and returns comprehensive
authentication information including user details, new tokens, and session data.
This is particularly useful for client applications that need to obtain complete
user context after receiving an access token from external authentication providers.

#### Examples

```typescript
// Get auth response using access token
const authRequest: GetAuthResponseBody = {
  accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
};
```

```typescript
// Using after Google OAuth authentication
async getCompleteAuthResponse(token: AccessToken): Promise<AuthResponse> {
  const body: GetAuthResponseBody = { accessToken: token };
  return this.authService.getAuthResponse(body);
}
```

```typescript
// In a service handling OAuth callback
async handleOAuthCallback(accessToken: AccessToken) {
  const request: GetAuthResponseBody = { accessToken };
  const authResponse = await this.authController.getAuthResponse(request);

  // Now you have complete user info and session tokens
  console.log('User:', authResponse.user);
  console.log('New tokens:', authResponse.accessToken, authResponse.refreshToken);
}
```

#### See

- [AuthResponse](#authresponse) Interface for the complete authentication response
- [AccessToken](#accesstoken-5) Type representing access token strings
- [AuthEndpoint.GET_AUTH_RESPONSE](#get_auth_response) Endpoint constant for this operation

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
<th>Description</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="accesstoken-1"></a> `accessToken`

</td>
<td>

[`AccessToken`](#accesstoken-5)

</td>
<td>

A valid JWT access token previously issued by this system.

This token will be verified, and if valid, will be used to retrieve
the associated user information and generate a complete authentication response.
The token is typically obtained from OAuth flows or other authentication processes
where only an access token is initially provided.

The access token must be:

- Valid and not expired
- Issued by this authentication system
- Associated with an existing user account

</td>
<td>

[lib/auth/interfaces/dtos/get-auth-response-body.interface.ts:64](https://github.com/hichchidev/hichchi/blob/70fdee7ca8f6cceb9fa71d5e5e1eadc76e3aba50/libs/nest-connector/src/lib/auth/interfaces/dtos/get-auth-response-body.interface.ts#L64)

</td>
</tr>
</tbody>
</table>

---

### RefreshTokenBody

Defined in: [lib/auth/interfaces/dtos/refresh-token-body.interface.ts:36](https://github.com/hichchidev/hichchi/blob/70fdee7ca8f6cceb9fa71d5e5e1eadc76e3aba50/libs/nest-connector/src/lib/auth/interfaces/dtos/refresh-token-body.interface.ts#L36)

Interface defining the body structure for token refresh requests.

This interface specifies the required properties for refreshing an expired
access token using a valid refresh token. The refresh token mechanism allows
users to maintain their session without re-authenticating when their access
token expires.

This is a critical part of the JWT authentication flow that provides a balance
between security (short-lived access tokens) and user experience (no frequent
re-authentication required).

#### Examples

```typescript
// Refresh token request
const refreshRequest: RefreshTokenBody = {
  refreshToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
};
```

```typescript
// Using in a service
async refreshUserTokens(refreshToken: RefreshToken): Promise<TokenResponse> {
  const body: RefreshTokenBody = { refreshToken };
  return this.authService.refreshToken(body);
}
```

#### See

- [refreshToken](#refreshtoken-1) Endpoint that uses this interface
- [TokenResponse](#tokenresponse) Interface for the response containing new tokens
- [RefreshToken](#refreshtoken-5) Type representing refresh token strings

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
<th>Description</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="refreshtoken-1"></a> `refreshToken`

</td>
<td>

[`RefreshToken`](#refreshtoken-5)

</td>
<td>

A valid JWT refresh token previously issued by this system.

This token will be verified, and if valid and not expired, will be used
to generate a new access token and refresh token pair. The refresh token
should have a longer expiration time than access tokens.

</td>
<td>

[lib/auth/interfaces/dtos/refresh-token-body.interface.ts:44](https://github.com/hichchidev/hichchi/blob/70fdee7ca8f6cceb9fa71d5e5e1eadc76e3aba50/libs/nest-connector/src/lib/auth/interfaces/dtos/refresh-token-body.interface.ts#L44)

</td>
</tr>
</tbody>
</table>

---

### RequestResetBody

Defined in: [lib/auth/interfaces/dtos/request-reset-body.interface.ts:32](https://github.com/hichchidev/hichchi/blob/70fdee7ca8f6cceb9fa71d5e5e1eadc76e3aba50/libs/nest-connector/src/lib/auth/interfaces/dtos/request-reset-body.interface.ts#L32)

Interface defining the body structure for password reset requests.

This interface specifies the required properties for initiating a password
reset process. When a user forgets their password, they can provide their
email address to request a password reset token, which will be sent to
their registered email address.

This is the first step in the password recovery flow, followed by the
actual password reset using the token received via email.

#### Examples

```typescript
// Request password reset
const resetRequest: RequestResetBody = {
  email: "user@example.com",
};
```

```typescript
// Using in a service
async requestPasswordReset(userEmail: string): Promise<void> {
  const body: RequestResetBody = { email: userEmail };
  return this.authService.requestPasswordReset(body);
}
```

#### See

- [ResetPasswordBody](#resetpasswordbody) Related interface for completing the password reset
- [ResetPasswordTokenVerifyBody](#resetpasswordtokenverifybody) Related interface for verifying reset tokens

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
<th>Description</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="email-1"></a> `email`

</td>
<td>

`string`

</td>
<td>

The email address of the user requesting a password reset.

This email must be associated with an existing user account. A password
reset token will be generated and sent to this email address, allowing
the user to complete the password reset process.

</td>
<td>

[lib/auth/interfaces/dtos/request-reset-body.interface.ts:40](https://github.com/hichchidev/hichchi/blob/70fdee7ca8f6cceb9fa71d5e5e1eadc76e3aba50/libs/nest-connector/src/lib/auth/interfaces/dtos/request-reset-body.interface.ts#L40)

</td>
</tr>
</tbody>
</table>

---

### ResendEmailVerifyBody

Defined in: [lib/auth/interfaces/dtos/resend-email-verify-body.interface.ts:31](https://github.com/hichchidev/hichchi/blob/70fdee7ca8f6cceb9fa71d5e5e1eadc76e3aba50/libs/nest-connector/src/lib/auth/interfaces/dtos/resend-email-verify-body.interface.ts#L31)

Interface defining the body structure for resending email verification requests.

This interface specifies the required properties for requesting a new email
verification token to be sent to a user's email address. This is useful when
the original verification email was not received, expired, or was accidentally
deleted by the user.

The system will generate a new verification token and send it to the specified
email address, allowing the user to complete the email verification process.

#### Examples

```typescript
// Resend email verification
const resendRequest: ResendEmailVerifyBody = {
  email: "user@example.com",
};
```

```typescript
// Using in a service
async resendVerificationEmail(userEmail: string): Promise<void> {
  const body: ResendEmailVerifyBody = { email: userEmail };
  return this.authService.resendEmailVerification(body);
}
```

#### See

[EmailVerifyBody](#emailverifybody) Related interface for completing email verification

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
<th>Description</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="email-2"></a> `email`

</td>
<td>

`string`

</td>
<td>

The email address to send the verification token to.

This email must be associated with an existing user account that has not
yet been verified. A new verification token will be generated and sent
to this email address, replacing any previously issued tokens.

</td>
<td>

[lib/auth/interfaces/dtos/resend-email-verify-body.interface.ts:39](https://github.com/hichchidev/hichchi/blob/70fdee7ca8f6cceb9fa71d5e5e1eadc76e3aba50/libs/nest-connector/src/lib/auth/interfaces/dtos/resend-email-verify-body.interface.ts#L39)

</td>
</tr>
</tbody>
</table>

---

### ResetPasswordBody

Defined in: [lib/auth/interfaces/dtos/reset-password-body.interface.ts:37](https://github.com/hichchidev/hichchi/blob/70fdee7ca8f6cceb9fa71d5e5e1eadc76e3aba50/libs/nest-connector/src/lib/auth/interfaces/dtos/reset-password-body.interface.ts#L37)

Interface defining the body structure for completing password reset requests.

This interface specifies the required properties for completing a password
reset process using a verification token. This is the second step in the
password recovery flow, where the user provides the token they received
via email along with their new password.

The token must be valid and not expired for the password reset to succeed.
Once completed, the user's password will be updated and they can sign in
with their new credentials.

#### Examples

```typescript
// Complete password reset
const resetPassword: ResetPasswordBody = {
  token: "a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6",
  password: "newSecurePassword123",
};
```

```typescript
// Using in a service
async resetUserPassword(token: VerifyToken, newPassword: string): Promise<void> {
  const body: ResetPasswordBody = { token, password: newPassword };
  return this.authService.resetPassword(body);
}
```

#### See

- [RequestResetBody](#requestresetbody) Related interface for initiating password reset
- [ResetPasswordTokenVerifyBody](#resetpasswordtokenverifybody) Related interface for verifying reset tokens
- [VerifyToken](#verifytoken) Type representing verification token strings

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
<th>Description</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="password"></a> `password`

</td>
<td>

`string`

</td>
<td>

The new password to set for the user account.

This should be the user's new plaintext password, which will be securely
hashed before storage. The password should meet the application's
complexity requirements for security.

</td>
<td>

[lib/auth/interfaces/dtos/reset-password-body.interface.ts:54](https://github.com/hichchidev/hichchi/blob/70fdee7ca8f6cceb9fa71d5e5e1eadc76e3aba50/libs/nest-connector/src/lib/auth/interfaces/dtos/reset-password-body.interface.ts#L54)

</td>
</tr>
<tr>
<td>

<a id="token-1"></a> `token`

</td>
<td>

[`VerifyToken`](#verifytoken)

</td>
<td>

The password reset verification token received via email.

This token is generated when a user requests a password reset and is sent
to their registered email address. It must be valid and not expired for
the password reset to succeed.

</td>
<td>

[lib/auth/interfaces/dtos/reset-password-body.interface.ts:45](https://github.com/hichchidev/hichchi/blob/70fdee7ca8f6cceb9fa71d5e5e1eadc76e3aba50/libs/nest-connector/src/lib/auth/interfaces/dtos/reset-password-body.interface.ts#L45)

</td>
</tr>
</tbody>
</table>

---

### ResetPasswordTokenVerifyBody

Defined in: [lib/auth/interfaces/dtos/reset-password-token-verify-body.interface.ts:36](https://github.com/hichchidev/hichchi/blob/70fdee7ca8f6cceb9fa71d5e5e1eadc76e3aba50/libs/nest-connector/src/lib/auth/interfaces/dtos/reset-password-token-verify-body.interface.ts#L36)

Interface defining the body structure for password reset token verification requests.

This interface specifies the required properties for verifying a password reset
token before allowing the user to proceed with setting a new password. This is
an intermediate step in the password reset flow that validates the token without
actually changing the password.

This verification step is useful for providing user feedback about token validity
before they enter their new password, improving the user experience by catching
invalid or expired tokens early in the process.

#### Examples

```typescript
// Verify password reset token
const verifyToken: ResetPasswordTokenVerifyBody = {
  token: "a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6",
};
```

```typescript
// Using in a service
async verifyResetToken(resetToken: VerifyToken): Promise<boolean> {
  const body: ResetPasswordTokenVerifyBody = { token: resetToken };
  return this.authService.verifyPasswordResetToken(body);
}
```

#### See

- [ResetPasswordBody](#resetpasswordbody) Related interface for completing the password reset
- [RequestResetBody](#requestresetbody) Related interface for initiating password reset
- [VerifyToken](#verifytoken) Type representing verification token strings

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
<th>Description</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="token-2"></a> `token`

</td>
<td>

[`VerifyToken`](#verifytoken)

</td>
<td>

The password reset verification token to validate.

This token is generated when a user requests a password reset and is sent
to their registered email address. This endpoint verifies that the token
is valid and not expired without actually performing the password reset.

</td>
<td>

[lib/auth/interfaces/dtos/reset-password-token-verify-body.interface.ts:44](https://github.com/hichchidev/hichchi/blob/70fdee7ca8f6cceb9fa71d5e5e1eadc76e3aba50/libs/nest-connector/src/lib/auth/interfaces/dtos/reset-password-token-verify-body.interface.ts#L44)

</td>
</tr>
</tbody>
</table>

---

### Role\<R, P>

Defined in: [lib/auth/interfaces/role.interface.ts:48](https://github.com/hichchidev/hichchi/blob/70fdee7ca8f6cceb9fa71d5e5e1eadc76e3aba50/libs/nest-connector/src/lib/auth/interfaces/role.interface.ts#L48)

Interface representing a user role for authorization purposes.

The `Role` interface defines the structure of authorization roles in the system.
Roles are used to group permissions and assign them to users, enabling a role-based
access control (RBAC) system. Each role contains a unique identifier, a descriptive name,
a list of permissions, and an optional priority level that can be used for role
precedence in authorization decisions.

Roles are typically assigned to users and determine what actions they can perform
within the application.

Role

#### See

[User](#user-1) Interface for user information which references roles

#### Extends

- [`RoleBase`](#rolebase)<`R`, `P`>.[`Model`](../crud/README.md#model)

#### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
<th>Default type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`R` _extends_ `string`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

`P` _extends_ `string`

</td>
<td>

`string`

</td>
</tr>
</tbody>
</table>

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
<th>Description</th>
<th>Inherited from</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="createdat"></a> `createdAt`

</td>
<td>

`Date`

</td>
<td>

Timestamp when the entity was created.

This value is set automatically on entity creation and never changes
afterward, providing an immutable record of when the data was first added.

</td>
<td>

[`Model`](../crud/README.md#model).[`createdAt`](../crud/README.md#model#createdat)

</td>
<td>

[lib/crud/interfaces/model.interface.ts:65](https://github.com/hichchidev/hichchi/blob/70fdee7ca8f6cceb9fa71d5e5e1eadc76e3aba50/libs/nest-connector/src/lib/crud/interfaces/model.interface.ts#L65)

</td>
</tr>
<tr>
<td>

<a id="createdby"></a> `createdBy`

</td>
<td>

`null` | [`UserInfo`](../index/README.md#userinfo)

</td>
<td>

Detailed information about the user who created this entity.

Contains essential identifying information about the creator without
including sensitive data. This property may be populated through a join or
separate query when needed for display purposes.

**See**

[UserInfo](../index/README.md#userinfo) Interface for user reference information

</td>
<td>

[`Model`](../crud/README.md#model).[`createdBy`](../crud/README.md#model#createdby)

</td>
<td>

[lib/crud/interfaces/model.interface.ts:102](https://github.com/hichchidev/hichchi/blob/70fdee7ca8f6cceb9fa71d5e5e1eadc76e3aba50/libs/nest-connector/src/lib/crud/interfaces/model.interface.ts#L102)

</td>
</tr>
<tr>
<td>

<a id="createdbyid"></a> `createdById`

</td>
<td>

`null` | [`EntityId`](../crud/README.md#entityid)

</td>
<td>

ID of the user who created this entity.

Stores just the ID reference to the user for efficient database storage.
Use in conjunction with the `createdBy` property when user details are needed.

</td>
<td>

[`Model`](../crud/README.md#model).[`createdById`](../crud/README.md#model#createdbyid)

</td>
<td>

[lib/crud/interfaces/model.interface.ts:91](https://github.com/hichchidev/hichchi/blob/70fdee7ca8f6cceb9fa71d5e5e1eadc76e3aba50/libs/nest-connector/src/lib/crud/interfaces/model.interface.ts#L91)

</td>
</tr>
<tr>
<td>

<a id="deletedat"></a> `deletedAt`

</td>
<td>

`null` | `Date`

</td>
<td>

Timestamp when the entity was soft-deleted, if applicable.

When present and not null, indicates that this entity has been deleted
logically but is still present in the database. This enables data recovery
and maintains referential integrity while hiding the record from normal queries.

</td>
<td>

[`Model`](../crud/README.md#model).[`deletedAt`](../crud/README.md#model#deletedat)

</td>
<td>

[lib/crud/interfaces/model.interface.ts:83](https://github.com/hichchidev/hichchi/blob/70fdee7ca8f6cceb9fa71d5e5e1eadc76e3aba50/libs/nest-connector/src/lib/crud/interfaces/model.interface.ts#L83)

</td>
</tr>
<tr>
<td>

<a id="deletedby"></a> `deletedBy`

</td>
<td>

`null` | [`UserInfo`](../index/README.md#userinfo)

</td>
<td>

Detailed information about the user who soft-deleted this entity, if applicable.

Contains identifying information about the user who performed the deletion,
used primarily in administrative interfaces for reviewing deletion history.

**See**

[UserInfo](../index/README.md#userinfo) Interface for user reference information

</td>
<td>

[`Model`](../crud/README.md#model).[`deletedBy`](../crud/README.md#model#deletedby)

</td>
<td>

[lib/crud/interfaces/model.interface.ts:138](https://github.com/hichchidev/hichchi/blob/70fdee7ca8f6cceb9fa71d5e5e1eadc76e3aba50/libs/nest-connector/src/lib/crud/interfaces/model.interface.ts#L138)

</td>
</tr>
<tr>
<td>

<a id="deletedbyid"></a> `deletedById`

</td>
<td>

`null` | [`EntityId`](../crud/README.md#entityid)

</td>
<td>

ID of the user who soft-deleted this entity, if applicable.

When an entity is soft-deleted, this property stores the ID of the user
who performed the deletion action for accountability purposes.

</td>
<td>

[`Model`](../crud/README.md#model).[`deletedById`](../crud/README.md#model#deletedbyid)

</td>
<td>

[lib/crud/interfaces/model.interface.ts:128](https://github.com/hichchidev/hichchi/blob/70fdee7ca8f6cceb9fa71d5e5e1eadc76e3aba50/libs/nest-connector/src/lib/crud/interfaces/model.interface.ts#L128)

</td>
</tr>
<tr>
<td>

<a id="id"></a> `id`

</td>
<td>

[`EntityId`](../crud/README.md#entityid)

</td>
<td>

Unique identifier for the entity.

This UUID serves as the primary key in the database and uniquely
identifies this record across the entire system.

**See**

[EntityId](../crud/README.md#entityid) Type used for entity identifiers

</td>
<td>

[`Model`](../crud/README.md#model).[`id`](../crud/README.md#model#id)

</td>
<td>

[lib/crud/interfaces/model.interface.ts:57](https://github.com/hichchidev/hichchi/blob/70fdee7ca8f6cceb9fa71d5e5e1eadc76e3aba50/libs/nest-connector/src/lib/crud/interfaces/model.interface.ts#L57)

</td>
</tr>
<tr>
<td>

<a id="name"></a> `name`

</td>
<td>

`R`

</td>
<td>

Human-readable name of the role.

Used for display purposes and should be descriptive of the role's purpose
or level of access (e.g., "Admin", "Moderator", "User").

</td>
<td>

[`RoleBase`](#rolebase).[`name`](#name-1)

</td>
<td>

[lib/auth/interfaces/role.interface.ts:11](https://github.com/hichchidev/hichchi/blob/70fdee7ca8f6cceb9fa71d5e5e1eadc76e3aba50/libs/nest-connector/src/lib/auth/interfaces/role.interface.ts#L11)

</td>
</tr>
<tr>
<td>

<a id="permissions"></a> `permissions`

</td>
<td>

`null` | `P`\[]

</td>
<td>

Array of permission identifiers granted to this role.

Each string in this array represents a specific permission or capability
within the system. The authorization system uses these permissions to determine
if a user with this role can perform specific actions.

</td>
<td>

[`RoleBase`](#rolebase).[`permissions`](#permissions-1)

</td>
<td>

[lib/auth/interfaces/role.interface.ts:20](https://github.com/hichchidev/hichchi/blob/70fdee7ca8f6cceb9fa71d5e5e1eadc76e3aba50/libs/nest-connector/src/lib/auth/interfaces/role.interface.ts#L20)

</td>
</tr>
<tr>
<td>

<a id="priority"></a> `priority`

</td>
<td>

`null` | `number`

</td>
<td>

Optional numeric value indicating the role's precedence.

When a user has multiple roles, the role with the highest priority (higher number)
may take precedence in authorization decisions. This allows for implementing
hierarchical role structures.

</td>
<td>

[`RoleBase`](#rolebase).[`priority`](#priority-1)

</td>
<td>

[lib/auth/interfaces/role.interface.ts:29](https://github.com/hichchidev/hichchi/blob/70fdee7ca8f6cceb9fa71d5e5e1eadc76e3aba50/libs/nest-connector/src/lib/auth/interfaces/role.interface.ts#L29)

</td>
</tr>
<tr>
<td>

<a id="updatedat"></a> `updatedAt`

</td>
<td>

`Date`

</td>
<td>

Timestamp when the entity was last updated.

This value is automatically updated whenever any property of the entity
changes, providing a way to track the recency of data and implement
optimistic concurrency control.

</td>
<td>

[`Model`](../crud/README.md#model).[`updatedAt`](../crud/README.md#model#updatedat)

</td>
<td>

[lib/crud/interfaces/model.interface.ts:74](https://github.com/hichchidev/hichchi/blob/70fdee7ca8f6cceb9fa71d5e5e1eadc76e3aba50/libs/nest-connector/src/lib/crud/interfaces/model.interface.ts#L74)

</td>
</tr>
<tr>
<td>

<a id="updatedby"></a> `updatedBy`

</td>
<td>

`null` | [`UserInfo`](../index/README.md#userinfo)

</td>
<td>

Detailed information about the user who last updated this entity.

Contains essential identifying information about the last user to modify
the record. Used primarily for display in audit logs and history views.

**See**

[UserInfo](../index/README.md#userinfo) Interface for user reference information

</td>
<td>

[`Model`](../crud/README.md#model).[`updatedBy`](../crud/README.md#model#updatedby)

</td>
<td>

[lib/crud/interfaces/model.interface.ts:120](https://github.com/hichchidev/hichchi/blob/70fdee7ca8f6cceb9fa71d5e5e1eadc76e3aba50/libs/nest-connector/src/lib/crud/interfaces/model.interface.ts#L120)

</td>
</tr>
<tr>
<td>

<a id="updatedbyid"></a> `updatedById`

</td>
<td>

`null` | [`EntityId`](../crud/README.md#entityid)

</td>
<td>

ID of the user who last updated this entity.

Tracks which user most recently modified any property of this entity.
Essential for audit trails and accountability in multi-user systems.

</td>
<td>

[`Model`](../crud/README.md#model).[`updatedById`](../crud/README.md#model#updatedbyid)

</td>
<td>

[lib/crud/interfaces/model.interface.ts:110](https://github.com/hichchidev/hichchi/blob/70fdee7ca8f6cceb9fa71d5e5e1eadc76e3aba50/libs/nest-connector/src/lib/crud/interfaces/model.interface.ts#L110)

</td>
</tr>
<tr>
<td>

<a id="users"></a> `users`

</td>
<td>

`null` | [`User`](#user-1)<`R`, `P`>\[]

</td>
<td>

‐

</td>
<td>

‐

</td>
<td>

[lib/auth/interfaces/role.interface.ts:49](https://github.com/hichchidev/hichchi/blob/70fdee7ca8f6cceb9fa71d5e5e1eadc76e3aba50/libs/nest-connector/src/lib/auth/interfaces/role.interface.ts#L49)

</td>
</tr>
</tbody>
</table>

---

### RoleBase\<R, P>

Defined in: [lib/auth/interfaces/role.interface.ts:4](https://github.com/hichchidev/hichchi/blob/70fdee7ca8f6cceb9fa71d5e5e1eadc76e3aba50/libs/nest-connector/src/lib/auth/interfaces/role.interface.ts#L4)

#### Extended by

- [`Role`](#role)

#### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
<th>Default type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`R` _extends_ `string`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

`P` _extends_ `string`

</td>
<td>

`string`

</td>
</tr>
</tbody>
</table>

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
<th>Description</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="name-1"></a> `name`

</td>
<td>

`R`

</td>
<td>

Human-readable name of the role.

Used for display purposes and should be descriptive of the role's purpose
or level of access (e.g., "Admin", "Moderator", "User").

</td>
<td>

[lib/auth/interfaces/role.interface.ts:11](https://github.com/hichchidev/hichchi/blob/70fdee7ca8f6cceb9fa71d5e5e1eadc76e3aba50/libs/nest-connector/src/lib/auth/interfaces/role.interface.ts#L11)

</td>
</tr>
<tr>
<td>

<a id="permissions-1"></a> `permissions`

</td>
<td>

`null` | `P`\[]

</td>
<td>

Array of permission identifiers granted to this role.

Each string in this array represents a specific permission or capability
within the system. The authorization system uses these permissions to determine
if a user with this role can perform specific actions.

</td>
<td>

[lib/auth/interfaces/role.interface.ts:20](https://github.com/hichchidev/hichchi/blob/70fdee7ca8f6cceb9fa71d5e5e1eadc76e3aba50/libs/nest-connector/src/lib/auth/interfaces/role.interface.ts#L20)

</td>
</tr>
<tr>
<td>

<a id="priority-1"></a> `priority`

</td>
<td>

`null` | `number`

</td>
<td>

Optional numeric value indicating the role's precedence.

When a user has multiple roles, the role with the highest priority (higher number)
may take precedence in authorization decisions. This allows for implementing
hierarchical role structures.

</td>
<td>

[lib/auth/interfaces/role.interface.ts:29](https://github.com/hichchidev/hichchi/blob/70fdee7ca8f6cceb9fa71d5e5e1eadc76e3aba50/libs/nest-connector/src/lib/auth/interfaces/role.interface.ts#L29)

</td>
</tr>
</tbody>
</table>

---

### SignInBody

Defined in: [lib/auth/interfaces/dtos/sign-in-body.interface.ts:32](https://github.com/hichchidev/hichchi/blob/70fdee7ca8f6cceb9fa71d5e5e1eadc76e3aba50/libs/nest-connector/src/lib/auth/interfaces/dtos/sign-in-body.interface.ts#L32)

Interface defining the body structure for user sign-in requests.

This interface specifies the required and optional properties for authenticating
a user with their credentials. The interface supports both email and username-based
authentication, allowing flexibility in how users identify themselves.

At least one of `username` or `email` must be provided along with the password
for successful authentication. The specific field used depends on the application's
authentication configuration.

#### Examples

```typescript
// Email-based sign-in
const emailSignIn: SignInBody = {
  email: "user@example.com",
  password: "securePassword123",
};
```

```typescript
// Username-based sign-in
const usernameSignIn: SignInBody = {
  username: "johndoe",
  password: "securePassword123",
};
```

#### See

[SignUpBody](#signupbody) Related interface for user registration

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
<th>Description</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="email-3"></a> `email?`

</td>
<td>

`string`

</td>
<td>

The user's email address for authentication.

Optional field that serves as the primary means of user identification in most systems.
When provided, the authentication system will attempt to find a user with this email.

</td>
<td>

[lib/auth/interfaces/dtos/sign-in-body.interface.ts:47](https://github.com/hichchidev/hichchi/blob/70fdee7ca8f6cceb9fa71d5e5e1eadc76e3aba50/libs/nest-connector/src/lib/auth/interfaces/dtos/sign-in-body.interface.ts#L47)

</td>
</tr>
<tr>
<td>

<a id="password-1"></a> `password`

</td>
<td>

`string`

</td>
<td>

The user's password for authentication.

Required field containing the user's plaintext password. This will be verified
against the stored hashed password during the authentication process.

</td>
<td>

[lib/auth/interfaces/dtos/sign-in-body.interface.ts:55](https://github.com/hichchidev/hichchi/blob/70fdee7ca8f6cceb9fa71d5e5e1eadc76e3aba50/libs/nest-connector/src/lib/auth/interfaces/dtos/sign-in-body.interface.ts#L55)

</td>
</tr>
<tr>
<td>

<a id="username-1"></a> `username?`

</td>
<td>

`string`

</td>
<td>

The user's username for authentication.

Optional field that can be used as an alternative to email for user identification.
When provided, the authentication system will attempt to find a user with this username.

</td>
<td>

[lib/auth/interfaces/dtos/sign-in-body.interface.ts:39](https://github.com/hichchidev/hichchi/blob/70fdee7ca8f6cceb9fa71d5e5e1eadc76e3aba50/libs/nest-connector/src/lib/auth/interfaces/dtos/sign-in-body.interface.ts#L39)

</td>
</tr>
</tbody>
</table>

---

### SignUpBody

Defined in: [lib/auth/interfaces/dtos/sign-up-body.interface.ts:50](https://github.com/hichchidev/hichchi/blob/70fdee7ca8f6cceb9fa71d5e5e1eadc76e3aba50/libs/nest-connector/src/lib/auth/interfaces/dtos/sign-up-body.interface.ts#L50)

Interface defining the body structure for user registration requests.

This interface specifies the required and optional properties for creating
a new user account. It includes personal information, authentication credentials,
and supports both email and username-based registration depending on the
application's authentication configuration.

The interface requires basic personal information (first and last name) and
a password, while allowing flexibility in the choice of primary identifier
(email or username) based on the system's authentication strategy.

#### Examples

```typescript
// Email-based registration
const emailSignUp: SignUpBody = {
  firstName: "John",
  lastName: "Doe",
  email: "john.doe@example.com",
  password: "securePassword123",
};
```

```typescript
// Username-based registration
const usernameSignUp: SignUpBody = {
  firstName: "Jane",
  lastName: "Smith",
  username: "janesmith",
  password: "securePassword123",
};
```

```typescript
// Registration with both email and username
const fullSignUp: SignUpBody = {
  firstName: "Alice",
  lastName: "Johnson",
  email: "alice.johnson@example.com",
  username: "alicejohnson",
  password: "securePassword123",
};
```

#### See

- [SignInBody](#signinbody) Related interface for user authentication
- [User](#user-1) Interface representing the created user account

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
<th>Description</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="email-4"></a> `email?`

</td>
<td>

`string`

</td>
<td>

The user's email address.

Optional field that typically serves as the primary means of user identification
and communication. When provided, it's often used for account verification,
password recovery, and notifications.

</td>
<td>

[lib/auth/interfaces/dtos/sign-up-body.interface.ts:83](https://github.com/hichchidev/hichchi/blob/70fdee7ca8f6cceb9fa71d5e5e1eadc76e3aba50/libs/nest-connector/src/lib/auth/interfaces/dtos/sign-up-body.interface.ts#L83)

</td>
</tr>
<tr>
<td>

<a id="firstname"></a> `firstName`

</td>
<td>

`string`

</td>
<td>

The user's first name.

Required field for personal identification and profile information.
Used for display purposes and personalization throughout the application.

</td>
<td>

[lib/auth/interfaces/dtos/sign-up-body.interface.ts:57](https://github.com/hichchidev/hichchi/blob/70fdee7ca8f6cceb9fa71d5e5e1eadc76e3aba50/libs/nest-connector/src/lib/auth/interfaces/dtos/sign-up-body.interface.ts#L57)

</td>
</tr>
<tr>
<td>

<a id="lastname"></a> `lastName`

</td>
<td>

`string`

</td>
<td>

The user's last name.

Required field for personal identification and profile information.
Used for display purposes and personalization throughout the application.

</td>
<td>

[lib/auth/interfaces/dtos/sign-up-body.interface.ts:65](https://github.com/hichchidev/hichchi/blob/70fdee7ca8f6cceb9fa71d5e5e1eadc76e3aba50/libs/nest-connector/src/lib/auth/interfaces/dtos/sign-up-body.interface.ts#L65)

</td>
</tr>
<tr>
<td>

<a id="password-2"></a> `password`

</td>
<td>

`string`

</td>
<td>

The user's chosen password.

Required field containing the user's plaintext password. This will be securely
hashed before storage and used for subsequent authentication attempts.
Should meet the application's password complexity requirements.

</td>
<td>

[lib/auth/interfaces/dtos/sign-up-body.interface.ts:92](https://github.com/hichchidev/hichchi/blob/70fdee7ca8f6cceb9fa71d5e5e1eadc76e3aba50/libs/nest-connector/src/lib/auth/interfaces/dtos/sign-up-body.interface.ts#L92)

</td>
</tr>
<tr>
<td>

<a id="username-2"></a> `username?`

</td>
<td>

`string`

</td>
<td>

The user's chosen username.

Optional field that can serve as a unique identifier for the user account.
When provided, it may be used as an alternative to email for authentication
and may be displayed publicly or used for personalization.

</td>
<td>

[lib/auth/interfaces/dtos/sign-up-body.interface.ts:74](https://github.com/hichchidev/hichchi/blob/70fdee7ca8f6cceb9fa71d5e5e1eadc76e3aba50/libs/nest-connector/src/lib/auth/interfaces/dtos/sign-up-body.interface.ts#L74)

</td>
</tr>
</tbody>
</table>

---

### TokenResponse

Defined in: [lib/auth/interfaces/token-response.interface.ts:22](https://github.com/hichchidev/hichchi/blob/70fdee7ca8f6cceb9fa71d5e5e1eadc76e3aba50/libs/nest-connector/src/lib/auth/interfaces/token-response.interface.ts#L22)

Interface representing the authentication tokens with their expiration times.

The `TokenResponse` interface extends the base `Tokens` interface by adding
expiration timestamps for both access and refresh tokens. This information
allows client applications to preemptively refresh tokens before they expire,
improving user experience by avoiding authentication failures.

This interface is typically used in authentication responses and token refresh
operations to provide clients with complete token lifecycle information.

TokenResponse

#### See

- [Tokens](#tokens) Base interface with token string properties
- [AuthResponse](#authresponse) Complete authentication response that includes this data
- [AccessToken](#accesstoken-5) Branded type for access tokens
- [RefreshToken](#refreshtoken-5) Branded type for refresh tokens

#### Extends

- [`Tokens`](#tokens)

#### Extended by

- [`AuthResponse`](#authresponse)

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
<th>Description</th>
<th>Inherited from</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="accesstoken-2"></a> `accessToken`

</td>
<td>

[`AccessToken`](#accesstoken-5)

</td>
<td>

The access token used for authenticating API requests.

Access tokens are typically short-lived (minutes to hours) JWT tokens that
contain encoded user information and permissions. They should be included
in API requests to protected endpoints, usually in an Authorization header.

The token is a string branded as `AccessToken` for type safety.

**See**

[AccessToken](#accesstoken-5) Branded type for access tokens

</td>
<td>

[`Tokens`](#tokens).[`accessToken`](#accesstoken-3)

</td>
<td>

[lib/auth/interfaces/tokens.interface.ts:36](https://github.com/hichchidev/hichchi/blob/70fdee7ca8f6cceb9fa71d5e5e1eadc76e3aba50/libs/nest-connector/src/lib/auth/interfaces/tokens.interface.ts#L36)

</td>
</tr>
<tr>
<td>

<a id="accesstokenexpireson-1"></a> `accessTokenExpiresOn`

</td>
<td>

`Date`

</td>
<td>

The date and time when the access token expires.

Clients can use this information to schedule token refreshes before
the access token expires, preventing authentication failures during
active user sessions.

The expiration time is determined by the JWT token's 'exp' claim and
configured through the authentication service options.

</td>
<td>

‐

</td>
<td>

[lib/auth/interfaces/token-response.interface.ts:33](https://github.com/hichchidev/hichchi/blob/70fdee7ca8f6cceb9fa71d5e5e1eadc76e3aba50/libs/nest-connector/src/lib/auth/interfaces/token-response.interface.ts#L33)

</td>
</tr>
<tr>
<td>

<a id="refreshtoken-2"></a> `refreshToken`

</td>
<td>

[`RefreshToken`](#refreshtoken-5)

</td>
<td>

The refresh token used to obtain new access tokens.

Refresh tokens are typically longer-lived (days to weeks) tokens that enable
clients to obtain new access tokens when the current one expires, without
requiring the user to re-authenticate. These tokens should be handled with
extra security precautions as they represent longer-term authentication power.

The token is a string branded as `RefreshToken` for type safety.

**See**

[RefreshToken](#refreshtoken-5) Branded type for refresh tokens

</td>
<td>

[`Tokens`](#tokens).[`refreshToken`](#refreshtoken-3)

</td>
<td>

[lib/auth/interfaces/tokens.interface.ts:50](https://github.com/hichchidev/hichchi/blob/70fdee7ca8f6cceb9fa71d5e5e1eadc76e3aba50/libs/nest-connector/src/lib/auth/interfaces/tokens.interface.ts#L50)

</td>
</tr>
<tr>
<td>

<a id="refreshtokenexpireson-1"></a> `refreshTokenExpiresOn`

</td>
<td>

`Date`

</td>
<td>

The date and time when the refresh token expires.

Refresh tokens typically have a longer lifespan than access tokens.
When a refresh token expires, the user will need to re-authenticate
with their credentials.

The expiration time is configured through the authentication service options
and represents the maximum duration of a user's session without re-authentication.

</td>
<td>

‐

</td>
<td>

[lib/auth/interfaces/token-response.interface.ts:45](https://github.com/hichchidev/hichchi/blob/70fdee7ca8f6cceb9fa71d5e5e1eadc76e3aba50/libs/nest-connector/src/lib/auth/interfaces/token-response.interface.ts#L45)

</td>
</tr>
</tbody>
</table>

---

### Tokens

Defined in: [lib/auth/interfaces/tokens.interface.ts:24](https://github.com/hichchidev/hichchi/blob/70fdee7ca8f6cceb9fa71d5e5e1eadc76e3aba50/libs/nest-connector/src/lib/auth/interfaces/tokens.interface.ts#L24)

Interface representing the core authentication tokens.

The `Tokens` interface defines the fundamental structure for authentication tokens
in the system, containing both the access token and refresh token. This interface
provides the bare minimum token information needed for authentication flows.

This interface is the foundation for more comprehensive token-related interfaces
like `TokenResponse`, which extends it with additional metadata such as expiration times.

In a typical JWT-based authentication system:

- The access token is short-lived and used for authenticating API requests
- The refresh token is longer-lived and used to obtain new access tokens without re-authentication

Tokens

#### See

- [AccessToken](#accesstoken-5) Branded type for access tokens
- [RefreshToken](#refreshtoken-5) Branded type for refresh tokens
- [TokenResponse](#tokenresponse) Extended interface with token expiration information
- [AuthResponse](#authresponse) Complete authentication response that includes tokens

#### Extended by

- [`TokenResponse`](#tokenresponse)

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
<th>Description</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="accesstoken-3"></a> `accessToken`

</td>
<td>

[`AccessToken`](#accesstoken-5)

</td>
<td>

The access token used for authenticating API requests.

Access tokens are typically short-lived (minutes to hours) JWT tokens that
contain encoded user information and permissions. They should be included
in API requests to protected endpoints, usually in an Authorization header.

The token is a string branded as `AccessToken` for type safety.

**See**

[AccessToken](#accesstoken-5) Branded type for access tokens

</td>
<td>

[lib/auth/interfaces/tokens.interface.ts:36](https://github.com/hichchidev/hichchi/blob/70fdee7ca8f6cceb9fa71d5e5e1eadc76e3aba50/libs/nest-connector/src/lib/auth/interfaces/tokens.interface.ts#L36)

</td>
</tr>
<tr>
<td>

<a id="refreshtoken-3"></a> `refreshToken`

</td>
<td>

[`RefreshToken`](#refreshtoken-5)

</td>
<td>

The refresh token used to obtain new access tokens.

Refresh tokens are typically longer-lived (days to weeks) tokens that enable
clients to obtain new access tokens when the current one expires, without
requiring the user to re-authenticate. These tokens should be handled with
extra security precautions as they represent longer-term authentication power.

The token is a string branded as `RefreshToken` for type safety.

**See**

[RefreshToken](#refreshtoken-5) Branded type for refresh tokens

</td>
<td>

[lib/auth/interfaces/tokens.interface.ts:50](https://github.com/hichchidev/hichchi/blob/70fdee7ca8f6cceb9fa71d5e5e1eadc76e3aba50/libs/nest-connector/src/lib/auth/interfaces/tokens.interface.ts#L50)

</td>
</tr>
</tbody>
</table>

---

### UpdatePasswordBody

Defined in: [lib/auth/interfaces/dtos/update-password-body.interface.ts:36](https://github.com/hichchidev/hichchi/blob/70fdee7ca8f6cceb9fa71d5e5e1eadc76e3aba50/libs/nest-connector/src/lib/auth/interfaces/dtos/update-password-body.interface.ts#L36)

Interface defining the body structure for password update requests.

This interface specifies the required properties for updating a user's password
when they are already authenticated and know their current password. This is
different from password reset, which is used when a user has forgotten their
password and needs to reset it via email verification.

The old password is required for security verification to ensure that only
the legitimate user can change their password. This prevents unauthorized
password changes if someone gains access to an authenticated session.

#### Examples

```typescript
// Update user password
const updatePassword: UpdatePasswordBody = {
  oldPassword: "currentPassword123",
  newPassword: "newSecurePassword456",
};
```

```typescript
// Using in a service
async changeUserPassword(oldPass: string, newPass: string): Promise<void> {
  const body: UpdatePasswordBody = {
    oldPassword: oldPass,
    newPassword: newPass
  };
  return this.authService.updatePassword(body);
}
```

#### See

[ResetPasswordBody](#resetpasswordbody) Related interface for password reset (when password is forgotten)

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
<th>Description</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="newpassword"></a> `newPassword`

</td>
<td>

`string`

</td>
<td>

The new password to set for the user account.

This should be the user's new plaintext password, which will be securely
hashed before storage. The password should meet the application's
complexity requirements for security.

</td>
<td>

[lib/auth/interfaces/dtos/update-password-body.interface.ts:53](https://github.com/hichchidev/hichchi/blob/70fdee7ca8f6cceb9fa71d5e5e1eadc76e3aba50/libs/nest-connector/src/lib/auth/interfaces/dtos/update-password-body.interface.ts#L53)

</td>
</tr>
<tr>
<td>

<a id="oldpassword"></a> `oldPassword`

</td>
<td>

`string`

</td>
<td>

The user's current password for verification.

This field is required to verify that the request is coming from the
legitimate user. The current password will be validated against the
stored hash before allowing the password change to proceed.

</td>
<td>

[lib/auth/interfaces/dtos/update-password-body.interface.ts:44](https://github.com/hichchidev/hichchi/blob/70fdee7ca8f6cceb9fa71d5e5e1eadc76e3aba50/libs/nest-connector/src/lib/auth/interfaces/dtos/update-password-body.interface.ts#L44)

</td>
</tr>
</tbody>
</table>

---

### User\<R, P>

Defined in: [lib/auth/interfaces/user.interface.ts:26](https://github.com/hichchidev/hichchi/blob/70fdee7ca8f6cceb9fa71d5e5e1eadc76e3aba50/libs/nest-connector/src/lib/auth/interfaces/user.interface.ts#L26)

Interface representing a user account in the authentication system.

The `User` interface extends the base `UserInfo` interface to define the
complete structure of a user account with authentication-specific properties.
This interface represents users throughout the authentication system and
serves as the primary user data structure for authentication operations.

It includes properties for identification, authentication, authorization,
and profile information. Some properties are optional to accommodate different
authentication methods (e.g., social login vs. local authentication).

User

#### See

- [UserInfo](../index/README.md#userinfo) Base interface with common user properties
- [AuthProvider](#authprovider) Enumeration of registration methods
- [Role](#role) Interface defining user authorization roles
- [AuthResponse](#authresponse) Authentication response containing user information

#### Extends

- [`UserInfo`](../index/README.md#userinfo).[`Model`](../crud/README.md#model)

#### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
<th>Default type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`R` _extends_ `string`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

`P` _extends_ `string`

</td>
<td>

`string`

</td>
</tr>
</tbody>
</table>

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
<th>Description</th>
<th>Inherited from</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="avatar"></a> `avatar`

</td>
<td>

`null` | `string`

</td>
<td>

URL or path to the user's profile picture/avatar.

Provides a visual representation of the user throughout the application.
May be automatically populated from social login providers when available.

</td>
<td>

‐

</td>
<td>

[lib/auth/interfaces/user.interface.ts:100](https://github.com/hichchidev/hichchi/blob/70fdee7ca8f6cceb9fa71d5e5e1eadc76e3aba50/libs/nest-connector/src/lib/auth/interfaces/user.interface.ts#L100)

</td>
</tr>
<tr>
<td>

<a id="createdat-1"></a> `createdAt`

</td>
<td>

`Date`

</td>
<td>

Timestamp when the entity was created.

This value is set automatically on entity creation and never changes
afterward, providing an immutable record of when the data was first added.

</td>
<td>

[`Model`](../crud/README.md#model).[`createdAt`](../crud/README.md#model#createdat)

</td>
<td>

[lib/crud/interfaces/model.interface.ts:65](https://github.com/hichchidev/hichchi/blob/70fdee7ca8f6cceb9fa71d5e5e1eadc76e3aba50/libs/nest-connector/src/lib/crud/interfaces/model.interface.ts#L65)

</td>
</tr>
<tr>
<td>

<a id="createdby-1"></a> `createdBy`

</td>
<td>

`null` | [`UserInfo`](../index/README.md#userinfo)

</td>
<td>

Detailed information about the user who created this entity.

Contains essential identifying information about the creator without
including sensitive data. This property may be populated through a join or
separate query when needed for display purposes.

**See**

[UserInfo](../index/README.md#userinfo) Interface for user reference information

</td>
<td>

[`Model`](../crud/README.md#model).[`createdBy`](../crud/README.md#model#createdby)

</td>
<td>

[lib/crud/interfaces/model.interface.ts:102](https://github.com/hichchidev/hichchi/blob/70fdee7ca8f6cceb9fa71d5e5e1eadc76e3aba50/libs/nest-connector/src/lib/crud/interfaces/model.interface.ts#L102)

</td>
</tr>
<tr>
<td>

<a id="createdbyid-1"></a> `createdById`

</td>
<td>

`null` | [`EntityId`](../crud/README.md#entityid)

</td>
<td>

ID of the user who created this entity.

Stores just the ID reference to the user for efficient database storage.
Use in conjunction with the `createdBy` property when user details are needed.

</td>
<td>

[`Model`](../crud/README.md#model).[`createdById`](../crud/README.md#model#createdbyid)

</td>
<td>

[lib/crud/interfaces/model.interface.ts:91](https://github.com/hichchidev/hichchi/blob/70fdee7ca8f6cceb9fa71d5e5e1eadc76e3aba50/libs/nest-connector/src/lib/crud/interfaces/model.interface.ts#L91)

</td>
</tr>
<tr>
<td>

<a id="deletedat-1"></a> `deletedAt`

</td>
<td>

`null` | `Date`

</td>
<td>

Timestamp when the entity was soft-deleted, if applicable.

When present and not null, indicates that this entity has been deleted
logically but is still present in the database. This enables data recovery
and maintains referential integrity while hiding the record from normal queries.

</td>
<td>

[`Model`](../crud/README.md#model).[`deletedAt`](../crud/README.md#model#deletedat)

</td>
<td>

[lib/crud/interfaces/model.interface.ts:83](https://github.com/hichchidev/hichchi/blob/70fdee7ca8f6cceb9fa71d5e5e1eadc76e3aba50/libs/nest-connector/src/lib/crud/interfaces/model.interface.ts#L83)

</td>
</tr>
<tr>
<td>

<a id="deletedby-1"></a> `deletedBy`

</td>
<td>

`null` | [`UserInfo`](../index/README.md#userinfo)

</td>
<td>

Detailed information about the user who soft-deleted this entity, if applicable.

Contains identifying information about the user who performed the deletion,
used primarily in administrative interfaces for reviewing deletion history.

**See**

[UserInfo](../index/README.md#userinfo) Interface for user reference information

</td>
<td>

[`Model`](../crud/README.md#model).[`deletedBy`](../crud/README.md#model#deletedby)

</td>
<td>

[lib/crud/interfaces/model.interface.ts:138](https://github.com/hichchidev/hichchi/blob/70fdee7ca8f6cceb9fa71d5e5e1eadc76e3aba50/libs/nest-connector/src/lib/crud/interfaces/model.interface.ts#L138)

</td>
</tr>
<tr>
<td>

<a id="deletedbyid-1"></a> `deletedById`

</td>
<td>

`null` | [`EntityId`](../crud/README.md#entityid)

</td>
<td>

ID of the user who soft-deleted this entity, if applicable.

When an entity is soft-deleted, this property stores the ID of the user
who performed the deletion action for accountability purposes.

</td>
<td>

[`Model`](../crud/README.md#model).[`deletedById`](../crud/README.md#model#deletedbyid)

</td>
<td>

[lib/crud/interfaces/model.interface.ts:128](https://github.com/hichchidev/hichchi/blob/70fdee7ca8f6cceb9fa71d5e5e1eadc76e3aba50/libs/nest-connector/src/lib/crud/interfaces/model.interface.ts#L128)

</td>
</tr>
<tr>
<td>

<a id="email-5"></a> `email`

</td>
<td>

`null` | `string`

</td>
<td>

The user's email address.

May be optional for some authentication methods, but generally serves
as the primary means of communication and account recovery.
Often used as the primary identifier for authentication.

</td>
<td>

‐

</td>
<td>

[lib/auth/interfaces/user.interface.ts:34](https://github.com/hichchidev/hichchi/blob/70fdee7ca8f6cceb9fa71d5e5e1eadc76e3aba50/libs/nest-connector/src/lib/auth/interfaces/user.interface.ts#L34)

</td>
</tr>
<tr>
<td>

<a id="emailverified"></a> `emailVerified`

</td>
<td>

`boolean`

</td>
<td>

Indicates whether the user's email address has been verified.

Email verification is an important security measure to confirm user identity
and prevent account abuse. Some features may be restricted until verification.

</td>
<td>

‐

</td>
<td>

[lib/auth/interfaces/user.interface.ts:84](https://github.com/hichchidev/hichchi/blob/70fdee7ca8f6cceb9fa71d5e5e1eadc76e3aba50/libs/nest-connector/src/lib/auth/interfaces/user.interface.ts#L84)

</td>
</tr>
<tr>
<td>

<a id="firstname-1"></a> `firstName`

</td>
<td>

`string`

</td>
<td>

The user's first name or given name.

Used for personalization and formal addressing throughout the application.

</td>
<td>

[`UserInfo`](../index/README.md#userinfo).[`firstName`](../index/README.md#userinfo#firstname)

</td>
<td>

[lib/common/interfaces/user-info.interface.ts:52](https://github.com/hichchidev/hichchi/blob/70fdee7ca8f6cceb9fa71d5e5e1eadc76e3aba50/libs/nest-connector/src/lib/common/interfaces/user-info.interface.ts#L52)

</td>
</tr>
<tr>
<td>

<a id="fullname"></a> `fullName`

</td>
<td>

`string`

</td>
<td>

The user's complete name, typically a combination of first and last name.

This property provides a convenience for displaying the user's full name
without having to concatenate the first and last names manually. The exact
format may vary based on locale and application requirements.

</td>
<td>

[`UserInfo`](../index/README.md#userinfo).[`fullName`](../index/README.md#userinfo#fullname)

</td>
<td>

[lib/common/interfaces/user-info.interface.ts:68](https://github.com/hichchidev/hichchi/blob/70fdee7ca8f6cceb9fa71d5e5e1eadc76e3aba50/libs/nest-connector/src/lib/common/interfaces/user-info.interface.ts#L68)

</td>
</tr>
<tr>
<td>

<a id="id-1"></a> `id`

</td>
<td>

[`EntityId`](../crud/README.md#entityid)

</td>
<td>

The unique identifier for the user.

This ID corresponds to the primary key in the users table
and uniquely identifies the user across the entire system.

</td>
<td>

[`Model`](../crud/README.md#model).[`id`](../crud/README.md#model#id)

</td>
<td>

[lib/common/interfaces/user-info.interface.ts:45](https://github.com/hichchidev/hichchi/blob/70fdee7ca8f6cceb9fa71d5e5e1eadc76e3aba50/libs/nest-connector/src/lib/common/interfaces/user-info.interface.ts#L45)

</td>
</tr>
<tr>
<td>

<a id="lastname-1"></a> `lastName`

</td>
<td>

`string`

</td>
<td>

The user's last name or family name.

Used alongside the first name for formal addressing and identification.

</td>
<td>

[`UserInfo`](../index/README.md#userinfo).[`lastName`](../index/README.md#userinfo#lastname)

</td>
<td>

[lib/common/interfaces/user-info.interface.ts:59](https://github.com/hichchidev/hichchi/blob/70fdee7ca8f6cceb9fa71d5e5e1eadc76e3aba50/libs/nest-connector/src/lib/common/interfaces/user-info.interface.ts#L59)

</td>
</tr>
<tr>
<td>

<a id="password-3"></a> `password`

</td>
<td>

`null` | `string`

</td>
<td>

The user's password (typically hashed).

Optional as some authentication methods (e.g., OAuth) don't use passwords.
When present, this should always be a hashed version of the password,
never the plaintext value.

Note: This field is typically excluded from responses sent to clients.

</td>
<td>

‐

</td>
<td>

[lib/auth/interfaces/user.interface.ts:53](https://github.com/hichchidev/hichchi/blob/70fdee7ca8f6cceb9fa71d5e5e1eadc76e3aba50/libs/nest-connector/src/lib/auth/interfaces/user.interface.ts#L53)

</td>
</tr>
<tr>
<td>

<a id="profiledata"></a> `profileData`

</td>
<td>

`null` | `object`

</td>
<td>

Additional profile information for the user.

This flexible object can contain various user-specific details not covered
by standard fields, such as preferences, settings, or application-specific data.

</td>
<td>

‐

</td>
<td>

[lib/auth/interfaces/user.interface.ts:92](https://github.com/hichchidev/hichchi/blob/70fdee7ca8f6cceb9fa71d5e5e1eadc76e3aba50/libs/nest-connector/src/lib/auth/interfaces/user.interface.ts#L92)

</td>
</tr>
<tr>
<td>

<a id="role-1"></a> `role`

</td>
<td>

`null` | `R` | [`Role`](#role)<`R`, `P`>

</td>
<td>

The authorization role assigned to the user.

Determines the user's permissions and access levels within the system.
Can be a complex Role object or a simple string identifier.

**See**

[Role](#role) Interface defining user authorization roles

</td>
<td>

‐

</td>
<td>

[lib/auth/interfaces/user.interface.ts:74](https://github.com/hichchidev/hichchi/blob/70fdee7ca8f6cceb9fa71d5e5e1eadc76e3aba50/libs/nest-connector/src/lib/auth/interfaces/user.interface.ts#L74)

</td>
</tr>
<tr>
<td>

<a id="roleid-1"></a> `roleId`

</td>
<td>

`null` | [`EntityId`](../crud/README.md#entityid)

</td>
<td>

‐

</td>
<td>

‐

</td>
<td>

[lib/auth/interfaces/user.interface.ts:76](https://github.com/hichchidev/hichchi/blob/70fdee7ca8f6cceb9fa71d5e5e1eadc76e3aba50/libs/nest-connector/src/lib/auth/interfaces/user.interface.ts#L76)

</td>
</tr>
<tr>
<td>

<a id="signuptype"></a> `signUpType`

</td>
<td>

[`AuthProvider`](#authprovider)

</td>
<td>

The method used for account creation/registration.

Indicates whether the user registered directly or via a third-party
authentication provider (Google, Facebook, etc.). This affects available
authentication methods and account management options.

**See**

[AuthProvider](#authprovider) Enumeration of registration methods

</td>
<td>

‐

</td>
<td>

[lib/auth/interfaces/user.interface.ts:64](https://github.com/hichchidev/hichchi/blob/70fdee7ca8f6cceb9fa71d5e5e1eadc76e3aba50/libs/nest-connector/src/lib/auth/interfaces/user.interface.ts#L64)

</td>
</tr>
<tr>
<td>

<a id="updatedat-1"></a> `updatedAt`

</td>
<td>

`Date`

</td>
<td>

Timestamp when the entity was last updated.

This value is automatically updated whenever any property of the entity
changes, providing a way to track the recency of data and implement
optimistic concurrency control.

</td>
<td>

[`Model`](../crud/README.md#model).[`updatedAt`](../crud/README.md#model#updatedat)

</td>
<td>

[lib/crud/interfaces/model.interface.ts:74](https://github.com/hichchidev/hichchi/blob/70fdee7ca8f6cceb9fa71d5e5e1eadc76e3aba50/libs/nest-connector/src/lib/crud/interfaces/model.interface.ts#L74)

</td>
</tr>
<tr>
<td>

<a id="updatedby-1"></a> `updatedBy`

</td>
<td>

`null` | [`UserInfo`](../index/README.md#userinfo)

</td>
<td>

Detailed information about the user who last updated this entity.

Contains essential identifying information about the last user to modify
the record. Used primarily for display in audit logs and history views.

**See**

[UserInfo](../index/README.md#userinfo) Interface for user reference information

</td>
<td>

[`Model`](../crud/README.md#model).[`updatedBy`](../crud/README.md#model#updatedby)

</td>
<td>

[lib/crud/interfaces/model.interface.ts:120](https://github.com/hichchidev/hichchi/blob/70fdee7ca8f6cceb9fa71d5e5e1eadc76e3aba50/libs/nest-connector/src/lib/crud/interfaces/model.interface.ts#L120)

</td>
</tr>
<tr>
<td>

<a id="updatedbyid-1"></a> `updatedById`

</td>
<td>

`null` | [`EntityId`](../crud/README.md#entityid)

</td>
<td>

ID of the user who last updated this entity.

Tracks which user most recently modified any property of this entity.
Essential for audit trails and accountability in multi-user systems.

</td>
<td>

[`Model`](../crud/README.md#model).[`updatedById`](../crud/README.md#model#updatedbyid)

</td>
<td>

[lib/crud/interfaces/model.interface.ts:110](https://github.com/hichchidev/hichchi/blob/70fdee7ca8f6cceb9fa71d5e5e1eadc76e3aba50/libs/nest-connector/src/lib/crud/interfaces/model.interface.ts#L110)

</td>
</tr>
<tr>
<td>

<a id="username-3"></a> `username`

</td>
<td>

`null` | `string`

</td>
<td>

The user's chosen username.

Optional identifier that may be used as an alternative to email for
authentication. May be displayed publicly or used for personalization.

</td>
<td>

‐

</td>
<td>

[lib/auth/interfaces/user.interface.ts:42](https://github.com/hichchidev/hichchi/blob/70fdee7ca8f6cceb9fa71d5e5e1eadc76e3aba50/libs/nest-connector/src/lib/auth/interfaces/user.interface.ts#L42)

</td>
</tr>
</tbody>
</table>

---

### UserSession

Defined in: [lib/auth/interfaces/user-session.interface.ts:21](https://github.com/hichchidev/hichchi/blob/70fdee7ca8f6cceb9fa71d5e5e1eadc76e3aba50/libs/nest-connector/src/lib/auth/interfaces/user-session.interface.ts#L21)

Interface representing a user session in an application.

A `UserSession` tracks the information related to the user's authentication
and session management. It contains identifiers for the session, tokens
necessary for maintaining authenticated interactions, and optional metadata
like socket and frontend connection details.

Properties:

- `sessionId`: A unique identifier for the user's session.
- `accessToken`: The access token used for authenticated API requests.
- `refreshToken`: A token used to refresh the user's access token.
- `socketId`: Optional. The identifier for a websocket connection, if applicable.
- `frontendUrl`: Optional. The base URL for the frontend application associated with the session.
- `authProvider`: Optional. The authentication provider or strategy used for the session.
- `authProviderId`: Optional. The unique identifier representing the user in the context of the auth provider.

#### Extended by

- [`AuthResponse`](#authresponse)

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
<th>Description</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="accesstoken-4"></a> `accessToken`

</td>
<td>

[`AccessToken`](#accesstoken-5)

</td>
<td>

The access token used for authenticated API requests.
This is a short-lived JWT token that contains the user's identity and permissions.

**See**

[AccessToken](#accesstoken-5) Branded type for access tokens

</td>
<td>

[lib/auth/interfaces/user-session.interface.ts:34](https://github.com/hichchidev/hichchi/blob/70fdee7ca8f6cceb9fa71d5e5e1eadc76e3aba50/libs/nest-connector/src/lib/auth/interfaces/user-session.interface.ts#L34)

</td>
</tr>
<tr>
<td>

<a id="authprovider-2"></a> `authProvider?`

</td>
<td>

[`AuthProvider`](#authprovider)

</td>
<td>

The authentication provider used for this session.
Indicates how the user was authenticated (e.g., local, Google).

Optional: Defaults to the application's primary authentication provider if not specified.

**See**

[AuthProvider](#authprovider) Enum of supported authentication type

</td>
<td>

[lib/auth/interfaces/user-session.interface.ts:68](https://github.com/hichchidev/hichchi/blob/70fdee7ca8f6cceb9fa71d5e5e1eadc76e3aba50/libs/nest-connector/src/lib/auth/interfaces/user-session.interface.ts#L68)

</td>
</tr>
<tr>
<td>

<a id="authproviderid-1"></a> `authProviderId?`

</td>
<td>

`string`

</td>
<td>

The unique identifier representing the user in the context of the auth provider.
For example, this could be a Google user ID for sessions authenticated via Google OAuth.

Optional: Only relevant for third-party authentication providers.

</td>
<td>

[lib/auth/interfaces/user-session.interface.ts:76](https://github.com/hichchidev/hichchi/blob/70fdee7ca8f6cceb9fa71d5e5e1eadc76e3aba50/libs/nest-connector/src/lib/auth/interfaces/user-session.interface.ts#L76)

</td>
</tr>
<tr>
<td>

<a id="frontendurl-1"></a> `frontendUrl?`

</td>
<td>

`string`

</td>
<td>

The base URL for the frontend application associated with this session.
Used for generating correct redirect URLs for multi-frontend applications.

Optional: May be omitted for API-only usage or when a default frontend URL is configured.

</td>
<td>

[lib/auth/interfaces/user-session.interface.ts:58](https://github.com/hichchidev/hichchi/blob/70fdee7ca8f6cceb9fa71d5e5e1eadc76e3aba50/libs/nest-connector/src/lib/auth/interfaces/user-session.interface.ts#L58)

</td>
</tr>
<tr>
<td>

<a id="refreshtoken-4"></a> `refreshToken`

</td>
<td>

[`RefreshToken`](#refreshtoken-5)

</td>
<td>

A token used to refresh the user's access token when it expires.
This is a long-lived token that should be kept secure.

**See**

[RefreshToken](#refreshtoken-5) Branded type for refresh tokens

</td>
<td>

[lib/auth/interfaces/user-session.interface.ts:42](https://github.com/hichchidev/hichchi/blob/70fdee7ca8f6cceb9fa71d5e5e1eadc76e3aba50/libs/nest-connector/src/lib/auth/interfaces/user-session.interface.ts#L42)

</td>
</tr>
<tr>
<td>

<a id="sessionid-1"></a> `sessionId`

</td>
<td>

`string`

</td>
<td>

A unique identifier for this specific user session.
Used to distinguish between multiple active sessions for the same user.

</td>
<td>

[lib/auth/interfaces/user-session.interface.ts:26](https://github.com/hichchidev/hichchi/blob/70fdee7ca8f6cceb9fa71d5e5e1eadc76e3aba50/libs/nest-connector/src/lib/auth/interfaces/user-session.interface.ts#L26)

</td>
</tr>
<tr>
<td>

<a id="socketid-1"></a> `socketId?`

</td>
<td>

`string`

</td>
<td>

The identifier for a websocket connection associated with this session.
Used for real-time communication features if applicable.

Optional: This may not be present if the session doesn't have an active socket connection.

</td>
<td>

[lib/auth/interfaces/user-session.interface.ts:50](https://github.com/hichchidev/hichchi/blob/70fdee7ca8f6cceb9fa71d5e5e1eadc76e3aba50/libs/nest-connector/src/lib/auth/interfaces/user-session.interface.ts#L50)

</td>
</tr>
</tbody>
</table>

## Type Aliases

### AccessToken

```ts
type AccessToken = string & object;
```

Defined in: [lib/auth/types/types.ts:76](https://github.com/hichchidev/hichchi/blob/70fdee7ca8f6cceb9fa71d5e5e1eadc76e3aba50/libs/nest-connector/src/lib/auth/types/types.ts#L76)

Represents an OAuth2/OpenID Connect access token with type safety.

The `AccessToken` type is a branded string that ensures only valid access tokens
can be used where this type is expected. Access tokens are typically short-lived
credentials used to access protected resources like APIs.

This branded type prevents accidental use of arbitrary strings in places where
a validated access token is required, improving type safety throughout the
authentication flow.

Common sources of access tokens include:

- OAuth2 authorization code flow
- Social sign-in providers (Google, Facebook, etc.)
- Custom authentication services

#### Type declaration

<table>
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`__brand`

</td>
<td>

unique `symbol`

</td>
<td>

[lib/auth/types/types.ts:76](https://github.com/hichchidev/hichchi/blob/70fdee7ca8f6cceb9fa71d5e5e1eadc76e3aba50/libs/nest-connector/src/lib/auth/types/types.ts#L76)

</td>
</tr>
</tbody>
</table>

#### Remarks

Access tokens are typically shorter-lived than refresh tokens and should be
used for API calls and resource access.

#### Example

```typescript
// In an authentication service
async function authenticateWithGoogle(code: string): Promise<AccessToken> {
  const response = await oauth2Client.getToken(code);
  return response.tokens.access_token as AccessToken;
}

// Using the access token to make authenticated requests
async function fetchUserProfile(token: AccessToken): Promise<UserProfile> {
  return axios.get("https://api.example.com/user/profile", {
    headers: { Authorization: `Bearer ${token}` },
  });
}
```

---

### JWT

```ts
type JWT = string & object;
```

Defined in: [lib/auth/types/types.ts:38](https://github.com/hichchidev/hichchi/blob/70fdee7ca8f6cceb9fa71d5e5e1eadc76e3aba50/libs/nest-connector/src/lib/auth/types/types.ts#L38)

Represents a JSON Web Token (JWT) with a branded string type for type safety.

This type is a string that is branded with a unique symbol to differentiate it
from plain strings, ensuring that it is explicitly treated as a JWT token within
the type system. This branding enforces stricter type checking to prevent
accidentally passing or assigning plain strings where a JWT token is required.

JWTs typically contain encoded user information and are used for authentication
and authorization throughout the application.

#### Type declaration

<table>
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`__brand`

</td>
<td>

unique `symbol`

</td>
<td>

[lib/auth/types/types.ts:38](https://github.com/hichchidev/hichchi/blob/70fdee7ca8f6cceb9fa71d5e5e1eadc76e3aba50/libs/nest-connector/src/lib/auth/types/types.ts#L38)

</td>
</tr>
</tbody>
</table>

#### Remarks

To convert a regular string to this branded type, you must use type assertion:

```typescript
function validateAndCreateJWT(token: string): JWT {
  // Validation logic here
  return token as JWT;
}
```

#### Example

```typescript
// Function that only accepts JWT tokens
function decodeUserFromToken(token: JWT): UserInfo {
  // Decode and extract user info from the token
}

// This won't compile - type safety prevents passing a string
// decodeUserFromToken("some-random-string"); // Error

// Must use a properly created JWT
const validToken = validateAndCreateJWT(rawTokenString);
const user = decodeUserFromToken(validToken); // Works correctly
```

---

### RefreshToken

```ts
type RefreshToken = string & object;
```

Defined in: [lib/auth/types/types.ts:119](https://github.com/hichchidev/hichchi/blob/70fdee7ca8f6cceb9fa71d5e5e1eadc76e3aba50/libs/nest-connector/src/lib/auth/types/types.ts#L119)

Represents a refresh token with type safety through branding.

The `RefreshToken` type is a branded string specifically for refresh tokens,
which are long-lived credentials used to obtain new access tokens without
requiring the user to re-authenticate.

This type ensures that only properly validated refresh tokens can be used
where this type is expected, preventing misuse of arbitrary strings in
security-sensitive contexts.

Key characteristics of refresh tokens:

- Typically longer-lived than access tokens
- Used exclusively to obtain new access tokens
- Should be stored securely (HTTP-only cookies, secure storage)
- Can be revoked to terminate user sessions

#### Type declaration

<table>
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`__brand`

</td>
<td>

unique `symbol`

</td>
<td>

[lib/auth/types/types.ts:119](https://github.com/hichchidev/hichchi/blob/70fdee7ca8f6cceb9fa71d5e5e1eadc76e3aba50/libs/nest-connector/src/lib/auth/types/types.ts#L119)

</td>
</tr>
</tbody>
</table>

#### Remarks

Refresh tokens require careful handling as they represent long-term
authentication capabilities. They should never be exposed to client-side
JavaScript or insecure storage.

#### Example

```typescript
// In a token service
class TokenService {
  async refreshAccessToken(token: RefreshToken): Promise<{
    accessToken: AccessToken;
    refreshToken: RefreshToken;
  }> {
    // Exchange refresh token for new tokens
    const response = await this.authClient.refreshToken(token);

    return {
      accessToken: response.access_token as AccessToken,
      refreshToken: response.refresh_token as RefreshToken,
    };
  }
}
```

---

### VerifyToken

```ts
type VerifyToken = string & object;
```

Defined in: [lib/auth/types/types.ts:168](https://github.com/hichchidev/hichchi/blob/70fdee7ca8f6cceb9fa71d5e5e1eadc76e3aba50/libs/nest-connector/src/lib/auth/types/types.ts#L168)

Represents a cryptographically verified token string with type safety.

The `VerifyToken` type is a branded string that can only be created through
specific verification logic that confirms the validity of a token. This might
include signature verification, expiration checking, or other security validations.

The branding (`__brand`) ensures that this type is not interchangeable with ordinary
strings, providing additional type safety and preventing misuse in the application.

Common use cases include:

- Email verification tokens
- Password reset tokens
- Account activation tokens
- Single-use authentication codes

#### Type declaration

<table>
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`__brand`

</td>
<td>

unique `symbol`

</td>
<td>

[lib/auth/types/types.ts:168](https://github.com/hichchidev/hichchi/blob/70fdee7ca8f6cceb9fa71d5e5e1eadc76e3aba50/libs/nest-connector/src/lib/auth/types/types.ts#L168)

</td>
</tr>
</tbody>
</table>

#### Remarks

This type should only be created after performing appropriate cryptographic
verification, typically using libraries like `jsonwebtoken` or similar.

#### Example

```typescript
// In a token verification service
class TokenVerifier {
  verifyEmailToken(token: string): VerifyToken | null {
    try {
      // Verify the token cryptographically
      const payload = jwt.verify(token, this.secretKey);

      // Additional validation logic
      if (this.isValidEmailToken(payload)) {
        return token as VerifyToken;
      }
      return null;
    } catch {
      return null;
    }
  }

  // Use the verified token in a secure operation
  confirmEmailAddress(token: VerifyToken, userId: string): Promise<boolean> {
    // We can trust this token has been verified
    return this.userService.confirmEmail(userId);
  }
}
```

## Variables

### AuthErrors

```ts
const AuthErrors: { [key in AuthErrorResponseCode]: ErrorResponse };
```

Defined in: [lib/auth/responses/auth.error.responses.ts:68](https://github.com/hichchidev/hichchi/blob/70fdee7ca8f6cceb9fa71d5e5e1eadc76e3aba50/libs/nest-connector/src/lib/auth/responses/auth.error.responses.ts#L68)

Collection of standardized authentication error responses

This constant maps each authentication error code to its corresponding
standardized error response object. The responses include HTTP status codes,
error codes, and human-readable messages.

Key features:

- Standardized error response format following the ErrorResponse interface
- Comprehensive coverage of authentication error scenarios
- Organized by HTTP status code (400, 401, 403, 404, 500, 501)
- Includes both authentication service errors (AUTH\_) and user management errors (USER\_)
- Human-readable error messages suitable for end-users

The error responses are organized into categories based on HTTP status codes:

- 400 Bad Request: Client errors related to invalid input or request format
- 401 Unauthorized: Authentication failures and token-related errors
- 403 Forbidden: Access denied due to insufficient permissions
- 404 Not Found: Resource not found errors
- 500 Internal Server Error: Server-side errors during authentication operations
- 501 Not Implemented: Features that are not yet implemented

The object is organized by error code, with each code mapping to an ErrorResponse
object that follows the standardized format defined by the ErrorResponse interface.

#### Examples

```typescript
// Using an error response in an exception
import { AuthErrors } from "@hichchi/nest-connector/auth";
import { UnauthorizedException } from "@nestjs/common";

// In an authentication service
if (!user.isEmailVerified) {
  throw new UnauthorizedException(AuthErrors.AUTH_401_EMAIL_NOT_VERIFIED);
}
```

```typescript
// Using an error response in a custom exception filter
import { AuthErrors } from "@hichchi/nest-connector/auth";
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  UnauthorizedException,
} from "@nestjs/common";

@Catch(UnauthorizedException)
export class AuthExceptionFilter implements ExceptionFilter {
  catch(exception: UnauthorizedException, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse();
    const status = exception.getStatus();

    // Use a standard error response
    response.status(status).json(AuthErrors.AUTH_401_NOT_LOGGED_IN);
  }
}
```

#### See

- [AuthErrorResponseCode](#autherrorresponsecode) For all available error codes
- [ErrorResponse](../index/README.md#errorresponse) For the structure of error response objects
- [AuthSuccessResponses](#authsuccessresponses) Complementary success responses for authentication

---

### AuthSuccessResponses

```ts
const AuthSuccessResponses: {
  [key in AuthSuccessResponseCode]: SuccessResponse;
};
```

Defined in: [lib/auth/responses/auth.success.responses.ts:64](https://github.com/hichchidev/hichchi/blob/70fdee7ca8f6cceb9fa71d5e5e1eadc76e3aba50/libs/nest-connector/src/lib/auth/responses/auth.success.responses.ts#L64)

Collection of standardized authentication success responses

This constant maps each authentication success response code to its corresponding
standardized success response object. The responses include HTTP status codes,
success codes, and human-readable messages.

Key features:

- Standardized success response format following the SuccessResponse interface
- Comprehensive coverage of authentication success scenarios
- Organized by HTTP status code (200, 201)
- Human-readable success messages suitable for end-users
- Consistent response structure across the authentication system

The success responses are organized into categories based on HTTP status codes:

- 200 OK: General success responses for operations like verification, password reset, sign out
- 201 Created: Success responses for resource creation operations like account creation

The object is organized by success code, with each code mapping to a SuccessResponse
object that follows the standardized format defined by the SuccessResponse interface.

#### Examples

```typescript
// Using a success response in a controller
import { AuthSuccessResponses } from "@hichchi/nest-connector/auth";
import { Controller, Post, Body } from "@nestjs/common";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("register")
  async register(@Body() registerDto: RegisterDto) {
    await this.authService.register(registerDto);
    return AuthSuccessResponses.AUTH_201_ACCOUNT_CREATED_REQUIRE_VERIFY;
  }
}
```

```typescript
// Using a success response in a service
import { AuthSuccessResponses } from "@hichchi/nest-connector/auth";
import { Injectable } from "@nestjs/common";

@Injectable()
export class AuthService {
  async verifyEmail(token: string) {
    // Verify email logic...
    return AuthSuccessResponses.AUTH_201_EMAIL_VERIFIED;
  }
}
```

#### See

- [AuthSuccessResponseCode](#authsuccessresponsecode) For all available success codes
- [SuccessResponse](../index/README.md#successresponse) For the structure of success response objects
- [AuthErrors](#autherrors) Complementary error responses for authentication

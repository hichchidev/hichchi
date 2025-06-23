**@hichchi/nest-auth**

---

# nest-auth

This library was generated with [Nx](https://nx.dev).

## Building

Run `nx build nest-auth` to build the library.

## Running unit tests

Run `nx test nest-auth` to execute the unit tests via [Jest](https://jestjs.io).
This library was generated with [Nx](https://nx.dev).

## Building

Run `nx build nest-auth` to build the library.

## Running unit tests

Run `nx test nest-auth` to execute the unit tests via [Jest](https://jestjs.io).

## Enumerations

### AuthField

Defined in: [libs/nest-auth/src/lib/enums/auth-by.enum.ts:1](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-auth/src/lib/enums/auth-by.enum.ts#L1)

#### Enumeration Members

<table>
<thead>
<tr>
<th>Enumeration Member</th>
<th>Value</th>
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

[libs/nest-auth/src/lib/enums/auth-by.enum.ts:4](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-auth/src/lib/enums/auth-by.enum.ts#L4)

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

[libs/nest-auth/src/lib/enums/auth-by.enum.ts:3](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-auth/src/lib/enums/auth-by.enum.ts#L3)

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

[libs/nest-auth/src/lib/enums/auth-by.enum.ts:2](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-auth/src/lib/enums/auth-by.enum.ts#L2)

</td>
</tr>
</tbody>
</table>

---

### AuthMethod

Defined in: [libs/nest-auth/src/lib/enums/auth-method.enum.ts:1](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-auth/src/lib/enums/auth-method.enum.ts#L1)

#### Enumeration Members

<table>
<thead>
<tr>
<th>Enumeration Member</th>
<th>Value</th>
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

[libs/nest-auth/src/lib/enums/auth-method.enum.ts:2](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-auth/src/lib/enums/auth-method.enum.ts#L2)

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

[libs/nest-auth/src/lib/enums/auth-method.enum.ts:3](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-auth/src/lib/enums/auth-method.enum.ts#L3)

</td>
</tr>
</tbody>
</table>

---

### AuthStrategy

Defined in: [libs/nest-auth/src/lib/enums/auth-strategy.enum.ts:10](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-auth/src/lib/enums/auth-strategy.enum.ts#L10)

Authentication Strategy Enum

This enum represents the different authentication strategies supported by the application.
It is used with Passport.js to configure and identify various authentication methods.
Each strategy handles a different authentication flow (local credentials, JWT tokens, OAuth providers).

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

Facebook OAuth authentication strategy

Used for authenticating users through Facebook's OAuth service.
This strategy handles the OAuth flow and user profile retrieval.

</td>
<td>

[libs/nest-auth/src/lib/enums/auth-strategy.enum.ts:41](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-auth/src/lib/enums/auth-strategy.enum.ts#L41)

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

Google OAuth authentication strategy

Used for authenticating users through Google's OAuth 2.0 service.
This strategy handles the OAuth flow and user profile retrieval.

</td>
<td>

[libs/nest-auth/src/lib/enums/auth-strategy.enum.ts:33](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-auth/src/lib/enums/auth-strategy.enum.ts#L33)

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

Used for authenticating users with JSON Web Tokens.
This strategy verifies the token signature and expiration.

</td>
<td>

[libs/nest-auth/src/lib/enums/auth-strategy.enum.ts:25](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-auth/src/lib/enums/auth-strategy.enum.ts#L25)

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

Local authentication strategy

Used for authenticating users with username/email and password.
This strategy verifies credentials against the application's database.

</td>
<td>

[libs/nest-auth/src/lib/enums/auth-strategy.enum.ts:17](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-auth/src/lib/enums/auth-strategy.enum.ts#L17)

</td>
</tr>
</tbody>
</table>

## Classes

### AuthService

Defined in: [libs/nest-auth/src/lib/services/auth.service.ts:57](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-auth/src/lib/services/auth.service.ts#L57)

#### Constructors

##### Constructor

```ts
new AuthService(
   options,
   userService,
   jwtTokenService,
   cacheService,
   tokenVerifyService): AuthService;
```

Defined in: [libs/nest-auth/src/lib/services/auth.service.ts:58](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-auth/src/lib/services/auth.service.ts#L58)

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`options`

</td>
<td>

[`AuthOptions`](#authoptions)

</td>
</tr>
<tr>
<td>

`userService`

</td>
<td>

[`IUserService`](#iuserservice)

</td>
</tr>
<tr>
<td>

`jwtTokenService`

</td>
<td>

[`JwtTokenService`](#jwttokenservice)

</td>
</tr>
<tr>
<td>

`cacheService`

</td>
<td>

[`UserCacheService`](#usercacheservice)

</td>
</tr>
<tr>
<td>

`tokenVerifyService`

</td>
<td>

`TokenVerifyService`

</td>
</tr>
</tbody>
</table>

###### Returns

[`AuthService`](#authservice)

#### Methods

##### authenticate()

```ts
authenticate(
   request,
   username,
   password,
subdomain?): Promise<TokenUser>;
```

Defined in: [libs/nest-auth/src/lib/services/auth.service.ts:138](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-auth/src/lib/services/auth.service.ts#L138)

Authenticate a user

###### Parameters

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

`request`

</td>
<td>

`Request`

</td>
<td>

Request object

</td>
</tr>
<tr>
<td>

`username`

</td>
<td>

`string`

</td>
<td>

Username or email

</td>
</tr>
<tr>
<td>

`password`

</td>
<td>

`string`

</td>
<td>

Password

</td>
</tr>
<tr>
<td>

`subdomain?`

</td>
<td>

`string`

</td>
<td>

Subdomain

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`\<[`TokenUser`](#tokenuser)\>

Authenticated user

##### authenticateGoogle()

```ts
authenticateGoogle(
   request,
   profile,
redirectUrl?): Promise<TokenUser>;
```

Defined in: [libs/nest-auth/src/lib/services/auth.service.ts:267](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-auth/src/lib/services/auth.service.ts#L267)

Authenticate a user using Google

###### Parameters

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

`request`

</td>
<td>

`Request`

</td>
<td>

Request object

</td>
</tr>
<tr>
<td>

`profile`

</td>
<td>

[`GoogleProfile`](#googleprofile)

</td>
<td>

Google profile

</td>
</tr>
<tr>
<td>

`redirectUrl?`

</td>
<td>

`string`

</td>
<td>

Redirect URL

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`\<[`TokenUser`](#tokenuser)\>

Token user

##### authenticateJWT()

```ts
authenticateJWT(
   request,
   payload,
   accessToken,
_subdomain?): Promise<TokenUser>;
```

Defined in: [libs/nest-auth/src/lib/services/auth.service.ts:213](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-auth/src/lib/services/auth.service.ts#L213)

Authenticate a user using JWT

###### Parameters

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

`request`

</td>
<td>

`Request`

</td>
<td>

Request object

</td>
</tr>
<tr>
<td>

`payload`

</td>
<td>

[`IJwtPayload`](#ijwtpayload)

</td>
<td>

JWT payload

</td>
</tr>
<tr>
<td>

`accessToken`

</td>
<td>

`AccessToken`

</td>
<td>

Access token

</td>
</tr>
<tr>
<td>

`_subdomain?`

</td>
<td>

`string`

</td>
<td>

Subdomain

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`\<[`TokenUser`](#tokenuser)\>

Token user

##### authenticateSocial()

```ts
authenticateSocial(
   request,
   accessToken,
res): Promise<AuthResponse>;
```

Defined in: [libs/nest-auth/src/lib/services/auth.service.ts:317](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-auth/src/lib/services/auth.service.ts#L317)

Authenticate a user with token generated by social login

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`request`

</td>
<td>

`Request`

</td>
</tr>
<tr>
<td>

`accessToken`

</td>
<td>

`AccessToken`

</td>
</tr>
<tr>
<td>

`res`

</td>
<td>

`Response`

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`\<`AuthResponse`\>

Auth response with tokens and user

##### changePassword()

```ts
changePassword(
   request,
   tokenUser,
updatePasswordDto): Promise<User>;
```

Defined in: [libs/nest-auth/src/lib/services/auth.service.ts:624](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-auth/src/lib/services/auth.service.ts#L624)

Change user password

###### Parameters

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

`request`

</td>
<td>

`Request`

</td>
<td>

Request object

</td>
</tr>
<tr>
<td>

`tokenUser`

</td>
<td>

[`TokenUser`](#tokenuser)

</td>
<td>

Token user

</td>
</tr>
<tr>
<td>

`updatePasswordDto`

</td>
<td>

[`UpdatePasswordDto`](#updatepassworddto)

</td>
<td>

Update password DTO

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`\<`User`\>

Updated user

##### generateTokens()

```ts
generateTokens(user): TokenResponse;
```

Defined in: [libs/nest-auth/src/lib/services/auth.service.ts:396](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-auth/src/lib/services/auth.service.ts#L396)

Generate access and refresh tokens

###### Parameters

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

`user`

</td>
<td>

`User`

</td>
<td>

User entity

</td>
</tr>
</tbody>
</table>

###### Returns

`TokenResponse`

Token response

##### getCurrentUser()

```ts
getCurrentUser(request, tokenUser): Promise<null | User>;
```

Defined in: [libs/nest-auth/src/lib/services/auth.service.ts:554](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-auth/src/lib/services/auth.service.ts#L554)

Get the current user

###### Parameters

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

`request`

</td>
<td>

`Request`

</td>
<td>

Request object

</td>
</tr>
<tr>
<td>

`tokenUser`

</td>
<td>

[`TokenUser`](#tokenuser)

</td>
<td>

Token user

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`\<`null` \| `User`\>

##### getUserByToken()

Ger a user by token

###### Param

Request object

###### Param

Token

###### Param

Refresh flag or request object

###### Call Signature

```ts
getUserByToken(request, token): Promise<null | User>;
```

Defined in: [libs/nest-auth/src/lib/services/auth.service.ts:340](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-auth/src/lib/services/auth.service.ts#L340)

Ger a user by token

###### Parameters

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

`request`

</td>
<td>

`Request`

</td>
<td>

Request object

</td>
</tr>
<tr>
<td>

`token`

</td>
<td>

`AccessToken`

</td>
<td>

Token

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`\<`null` \| `User`\>

User entity

###### Call Signature

```ts
getUserByToken(
   request,
   token,
refresh): Promise<null | User>;
```

Defined in: [libs/nest-auth/src/lib/services/auth.service.ts:349](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-auth/src/lib/services/auth.service.ts#L349)

Ger a user by token

###### Parameters

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

`request`

</td>
<td>

`Request`

</td>
<td>

Request object

</td>
</tr>
<tr>
<td>

`token`

</td>
<td>

`RefreshToken`

</td>
<td>

Token

</td>
</tr>
<tr>
<td>

`refresh`

</td>
<td>

`true`

</td>
<td>

Token

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`\<`null` \| `User`\>

User entity

##### refreshTokens()

```ts
refreshTokens(
   request,
   token,
response): Promise<TokenResponse>;
```

Defined in: [libs/nest-auth/src/lib/services/auth.service.ts:585](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-auth/src/lib/services/auth.service.ts#L585)

Refresh the tokens

###### Parameters

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

`request`

</td>
<td>

`Request`

</td>
<td>

Request object

</td>
</tr>
<tr>
<td>

`token`

</td>
<td>

`RefreshToken`

</td>
<td>

Refresh token

</td>
</tr>
<tr>
<td>

`response`

</td>
<td>

`Response`

</td>
<td>

Response object

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`\<`TokenResponse`\>

Token response

##### requestPasswordReset()

```ts
requestPasswordReset(request, requestResetDto): Promise<SuccessResponse>;
```

Defined in: [libs/nest-auth/src/lib/services/auth.service.ts:758](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-auth/src/lib/services/auth.service.ts#L758)

Request password reset email

###### Parameters

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

`request`

</td>
<td>

`Request`

</td>
<td>

Request object

</td>
</tr>
<tr>
<td>

`requestResetDto`

</td>
<td>

[`RequestResetDto`](#requestresetdto)

</td>
<td>

Request reset DTO

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`\<`SuccessResponse`\>

Success response

##### resendEmailVerification()

```ts
resendEmailVerification(request, resendEmailVerifyDto): Promise<SuccessResponse>;
```

Defined in: [libs/nest-auth/src/lib/services/auth.service.ts:690](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-auth/src/lib/services/auth.service.ts#L690)

Resend a verification email

###### Parameters

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

`request`

</td>
<td>

`Request`

</td>
<td>

Request object

</td>
</tr>
<tr>
<td>

`resendEmailVerifyDto`

</td>
<td>

[`ResendEmailVerifyDto`](#resendemailverifydto)

</td>
<td>

Resend email verify DTO

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`\<`SuccessResponse`\>

Success response

##### resetPassword()

```ts
resetPassword(request, resetPasswordDto): Promise<SuccessResponse>;
```

Defined in: [libs/nest-auth/src/lib/services/auth.service.ts:826](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-auth/src/lib/services/auth.service.ts#L826)

Reset a user password

###### Parameters

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

`request`

</td>
<td>

`Request`

</td>
<td>

Request object

</td>
</tr>
<tr>
<td>

`resetPasswordDto`

</td>
<td>

[`ResetPasswordDto`](#resetpassworddto)

</td>
<td>

Reset password DTO

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`\<`SuccessResponse`\>

Success response

##### sendVerificationEmail()

```ts
sendVerificationEmail(user): Promise<void>;
```

Defined in: [libs/nest-auth/src/lib/services/auth.service.ts:667](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-auth/src/lib/services/auth.service.ts#L667)

Send a verification email

###### Parameters

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

`user`

</td>
<td>

`User`

</td>
<td>

User entity

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`\<`void`\>

##### setAuthCookies()

```ts
setAuthCookies(response, tokenResponse): void;
```

Defined in: [libs/nest-auth/src/lib/services/auth.service.ts:459](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-auth/src/lib/services/auth.service.ts#L459)

Set the auth cookies

###### Parameters

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

`response`

</td>
<td>

`Response`

</td>
<td>

Response object

</td>
</tr>
<tr>
<td>

`tokenResponse`

</td>
<td>

`TokenResponse`

</td>
<td>

Token response

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

##### signIn()

```ts
signIn(
   req,
   tokenUser,
res): Promise<AuthResponse>;
```

Defined in: [libs/nest-auth/src/lib/services/auth.service.ts:514](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-auth/src/lib/services/auth.service.ts#L514)

Login a user

###### Parameters

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

`req`

</td>
<td>

`Request`

</td>
<td>

Request object

</td>
</tr>
<tr>
<td>

`tokenUser`

</td>
<td>

[`TokenUser`](#tokenuser)

</td>
<td>

Token user

</td>
</tr>
<tr>
<td>

`res`

</td>
<td>

`Response`

</td>
<td>

Response object

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`\<`AuthResponse`\>

Auth response

##### signOut()

```ts
signOut(
   request,
   tokenUser,
response): Promise<SuccessResponse>;
```

Defined in: [libs/nest-auth/src/lib/services/auth.service.ts:870](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-auth/src/lib/services/auth.service.ts#L870)

Logout a user

###### Parameters

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

`request`

</td>
<td>

`Request`

</td>
<td>

Request object

</td>
</tr>
<tr>
<td>

`tokenUser`

</td>
<td>

[`TokenUser`](#tokenuser)

</td>
<td>

Token user

</td>
</tr>
<tr>
<td>

`response`

</td>
<td>

`Response`

</td>
<td>

Response object

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`\<`SuccessResponse`\>

Success response

##### signUp()

```ts
signUp(
   request,
   registerDto,
regType): Promise<User>;
```

Defined in: [libs/nest-auth/src/lib/services/auth.service.ts:485](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-auth/src/lib/services/auth.service.ts#L485)

Register a new user

###### Parameters

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

`request`

</td>
<td>

`Request`

</td>
<td>

Request object

</td>
</tr>
<tr>
<td>

`registerDto`

</td>
<td>

`SignUpBody`

</td>
<td>

Register DTO

</td>
</tr>
<tr>
<td>

`regType`

</td>
<td>

`LOCAL`

</td>
<td>

Registration type

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`\<`User`\>

Registered user

##### updateCacheUser()

```ts
updateCacheUser(
   user,
   tokenResponse,
   oldRefreshToken?,
frontendUrl?): Promise<CacheUser>;
```

Defined in: [libs/nest-auth/src/lib/services/auth.service.ts:418](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-auth/src/lib/services/auth.service.ts#L418)

Update the cache user

###### Parameters

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

`user`

</td>
<td>

`User`

</td>
<td>

User entity

</td>
</tr>
<tr>
<td>

`tokenResponse`

</td>
<td>

`TokenResponse`

</td>
<td>

Token response

</td>
</tr>
<tr>
<td>

`oldRefreshToken?`

</td>
<td>

`string`

</td>
<td>

Old refresh token

</td>
</tr>
<tr>
<td>

`frontendUrl?`

</td>
<td>

`string`

</td>
<td>

Redirect URL

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`\<[`CacheUser`](#cacheuser)\>

##### verifyEmail()

```ts
verifyEmail(request, emailVerifyDto): Promise<SuccessResponse>;
```

Defined in: [libs/nest-auth/src/lib/services/auth.service.ts:721](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-auth/src/lib/services/auth.service.ts#L721)

Verify an account

###### Parameters

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

`request`

</td>
<td>

`Request`

</td>
<td>

Request object

</td>
</tr>
<tr>
<td>

`emailVerifyDto`

</td>
<td>

[`EmailVerifyDto`](#emailverifydto)

</td>
<td>

Email verify DTO

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`\<`SuccessResponse`\>

##### verifyResetPasswordToken()

```ts
verifyResetPasswordToken(request, verifyDto): Promise<SuccessResponse>;
```

Defined in: [libs/nest-auth/src/lib/services/auth.service.ts:802](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-auth/src/lib/services/auth.service.ts#L802)

Verify a password reset token

###### Parameters

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

`request`

</td>
<td>

`Request`

</td>
<td>

Request object

</td>
</tr>
<tr>
<td>

`verifyDto`

</td>
<td>

[`ResetPasswordTokenVerifyDto`](#resetpasswordtokenverifydto)

</td>
<td>

Reset password token verify DTO

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`\<`SuccessResponse`\>

Success response

##### generateHash()

```ts
static generateHash(password): string;
```

Defined in: [libs/nest-auth/src/lib/services/auth.service.ts:115](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-auth/src/lib/services/auth.service.ts#L115)

Generate a password hash and salt

###### Parameters

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

`password`

</td>
<td>

`string`

</td>
<td>

Password to hash

</td>
</tr>
</tbody>
</table>

###### Returns

`string`

Hashed password and salt

##### generateRandomPassword()

```ts
static generateRandomPassword(length): string;
```

Defined in: [libs/nest-auth/src/lib/services/auth.service.ts:79](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-auth/src/lib/services/auth.service.ts#L79)

Generate a random secure password

###### Parameters

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

`length`

</td>
<td>

`number`

</td>
<td>

Length of the password

</td>
</tr>
</tbody>
</table>

###### Returns

`string`

Random password

##### generateVerifyToken()

```ts
static generateVerifyToken(length): VerifyToken;
```

Defined in: [libs/nest-auth/src/lib/services/auth.service.ts:70](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-auth/src/lib/services/auth.service.ts#L70)

Generate a random hash

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Default value</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`length`

</td>
<td>

`number`

</td>
<td>

`DEFAULT_VERIFY_TOKEN_LENGTH`

</td>
</tr>
</tbody>
</table>

###### Returns

`VerifyToken`

Random hash

##### verifyHash()

```ts
static verifyHash(password, hash): boolean;
```

Defined in: [libs/nest-auth/src/lib/services/auth.service.ts:126](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-auth/src/lib/services/auth.service.ts#L126)

Verify password with hash and salt

###### Parameters

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

`password`

</td>
<td>

`string`

</td>
<td>

Password to verify

</td>
</tr>
<tr>
<td>

`hash`

</td>
<td>

`string`

</td>
<td>

Hashed password

</td>
</tr>
</tbody>
</table>

###### Returns

`boolean`

Verification status

---

### EmailVerifyDto

Defined in: [libs/nest-auth/src/lib/dtos/email-verify.dto.ts:6](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-auth/src/lib/dtos/email-verify.dto.ts#L6)

#### Implements

- `EmailVerifyBody`

#### Constructors

##### Constructor

```ts
new EmailVerifyDto(): EmailVerifyDto;
```

###### Returns

[`EmailVerifyDto`](#emailverifydto)

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="token"></a> `token`

</td>
<td>

`VerifyToken`

</td>
<td>

[libs/nest-auth/src/lib/dtos/email-verify.dto.ts:8](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-auth/src/lib/dtos/email-verify.dto.ts#L8)

</td>
</tr>
</tbody>
</table>

---

### GoogleAuthGuard

Defined in: [libs/nest-auth/src/lib/guards/google-auth.guard.ts:22](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-auth/src/lib/guards/google-auth.guard.ts#L22)

#### Extends

- `IAuthGuard`

#### Constructors

##### Constructor

```ts
new GoogleAuthGuard(options): GoogleAuthGuard;
```

Defined in: [libs/nest-auth/src/lib/guards/google-auth.guard.ts:23](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-auth/src/lib/guards/google-auth.guard.ts#L23)

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`options`

</td>
<td>

[`AuthOptions`](#authoptions)

</td>
</tr>
</tbody>
</table>

###### Returns

[`GoogleAuthGuard`](#googleauthguard)

###### Overrides

```ts
AuthGuard(AuthStrategy.GOOGLE).constructor;
```

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Modifier</th>
<th>Type</th>
<th>Description</th>
<th>Inherited from</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="options"></a> `options`

</td>
<td>

`readonly`

</td>
<td>

[`AuthOptions`](#authoptions)

</td>
<td>

&hyphen;

</td>
<td>

&hyphen;

</td>
<td>

[libs/nest-auth/src/lib/guards/google-auth.guard.ts:23](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-auth/src/lib/guards/google-auth.guard.ts#L23)

</td>
</tr>
<tr>
<td>

<a id="arguments"></a> `arguments`

</td>
<td>

`static`

</td>
<td>

`any`

</td>
<td>

&hyphen;

</td>
<td>

```ts
AuthGuard(AuthStrategy.GOOGLE).arguments;
```

</td>
<td>

node_modules/typescript/lib/lib.es5.d.ts:305

</td>
</tr>
<tr>
<td>

<a id="caller"></a> `caller`

</td>
<td>

`static`

</td>
<td>

`Function`

</td>
<td>

&hyphen;

</td>
<td>

```ts
AuthGuard(AuthStrategy.GOOGLE).caller;
```

</td>
<td>

node_modules/typescript/lib/lib.es5.d.ts:306

</td>
</tr>
<tr>
<td>

<a id="length"></a> `length`

</td>
<td>

`readonly`

</td>
<td>

`number`

</td>
<td>

&hyphen;

</td>
<td>

```ts
AuthGuard(AuthStrategy.GOOGLE).length;
```

</td>
<td>

node_modules/typescript/lib/lib.es5.d.ts:302

</td>
</tr>
<tr>
<td>

<a id="name"></a> `name`

</td>
<td>

`readonly`

</td>
<td>

`string`

</td>
<td>

Returns the name of the function. Function names are read-only and can not be changed.

</td>
<td>

```ts
AuthGuard(AuthStrategy.GOOGLE).name;
```

</td>
<td>

node_modules/typescript/lib/lib.es2015.core.d.ts:97

</td>
</tr>
</tbody>
</table>

#### Methods

##### canActivate()

```ts
canActivate(context): boolean | Promise<boolean> | Observable<boolean>;
```

Defined in: [libs/nest-auth/src/lib/guards/google-auth.guard.ts:27](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-auth/src/lib/guards/google-auth.guard.ts#L27)

###### Parameters

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

`context`

</td>
<td>

`ExecutionContext`

</td>
<td>

Current execution context. Provides access to details about
the current request pipeline.

</td>
</tr>
</tbody>
</table>

###### Returns

`boolean` \| `Promise`\<`boolean`\> \| `Observable`\<`boolean`\>

Value indicating whether or not the current request is allowed to
proceed.

###### Overrides

```ts
AuthGuard(AuthStrategy.GOOGLE).canActivate;
```

##### getAuthenticateOptions()

```ts
getAuthenticateOptions(context): undefined | IAuthModuleOptions;
```

Defined in: node_modules/@nestjs/passport/dist/auth.guard.d.ts:9

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`context`

</td>
<td>

`ExecutionContext`

</td>
</tr>
</tbody>
</table>

###### Returns

`undefined` \| `IAuthModuleOptions`

###### Inherited from

```ts
AuthGuard(AuthStrategy.GOOGLE).getAuthenticateOptions;
```

##### getRequest()

```ts
getRequest(context): any;
```

Defined in: node_modules/@nestjs/passport/dist/auth.guard.d.ts:10

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`context`

</td>
<td>

`ExecutionContext`

</td>
</tr>
</tbody>
</table>

###### Returns

`any`

###### Inherited from

```ts
AuthGuard(AuthStrategy.GOOGLE).getRequest;
```

##### handleRequest()

```ts
handleRequest<TUser>(
   err,
   user,
   info,
   context,
   status?): TUser;
```

Defined in: node_modules/@nestjs/passport/dist/auth.guard.d.ts:8

###### Type Parameters

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

`TUser`

</td>
<td>

`any`

</td>
</tr>
</tbody>
</table>

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`err`

</td>
<td>

`any`

</td>
</tr>
<tr>
<td>

`user`

</td>
<td>

`any`

</td>
</tr>
<tr>
<td>

`info`

</td>
<td>

`any`

</td>
</tr>
<tr>
<td>

`context`

</td>
<td>

`ExecutionContext`

</td>
</tr>
<tr>
<td>

`status?`

</td>
<td>

`any`

</td>
</tr>
</tbody>
</table>

###### Returns

`TUser`

###### Inherited from

```ts
AuthGuard(AuthStrategy.GOOGLE).handleRequest;
```

##### logIn()

```ts
logIn<TRequest>(request): Promise<void>;
```

Defined in: node_modules/@nestjs/passport/dist/auth.guard.d.ts:5

###### Type Parameters

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

`TRequest` _extends_ `object`

</td>
<td>

`any`

</td>
</tr>
</tbody>
</table>

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`request`

</td>
<td>

`TRequest`

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`\<`void`\>

###### Inherited from

```ts
AuthGuard(AuthStrategy.GOOGLE).logIn;
```

##### \[hasInstance\]()

```ts
static hasInstance: boolean;
```

Defined in: node_modules/typescript/lib/lib.es2015.symbol.wellknown.d.ts:164

Determines whether the given value inherits from this function if this function was used
as a constructor function.

A constructor function can control which objects are recognized as its instances by
'instanceof' by overriding this method.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`value`

</td>
<td>

`any`

</td>
</tr>
</tbody>
</table>

###### Returns

`boolean`

###### Inherited from

```ts
AuthGuard(AuthStrategy.GOOGLE).[hasInstance]
```

##### apply()

```ts
static apply(
   this,
   thisArg,
   argArray?): any;
```

Defined in: node_modules/typescript/lib/lib.es5.d.ts:281

Calls the function, substituting the specified object for the this value of the function, and the specified array for the arguments of the function.

###### Parameters

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

`this`

</td>
<td>

`Function`

</td>
<td>

&hyphen;

</td>
</tr>
<tr>
<td>

`thisArg`

</td>
<td>

`any`

</td>
<td>

The object to be used as the this object.

</td>
</tr>
<tr>
<td>

`argArray?`

</td>
<td>

`any`

</td>
<td>

A set of arguments to be passed to the function.

</td>
</tr>
</tbody>
</table>

###### Returns

`any`

###### Inherited from

```ts
AuthGuard(AuthStrategy.GOOGLE).apply;
```

##### bind()

```ts
static bind(
   this,
   thisArg, ...
   argArray): any;
```

Defined in: node_modules/typescript/lib/lib.es5.d.ts:296

For a given function, creates a bound function that has the same body as the original function.
The this object of the bound function is associated with the specified object, and has the specified initial parameters.

###### Parameters

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

`this`

</td>
<td>

`Function`

</td>
<td>

&hyphen;

</td>
</tr>
<tr>
<td>

`thisArg`

</td>
<td>

`any`

</td>
<td>

An object to which the this keyword can refer inside the new function.

</td>
</tr>
<tr>
<td>

...`argArray`

</td>
<td>

`any`[]

</td>
<td>

A list of arguments to be passed to the new function.

</td>
</tr>
</tbody>
</table>

###### Returns

`any`

###### Inherited from

```ts
AuthGuard(AuthStrategy.GOOGLE).bind;
```

##### call()

```ts
static call(
   this,
   thisArg, ...
   argArray): any;
```

Defined in: node_modules/typescript/lib/lib.es5.d.ts:288

Calls a method of an object, substituting another object for the current object.

###### Parameters

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

`this`

</td>
<td>

`Function`

</td>
<td>

&hyphen;

</td>
</tr>
<tr>
<td>

`thisArg`

</td>
<td>

`any`

</td>
<td>

The object to be used as the current object.

</td>
</tr>
<tr>
<td>

...`argArray`

</td>
<td>

`any`[]

</td>
<td>

A list of arguments to be passed to the method.

</td>
</tr>
</tbody>
</table>

###### Returns

`any`

###### Inherited from

```ts
AuthGuard(AuthStrategy.GOOGLE).call;
```

##### toString()

```ts
static toString(): string;
```

Defined in: node_modules/typescript/lib/lib.es5.d.ts:299

Returns a string representation of a function.

###### Returns

`string`

###### Inherited from

```ts
AuthGuard(AuthStrategy.GOOGLE).toString;
```

---

### HichchiAuthModule

Defined in: [libs/nest-auth/src/lib/auth.module.ts:22](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-auth/src/lib/auth.module.ts#L22)

#### Constructors

##### Constructor

```ts
new HichchiAuthModule(userService, options): HichchiAuthModule;
```

Defined in: [libs/nest-auth/src/lib/auth.module.ts:23](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-auth/src/lib/auth.module.ts#L23)

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`userService`

</td>
<td>

[`IUserService`](#iuserservice)

</td>
</tr>
<tr>
<td>

`options`

</td>
<td>

[`AuthOptions`](#authoptions)

</td>
</tr>
</tbody>
</table>

###### Returns

[`HichchiAuthModule`](#hichchiauthmodule)

#### Methods

##### register()

```ts
static register(userServiceProvider, options): DynamicModule;
```

Defined in: [libs/nest-auth/src/lib/auth.module.ts:81](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-auth/src/lib/auth.module.ts#L81)

Register the HichchiAuthModule asynchronously

This method is used to register the `HichchiAuthModule` asynchronously.
It takes a user service provider and authentication options as arguments and returns a dynamic module.
The user service provider can be either `UserServiceFactoryProvider` or `UserServiceExistingProvider`.
The `UserService` used in the user service provider should implement the `IUserService` interface provided by the `hichchi-nestjs-auth` package.

The authentication options include the redis, jwt, cookies, socket, authMethod, authField, disableRegistration, registerDto, and viewDto.

###### Parameters

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

`userServiceProvider`

</td>
<td>

[`UserServiceProvider`](#userserviceprovider)

</td>
<td>

The user service provider

</td>
</tr>
<tr>
<td>

`options`

</td>
<td>

[`AuthOptions`](#authoptions)

</td>
<td>

The authentication options

</td>
</tr>
</tbody>
</table>

###### Returns

`DynamicModule`

The dynamic module

###### Examples

```TypeScript
@Module({
    imports: [
        HichchiAuthModule.registerAsync(
            // Using UserServiceFactoryProvider
            {
                imports: [UserModule],
                useFactory: (userService: UserService) => userService,
                inject: [UserService],
            },
            { ... },
        ),
    ],
    controllers: [...],
    providers: [...],
})
export class AppModule {}
```

```TypeScript
@Module({
    imports: [
        HichchiAuthModule.registerAsync(
            // Using UserServiceExistingProvider
            {
                imports: [UserModule],
                useExisting: UserService,
            },
            { ... },
        ),
    ],
    controllers: [...],
    providers: [...],
})
export class AppModule {}

```

---

### JwtAuthGuard

Defined in: [libs/nest-auth/src/lib/guards/jwt-auth.guard.ts:19](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-auth/src/lib/guards/jwt-auth.guard.ts#L19)

#### Extends

- `IAuthGuard`

#### Constructors

##### Constructor

```ts
new JwtAuthGuard(
   options,
   authService,
   cacheService): JwtAuthGuard;
```

Defined in: [libs/nest-auth/src/lib/guards/jwt-auth.guard.ts:20](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-auth/src/lib/guards/jwt-auth.guard.ts#L20)

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`options`

</td>
<td>

[`AuthOptions`](#authoptions)

</td>
</tr>
<tr>
<td>

`authService`

</td>
<td>

[`AuthService`](#authservice)

</td>
</tr>
<tr>
<td>

`cacheService`

</td>
<td>

[`UserCacheService`](#usercacheservice)

</td>
</tr>
</tbody>
</table>

###### Returns

[`JwtAuthGuard`](#jwtauthguard)

###### Overrides

```ts
AuthGuard(AuthStrategy.JWT).constructor;
```

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Modifier</th>
<th>Type</th>
<th>Description</th>
<th>Inherited from</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="arguments-1"></a> `arguments`

</td>
<td>

`static`

</td>
<td>

`any`

</td>
<td>

&hyphen;

</td>
<td>

```ts
AuthGuard(AuthStrategy.JWT).arguments;
```

</td>
<td>

node_modules/typescript/lib/lib.es5.d.ts:305

</td>
</tr>
<tr>
<td>

<a id="caller-1"></a> `caller`

</td>
<td>

`static`

</td>
<td>

`Function`

</td>
<td>

&hyphen;

</td>
<td>

```ts
AuthGuard(AuthStrategy.JWT).caller;
```

</td>
<td>

node_modules/typescript/lib/lib.es5.d.ts:306

</td>
</tr>
<tr>
<td>

<a id="length-1"></a> `length`

</td>
<td>

`readonly`

</td>
<td>

`number`

</td>
<td>

&hyphen;

</td>
<td>

```ts
AuthGuard(AuthStrategy.JWT).length;
```

</td>
<td>

node_modules/typescript/lib/lib.es5.d.ts:302

</td>
</tr>
<tr>
<td>

<a id="name-1"></a> `name`

</td>
<td>

`readonly`

</td>
<td>

`string`

</td>
<td>

Returns the name of the function. Function names are read-only and can not be changed.

</td>
<td>

```ts
AuthGuard(AuthStrategy.JWT).name;
```

</td>
<td>

node_modules/typescript/lib/lib.es2015.core.d.ts:97

</td>
</tr>
</tbody>
</table>

#### Methods

##### activate()

```ts
activate(context): Promise<boolean>;
```

Defined in: [libs/nest-auth/src/lib/guards/jwt-auth.guard.ts:106](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-auth/src/lib/guards/jwt-auth.guard.ts#L106)

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`context`

</td>
<td>

`ExecutionContext`

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`\<`boolean`\>

##### canActivate()

```ts
canActivate(context): Promise<boolean>;
```

Defined in: [libs/nest-auth/src/lib/guards/jwt-auth.guard.ts:28](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-auth/src/lib/guards/jwt-auth.guard.ts#L28)

###### Parameters

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

`context`

</td>
<td>

`ExecutionContext`

</td>
<td>

Current execution context. Provides access to details about
the current request pipeline.

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`\<`boolean`\>

Value indicating whether or not the current request is allowed to
proceed.

###### Overrides

```ts
AuthGuard(AuthStrategy.JWT).canActivate;
```

##### getAuthenticateOptions()

```ts
getAuthenticateOptions(context): undefined | IAuthModuleOptions;
```

Defined in: node_modules/@nestjs/passport/dist/auth.guard.d.ts:9

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`context`

</td>
<td>

`ExecutionContext`

</td>
</tr>
</tbody>
</table>

###### Returns

`undefined` \| `IAuthModuleOptions`

###### Inherited from

```ts
AuthGuard(AuthStrategy.JWT).getAuthenticateOptions;
```

##### getRequest()

```ts
getRequest(context): any;
```

Defined in: node_modules/@nestjs/passport/dist/auth.guard.d.ts:10

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`context`

</td>
<td>

`ExecutionContext`

</td>
</tr>
</tbody>
</table>

###### Returns

`any`

###### Inherited from

```ts
AuthGuard(AuthStrategy.JWT).getRequest;
```

##### handleRequest()

```ts
handleRequest(
   err,
   user,
   _info): any;
```

Defined in: [libs/nest-auth/src/lib/guards/jwt-auth.guard.ts:111](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-auth/src/lib/guards/jwt-auth.guard.ts#L111)

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`err`

</td>
<td>

`unknown`

</td>
</tr>
<tr>
<td>

`user`

</td>
<td>

`User`

</td>
</tr>
<tr>
<td>

`_info`

</td>
<td>

`unknown`

</td>
</tr>
</tbody>
</table>

###### Returns

`any`

###### Overrides

```ts
AuthGuard(AuthStrategy.JWT).handleRequest;
```

##### logIn()

```ts
logIn<TRequest>(request): Promise<void>;
```

Defined in: node_modules/@nestjs/passport/dist/auth.guard.d.ts:5

###### Type Parameters

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

`TRequest` _extends_ `object`

</td>
<td>

`any`

</td>
</tr>
</tbody>
</table>

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`request`

</td>
<td>

`TRequest`

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`\<`void`\>

###### Inherited from

```ts
AuthGuard(AuthStrategy.JWT).logIn;
```

##### \[hasInstance\]()

```ts
static hasInstance: boolean;
```

Defined in: node_modules/typescript/lib/lib.es2015.symbol.wellknown.d.ts:164

Determines whether the given value inherits from this function if this function was used
as a constructor function.

A constructor function can control which objects are recognized as its instances by
'instanceof' by overriding this method.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`value`

</td>
<td>

`any`

</td>
</tr>
</tbody>
</table>

###### Returns

`boolean`

###### Inherited from

```ts
AuthGuard(AuthStrategy.JWT).[hasInstance]
```

##### apply()

```ts
static apply(
   this,
   thisArg,
   argArray?): any;
```

Defined in: node_modules/typescript/lib/lib.es5.d.ts:281

Calls the function, substituting the specified object for the this value of the function, and the specified array for the arguments of the function.

###### Parameters

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

`this`

</td>
<td>

`Function`

</td>
<td>

&hyphen;

</td>
</tr>
<tr>
<td>

`thisArg`

</td>
<td>

`any`

</td>
<td>

The object to be used as the this object.

</td>
</tr>
<tr>
<td>

`argArray?`

</td>
<td>

`any`

</td>
<td>

A set of arguments to be passed to the function.

</td>
</tr>
</tbody>
</table>

###### Returns

`any`

###### Inherited from

```ts
AuthGuard(AuthStrategy.JWT).apply;
```

##### bind()

```ts
static bind(
   this,
   thisArg, ...
   argArray): any;
```

Defined in: node_modules/typescript/lib/lib.es5.d.ts:296

For a given function, creates a bound function that has the same body as the original function.
The this object of the bound function is associated with the specified object, and has the specified initial parameters.

###### Parameters

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

`this`

</td>
<td>

`Function`

</td>
<td>

&hyphen;

</td>
</tr>
<tr>
<td>

`thisArg`

</td>
<td>

`any`

</td>
<td>

An object to which the this keyword can refer inside the new function.

</td>
</tr>
<tr>
<td>

...`argArray`

</td>
<td>

`any`[]

</td>
<td>

A list of arguments to be passed to the new function.

</td>
</tr>
</tbody>
</table>

###### Returns

`any`

###### Inherited from

```ts
AuthGuard(AuthStrategy.JWT).bind;
```

##### call()

```ts
static call(
   this,
   thisArg, ...
   argArray): any;
```

Defined in: node_modules/typescript/lib/lib.es5.d.ts:288

Calls a method of an object, substituting another object for the current object.

###### Parameters

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

`this`

</td>
<td>

`Function`

</td>
<td>

&hyphen;

</td>
</tr>
<tr>
<td>

`thisArg`

</td>
<td>

`any`

</td>
<td>

The object to be used as the current object.

</td>
</tr>
<tr>
<td>

...`argArray`

</td>
<td>

`any`[]

</td>
<td>

A list of arguments to be passed to the method.

</td>
</tr>
</tbody>
</table>

###### Returns

`any`

###### Inherited from

```ts
AuthGuard(AuthStrategy.JWT).call;
```

##### toString()

```ts
static toString(): string;
```

Defined in: node_modules/typescript/lib/lib.es5.d.ts:299

Returns a string representation of a function.

###### Returns

`string`

###### Inherited from

```ts
AuthGuard(AuthStrategy.JWT).toString;
```

---

### JwtTokenService

Defined in: [libs/nest-auth/src/lib/services/jwt-token.service.ts:35](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-auth/src/lib/services/jwt-token.service.ts#L35)

JWT Token Service

This service handles the creation and verification of JWT tokens for authentication.
It provides methods to create access tokens, refresh tokens, verify tokens, and get token expiration dates.

#### Example

```TypeScript
// Inject the service
constructor(private readonly jwtTokenService: JwtTokenService) {}

// Create an access token
const accessToken = jwtTokenService.createToken({ sub: 'user-id' });

// Create a refresh token
const refreshToken = jwtTokenService.createRefreshToken({ sub: 'user-id' });

// Verify a token
try {
  const payload = jwtTokenService.verifyAccessToken(accessToken);
  console.log(`Token is valid for user: ${payload.sub}`);
} catch (error) {
  console.error('Token is invalid or expired');
}
```

#### Constructors

##### Constructor

```ts
new JwtTokenService(options, jwtService): JwtTokenService;
```

Defined in: [libs/nest-auth/src/lib/services/jwt-token.service.ts:36](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-auth/src/lib/services/jwt-token.service.ts#L36)

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`options`

</td>
<td>

[`AuthOptions`](#authoptions)

</td>
</tr>
<tr>
<td>

`jwtService`

</td>
<td>

`JwtService`

</td>
</tr>
</tbody>
</table>

###### Returns

[`JwtTokenService`](#jwttokenservice)

#### Methods

##### createRefreshToken()

```ts
createRefreshToken(payload): RefreshToken;
```

Defined in: [libs/nest-auth/src/lib/services/jwt-token.service.ts:79](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-auth/src/lib/services/jwt-token.service.ts#L79)

Create a new JWT refresh token

This method creates a new JWT refresh token with the provided payload.
The token is signed using the application's refresh token secret and configured expiration time.
Refresh tokens typically have a longer lifetime than access tokens.

###### Parameters

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

`payload`

</td>
<td>

[`IJwtPayload`](#ijwtpayload)

</td>
<td>

The payload to be signed, typically containing a user ID

</td>
</tr>
</tbody>
</table>

###### Returns

`RefreshToken`

A signed JWT refresh token

###### Example

```TypeScript
const refreshToken = jwtTokenService.createRefreshToken({ sub: '123e4567-e89b-12d3-a456-426614174000' });
// Result: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

##### createToken()

```ts
createToken(payload): AccessToken;
```

Defined in: [libs/nest-auth/src/lib/services/jwt-token.service.ts:56](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-auth/src/lib/services/jwt-token.service.ts#L56)

Create a new JWT access token

This method creates a new JWT access token with the provided payload.
The token is signed using the application's JWT secret and configured expiration time.

###### Parameters

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

`payload`

</td>
<td>

[`IJwtPayload`](#ijwtpayload)

</td>
<td>

The payload to be signed, typically containing a user ID

</td>
</tr>
</tbody>
</table>

###### Returns

`AccessToken`

A signed JWT access token

###### Example

```TypeScript
const accessToken = jwtTokenService.createToken({ sub: '123e4567-e89b-12d3-a456-426614174000' });
// Result: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

##### getTokenExpiresOn()

```ts
getTokenExpiresOn(token): Date;
```

Defined in: [libs/nest-auth/src/lib/services/jwt-token.service.ts:168](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-auth/src/lib/services/jwt-token.service.ts#L168)

Get the expiration date of a JWT token

This method decodes a JWT token and extracts its expiration timestamp.
It converts the Unix timestamp to a JavaScript Date object.

###### Parameters

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

`token`

</td>
<td>

`AccessToken` \| `RefreshToken`

</td>
<td>

The JWT token to decode

</td>
</tr>
</tbody>
</table>

###### Returns

`Date`

The expiration date of the token

###### Example

```TypeScript
const expiresOn = jwtTokenService.getTokenExpiresOn(accessToken);
console.log(`Token expires on: ${expiresOn.toISOString()}`);

// Check if token is about to expire
const now = new Date();
const fiveMinutes = 5 * 60 * 1000;
if (expiresOn.getTime() - now.getTime() < fiveMinutes) {
  console.log('Token will expire soon, consider refreshing');
}
```

##### verifyAccessToken()

```ts
verifyAccessToken(accessToken): IJwtPayload;
```

Defined in: [libs/nest-auth/src/lib/services/jwt-token.service.ts:111](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-auth/src/lib/services/jwt-token.service.ts#L111)

Verify a JWT access token

This method verifies the signature and expiration of a JWT access token.
If the token is valid, it returns the decoded payload.

###### Parameters

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

`accessToken`

</td>
<td>

`AccessToken`

</td>
<td>

The JWT access token to verify

</td>
</tr>
</tbody>
</table>

###### Returns

[`IJwtPayload`](#ijwtpayload)

The decoded payload if the token is valid

###### Throws

If the token signature is invalid

###### Throws

If the token has expired

###### Example

```TypeScript
try {
  const payload = jwtTokenService.verifyAccessToken(accessToken);
  console.log(`Token is valid for user: ${payload.sub}`); // '123e4567-e89b-12d3-a456-426614174000'
} catch (error) {
  if (error instanceof TokenExpiredError) {
    console.error('Token has expired');
  } else {
    console.error('Token is invalid');
  }
}
```

##### verifyRefreshToken()

```ts
verifyRefreshToken(refreshToken): IJwtPayload;
```

Defined in: [libs/nest-auth/src/lib/services/jwt-token.service.ts:140](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-auth/src/lib/services/jwt-token.service.ts#L140)

Verify a JWT refresh token

This method verifies the signature and expiration of a JWT refresh token.
If the token is valid, it returns the decoded payload.

###### Parameters

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

`refreshToken`

</td>
<td>

`RefreshToken`

</td>
<td>

The JWT refresh token to verify

</td>
</tr>
</tbody>
</table>

###### Returns

[`IJwtPayload`](#ijwtpayload)

The decoded payload if the token is valid

###### Throws

If the token signature is invalid

###### Throws

If the token has expired

###### Example

```TypeScript
try {
  const payload = jwtTokenService.verifyRefreshToken(refreshToken);
  // payload.sub contains the user ID: '123e4567-e89b-12d3-a456-426614174000'
  // Generate a new access token
  const newAccessToken = jwtTokenService.createToken(payload);
} catch (error) {
  console.error('Refresh token is invalid or expired');
}
```

---

### LocalAuthGuard

Defined in: [libs/nest-auth/src/lib/guards/local-auth.guard.ts:9](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-auth/src/lib/guards/local-auth.guard.ts#L9)

#### Extends

- `IAuthGuard`

#### Constructors

##### Constructor

```ts
new LocalAuthGuard(...args): LocalAuthGuard;
```

Defined in: node_modules/@nestjs/passport/dist/interfaces/type.interface.d.ts:2

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

...`args`

</td>
<td>

`any`[]

</td>
</tr>
</tbody>
</table>

###### Returns

[`LocalAuthGuard`](#localauthguard)

###### Inherited from

```ts
AuthGuard(AuthStrategy.LOCAL).constructor;
```

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Modifier</th>
<th>Type</th>
<th>Description</th>
<th>Inherited from</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="arguments-2"></a> `arguments`

</td>
<td>

`static`

</td>
<td>

`any`

</td>
<td>

&hyphen;

</td>
<td>

```ts
AuthGuard(AuthStrategy.LOCAL).arguments;
```

</td>
<td>

node_modules/typescript/lib/lib.es5.d.ts:305

</td>
</tr>
<tr>
<td>

<a id="caller-2"></a> `caller`

</td>
<td>

`static`

</td>
<td>

`Function`

</td>
<td>

&hyphen;

</td>
<td>

```ts
AuthGuard(AuthStrategy.LOCAL).caller;
```

</td>
<td>

node_modules/typescript/lib/lib.es5.d.ts:306

</td>
</tr>
<tr>
<td>

<a id="length-2"></a> `length`

</td>
<td>

`readonly`

</td>
<td>

`number`

</td>
<td>

&hyphen;

</td>
<td>

```ts
AuthGuard(AuthStrategy.LOCAL).length;
```

</td>
<td>

node_modules/typescript/lib/lib.es5.d.ts:302

</td>
</tr>
<tr>
<td>

<a id="name-2"></a> `name`

</td>
<td>

`readonly`

</td>
<td>

`string`

</td>
<td>

Returns the name of the function. Function names are read-only and can not be changed.

</td>
<td>

```ts
AuthGuard(AuthStrategy.LOCAL).name;
```

</td>
<td>

node_modules/typescript/lib/lib.es2015.core.d.ts:97

</td>
</tr>
</tbody>
</table>

#### Methods

##### canActivate()

```ts
canActivate(context): boolean | Promise<boolean> | Observable<boolean>;
```

Defined in: [libs/nest-auth/src/lib/guards/local-auth.guard.ts:10](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-auth/src/lib/guards/local-auth.guard.ts#L10)

###### Parameters

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

`context`

</td>
<td>

`ExecutionContext`

</td>
<td>

Current execution context. Provides access to details about
the current request pipeline.

</td>
</tr>
</tbody>
</table>

###### Returns

`boolean` \| `Promise`\<`boolean`\> \| `Observable`\<`boolean`\>

Value indicating whether or not the current request is allowed to
proceed.

###### Overrides

```ts
AuthGuard(AuthStrategy.LOCAL).canActivate;
```

##### getAuthenticateOptions()

```ts
getAuthenticateOptions(context): undefined | IAuthModuleOptions;
```

Defined in: node_modules/@nestjs/passport/dist/auth.guard.d.ts:9

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`context`

</td>
<td>

`ExecutionContext`

</td>
</tr>
</tbody>
</table>

###### Returns

`undefined` \| `IAuthModuleOptions`

###### Inherited from

```ts
AuthGuard(AuthStrategy.LOCAL).getAuthenticateOptions;
```

##### getRequest()

```ts
getRequest(context): any;
```

Defined in: node_modules/@nestjs/passport/dist/auth.guard.d.ts:10

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`context`

</td>
<td>

`ExecutionContext`

</td>
</tr>
</tbody>
</table>

###### Returns

`any`

###### Inherited from

```ts
AuthGuard(AuthStrategy.LOCAL).getRequest;
```

##### handleRequest()

```ts
handleRequest(
   err,
   user,
   _info): any;
```

Defined in: [libs/nest-auth/src/lib/guards/local-auth.guard.ts:21](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-auth/src/lib/guards/local-auth.guard.ts#L21)

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`err`

</td>
<td>

`Error`

</td>
</tr>
<tr>
<td>

`user`

</td>
<td>

`User`

</td>
</tr>
<tr>
<td>

`_info`

</td>
<td>

`unknown`

</td>
</tr>
</tbody>
</table>

###### Returns

`any`

###### Overrides

```ts
AuthGuard(AuthStrategy.LOCAL).handleRequest;
```

##### logIn()

```ts
logIn<TRequest>(request): Promise<void>;
```

Defined in: node_modules/@nestjs/passport/dist/auth.guard.d.ts:5

###### Type Parameters

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

`TRequest` _extends_ `object`

</td>
<td>

`any`

</td>
</tr>
</tbody>
</table>

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`request`

</td>
<td>

`TRequest`

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`\<`void`\>

###### Inherited from

```ts
AuthGuard(AuthStrategy.LOCAL).logIn;
```

##### \[hasInstance\]()

```ts
static hasInstance: boolean;
```

Defined in: node_modules/typescript/lib/lib.es2015.symbol.wellknown.d.ts:164

Determines whether the given value inherits from this function if this function was used
as a constructor function.

A constructor function can control which objects are recognized as its instances by
'instanceof' by overriding this method.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`value`

</td>
<td>

`any`

</td>
</tr>
</tbody>
</table>

###### Returns

`boolean`

###### Inherited from

```ts
AuthGuard(AuthStrategy.LOCAL).[hasInstance]
```

##### apply()

```ts
static apply(
   this,
   thisArg,
   argArray?): any;
```

Defined in: node_modules/typescript/lib/lib.es5.d.ts:281

Calls the function, substituting the specified object for the this value of the function, and the specified array for the arguments of the function.

###### Parameters

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

`this`

</td>
<td>

`Function`

</td>
<td>

&hyphen;

</td>
</tr>
<tr>
<td>

`thisArg`

</td>
<td>

`any`

</td>
<td>

The object to be used as the this object.

</td>
</tr>
<tr>
<td>

`argArray?`

</td>
<td>

`any`

</td>
<td>

A set of arguments to be passed to the function.

</td>
</tr>
</tbody>
</table>

###### Returns

`any`

###### Inherited from

```ts
AuthGuard(AuthStrategy.LOCAL).apply;
```

##### bind()

```ts
static bind(
   this,
   thisArg, ...
   argArray): any;
```

Defined in: node_modules/typescript/lib/lib.es5.d.ts:296

For a given function, creates a bound function that has the same body as the original function.
The this object of the bound function is associated with the specified object, and has the specified initial parameters.

###### Parameters

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

`this`

</td>
<td>

`Function`

</td>
<td>

&hyphen;

</td>
</tr>
<tr>
<td>

`thisArg`

</td>
<td>

`any`

</td>
<td>

An object to which the this keyword can refer inside the new function.

</td>
</tr>
<tr>
<td>

...`argArray`

</td>
<td>

`any`[]

</td>
<td>

A list of arguments to be passed to the new function.

</td>
</tr>
</tbody>
</table>

###### Returns

`any`

###### Inherited from

```ts
AuthGuard(AuthStrategy.LOCAL).bind;
```

##### call()

```ts
static call(
   this,
   thisArg, ...
   argArray): any;
```

Defined in: node_modules/typescript/lib/lib.es5.d.ts:288

Calls a method of an object, substituting another object for the current object.

###### Parameters

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

`this`

</td>
<td>

`Function`

</td>
<td>

&hyphen;

</td>
</tr>
<tr>
<td>

`thisArg`

</td>
<td>

`any`

</td>
<td>

The object to be used as the current object.

</td>
</tr>
<tr>
<td>

...`argArray`

</td>
<td>

`any`[]

</td>
<td>

A list of arguments to be passed to the method.

</td>
</tr>
</tbody>
</table>

###### Returns

`any`

###### Inherited from

```ts
AuthGuard(AuthStrategy.LOCAL).call;
```

##### toString()

```ts
static toString(): string;
```

Defined in: node_modules/typescript/lib/lib.es5.d.ts:299

Returns a string representation of a function.

###### Returns

`string`

###### Inherited from

```ts
AuthGuard(AuthStrategy.LOCAL).toString;
```

---

### LoginDto

Defined in: [libs/nest-auth/src/lib/dtos/login.dto.ts:6](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-auth/src/lib/dtos/login.dto.ts#L6)

#### Implements

- `SignInBody`

#### Constructors

##### Constructor

```ts
new LoginDto(): LoginDto;
```

###### Returns

[`LoginDto`](#logindto)

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="email-1"></a> `email?`

</td>
<td>

`string`

</td>
<td>

[libs/nest-auth/src/lib/dtos/login.dto.ts:13](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-auth/src/lib/dtos/login.dto.ts#L13)

</td>
</tr>
<tr>
<td>

<a id="password"></a> `password`

</td>
<td>

`string`

</td>
<td>

[libs/nest-auth/src/lib/dtos/login.dto.ts:17](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-auth/src/lib/dtos/login.dto.ts#L17)

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

[libs/nest-auth/src/lib/dtos/login.dto.ts:9](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-auth/src/lib/dtos/login.dto.ts#L9)

</td>
</tr>
</tbody>
</table>

---

### PermissionGuard

Defined in: [libs/nest-auth/src/lib/guards/permission.guard.ts:9](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-auth/src/lib/guards/permission.guard.ts#L9)

#### Implements

- `CanActivate`

#### Constructors

##### Constructor

```ts
new PermissionGuard(reflector): PermissionGuard;
```

Defined in: [libs/nest-auth/src/lib/guards/permission.guard.ts:10](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-auth/src/lib/guards/permission.guard.ts#L10)

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`reflector`

</td>
<td>

`Reflector`

</td>
</tr>
</tbody>
</table>

###### Returns

[`PermissionGuard`](#permissionguard)

#### Methods

##### canActivate()

```ts
canActivate(context): boolean;
```

Defined in: [libs/nest-auth/src/lib/guards/permission.guard.ts:12](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-auth/src/lib/guards/permission.guard.ts#L12)

###### Parameters

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

`context`

</td>
<td>

`ExecutionContext`

</td>
<td>

Current execution context. Provides access to details about
the current request pipeline.

</td>
</tr>
</tbody>
</table>

###### Returns

`boolean`

Value indicating whether or not the current request is allowed to
proceed.

###### Implementation of

```ts
CanActivate.canActivate;
```

---

### RefreshTokenDto

Defined in: [libs/nest-auth/src/lib/dtos/refresh-token.dto.ts:6](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-auth/src/lib/dtos/refresh-token.dto.ts#L6)

#### Implements

- `RefreshTokenBody`

#### Constructors

##### Constructor

```ts
new RefreshTokenDto(): RefreshTokenDto;
```

###### Returns

[`RefreshTokenDto`](#refreshtokendto)

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="refreshtoken"></a> `refreshToken`

</td>
<td>

`RefreshToken`

</td>
<td>

[libs/nest-auth/src/lib/dtos/refresh-token.dto.ts:8](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-auth/src/lib/dtos/refresh-token.dto.ts#L8)

</td>
</tr>
</tbody>
</table>

---

### RegisterDto

Defined in: [libs/nest-auth/src/lib/dtos/register.dto.ts:6](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-auth/src/lib/dtos/register.dto.ts#L6)

#### Implements

- `SignUpBody`

#### Constructors

##### Constructor

```ts
new RegisterDto(): RegisterDto;
```

###### Returns

[`RegisterDto`](#registerdto)

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="email-2"></a> `email?`

</td>
<td>

`string`

</td>
<td>

[libs/nest-auth/src/lib/dtos/register.dto.ts:19](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-auth/src/lib/dtos/register.dto.ts#L19)

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

[libs/nest-auth/src/lib/dtos/register.dto.ts:8](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-auth/src/lib/dtos/register.dto.ts#L8)

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

[libs/nest-auth/src/lib/dtos/register.dto.ts:11](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-auth/src/lib/dtos/register.dto.ts#L11)

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

[libs/nest-auth/src/lib/dtos/register.dto.ts:22](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-auth/src/lib/dtos/register.dto.ts#L22)

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

[libs/nest-auth/src/lib/dtos/register.dto.ts:15](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-auth/src/lib/dtos/register.dto.ts#L15)

</td>
</tr>
</tbody>
</table>

---

### RequestResetDto

Defined in: [libs/nest-auth/src/lib/dtos/request-reset.dto.ts:6](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-auth/src/lib/dtos/request-reset.dto.ts#L6)

#### Implements

- `RequestResetBody`

#### Constructors

##### Constructor

```ts
new RequestResetDto(): RequestResetDto;
```

###### Returns

[`RequestResetDto`](#requestresetdto)

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="email-3"></a> `email`

</td>
<td>

`string`

</td>
<td>

[libs/nest-auth/src/lib/dtos/request-reset.dto.ts:8](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-auth/src/lib/dtos/request-reset.dto.ts#L8)

</td>
</tr>
</tbody>
</table>

---

### ResendEmailVerifyDto

Defined in: [libs/nest-auth/src/lib/dtos/resend-email-verify.dto.ts:6](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-auth/src/lib/dtos/resend-email-verify.dto.ts#L6)

#### Implements

- `ResendEmailVerifyBody`

#### Constructors

##### Constructor

```ts
new ResendEmailVerifyDto(): ResendEmailVerifyDto;
```

###### Returns

[`ResendEmailVerifyDto`](#resendemailverifydto)

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="email-4"></a> `email`

</td>
<td>

`string`

</td>
<td>

[libs/nest-auth/src/lib/dtos/resend-email-verify.dto.ts:8](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-auth/src/lib/dtos/resend-email-verify.dto.ts#L8)

</td>
</tr>
</tbody>
</table>

---

### ResetPasswordDto

Defined in: [libs/nest-auth/src/lib/dtos/reset-password.dto.ts:6](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-auth/src/lib/dtos/reset-password.dto.ts#L6)

#### Implements

- `ResetPasswordBody`

#### Constructors

##### Constructor

```ts
new ResetPasswordDto(): ResetPasswordDto;
```

###### Returns

[`ResetPasswordDto`](#resetpassworddto)

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="password-2"></a> `password`

</td>
<td>

`string`

</td>
<td>

[libs/nest-auth/src/lib/dtos/reset-password.dto.ts:11](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-auth/src/lib/dtos/reset-password.dto.ts#L11)

</td>
</tr>
<tr>
<td>

<a id="token-1"></a> `token`

</td>
<td>

`VerifyToken`

</td>
<td>

[libs/nest-auth/src/lib/dtos/reset-password.dto.ts:8](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-auth/src/lib/dtos/reset-password.dto.ts#L8)

</td>
</tr>
</tbody>
</table>

---

### ResetPasswordTokenVerifyDto

Defined in: [libs/nest-auth/src/lib/dtos/reset-password-token-verify.dto.ts:6](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-auth/src/lib/dtos/reset-password-token-verify.dto.ts#L6)

#### Implements

- `ResetPasswordTokenVerifyBody`

#### Constructors

##### Constructor

```ts
new ResetPasswordTokenVerifyDto(): ResetPasswordTokenVerifyDto;
```

###### Returns

[`ResetPasswordTokenVerifyDto`](#resetpasswordtokenverifydto)

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="token-2"></a> `token`

</td>
<td>

`VerifyToken`

</td>
<td>

[libs/nest-auth/src/lib/dtos/reset-password-token-verify.dto.ts:8](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-auth/src/lib/dtos/reset-password-token-verify.dto.ts#L8)

</td>
</tr>
</tbody>
</table>

---

### RoleGuard

Defined in: [libs/nest-auth/src/lib/guards/role.guard.ts:9](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-auth/src/lib/guards/role.guard.ts#L9)

#### Implements

- `CanActivate`

#### Constructors

##### Constructor

```ts
new RoleGuard(reflector): RoleGuard;
```

Defined in: [libs/nest-auth/src/lib/guards/role.guard.ts:10](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-auth/src/lib/guards/role.guard.ts#L10)

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`reflector`

</td>
<td>

`Reflector`

</td>
</tr>
</tbody>
</table>

###### Returns

[`RoleGuard`](#roleguard)

#### Methods

##### canActivate()

```ts
canActivate(context): boolean;
```

Defined in: [libs/nest-auth/src/lib/guards/role.guard.ts:12](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-auth/src/lib/guards/role.guard.ts#L12)

###### Parameters

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

`context`

</td>
<td>

`ExecutionContext`

</td>
<td>

Current execution context. Provides access to details about
the current request pipeline.

</td>
</tr>
</tbody>
</table>

###### Returns

`boolean`

Value indicating whether or not the current request is allowed to
proceed.

###### Implementation of

```ts
CanActivate.canActivate;
```

---

### UpdatePasswordDto

Defined in: [libs/nest-auth/src/lib/dtos/update-password.dto.ts:6](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-auth/src/lib/dtos/update-password.dto.ts#L6)

#### Implements

- `UpdatePasswordBody`

#### Constructors

##### Constructor

```ts
new UpdatePasswordDto(): UpdatePasswordDto;
```

###### Returns

[`UpdatePasswordDto`](#updatepassworddto)

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
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

[libs/nest-auth/src/lib/dtos/update-password.dto.ts:11](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-auth/src/lib/dtos/update-password.dto.ts#L11)

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

[libs/nest-auth/src/lib/dtos/update-password.dto.ts:8](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-auth/src/lib/dtos/update-password.dto.ts#L8)

</td>
</tr>
</tbody>
</table>

---

### UserCacheService

Defined in: [libs/nest-auth/src/lib/services/user-cache.service.ts:12](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-auth/src/lib/services/user-cache.service.ts#L12)

#### Constructors

##### Constructor

```ts
new UserCacheService(
   options,
   cacheService,
   encryptionService): UserCacheService;
```

Defined in: [libs/nest-auth/src/lib/services/user-cache.service.ts:13](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-auth/src/lib/services/user-cache.service.ts#L13)

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`options`

</td>
<td>

[`AuthOptions`](#authoptions)

</td>
</tr>
<tr>
<td>

`cacheService`

</td>
<td>

`CacheService`

</td>
</tr>
<tr>
<td>

`encryptionService`

</td>
<td>

`EncryptionService`

</td>
</tr>
</tbody>
</table>

###### Returns

[`UserCacheService`](#usercacheservice)

#### Methods

##### clearUser()

```ts
clearUser(userId): Promise<boolean>;
```

Defined in: [libs/nest-auth/src/lib/services/user-cache.service.ts:113](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-auth/src/lib/services/user-cache.service.ts#L113)

Clear user from the cache

This method removes a user object from the cache by their ID.
It's typically used during logout or when a user's session is invalidated.

###### Parameters

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

`userId`

</td>
<td>

`EntityId`

</td>
<td>

The ID of the user to remove from cache

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`\<`boolean`\>

True if the operation was successful

###### Example

```TypeScript
// When a user logs out
const success = await userCacheService.clearUser('123e4567-e89b-12d3-a456-426614174000');
if (success) {
  console.log('User session cleared from cache');
}
```

##### getUser()

```ts
getUser(userId): Promise<null | CacheUser>;
```

Defined in: [libs/nest-auth/src/lib/services/user-cache.service.ts:74](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-auth/src/lib/services/user-cache.service.ts#L74)

Get user from cache

This method retrieves a user object from the cache by their ID.
If a session secret is configured and the user has encrypted sessions,
it decrypts the sessions before returning the user object.

###### Parameters

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

`userId`

</td>
<td>

`EntityId`

</td>
<td>

The ID of the user to retrieve

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`\<`null` \| [`CacheUser`](#cacheuser)\>

The user object if found, null otherwise

###### Example

```TypeScript
const user = await userCacheService.getUser('123e4567-e89b-12d3-a456-426614174000');
if (user) {
  console.log(`Found user: ${user.firstName} ${user.lastName}`);
  console.log(`Active sessions: ${user.sessions.length}`);
}
```

##### setUser()

```ts
setUser(user): Promise<boolean>;
```

Defined in: [libs/nest-auth/src/lib/services/user-cache.service.ts:39](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-auth/src/lib/services/user-cache.service.ts#L39)

Set user in cache

This method stores a user object in the cache. If a session secret is configured,
it encrypts the user's sessions before storing them.

###### Parameters

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

`user`

</td>
<td>

[`CacheUser`](#cacheuser)

</td>
<td>

The user object to store in cache

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`\<`boolean`\>

True if the operation was successful

###### Example

```TypeScript
const success = await userCacheService.setUser({
  id: '123e4567-e89b-12d3-a456-426614174000',
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@example.com',
  sessions: [{ sessionId: 'session-id', accessToken: 'token', refreshToken: 'refresh-token' }]
});
```

---

### ViewUserDto

Defined in: [libs/nest-auth/src/lib/dtos/view-user.dto.ts:4](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-auth/src/lib/dtos/view-user.dto.ts#L4)

#### Implements

- `IViewDto`

#### Constructors

##### Constructor

```ts
new ViewUserDto(): ViewUserDto;
```

###### Returns

[`ViewUserDto`](#viewuserdto)

#### Methods

##### formatDataSet()

```ts
formatDataSet(user): User;
```

Defined in: [libs/nest-auth/src/lib/dtos/view-user.dto.ts:5](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-auth/src/lib/dtos/view-user.dto.ts#L5)

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`user`

</td>
<td>

`User`

</td>
</tr>
</tbody>
</table>

###### Returns

`User`

###### Implementation of

```ts
IViewDto.formatDataSet;
```

## Interfaces

### AuthOptions

Defined in: [libs/nest-auth/src/lib/interfaces/auth-options.interface.ts:37](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-auth/src/lib/interfaces/auth-options.interface.ts#L37)

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="authfield-1"></a> `authField?`

</td>
<td>

`string`

</td>
<td>

[libs/nest-auth/src/lib/interfaces/auth-options.interface.ts:50](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-auth/src/lib/interfaces/auth-options.interface.ts#L50)

</td>
</tr>
<tr>
<td>

<a id="authmethod-1"></a> `authMethod?`

</td>
<td>

[`AuthMethod`](#authmethod)

</td>
<td>

[libs/nest-auth/src/lib/interfaces/auth-options.interface.ts:49](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-auth/src/lib/interfaces/auth-options.interface.ts#L49)

</td>
</tr>
<tr>
<td>

<a id="checkemailverified"></a> `checkEmailVerified?`

</td>
<td>

`boolean`

</td>
<td>

[libs/nest-auth/src/lib/interfaces/auth-options.interface.ts:46](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-auth/src/lib/interfaces/auth-options.interface.ts#L46)

</td>
</tr>
<tr>
<td>

<a id="cookies"></a> `cookies?`

</td>
<td>

[`CookiesOptions`](#cookiesoptions)

</td>
<td>

[libs/nest-auth/src/lib/interfaces/auth-options.interface.ts:44](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-auth/src/lib/interfaces/auth-options.interface.ts#L44)

</td>
</tr>
<tr>
<td>

<a id="disableregistration"></a> `disableRegistration?`

</td>
<td>

`boolean`

</td>
<td>

[libs/nest-auth/src/lib/interfaces/auth-options.interface.ts:54](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-auth/src/lib/interfaces/auth-options.interface.ts#L54)

</td>
</tr>
<tr>
<td>

<a id="emailverifyredirect"></a> `emailVerifyRedirect?`

</td>
<td>

`string`

</td>
<td>

[libs/nest-auth/src/lib/interfaces/auth-options.interface.ts:47](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-auth/src/lib/interfaces/auth-options.interface.ts#L47)

</td>
</tr>
<tr>
<td>

<a id="googleauth"></a> `googleAuth?`

</td>
<td>

[`GoogleAuthOptions`](#googleauthoptions)

</td>
<td>

[libs/nest-auth/src/lib/interfaces/auth-options.interface.ts:43](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-auth/src/lib/interfaces/auth-options.interface.ts#L43)

</td>
</tr>
<tr>
<td>

<a id="isprod"></a> `isProd?`

</td>
<td>

`boolean`

</td>
<td>

[libs/nest-auth/src/lib/interfaces/auth-options.interface.ts:38](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-auth/src/lib/interfaces/auth-options.interface.ts#L38)

</td>
</tr>
<tr>
<td>

<a id="jwt-2"></a> `jwt`

</td>
<td>

[`JwtOptions`](#jwtoptions)

</td>
<td>

[libs/nest-auth/src/lib/interfaces/auth-options.interface.ts:41](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-auth/src/lib/interfaces/auth-options.interface.ts#L41)

</td>
</tr>
<tr>
<td>

<a id="oauth"></a> `oAuth?`

</td>
<td>

[`AuthOptions`](#authoptions)

</td>
<td>

[libs/nest-auth/src/lib/interfaces/auth-options.interface.ts:42](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-auth/src/lib/interfaces/auth-options.interface.ts#L42)

</td>
</tr>
<tr>
<td>

<a id="passwordresetexp"></a> `passwordResetExp?`

</td>
<td>

`number`

</td>
<td>

[libs/nest-auth/src/lib/interfaces/auth-options.interface.ts:48](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-auth/src/lib/interfaces/auth-options.interface.ts#L48)

</td>
</tr>
<tr>
<td>

<a id="redis"></a> `redis?`

</td>
<td>

`RedisOptions`

</td>
<td>

[libs/nest-auth/src/lib/interfaces/auth-options.interface.ts:39](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-auth/src/lib/interfaces/auth-options.interface.ts#L39)

</td>
</tr>
<tr>
<td>

<a id="registerdto-1"></a> `registerDto?`

</td>
<td>

_typeof_ [`RegisterDto`](#registerdto)

</td>
<td>

[libs/nest-auth/src/lib/interfaces/auth-options.interface.ts:51](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-auth/src/lib/interfaces/auth-options.interface.ts#L51)

</td>
</tr>
<tr>
<td>

<a id="sessionsecret"></a> `sessionSecret?`

</td>
<td>

`string`

</td>
<td>

[libs/nest-auth/src/lib/interfaces/auth-options.interface.ts:40](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-auth/src/lib/interfaces/auth-options.interface.ts#L40)

</td>
</tr>
<tr>
<td>

<a id="socket"></a> `socket?`

</td>
<td>

[`SocketOptions`](#socketoptions)

</td>
<td>

[libs/nest-auth/src/lib/interfaces/auth-options.interface.ts:45](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-auth/src/lib/interfaces/auth-options.interface.ts#L45)

</td>
</tr>
<tr>
<td>

<a id="validationexceptionfactory"></a> `validationExceptionFactory?`

</td>
<td>

`boolean` \| (`errors`) => `HttpException`

</td>
<td>

[libs/nest-auth/src/lib/interfaces/auth-options.interface.ts:53](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-auth/src/lib/interfaces/auth-options.interface.ts#L53)

</td>
</tr>
<tr>
<td>

<a id="viewdto"></a> `viewDto?`

</td>
<td>

`Type`\<[`ViewUserDto`](#viewuserdto)\>

</td>
<td>

[libs/nest-auth/src/lib/interfaces/auth-options.interface.ts:52](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-auth/src/lib/interfaces/auth-options.interface.ts#L52)

</td>
</tr>
</tbody>
</table>

---

### CacheUser

Defined in: [libs/nest-auth/src/lib/interfaces/cache-user.interfaces.ts:4](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-auth/src/lib/interfaces/cache-user.interfaces.ts#L4)

#### Extends

- `User`.`UserExtra`

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
<th>Inherited from</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="authfield-2"></a> `authField?`

</td>
<td>

`string`

</td>
<td>

```ts
UserExtra.authField;
```

</td>
<td>

[libs/nest-auth/src/lib/interfaces/user-extra.interfaces.ts:2](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-auth/src/lib/interfaces/user-extra.interfaces.ts#L2)

</td>
</tr>
<tr>
<td>

<a id="authfieldvalue"></a> `authFieldValue?`

</td>
<td>

`string`

</td>
<td>

```ts
UserExtra.authFieldValue;
```

</td>
<td>

[libs/nest-auth/src/lib/interfaces/user-extra.interfaces.ts:3](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-auth/src/lib/interfaces/user-extra.interfaces.ts#L3)

</td>
</tr>
<tr>
<td>

<a id="avatar"></a> `avatar?`

</td>
<td>

`string`

</td>
<td>

```ts
User.avatar;
```

</td>
<td>

[libs/nest-connector/src/lib/auth/interfaces/user.interface.ts:13](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-connector/src/lib/auth/interfaces/user.interface.ts#L13)

</td>
</tr>
<tr>
<td>

<a id="email-5"></a> `email?`

</td>
<td>

`string`

</td>
<td>

```ts
User.email;
```

</td>
<td>

[libs/nest-connector/src/lib/auth/interfaces/user.interface.ts:6](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-connector/src/lib/auth/interfaces/user.interface.ts#L6)

</td>
</tr>
<tr>
<td>

<a id="emailverified"></a> `emailVerified?`

</td>
<td>

`boolean`

</td>
<td>

```ts
User.emailVerified;
```

</td>
<td>

[libs/nest-connector/src/lib/auth/interfaces/user.interface.ts:11](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-connector/src/lib/auth/interfaces/user.interface.ts#L11)

</td>
</tr>
<tr>
<td>

<a id="encryptedsessions"></a> `encryptedSessions?`

</td>
<td>

`string`

</td>
<td>

&hyphen;

</td>
<td>

[libs/nest-auth/src/lib/interfaces/cache-user.interfaces.ts:6](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-auth/src/lib/interfaces/cache-user.interfaces.ts#L6)

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

```ts
User.firstName;
```

</td>
<td>

[libs/nest-connector/src/lib/common/user-entity.interface.ts:7](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-connector/src/lib/common/user-entity.interface.ts#L7)

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

```ts
User.fullName;
```

</td>
<td>

[libs/nest-connector/src/lib/common/user-entity.interface.ts:9](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-connector/src/lib/common/user-entity.interface.ts#L9)

</td>
</tr>
<tr>
<td>

<a id="id"></a> `id`

</td>
<td>

`EntityId`

</td>
<td>

```ts
User.id;
```

</td>
<td>

[libs/nest-connector/src/lib/common/user-entity.interface.ts:6](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-connector/src/lib/common/user-entity.interface.ts#L6)

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

```ts
User.lastName;
```

</td>
<td>

[libs/nest-connector/src/lib/common/user-entity.interface.ts:8](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-connector/src/lib/common/user-entity.interface.ts#L8)

</td>
</tr>
<tr>
<td>

<a id="password-3"></a> `password?`

</td>
<td>

`string`

</td>
<td>

```ts
User.password;
```

</td>
<td>

[libs/nest-connector/src/lib/auth/interfaces/user.interface.ts:8](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-connector/src/lib/auth/interfaces/user.interface.ts#L8)

</td>
</tr>
<tr>
<td>

<a id="profiledata"></a> `profileData?`

</td>
<td>

`object`

</td>
<td>

```ts
User.profileData;
```

</td>
<td>

[libs/nest-connector/src/lib/auth/interfaces/user.interface.ts:12](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-connector/src/lib/auth/interfaces/user.interface.ts#L12)

</td>
</tr>
<tr>
<td>

<a id="regtype"></a> `regType`

</td>
<td>

`RegType`

</td>
<td>

```ts
User.regType;
```

</td>
<td>

[libs/nest-connector/src/lib/auth/interfaces/user.interface.ts:9](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-connector/src/lib/auth/interfaces/user.interface.ts#L9)

</td>
</tr>
<tr>
<td>

<a id="role"></a> `role?`

</td>
<td>

`string` \| `Role`

</td>
<td>

```ts
User.role;
```

</td>
<td>

[libs/nest-connector/src/lib/auth/interfaces/user.interface.ts:10](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-connector/src/lib/auth/interfaces/user.interface.ts#L10)

</td>
</tr>
<tr>
<td>

<a id="sessions"></a> `sessions`

</td>
<td>

`UserSession`[]

</td>
<td>

&hyphen;

</td>
<td>

[libs/nest-auth/src/lib/interfaces/cache-user.interfaces.ts:5](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-auth/src/lib/interfaces/cache-user.interfaces.ts#L5)

</td>
</tr>
<tr>
<td>

<a id="username-3"></a> `username?`

</td>
<td>

`string`

</td>
<td>

```ts
User.username;
```

</td>
<td>

[libs/nest-connector/src/lib/auth/interfaces/user.interface.ts:7](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-connector/src/lib/auth/interfaces/user.interface.ts#L7)

</td>
</tr>
</tbody>
</table>

---

### CookiesOptions

Defined in: [libs/nest-auth/src/lib/interfaces/auth-options.interface.ts:27](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-auth/src/lib/interfaces/auth-options.interface.ts#L27)

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="samesite"></a> `sameSite?`

</td>
<td>

`boolean` \| `"lax"` \| `"strict"` \| `"none"`

</td>
<td>

[libs/nest-auth/src/lib/interfaces/auth-options.interface.ts:29](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-auth/src/lib/interfaces/auth-options.interface.ts#L29)

</td>
</tr>
<tr>
<td>

<a id="secret"></a> `secret?`

</td>
<td>

`string`

</td>
<td>

[libs/nest-auth/src/lib/interfaces/auth-options.interface.ts:28](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-auth/src/lib/interfaces/auth-options.interface.ts#L28)

</td>
</tr>
<tr>
<td>

<a id="secure"></a> `secure?`

</td>
<td>

`boolean`

</td>
<td>

[libs/nest-auth/src/lib/interfaces/auth-options.interface.ts:30](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-auth/src/lib/interfaces/auth-options.interface.ts#L30)

</td>
</tr>
</tbody>
</table>

---

### GoogleAuthOptions

Defined in: [libs/nest-auth/src/lib/interfaces/auth-options.interface.ts:21](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-auth/src/lib/interfaces/auth-options.interface.ts#L21)

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="callbackurl"></a> `callbackUrl`

</td>
<td>

`string`

</td>
<td>

[libs/nest-auth/src/lib/interfaces/auth-options.interface.ts:24](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-auth/src/lib/interfaces/auth-options.interface.ts#L24)

</td>
</tr>
<tr>
<td>

<a id="clientid"></a> `clientId`

</td>
<td>

`string`

</td>
<td>

[libs/nest-auth/src/lib/interfaces/auth-options.interface.ts:22](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-auth/src/lib/interfaces/auth-options.interface.ts#L22)

</td>
</tr>
<tr>
<td>

<a id="clientsecret"></a> `clientSecret`

</td>
<td>

`string`

</td>
<td>

[libs/nest-auth/src/lib/interfaces/auth-options.interface.ts:23](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-auth/src/lib/interfaces/auth-options.interface.ts#L23)

</td>
</tr>
</tbody>
</table>

---

### GoogleProfile

Defined in: [libs/nest-auth/src/lib/interfaces/google-profile.interface.ts:28](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-auth/src/lib/interfaces/google-profile.interface.ts#L28)

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="_json"></a> `_json`

</td>
<td>

[`GoogleProfileJson`](#googleprofilejson)

</td>
<td>

[libs/nest-auth/src/lib/interfaces/google-profile.interface.ts:43](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-auth/src/lib/interfaces/google-profile.interface.ts#L43)

</td>
</tr>
<tr>
<td>

<a id="_raw"></a> `_raw`

</td>
<td>

`string`

</td>
<td>

[libs/nest-auth/src/lib/interfaces/google-profile.interface.ts:42](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-auth/src/lib/interfaces/google-profile.interface.ts#L42)

</td>
</tr>
<tr>
<td>

<a id="displayname"></a> `displayName`

</td>
<td>

`string`

</td>
<td>

[libs/nest-auth/src/lib/interfaces/google-profile.interface.ts:32](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-auth/src/lib/interfaces/google-profile.interface.ts#L32)

</td>
</tr>
<tr>
<td>

<a id="email-6"></a> `email`

</td>
<td>

`string`

</td>
<td>

[libs/nest-auth/src/lib/interfaces/google-profile.interface.ts:38](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-auth/src/lib/interfaces/google-profile.interface.ts#L38)

</td>
</tr>
<tr>
<td>

<a id="email_verified"></a> `email_verified`

</td>
<td>

`boolean`

</td>
<td>

[libs/nest-auth/src/lib/interfaces/google-profile.interface.ts:36](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-auth/src/lib/interfaces/google-profile.interface.ts#L36)

</td>
</tr>
<tr>
<td>

<a id="emails"></a> `emails`

</td>
<td>

[`GoogleProfileEmail`](#googleprofileemail-1)[]

</td>
<td>

[libs/nest-auth/src/lib/interfaces/google-profile.interface.ts:39](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-auth/src/lib/interfaces/google-profile.interface.ts#L39)

</td>
</tr>
<tr>
<td>

<a id="family_name"></a> `family_name`

</td>
<td>

`string`

</td>
<td>

[libs/nest-auth/src/lib/interfaces/google-profile.interface.ts:35](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-auth/src/lib/interfaces/google-profile.interface.ts#L35)

</td>
</tr>
<tr>
<td>

<a id="given_name"></a> `given_name`

</td>
<td>

`string`

</td>
<td>

[libs/nest-auth/src/lib/interfaces/google-profile.interface.ts:34](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-auth/src/lib/interfaces/google-profile.interface.ts#L34)

</td>
</tr>
<tr>
<td>

<a id="id-1"></a> `id`

</td>
<td>

`string`

</td>
<td>

[libs/nest-auth/src/lib/interfaces/google-profile.interface.ts:31](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-auth/src/lib/interfaces/google-profile.interface.ts#L31)

</td>
</tr>
<tr>
<td>

<a id="name-3"></a> `name`

</td>
<td>

[`GoogleProfileName`](#googleprofilename-1)

</td>
<td>

[libs/nest-auth/src/lib/interfaces/google-profile.interface.ts:33](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-auth/src/lib/interfaces/google-profile.interface.ts#L33)

</td>
</tr>
<tr>
<td>

<a id="photos"></a> `photos`

</td>
<td>

[`GoogleProfilePhoto`](#googleprofilephoto)[]

</td>
<td>

[libs/nest-auth/src/lib/interfaces/google-profile.interface.ts:40](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-auth/src/lib/interfaces/google-profile.interface.ts#L40)

</td>
</tr>
<tr>
<td>

<a id="picture"></a> `picture`

</td>
<td>

`string`

</td>
<td>

[libs/nest-auth/src/lib/interfaces/google-profile.interface.ts:41](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-auth/src/lib/interfaces/google-profile.interface.ts#L41)

</td>
</tr>
<tr>
<td>

<a id="provider"></a> `provider`

</td>
<td>

`GOOGLE`

</td>
<td>

[libs/nest-auth/src/lib/interfaces/google-profile.interface.ts:29](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-auth/src/lib/interfaces/google-profile.interface.ts#L29)

</td>
</tr>
<tr>
<td>

<a id="sub"></a> `sub`

</td>
<td>

`string`

</td>
<td>

[libs/nest-auth/src/lib/interfaces/google-profile.interface.ts:30](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-auth/src/lib/interfaces/google-profile.interface.ts#L30)

</td>
</tr>
<tr>
<td>

<a id="verified"></a> `verified`

</td>
<td>

`boolean`

</td>
<td>

[libs/nest-auth/src/lib/interfaces/google-profile.interface.ts:37](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-auth/src/lib/interfaces/google-profile.interface.ts#L37)

</td>
</tr>
</tbody>
</table>

---

### GoogleProfileEmail

Defined in: [libs/nest-auth/src/lib/interfaces/google-profile.interface.ts:13](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-auth/src/lib/interfaces/google-profile.interface.ts#L13)

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="type"></a> `type`

</td>
<td>

`"account"`

</td>
<td>

[libs/nest-auth/src/lib/interfaces/google-profile.interface.ts:15](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-auth/src/lib/interfaces/google-profile.interface.ts#L15)

</td>
</tr>
<tr>
<td>

<a id="value"></a> `value`

</td>
<td>

`string`

</td>
<td>

[libs/nest-auth/src/lib/interfaces/google-profile.interface.ts:14](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-auth/src/lib/interfaces/google-profile.interface.ts#L14)

</td>
</tr>
</tbody>
</table>

---

### GoogleProfileJson

Defined in: [libs/nest-auth/src/lib/interfaces/google-profile.interface.ts:18](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-auth/src/lib/interfaces/google-profile.interface.ts#L18)

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="email-7"></a> `email`

</td>
<td>

`string`

</td>
<td>

[libs/nest-auth/src/lib/interfaces/google-profile.interface.ts:24](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-auth/src/lib/interfaces/google-profile.interface.ts#L24)

</td>
</tr>
<tr>
<td>

<a id="email_verified-1"></a> `email_verified`

</td>
<td>

`boolean`

</td>
<td>

[libs/nest-auth/src/lib/interfaces/google-profile.interface.ts:25](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-auth/src/lib/interfaces/google-profile.interface.ts#L25)

</td>
</tr>
<tr>
<td>

<a id="family_name-1"></a> `family_name`

</td>
<td>

`string`

</td>
<td>

[libs/nest-auth/src/lib/interfaces/google-profile.interface.ts:22](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-auth/src/lib/interfaces/google-profile.interface.ts#L22)

</td>
</tr>
<tr>
<td>

<a id="given_name-1"></a> `given_name`

</td>
<td>

`string`

</td>
<td>

[libs/nest-auth/src/lib/interfaces/google-profile.interface.ts:21](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-auth/src/lib/interfaces/google-profile.interface.ts#L21)

</td>
</tr>
<tr>
<td>

<a id="name-4"></a> `name`

</td>
<td>

`string`

</td>
<td>

[libs/nest-auth/src/lib/interfaces/google-profile.interface.ts:20](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-auth/src/lib/interfaces/google-profile.interface.ts#L20)

</td>
</tr>
<tr>
<td>

<a id="picture-1"></a> `picture`

</td>
<td>

`string`

</td>
<td>

[libs/nest-auth/src/lib/interfaces/google-profile.interface.ts:23](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-auth/src/lib/interfaces/google-profile.interface.ts#L23)

</td>
</tr>
<tr>
<td>

<a id="sub-1"></a> `sub`

</td>
<td>

`string`

</td>
<td>

[libs/nest-auth/src/lib/interfaces/google-profile.interface.ts:19](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-auth/src/lib/interfaces/google-profile.interface.ts#L19)

</td>
</tr>
</tbody>
</table>

---

### GoogleProfileName

Defined in: [libs/nest-auth/src/lib/interfaces/google-profile.interface.ts:3](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-auth/src/lib/interfaces/google-profile.interface.ts#L3)

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="familyname"></a> `familyName`

</td>
<td>

`string`

</td>
<td>

[libs/nest-auth/src/lib/interfaces/google-profile.interface.ts:5](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-auth/src/lib/interfaces/google-profile.interface.ts#L5)

</td>
</tr>
<tr>
<td>

<a id="givenname"></a> `givenName`

</td>
<td>

`string`

</td>
<td>

[libs/nest-auth/src/lib/interfaces/google-profile.interface.ts:4](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-auth/src/lib/interfaces/google-profile.interface.ts#L4)

</td>
</tr>
</tbody>
</table>

---

### GoogleProfilePhoto

Defined in: [libs/nest-auth/src/lib/interfaces/google-profile.interface.ts:8](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-auth/src/lib/interfaces/google-profile.interface.ts#L8)

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="type-1"></a> `type`

</td>
<td>

`"default"`

</td>
<td>

[libs/nest-auth/src/lib/interfaces/google-profile.interface.ts:10](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-auth/src/lib/interfaces/google-profile.interface.ts#L10)

</td>
</tr>
<tr>
<td>

<a id="value-1"></a> `value`

</td>
<td>

`string`

</td>
<td>

[libs/nest-auth/src/lib/interfaces/google-profile.interface.ts:9](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-auth/src/lib/interfaces/google-profile.interface.ts#L9)

</td>
</tr>
</tbody>
</table>

---

### IJwtPayload

Defined in: [libs/nest-auth/src/lib/interfaces/token-data.interface.ts:3](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-auth/src/lib/interfaces/token-data.interface.ts#L3)

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="sub-2"></a> `sub`

</td>
<td>

`EntityId`

</td>
<td>

[libs/nest-auth/src/lib/interfaces/token-data.interface.ts:4](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-auth/src/lib/interfaces/token-data.interface.ts#L4)

</td>
</tr>
</tbody>
</table>

---

### IUserService

Defined in: [libs/nest-auth/src/lib/interfaces/user-service.interface.ts:25](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-auth/src/lib/interfaces/user-service.interface.ts#L25)

#### Extends

- [`UserServiceEvents`](#userserviceevents)

#### Methods

##### getUserByAuthField()?

```ts
optional getUserByAuthField(authFieldValue, subdomain?): Promise<null | User>;
```

Defined in: [libs/nest-auth/src/lib/interfaces/user-service.interface.ts:33](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-auth/src/lib/interfaces/user-service.interface.ts#L33)

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`authFieldValue`

</td>
<td>

`string` \| `number`

</td>
</tr>
<tr>
<td>

`subdomain?`

</td>
<td>

`string`

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`\<`null` \| `User`\>

##### getUserByEmail()

```ts
getUserByEmail(email, subdomain?): Promise<null | User & object>;
```

Defined in: [libs/nest-auth/src/lib/interfaces/user-service.interface.ts:27](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-auth/src/lib/interfaces/user-service.interface.ts#L27)

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`email`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

`subdomain?`

</td>
<td>

`string`

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`\<`null` \| `User` & `object`\>

##### getUserById()

```ts
getUserById(id, subdomain?): Promise<null | User>;
```

Defined in: [libs/nest-auth/src/lib/interfaces/user-service.interface.ts:26](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-auth/src/lib/interfaces/user-service.interface.ts#L26)

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`id`

</td>
<td>

`EntityId`

</td>
</tr>
<tr>
<td>

`subdomain?`

</td>
<td>

`string`

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`\<`null` \| `User`\>

##### getUserByUsername()?

```ts
optional getUserByUsername(username, subdomain?): Promise<null | User & object>;
```

Defined in: [libs/nest-auth/src/lib/interfaces/user-service.interface.ts:28](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-auth/src/lib/interfaces/user-service.interface.ts#L28)

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`username`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

`subdomain?`

</td>
<td>

`string`

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`\<`null` \| `User` & `object`\>

##### getUserByUsernameOrEmail()?

```ts
optional getUserByUsernameOrEmail(username, subdomain?): Promise<null | User & object>;
```

Defined in: [libs/nest-auth/src/lib/interfaces/user-service.interface.ts:29](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-auth/src/lib/interfaces/user-service.interface.ts#L29)

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`username`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

`subdomain?`

</td>
<td>

`string`

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`\<`null` \| `User` & `object`\>

##### onAuthenticate()?

```ts
optional onAuthenticate(
   request,
   tokenUser?,
error?): Promise<void>;
```

Defined in: [libs/nest-auth/src/lib/interfaces/user-service.interface.ts:19](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-auth/src/lib/interfaces/user-service.interface.ts#L19)

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`request`

</td>
<td>

`Request`

</td>
</tr>
<tr>
<td>

`tokenUser?`

</td>
<td>

[`TokenUser`](#tokenuser)

</td>
</tr>
<tr>
<td>

`error?`

</td>
<td>

`unknown`

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`\<`void`\>

###### Inherited from

[`UserServiceEvents`](#userserviceevents).[`onAuthenticate`](#onauthenticate-2)

##### onAuthenticateGoogle()?

```ts
optional onAuthenticateGoogle(
   request,
   tokenUser?,
error?): Promise<void>;
```

Defined in: [libs/nest-auth/src/lib/interfaces/user-service.interface.ts:21](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-auth/src/lib/interfaces/user-service.interface.ts#L21)

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`request`

</td>
<td>

`Request`

</td>
</tr>
<tr>
<td>

`tokenUser?`

</td>
<td>

[`TokenUser`](#tokenuser)

</td>
</tr>
<tr>
<td>

`error?`

</td>
<td>

`unknown`

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`\<`void`\>

###### Inherited from

[`UserServiceEvents`](#userserviceevents).[`onAuthenticateGoogle`](#onauthenticategoogle-2)

##### onAuthenticateJWT()?

```ts
optional onAuthenticateJWT(
   request,
   tokenUser?,
error?): Promise<void>;
```

Defined in: [libs/nest-auth/src/lib/interfaces/user-service.interface.ts:20](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-auth/src/lib/interfaces/user-service.interface.ts#L20)

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`request`

</td>
<td>

`Request`

</td>
</tr>
<tr>
<td>

`tokenUser?`

</td>
<td>

[`TokenUser`](#tokenuser)

</td>
</tr>
<tr>
<td>

`error?`

</td>
<td>

`unknown`

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`\<`void`\>

###### Inherited from

[`UserServiceEvents`](#userserviceevents).[`onAuthenticateJWT`](#onauthenticatejwt-2)

##### onChangePassword()?

```ts
optional onChangePassword(
   request,
   tokenUser?,
error?): Promise<void>;
```

Defined in: [libs/nest-auth/src/lib/interfaces/user-service.interface.ts:14](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-auth/src/lib/interfaces/user-service.interface.ts#L14)

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`request`

</td>
<td>

`Request`

</td>
</tr>
<tr>
<td>

`tokenUser?`

</td>
<td>

[`TokenUser`](#tokenuser)

</td>
</tr>
<tr>
<td>

`error?`

</td>
<td>

`Error`

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`\<`void`\>

###### Inherited from

[`UserServiceEvents`](#userserviceevents).[`onChangePassword`](#onchangepassword-2)

##### onGetCurrentUser()?

```ts
optional onGetCurrentUser(
   request,
   tokenUser?,
error?): Promise<void>;
```

Defined in: [libs/nest-auth/src/lib/interfaces/user-service.interface.ts:13](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-auth/src/lib/interfaces/user-service.interface.ts#L13)

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`request`

</td>
<td>

`Request`

</td>
</tr>
<tr>
<td>

`tokenUser?`

</td>
<td>

[`TokenUser`](#tokenuser)

</td>
</tr>
<tr>
<td>

`error?`

</td>
<td>

`Error`

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`\<`void`\>

###### Inherited from

[`UserServiceEvents`](#userserviceevents).[`onGetCurrentUser`](#ongetcurrentuser-2)

##### onGetUserByToken()?

```ts
optional onGetUserByToken(
   request,
   userId?,
error?): Promise<void>;
```

Defined in: [libs/nest-auth/src/lib/interfaces/user-service.interface.ts:22](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-auth/src/lib/interfaces/user-service.interface.ts#L22)

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`request`

</td>
<td>

`Request`

</td>
</tr>
<tr>
<td>

`userId?`

</td>
<td>

`EntityId`

</td>
</tr>
<tr>
<td>

`error?`

</td>
<td>

`unknown`

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`\<`void`\>

###### Inherited from

[`UserServiceEvents`](#userserviceevents).[`onGetUserByToken`](#ongetuserbytoken-2)

##### onLogin()?

```ts
optional onLogin(
   request,
   tokenUser?,
error?): Promise<void>;
```

Defined in: [libs/nest-auth/src/lib/interfaces/user-service.interface.ts:11](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-auth/src/lib/interfaces/user-service.interface.ts#L11)

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`request`

</td>
<td>

`Request`

</td>
</tr>
<tr>
<td>

`tokenUser?`

</td>
<td>

[`TokenUser`](#tokenuser)

</td>
</tr>
<tr>
<td>

`error?`

</td>
<td>

`Error`

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`\<`void`\>

###### Inherited from

[`UserServiceEvents`](#userserviceevents).[`onLogin`](#onlogin-2)

##### onLogout()?

```ts
optional onLogout(
   request,
   tokenUser?,
error?): Promise<void>;
```

Defined in: [libs/nest-auth/src/lib/interfaces/user-service.interface.ts:18](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-auth/src/lib/interfaces/user-service.interface.ts#L18)

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`request`

</td>
<td>

`Request`

</td>
</tr>
<tr>
<td>

`tokenUser?`

</td>
<td>

[`TokenUser`](#tokenuser)

</td>
</tr>
<tr>
<td>

`error?`

</td>
<td>

`Error`

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`\<`void`\>

###### Inherited from

[`UserServiceEvents`](#userserviceevents).[`onLogout`](#onlogout-2)

##### onRefreshTokens()?

```ts
optional onRefreshTokens(request, tokenUser?): Promise<void>;
```

Defined in: [libs/nest-auth/src/lib/interfaces/user-service.interface.ts:12](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-auth/src/lib/interfaces/user-service.interface.ts#L12)

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`request`

</td>
<td>

`Request`

</td>
</tr>
<tr>
<td>

`tokenUser?`

</td>
<td>

[`TokenUser`](#tokenuser)

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`\<`void`\>

###### Inherited from

[`UserServiceEvents`](#userserviceevents).[`onRefreshTokens`](#onrefreshtokens-2)

##### onRegister()?

```ts
optional onRegister(
   request,
   userId?,
error?): Promise<void>;
```

Defined in: [libs/nest-auth/src/lib/interfaces/user-service.interface.ts:8](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-auth/src/lib/interfaces/user-service.interface.ts#L8)

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`request`

</td>
<td>

`Request`

</td>
</tr>
<tr>
<td>

`userId?`

</td>
<td>

`EntityId`

</td>
</tr>
<tr>
<td>

`error?`

</td>
<td>

`unknown`

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`\<`void`\>

###### Inherited from

[`UserServiceEvents`](#userserviceevents).[`onRegister`](#onregister-2)

##### onRequestPasswordReset()?

```ts
optional onRequestPasswordReset(request, userId?): Promise<void>;
```

Defined in: [libs/nest-auth/src/lib/interfaces/user-service.interface.ts:15](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-auth/src/lib/interfaces/user-service.interface.ts#L15)

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`request`

</td>
<td>

`Request`

</td>
</tr>
<tr>
<td>

`userId?`

</td>
<td>

`EntityId`

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`\<`void`\>

###### Inherited from

[`UserServiceEvents`](#userserviceevents).[`onRequestPasswordReset`](#onrequestpasswordreset-2)

##### onResendVerificationEmail()?

```ts
optional onResendVerificationEmail(request, userId): Promise<void>;
```

Defined in: [libs/nest-auth/src/lib/interfaces/user-service.interface.ts:9](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-auth/src/lib/interfaces/user-service.interface.ts#L9)

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`request`

</td>
<td>

`Request`

</td>
</tr>
<tr>
<td>

`userId`

</td>
<td>

`EntityId`

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`\<`void`\>

###### Inherited from

[`UserServiceEvents`](#userserviceevents).[`onResendVerificationEmail`](#onresendverificationemail-2)

##### onResetPassword()?

```ts
optional onResetPassword(request, userId?): Promise<void>;
```

Defined in: [libs/nest-auth/src/lib/interfaces/user-service.interface.ts:17](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-auth/src/lib/interfaces/user-service.interface.ts#L17)

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`request`

</td>
<td>

`Request`

</td>
</tr>
<tr>
<td>

`userId?`

</td>
<td>

`EntityId`

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`\<`void`\>

###### Inherited from

[`UserServiceEvents`](#userserviceevents).[`onResetPassword`](#onresetpassword-2)

##### onVerifyEmail()?

```ts
optional onVerifyEmail(
   request,
   userId,
status): Promise<void>;
```

Defined in: [libs/nest-auth/src/lib/interfaces/user-service.interface.ts:10](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-auth/src/lib/interfaces/user-service.interface.ts#L10)

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`request`

</td>
<td>

`Request`

</td>
</tr>
<tr>
<td>

`userId`

</td>
<td>

`EntityId`

</td>
</tr>
<tr>
<td>

`status`

</td>
<td>

`boolean`

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`\<`void`\>

###### Inherited from

[`UserServiceEvents`](#userserviceevents).[`onVerifyEmail`](#onverifyemail-2)

##### onVerifyResetPasswordToken()?

```ts
optional onVerifyResetPasswordToken(request, userId?): Promise<void>;
```

Defined in: [libs/nest-auth/src/lib/interfaces/user-service.interface.ts:16](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-auth/src/lib/interfaces/user-service.interface.ts#L16)

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`request`

</td>
<td>

`Request`

</td>
</tr>
<tr>
<td>

`userId?`

</td>
<td>

`EntityId`

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`\<`void`\>

###### Inherited from

[`UserServiceEvents`](#userserviceevents).[`onVerifyResetPasswordToken`](#onverifyresetpasswordtoken-2)

##### registerUser()

```ts
registerUser(
   userDto,
   regType,
profile?): Promise<User>;
```

Defined in: [libs/nest-auth/src/lib/interfaces/user-service.interface.ts:34](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-auth/src/lib/interfaces/user-service.interface.ts#L34)

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`userDto`

</td>
<td>

`Partial`\<`User`\>

</td>
</tr>
<tr>
<td>

`regType`

</td>
<td>

`RegType`

</td>
</tr>
<tr>
<td>

`profile?`

</td>
<td>

[`GoogleProfile`](#googleprofile)

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`\<`User`\>

##### sendPasswordResetEmail()?

```ts
optional sendPasswordResetEmail(
   email,
   token,
subdomain?): Promise<boolean>;
```

Defined in: [libs/nest-auth/src/lib/interfaces/user-service.interface.ts:36](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-auth/src/lib/interfaces/user-service.interface.ts#L36)

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`email`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

`token`

</td>
<td>

`VerifyToken`

</td>
</tr>
<tr>
<td>

`subdomain?`

</td>
<td>

`string`

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`\<`boolean`\>

##### sendVerificationEmail()?

```ts
optional sendVerificationEmail(
   userId,
   token,
subdomain?): Promise<boolean>;
```

Defined in: [libs/nest-auth/src/lib/interfaces/user-service.interface.ts:37](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-auth/src/lib/interfaces/user-service.interface.ts#L37)

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`userId`

</td>
<td>

`EntityId`

</td>
</tr>
<tr>
<td>

`token`

</td>
<td>

`VerifyToken`

</td>
</tr>
<tr>
<td>

`subdomain?`

</td>
<td>

`string`

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`\<`boolean`\>

##### updateUserById()

```ts
updateUserById(
   id,
   userDto,
updatedBy): Promise<User>;
```

Defined in: [libs/nest-auth/src/lib/interfaces/user-service.interface.ts:35](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-auth/src/lib/interfaces/user-service.interface.ts#L35)

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`id`

</td>
<td>

`EntityId`

</td>
</tr>
<tr>
<td>

`userDto`

</td>
<td>

`Partial`\<`User`\>

</td>
</tr>
<tr>
<td>

`updatedBy`

</td>
<td>

`User`

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`\<`User`\>

---

### JwtOptions

Defined in: [libs/nest-auth/src/lib/interfaces/auth-options.interface.ts:7](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-auth/src/lib/interfaces/auth-options.interface.ts#L7)

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="expiresin"></a> `expiresIn`

</td>
<td>

`number`

</td>
<td>

[libs/nest-auth/src/lib/interfaces/auth-options.interface.ts:9](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-auth/src/lib/interfaces/auth-options.interface.ts#L9)

</td>
</tr>
<tr>
<td>

<a id="refreshexpiresin"></a> `refreshExpiresIn`

</td>
<td>

`number`

</td>
<td>

[libs/nest-auth/src/lib/interfaces/auth-options.interface.ts:11](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-auth/src/lib/interfaces/auth-options.interface.ts#L11)

</td>
</tr>
<tr>
<td>

<a id="refreshsecret"></a> `refreshSecret`

</td>
<td>

`string`

</td>
<td>

[libs/nest-auth/src/lib/interfaces/auth-options.interface.ts:10](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-auth/src/lib/interfaces/auth-options.interface.ts#L10)

</td>
</tr>
<tr>
<td>

<a id="secret-1"></a> `secret`

</td>
<td>

`string`

</td>
<td>

[libs/nest-auth/src/lib/interfaces/auth-options.interface.ts:8](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-auth/src/lib/interfaces/auth-options.interface.ts#L8)

</td>
</tr>
</tbody>
</table>

---

### SocketOptions

Defined in: [libs/nest-auth/src/lib/interfaces/auth-options.interface.ts:33](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-auth/src/lib/interfaces/auth-options.interface.ts#L33)

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="idkey"></a> `idKey`

</td>
<td>

`string`

</td>
<td>

[libs/nest-auth/src/lib/interfaces/auth-options.interface.ts:34](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-auth/src/lib/interfaces/auth-options.interface.ts#L34)

</td>
</tr>
</tbody>
</table>

---

### TokenUser

Defined in: [libs/nest-auth/src/lib/interfaces/token-user.type.ts:4](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-auth/src/lib/interfaces/token-user.type.ts#L4)

#### Extends

- `User`.`UserExtra`.`UserSession`

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
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

`AccessToken`

</td>
<td>

```ts
UserSession.accessToken;
```

</td>
<td>

[libs/nest-connector/src/lib/auth/interfaces/user-session.interface.ts:6](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-connector/src/lib/auth/interfaces/user-session.interface.ts#L6)

</td>
</tr>
<tr>
<td>

<a id="authfield-3"></a> `authField?`

</td>
<td>

`string`

</td>
<td>

```ts
UserExtra.authField;
```

</td>
<td>

[libs/nest-auth/src/lib/interfaces/user-extra.interfaces.ts:2](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-auth/src/lib/interfaces/user-extra.interfaces.ts#L2)

</td>
</tr>
<tr>
<td>

<a id="authfieldvalue-1"></a> `authFieldValue?`

</td>
<td>

`string`

</td>
<td>

```ts
UserExtra.authFieldValue;
```

</td>
<td>

[libs/nest-auth/src/lib/interfaces/user-extra.interfaces.ts:3](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-auth/src/lib/interfaces/user-extra.interfaces.ts#L3)

</td>
</tr>
<tr>
<td>

<a id="authprovider"></a> `authProvider?`

</td>
<td>

`AuthStrategy`

</td>
<td>

```ts
UserSession.authProvider;
```

</td>
<td>

[libs/nest-connector/src/lib/auth/interfaces/user-session.interface.ts:10](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-connector/src/lib/auth/interfaces/user-session.interface.ts#L10)

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

```ts
UserSession.authProviderId;
```

</td>
<td>

[libs/nest-connector/src/lib/auth/interfaces/user-session.interface.ts:11](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-connector/src/lib/auth/interfaces/user-session.interface.ts#L11)

</td>
</tr>
<tr>
<td>

<a id="avatar-1"></a> `avatar?`

</td>
<td>

`string`

</td>
<td>

```ts
User.avatar;
```

</td>
<td>

[libs/nest-connector/src/lib/auth/interfaces/user.interface.ts:13](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-connector/src/lib/auth/interfaces/user.interface.ts#L13)

</td>
</tr>
<tr>
<td>

<a id="email-8"></a> `email?`

</td>
<td>

`string`

</td>
<td>

```ts
User.email;
```

</td>
<td>

[libs/nest-connector/src/lib/auth/interfaces/user.interface.ts:6](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-connector/src/lib/auth/interfaces/user.interface.ts#L6)

</td>
</tr>
<tr>
<td>

<a id="emailverified-1"></a> `emailVerified?`

</td>
<td>

`boolean`

</td>
<td>

```ts
User.emailVerified;
```

</td>
<td>

[libs/nest-connector/src/lib/auth/interfaces/user.interface.ts:11](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-connector/src/lib/auth/interfaces/user.interface.ts#L11)

</td>
</tr>
<tr>
<td>

<a id="firstname-2"></a> `firstName`

</td>
<td>

`string`

</td>
<td>

```ts
User.firstName;
```

</td>
<td>

[libs/nest-connector/src/lib/common/user-entity.interface.ts:7](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-connector/src/lib/common/user-entity.interface.ts#L7)

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

```ts
UserSession.frontendUrl;
```

</td>
<td>

[libs/nest-connector/src/lib/auth/interfaces/user-session.interface.ts:9](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-connector/src/lib/auth/interfaces/user-session.interface.ts#L9)

</td>
</tr>
<tr>
<td>

<a id="fullname-1"></a> `fullName`

</td>
<td>

`string`

</td>
<td>

```ts
User.fullName;
```

</td>
<td>

[libs/nest-connector/src/lib/common/user-entity.interface.ts:9](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-connector/src/lib/common/user-entity.interface.ts#L9)

</td>
</tr>
<tr>
<td>

<a id="id-2"></a> `id`

</td>
<td>

`EntityId`

</td>
<td>

```ts
User.id;
```

</td>
<td>

[libs/nest-connector/src/lib/common/user-entity.interface.ts:6](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-connector/src/lib/common/user-entity.interface.ts#L6)

</td>
</tr>
<tr>
<td>

<a id="lastname-2"></a> `lastName`

</td>
<td>

`string`

</td>
<td>

```ts
User.lastName;
```

</td>
<td>

[libs/nest-connector/src/lib/common/user-entity.interface.ts:8](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-connector/src/lib/common/user-entity.interface.ts#L8)

</td>
</tr>
<tr>
<td>

<a id="password-4"></a> `password?`

</td>
<td>

`string`

</td>
<td>

```ts
User.password;
```

</td>
<td>

[libs/nest-connector/src/lib/auth/interfaces/user.interface.ts:8](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-connector/src/lib/auth/interfaces/user.interface.ts#L8)

</td>
</tr>
<tr>
<td>

<a id="profiledata-1"></a> `profileData?`

</td>
<td>

`object`

</td>
<td>

```ts
User.profileData;
```

</td>
<td>

[libs/nest-connector/src/lib/auth/interfaces/user.interface.ts:12](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-connector/src/lib/auth/interfaces/user.interface.ts#L12)

</td>
</tr>
<tr>
<td>

<a id="refreshtoken-1"></a> `refreshToken`

</td>
<td>

`RefreshToken`

</td>
<td>

```ts
UserSession.refreshToken;
```

</td>
<td>

[libs/nest-connector/src/lib/auth/interfaces/user-session.interface.ts:7](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-connector/src/lib/auth/interfaces/user-session.interface.ts#L7)

</td>
</tr>
<tr>
<td>

<a id="regtype-1"></a> `regType`

</td>
<td>

`RegType`

</td>
<td>

```ts
User.regType;
```

</td>
<td>

[libs/nest-connector/src/lib/auth/interfaces/user.interface.ts:9](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-connector/src/lib/auth/interfaces/user.interface.ts#L9)

</td>
</tr>
<tr>
<td>

<a id="role-1"></a> `role?`

</td>
<td>

`string` \| `Role`

</td>
<td>

```ts
User.role;
```

</td>
<td>

[libs/nest-connector/src/lib/auth/interfaces/user.interface.ts:10](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-connector/src/lib/auth/interfaces/user.interface.ts#L10)

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

```ts
UserSession.sessionId;
```

</td>
<td>

[libs/nest-connector/src/lib/auth/interfaces/user-session.interface.ts:5](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-connector/src/lib/auth/interfaces/user-session.interface.ts#L5)

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

```ts
UserSession.socketId;
```

</td>
<td>

[libs/nest-connector/src/lib/auth/interfaces/user-session.interface.ts:8](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-connector/src/lib/auth/interfaces/user-session.interface.ts#L8)

</td>
</tr>
<tr>
<td>

<a id="username-4"></a> `username?`

</td>
<td>

`string`

</td>
<td>

```ts
User.username;
```

</td>
<td>

[libs/nest-connector/src/lib/auth/interfaces/user.interface.ts:7](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-connector/src/lib/auth/interfaces/user.interface.ts#L7)

</td>
</tr>
</tbody>
</table>

---

### UserServiceEvents

Defined in: [libs/nest-auth/src/lib/interfaces/user-service.interface.ts:7](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-auth/src/lib/interfaces/user-service.interface.ts#L7)

#### Extended by

- [`IUserService`](#iuserservice)

#### Methods

##### onAuthenticate()?

```ts
optional onAuthenticate(
   request,
   tokenUser?,
error?): Promise<void>;
```

Defined in: [libs/nest-auth/src/lib/interfaces/user-service.interface.ts:19](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-auth/src/lib/interfaces/user-service.interface.ts#L19)

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`request`

</td>
<td>

`Request`

</td>
</tr>
<tr>
<td>

`tokenUser?`

</td>
<td>

[`TokenUser`](#tokenuser)

</td>
</tr>
<tr>
<td>

`error?`

</td>
<td>

`unknown`

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`\<`void`\>

##### onAuthenticateGoogle()?

```ts
optional onAuthenticateGoogle(
   request,
   tokenUser?,
error?): Promise<void>;
```

Defined in: [libs/nest-auth/src/lib/interfaces/user-service.interface.ts:21](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-auth/src/lib/interfaces/user-service.interface.ts#L21)

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`request`

</td>
<td>

`Request`

</td>
</tr>
<tr>
<td>

`tokenUser?`

</td>
<td>

[`TokenUser`](#tokenuser)

</td>
</tr>
<tr>
<td>

`error?`

</td>
<td>

`unknown`

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`\<`void`\>

##### onAuthenticateJWT()?

```ts
optional onAuthenticateJWT(
   request,
   tokenUser?,
error?): Promise<void>;
```

Defined in: [libs/nest-auth/src/lib/interfaces/user-service.interface.ts:20](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-auth/src/lib/interfaces/user-service.interface.ts#L20)

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`request`

</td>
<td>

`Request`

</td>
</tr>
<tr>
<td>

`tokenUser?`

</td>
<td>

[`TokenUser`](#tokenuser)

</td>
</tr>
<tr>
<td>

`error?`

</td>
<td>

`unknown`

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`\<`void`\>

##### onChangePassword()?

```ts
optional onChangePassword(
   request,
   tokenUser?,
error?): Promise<void>;
```

Defined in: [libs/nest-auth/src/lib/interfaces/user-service.interface.ts:14](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-auth/src/lib/interfaces/user-service.interface.ts#L14)

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`request`

</td>
<td>

`Request`

</td>
</tr>
<tr>
<td>

`tokenUser?`

</td>
<td>

[`TokenUser`](#tokenuser)

</td>
</tr>
<tr>
<td>

`error?`

</td>
<td>

`Error`

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`\<`void`\>

##### onGetCurrentUser()?

```ts
optional onGetCurrentUser(
   request,
   tokenUser?,
error?): Promise<void>;
```

Defined in: [libs/nest-auth/src/lib/interfaces/user-service.interface.ts:13](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-auth/src/lib/interfaces/user-service.interface.ts#L13)

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`request`

</td>
<td>

`Request`

</td>
</tr>
<tr>
<td>

`tokenUser?`

</td>
<td>

[`TokenUser`](#tokenuser)

</td>
</tr>
<tr>
<td>

`error?`

</td>
<td>

`Error`

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`\<`void`\>

##### onGetUserByToken()?

```ts
optional onGetUserByToken(
   request,
   userId?,
error?): Promise<void>;
```

Defined in: [libs/nest-auth/src/lib/interfaces/user-service.interface.ts:22](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-auth/src/lib/interfaces/user-service.interface.ts#L22)

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`request`

</td>
<td>

`Request`

</td>
</tr>
<tr>
<td>

`userId?`

</td>
<td>

`EntityId`

</td>
</tr>
<tr>
<td>

`error?`

</td>
<td>

`unknown`

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`\<`void`\>

##### onLogin()?

```ts
optional onLogin(
   request,
   tokenUser?,
error?): Promise<void>;
```

Defined in: [libs/nest-auth/src/lib/interfaces/user-service.interface.ts:11](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-auth/src/lib/interfaces/user-service.interface.ts#L11)

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`request`

</td>
<td>

`Request`

</td>
</tr>
<tr>
<td>

`tokenUser?`

</td>
<td>

[`TokenUser`](#tokenuser)

</td>
</tr>
<tr>
<td>

`error?`

</td>
<td>

`Error`

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`\<`void`\>

##### onLogout()?

```ts
optional onLogout(
   request,
   tokenUser?,
error?): Promise<void>;
```

Defined in: [libs/nest-auth/src/lib/interfaces/user-service.interface.ts:18](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-auth/src/lib/interfaces/user-service.interface.ts#L18)

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`request`

</td>
<td>

`Request`

</td>
</tr>
<tr>
<td>

`tokenUser?`

</td>
<td>

[`TokenUser`](#tokenuser)

</td>
</tr>
<tr>
<td>

`error?`

</td>
<td>

`Error`

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`\<`void`\>

##### onRefreshTokens()?

```ts
optional onRefreshTokens(request, tokenUser?): Promise<void>;
```

Defined in: [libs/nest-auth/src/lib/interfaces/user-service.interface.ts:12](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-auth/src/lib/interfaces/user-service.interface.ts#L12)

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`request`

</td>
<td>

`Request`

</td>
</tr>
<tr>
<td>

`tokenUser?`

</td>
<td>

[`TokenUser`](#tokenuser)

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`\<`void`\>

##### onRegister()?

```ts
optional onRegister(
   request,
   userId?,
error?): Promise<void>;
```

Defined in: [libs/nest-auth/src/lib/interfaces/user-service.interface.ts:8](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-auth/src/lib/interfaces/user-service.interface.ts#L8)

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`request`

</td>
<td>

`Request`

</td>
</tr>
<tr>
<td>

`userId?`

</td>
<td>

`EntityId`

</td>
</tr>
<tr>
<td>

`error?`

</td>
<td>

`unknown`

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`\<`void`\>

##### onRequestPasswordReset()?

```ts
optional onRequestPasswordReset(request, userId?): Promise<void>;
```

Defined in: [libs/nest-auth/src/lib/interfaces/user-service.interface.ts:15](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-auth/src/lib/interfaces/user-service.interface.ts#L15)

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`request`

</td>
<td>

`Request`

</td>
</tr>
<tr>
<td>

`userId?`

</td>
<td>

`EntityId`

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`\<`void`\>

##### onResendVerificationEmail()?

```ts
optional onResendVerificationEmail(request, userId): Promise<void>;
```

Defined in: [libs/nest-auth/src/lib/interfaces/user-service.interface.ts:9](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-auth/src/lib/interfaces/user-service.interface.ts#L9)

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`request`

</td>
<td>

`Request`

</td>
</tr>
<tr>
<td>

`userId`

</td>
<td>

`EntityId`

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`\<`void`\>

##### onResetPassword()?

```ts
optional onResetPassword(request, userId?): Promise<void>;
```

Defined in: [libs/nest-auth/src/lib/interfaces/user-service.interface.ts:17](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-auth/src/lib/interfaces/user-service.interface.ts#L17)

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`request`

</td>
<td>

`Request`

</td>
</tr>
<tr>
<td>

`userId?`

</td>
<td>

`EntityId`

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`\<`void`\>

##### onVerifyEmail()?

```ts
optional onVerifyEmail(
   request,
   userId,
status): Promise<void>;
```

Defined in: [libs/nest-auth/src/lib/interfaces/user-service.interface.ts:10](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-auth/src/lib/interfaces/user-service.interface.ts#L10)

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`request`

</td>
<td>

`Request`

</td>
</tr>
<tr>
<td>

`userId`

</td>
<td>

`EntityId`

</td>
</tr>
<tr>
<td>

`status`

</td>
<td>

`boolean`

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`\<`void`\>

##### onVerifyResetPasswordToken()?

```ts
optional onVerifyResetPasswordToken(request, userId?): Promise<void>;
```

Defined in: [libs/nest-auth/src/lib/interfaces/user-service.interface.ts:16](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-auth/src/lib/interfaces/user-service.interface.ts#L16)

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`request`

</td>
<td>

`Request`

</td>
</tr>
<tr>
<td>

`userId?`

</td>
<td>

`EntityId`

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`\<`void`\>

---

### UserServiceExistingProvider

Defined in: [libs/nest-auth/src/lib/providers/user-service.provider.ts:5](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-auth/src/lib/providers/user-service.provider.ts#L5)

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="imports"></a> `imports?`

</td>
<td>

( \| `Type`\<`any`\> \| `ForwardReference`\<`any`\> \| `DynamicModule` \| `Promise`\<`DynamicModule`\>)[]

</td>
<td>

[libs/nest-auth/src/lib/providers/user-service.provider.ts:6](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-auth/src/lib/providers/user-service.provider.ts#L6)

</td>
</tr>
<tr>
<td>

<a id="useexisting"></a> `useExisting`

</td>
<td>

(...`args`) => [`IUserService`](#iuserservice)

</td>
<td>

[libs/nest-auth/src/lib/providers/user-service.provider.ts:7](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-auth/src/lib/providers/user-service.provider.ts#L7)

</td>
</tr>
</tbody>
</table>

---

### UserServiceFactoryProvider

Defined in: [libs/nest-auth/src/lib/providers/user-service.provider.ts:10](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-auth/src/lib/providers/user-service.provider.ts#L10)

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
<th>Defined in</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="imports-1"></a> `imports?`

</td>
<td>

( \| `Type`\<`any`\> \| `ForwardReference`\<`any`\> \| `DynamicModule` \| `Promise`\<`DynamicModule`\>)[]

</td>
<td>

[libs/nest-auth/src/lib/providers/user-service.provider.ts:11](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-auth/src/lib/providers/user-service.provider.ts#L11)

</td>
</tr>
<tr>
<td>

<a id="inject"></a> `inject?`

</td>
<td>

`any`[]

</td>
<td>

[libs/nest-auth/src/lib/providers/user-service.provider.ts:13](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-auth/src/lib/providers/user-service.provider.ts#L13)

</td>
</tr>
<tr>
<td>

<a id="usefactory"></a> `useFactory`

</td>
<td>

(...`args`) => \| [`IUserService`](#iuserservice) \| `Promise`\<[`IUserService`](#iuserservice)\>

</td>
<td>

[libs/nest-auth/src/lib/providers/user-service.provider.ts:12](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-auth/src/lib/providers/user-service.provider.ts#L12)

</td>
</tr>
</tbody>
</table>

## Type Aliases

### UserServiceProvider

```ts
type UserServiceProvider =
  | UserServiceExistingProvider
  | UserServiceFactoryProvider;
```

Defined in: [libs/nest-auth/src/lib/providers/user-service.provider.ts:16](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-auth/src/lib/providers/user-service.provider.ts#L16)

## Variables

### ACCESS_TOKEN_COOKIE_NAME

```ts
const ACCESS_TOKEN_COOKIE_NAME: "Authorization" = "Authorization";
```

Defined in: [libs/nest-auth/src/lib/constants.ts:1](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-auth/src/lib/constants.ts#L1)

---

### AUTH_OPTIONS

```ts
const AUTH_OPTIONS: "AUTH_OPTIONS" = "AUTH_OPTIONS";
```

Defined in: [libs/nest-auth/src/lib/tokens.ts:3](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-auth/src/lib/tokens.ts#L3)

---

### EMAIL_KEY

```ts
const EMAIL_KEY: "email" = "email";
```

Defined in: [libs/nest-auth/src/lib/constants.ts:5](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-auth/src/lib/constants.ts#L5)

---

### PERMISSION_KEY

```ts
const PERMISSION_KEY: "permission" = "permission";
```

Defined in: [libs/nest-auth/src/lib/decorators/permission.decorator.ts:5](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-auth/src/lib/decorators/permission.decorator.ts#L5)

---

### REFRESH_TOKEN_COOKIE_NAME

```ts
const REFRESH_TOKEN_COOKIE_NAME: "Refresh" = "Refresh";
```

Defined in: [libs/nest-auth/src/lib/constants.ts:3](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-auth/src/lib/constants.ts#L3)

---

### ROLES_KEY

```ts
const ROLES_KEY: "roles" = "roles";
```

Defined in: [libs/nest-auth/src/lib/decorators/roles.decorator.ts:5](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-auth/src/lib/decorators/roles.decorator.ts#L5)

---

### USER_SERVICE

```ts
const USER_SERVICE: "USER_SERVICE" = "USER_SERVICE";
```

Defined in: [libs/nest-auth/src/lib/tokens.ts:1](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-auth/src/lib/tokens.ts#L1)

---

### USERNAME_KEY

```ts
const USERNAME_KEY: "username" = "username";
```

Defined in: [libs/nest-auth/src/lib/constants.ts:7](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-auth/src/lib/constants.ts#L7)

## Functions

### CurrentUser()

```ts
function CurrentUser(): ParameterDecorator;
```

Defined in: [libs/nest-auth/src/lib/decorators/request-user.decorator.ts:23](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-auth/src/lib/decorators/request-user.decorator.ts#L23)

Request User Decorator

This decorator is used to get the current user from the request.CurrentUser

#### Returns

`ParameterDecorator`

The parameter decorator

#### Example

```TypeScript
@Controller("user")
export class UserController {
    @Get()
    async getUsers(@CurrentUser() user: TokenUser): Promise<User[]> {
        // Implementation
    }
}
```

---

### Permission()

```ts
function Permission(permission): CustomDecorator;
```

Defined in: [libs/nest-auth/src/lib/decorators/permission.decorator.ts:28](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-auth/src/lib/decorators/permission.decorator.ts#L28)

Permission decorator

This decorator is used to set the permission for a route.

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

`permission`

</td>
<td>

`string`

</td>
<td>

permission

</td>
</tr>
</tbody>
</table>

#### Returns

`CustomDecorator`

CustomDecorator

#### Example

```TypeScript
@Controller("user")
export class UserController {
    @Get()
    @Permission(Permission.GET_USER)
    async getUsers(): Promise<User[]> {
        // Implementation
    }
}

```

---

### Roles()

```ts
function Roles(...roles): CustomDecorator;
```

Defined in: [libs/nest-auth/src/lib/decorators/roles.decorator.ts:28](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-auth/src/lib/decorators/roles.decorator.ts#L28)

Roles decorator

This decorator is used to set the roles for a route.

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

...`roles`

</td>
<td>

`string`[]

</td>
<td>

Comma separated roles

</td>
</tr>
</tbody>
</table>

#### Returns

`CustomDecorator`

CustomDecorator

#### Example

```TypeScript
@Controller("user")
export class UserController {
    @Get()
    @Roles(Role.ADMIN, Role.USER)
    async getUsers(): Promise<User[]> {
        // Implementation
    }
}

```

---

### Subdomain()

```ts
function Subdomain(): ParameterDecorator;
```

Defined in: [libs/nest-auth/src/lib/decorators/request-subdomain.decorator.ts:24](https://github.com/hichchidev/hichchi/blob/2e5d9b1f7f2bdf2757cdb9238766ea88927c42ce/libs/nest-auth/src/lib/decorators/request-subdomain.decorator.ts#L24)

Request subdomain decorator

This decorator is used to get the subdomain from the request.

#### Returns

`ParameterDecorator`

The parameter decorator

#### Example

```TypeScript
@Controller("user")
export class UserController {
    @Get()
    async getUsers(@Subdomain() subdomain: string): Promise<User[]> {
        // Implementation
    }
}
```

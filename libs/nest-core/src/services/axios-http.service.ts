/* eslint-disable @typescript-eslint/no-explicit-any */
// noinspection JSUnusedGlobalSymbols

import {
    BadRequestException,
    ForbiddenException,
    HttpException,
    HttpStatus,
    Injectable,
    UnauthorizedException,
} from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { AxiosError, AxiosRequestConfig } from "axios";
import { take } from "rxjs";
import { HttpServerErrorStatus } from "@hichchi/nest-connector";

/**
 * HTTP client service that wraps NestJS HttpService with improved error handling
 *
 * This service provides a convenient wrapper around the NestJS HttpService (which is based on Axios)
 * to make HTTP requests with automatic error handling. It converts Axios errors into appropriate
 * NestJS exceptions based on the HTTP status code of the response.
 *
 * The service offers methods for all standard HTTP methods (GET, POST, PUT, PATCH, DELETE)
 * with full TypeScript support for request and response types.
 *
 * @example
 * ```typescript
 * // Inject the service
 * constructor(private readonly httpService: AxiosHttpService) {}
 *
 * // Make a GET request
 * async getUser(id: string): Promise<User> {
 *   return this.httpService.get<User>(`https://api.example.com/users/${id}`);
 * }
 *
 * // Make a POST request with typed request and response
 * async createUser(userData: CreateUserDto): Promise<User> {
 *   return this.httpService.post<User, CreateUserDto>(
 *     'https://api.example.com/users',
 *     userData
 *   );
 * }
 * ```
 *
 * @see {@link HttpService} The underlying NestJS HttpService that this service wraps
 */
@Injectable()
export class AxiosHttpService {
    constructor(private readonly httpService: HttpService) {}

    /**
     * Performs an HTTP GET request
     *
     * This method sends a GET request to the specified URL and returns the response data.
     * It handles the conversion of the Observable returned by HttpService into a Promise,
     * and provides error handling by converting Axios errors into appropriate NestJS exceptions.
     *
     * @template T - The expected type of the response data
     * @param {string} url - The URL to send the request to
     * @param {AxiosRequestConfig} [config] - Optional Axios request configuration
     * @returns {Promise<T>} A promise that resolves to the response data
     * @throws {BadRequestException} For 400 status responses
     * @throws {UnauthorizedException} For 401 status responses
     * @throws {ForbiddenException} For 403 status responses
     * @throws {HttpException} For all other error responses
     *
     * @example
     * ```typescript
     * // Get a user by ID
     * const user = await httpService.get<User>('https://api.example.com/users/123');
     *
     * // Get users with query parameters and headers
     * const users = await httpService.get<User[]>('https://api.example.com/users', {
     *   params: { role: 'admin', active: true },
     *   headers: { 'X-API-Key': 'your-api-key' }
     * });
     * ```
     */
    async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
        try {
            const res = this.httpService.get<T>(url, config).pipe(take(1));
            return await new Promise((resolve, reject) => {
                res.subscribe({
                    next: response => {
                        resolve(response.data);
                    },
                    error: (error: AxiosError) => {
                        reject(error);
                    },
                });
            });
        } catch (error) {
            this.throwException(error as AxiosError);
        }
    }

    /**
     * Performs an HTTP POST request
     *
     * This method sends a POST request with the provided data to the specified URL
     * and returns the response data. It handles the conversion of the Observable
     * returned by HttpService into a Promise, and provides error handling by
     * converting Axios errors into appropriate NestJS exceptions.
     *
     * @template T - The expected type of the response data
     * @template D - The type of the request data (defaults to any)
     * @param {string} url - The URL to send the request to
     * @param {D} [data] - Optional data to send in the request body
     * @param {AxiosRequestConfig} [config] - Optional Axios request configuration
     * @returns {Promise<T>} A promise that resolves to the response data
     * @throws {BadRequestException} For 400 status responses
     * @throws {UnauthorizedException} For 401 status responses
     * @throws {ForbiddenException} For 403 status responses
     * @throws {HttpException} For all other error responses
     *
     * @example
     * ```typescript
     * // Create a new user
     * interface CreateUserDto {
     *   name: string;
     *   email: string;
     * }
     *
     * const newUser = await httpService.post<User, CreateUserDto>(
     *   'https://api.example.com/users',
     *   { name: 'John Doe', email: 'john@example.com' }
     * );
     *
     * // Post with additional headers
     * const response = await httpService.post<ApiResponse, FormData>(
     *   'https://api.example.com/upload',
     *   formData,
     *   { headers: { 'Content-Type': 'multipart/form-data' } }
     * );
     * ```
     */
    async post<T, D = any>(url: string, data?: D, config?: AxiosRequestConfig): Promise<T> {
        try {
            const res = this.httpService.post<T>(url, data, config).pipe(take(1));
            return await new Promise((resolve, reject) => {
                res.subscribe({
                    next: response => {
                        resolve(response.data);
                    },
                    error: (error: AxiosError) => {
                        reject(error);
                    },
                });
            });
        } catch (error) {
            this.throwException(error as AxiosError);
        }
    }

    /**
     * Performs an HTTP PUT request
     *
     * This method sends a PUT request with the provided data to the specified URL
     * and returns the response data. PUT is typically used for updating existing resources
     * with a complete replacement of the resource. It handles the conversion of the Observable
     * returned by HttpService into a Promise, and provides error handling by
     * converting Axios errors into appropriate NestJS exceptions.
     *
     * @template T - The expected type of the response data
     * @template D - The type of the request data (defaults to any)
     * @param {string} url - The URL to send the request to
     * @param {D} [data] - Optional data to send in the request body
     * @param {AxiosRequestConfig} [config] - Optional Axios request configuration
     * @returns {Promise<T>} A promise that resolves to the response data
     * @throws {BadRequestException} For 400 status responses
     * @throws {UnauthorizedException} For 401 status responses
     * @throws {ForbiddenException} For 403 status responses
     * @throws {HttpException} For all other error responses
     *
     * @example
     * ```typescript
     * // Update a user (complete replacement)
     * interface UpdateUserDto {
     *   id: string;
     *   name: string;
     *   email: string;
     *   role: string;
     * }
     *
     * const updatedUser = await httpService.put<User, UpdateUserDto>(
     *   'https://api.example.com/users/123',
     *   {
     *     id: '123',
     *     name: 'John Doe',
     *     email: 'john@example.com',
     *     role: 'admin'
     *   }
     * );
     *
     * // Put with authentication header
     * const result = await httpService.put<ApiResponse, object>(
     *   'https://api.example.com/resources/456',
     *   { status: 'active' },
     *   { headers: { 'Authorization': 'Bearer ' + token } }
     * );
     * ```
     */
    async put<T, D = any>(url: string, data?: D, config?: AxiosRequestConfig): Promise<T> {
        try {
            const res = this.httpService.put<T>(url, data, config).pipe(take(1));
            return await new Promise((resolve, reject) => {
                res.subscribe({
                    next: response => {
                        resolve(response.data);
                    },
                    error: (error: AxiosError) => {
                        reject(error);
                    },
                });
            });
        } catch (error) {
            this.throwException(error as AxiosError);
        }
    }

    /**
     * Performs an HTTP PATCH request
     *
     * This method sends a PATCH request with the provided data to the specified URL
     * and returns the response data. Unlike PUT which replaces an entire resource,
     * PATCH is used for partial updates to a resource. It handles the conversion of
     * the Observable returned by HttpService into a Promise, and provides error handling
     * by converting Axios errors into appropriate NestJS exceptions.
     *
     * @template T - The expected type of the response data
     * @template D - The type of the request data (defaults to any)
     * @param {string} url - The URL to send the request to
     * @param {D} [data] - Optional data to send in the request body
     * @param {AxiosRequestConfig} [config] - Optional Axios request configuration
     * @returns {Promise<T>} A promise that resolves to the response data
     * @throws {BadRequestException} For 400 status responses
     * @throws {UnauthorizedException} For 401 status responses
     * @throws {ForbiddenException} For 403 status responses
     * @throws {HttpException} For all other error responses
     *
     * @example
     * ```typescript
     * // Partially update a user
     * interface PatchUserDto {
     *   name?: string;
     *   email?: string;
     * }
     *
     * const updatedUser = await httpService.patch<User, PatchUserDto>(
     *   'https://api.example.com/users/123',
     *   { name: 'John Updated' } // Only update the name
     * );
     *
     * // Patch with query parameters
     * const result = await httpService.patch<ApiResponse, object>(
     *   'https://api.example.com/resources/456',
     *   { status: 'inactive' },
     *   {
     *     params: { version: '2' },
     *     headers: { 'X-Reason': 'Maintenance' }
     *   }
     * );
     * ```
     */
    async patch<T, D = any>(url: string, data?: D, config?: AxiosRequestConfig): Promise<T> {
        try {
            const res = this.httpService.patch<T>(url, data, config).pipe(take(1));
            return await new Promise((resolve, reject) => {
                res.subscribe({
                    next: response => {
                        resolve(response.data);
                    },
                    error: (error: AxiosError) => {
                        reject(error);
                    },
                });
            });
        } catch (error) {
            this.throwException(error as AxiosError<unknown, unknown>);
        }
    }

    /**
     * Performs an HTTP DELETE request
     *
     * This method sends a DELETE request to the specified URL and returns the response data.
     * DELETE is used to remove resources from the server. It handles the conversion of
     * the Observable returned by HttpService into a Promise, and provides error handling
     * by converting Axios errors into appropriate NestJS exceptions.
     *
     * @template T - The expected type of the response data
     * @param {string} url - The URL to send the request to
     * @param {AxiosRequestConfig} [config] - Optional Axios request configuration
     * @returns {Promise<T>} A promise that resolves to the response data
     * @throws {BadRequestException} For 400 status responses
     * @throws {UnauthorizedException} For 401 status responses
     * @throws {ForbiddenException} For 403 status responses
     * @throws {HttpException} For all other error responses
     *
     * @example
     * ```typescript
     * // Delete a user
     * const result = await httpService.delete<{ success: boolean }>(
     *   'https://api.example.com/users/123'
     * );
     *
     * if (result.success) {
     *   console.log('User deleted successfully');
     * }
     *
     * // Delete with authentication and additional parameters
     * const deleteResult = await httpService.delete<ApiResponse>(
     *   'https://api.example.com/resources/456',
     *   {
     *     headers: { 'Authorization': 'Bearer ' + token },
     *     params: { permanent: true }
     *   }
     * );
     * ```
     */
    async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
        try {
            const res = this.httpService.delete<T>(url, config).pipe(take(1));
            return await new Promise((resolve, reject) => {
                res.subscribe({
                    next: response => {
                        resolve(response.data);
                    },
                    error: (error: AxiosError) => {
                        reject(error);
                    },
                });
            });
        } catch (error) {
            this.throwException(error as AxiosError);
        }
    }

    /**
     * Converts Axios errors to appropriate NestJS exceptions
     *
     * This private method is used internally by the HTTP request methods to handle
     * errors returned by Axios. It maps HTTP status codes to corresponding NestJS
     * exception types, providing consistent error handling across all request methods.
     *
     * The mapping is as follows:
     * - 400 Bad Request → BadRequestException
     * - 401 Unauthorized → UnauthorizedException
     * - 403 Forbidden → ForbiddenException
     * - All other errors → HttpException with the original status code
     *
     * @private
     * @param {AxiosError} error - The Axios error to convert
     * @throws {BadRequestException} For 400 status responses
     * @throws {UnauthorizedException} For 401 status responses
     * @throws {ForbiddenException} For 403 status responses
     * @throws {HttpException} For all other error responses
     * @returns {never} This method always throws an exception
     *
     * @see {@link BadRequestException} NestJS exception for 400 status codes
     * @see {@link UnauthorizedException} NestJS exception for 401 status codes
     * @see {@link ForbiddenException} NestJS exception for 403 status codes
     * @see {@link HttpException} Base NestJS exception class for HTTP errors
     */
    private throwException(error: AxiosError): never {
        switch (error.response?.status as HttpStatus) {
            case HttpStatus.BAD_REQUEST:
                throw new BadRequestException(error.response?.data);
            case HttpStatus.UNAUTHORIZED:
                throw new UnauthorizedException(error.response?.data);
            case HttpStatus.FORBIDDEN:
                throw new ForbiddenException(error.response?.data);
            default:
                throw new HttpException(
                    error.response?.data ?? error.response ?? error,
                    error.response?.status ?? HttpServerErrorStatus.INTERNAL_SERVER_ERROR,
                );
        }
    }
}

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

@Injectable()
export class CustomHttpService {
    constructor(private readonly httpService: HttpService) {}

    /**
     * HTTP GET request
     *
     * @template T Response data type
     * @param {string} url URL
     * @param {AxiosRequestConfig} config Axios request config
     * @returns {Promise<T>} Response data
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
     * HTTP POST request
     *
     * @template T Response data type
     * @template D Request data type
     * @param {string} url URL
     * @param {D} data Request data
     * @param {AxiosRequestConfig} config Axios request config
     * @returns {Promise<T>} Response data
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
     * HTTP PUT request
     *
     * @template T Response data type
     * @template D Request data type
     * @param {string} url URL
     * @param {D} data Request data
     * @param {AxiosRequestConfig} config Axios request config
     * @returns {Promise<T>} Response data
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
     * HTTP PATCH request
     *
     * @template T Response data type
     * @template D Request data type
     * @param {string} url URL
     * @param {D} data Request data
     * @param {AxiosRequestConfig} config Axios request config
     * @returns {Promise<T>} Response data
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
     * HTTP DELETE request
     *
     * @template T Response data type
     * @param {string} url URL
     * @param {AxiosRequestConfig} config Axios request config
     * @returns {Promise<T>} Response data
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
     * Throw exceptions
     *
     * @private
     * @param {AxiosError} error Axios error
     * @throws {BadRequestException|UnauthorizedException|ForbiddenException|HttpException} Throws exception based on the status code
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

// noinspection JSUnusedGlobalSymbols

// export interface IClassValidatorErrorResponse {
//     statusCode: number;
//     message: string[];
//     error: string;
// }

export interface EntityErrorResponse {
    status: number;
    code: string;
    message: string;
    description?: string;
}

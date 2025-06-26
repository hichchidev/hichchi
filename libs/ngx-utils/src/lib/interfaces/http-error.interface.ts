import { ErrorResponse } from "@hichchi/nest-connector";

export interface HttpError extends Error {
    status: number;
    message: string;
    error?: ErrorResponse;
}

import { ErrorResponse } from "@hichchi/nest-connector";

export interface HttpError {
    status: number;
    message: string;
    error?: ErrorResponse;
}

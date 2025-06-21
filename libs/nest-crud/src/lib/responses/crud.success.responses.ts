import { HttpSuccessStatus, SuccessResponse, SuccessResponseDto } from "@hichchi/nest-connector";
import { toSentenceCase, toUpperCase } from "@hichchi/utils";

const CrudSuccessResponses = {
    CREATED: (entityName: string): SuccessResponse =>
        new SuccessResponseDto({
            statusCode: HttpSuccessStatus.CREATED,
            code: `${toUpperCase(entityName)}_${HttpSuccessStatus.CREATED}_CREATED`,
            message: `${toSentenceCase(entityName)} created successfully!`,
        }),
    UPDATE: (entityName: string): SuccessResponse =>
        new SuccessResponseDto({
            statusCode: HttpSuccessStatus.OK,
            code: `${toUpperCase(entityName)}_${HttpSuccessStatus.OK}_UPDATED`,
            message: `${toSentenceCase(entityName)} updated successfully!`,
        }),
    SAVE: (entityName: string): SuccessResponse =>
        new SuccessResponseDto({
            statusCode: HttpSuccessStatus.CREATED,
            code: `${toUpperCase(entityName)}_${HttpSuccessStatus.CREATED}_SAVED`,
            message: `${toSentenceCase(entityName)} saved successfully!`,
        }),
    DELETE: (entityName: string): SuccessResponse =>
        new SuccessResponseDto({
            statusCode: HttpSuccessStatus.OK,
            code: `${toUpperCase(entityName)}_${HttpSuccessStatus.OK}_DELETED`,
            message: `${toSentenceCase(entityName)} deleted successfully!`,
        }),
    SUCCESS: (): SuccessResponse =>
        new SuccessResponseDto({
            statusCode: HttpSuccessStatus.OK,
            code: "SUCCESS",
            message: "success",
        }),
};

export { CrudSuccessResponses };

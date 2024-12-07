import { toSentenceCase } from "@hichchi/utils";
import { IStatusResponse } from "@hichchi/nest-core";

const EntityResponses = {
    CREATED: (entityName: string): IStatusResponse => {
        return {
            status: true,
            message: `${toSentenceCase(entityName)} created successfully!`,
        };
    },
    UPDATE: (entityName: string): IStatusResponse => {
        return {
            status: true,
            message: `${toSentenceCase(entityName)} updated successfully!`,
        };
    },
    SAVE: (entityName: string): IStatusResponse => {
        return {
            status: true,
            message: `${toSentenceCase(entityName)} saved successfully!`,
        };
    },
    DELETE: (entityName: string): IStatusResponse => {
        return {
            status: true,
            message: `${toSentenceCase(entityName)} deleted successfully!`,
        };
    },
    SUCCESS: {
        status: true,
        message: "success",
    },
};

export { EntityResponses };

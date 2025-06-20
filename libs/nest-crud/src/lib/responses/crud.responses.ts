import { toSentenceCase } from "@hichchi/utils";
import { StatusResponse } from "@hichchi/nest-connector/crud";

const EntityResponses = {
    CREATED: (entityName: string): StatusResponse => {
        return {
            status: true,
            message: `${toSentenceCase(entityName)} created successfully!`,
        };
    },
    UPDATE: (entityName: string): StatusResponse => {
        return {
            status: true,
            message: `${toSentenceCase(entityName)} updated successfully!`,
        };
    },
    SAVE: (entityName: string): StatusResponse => {
        return {
            status: true,
            message: `${toSentenceCase(entityName)} saved successfully!`,
        };
    },
    DELETE: (entityName: string): StatusResponse => {
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

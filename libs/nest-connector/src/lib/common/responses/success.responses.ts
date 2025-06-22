import { HttpSuccessStatus, CommonSuccessResponseCode } from "../enums";
import { SuccessResponse } from "../interfaces";

const SuccessResponses: { [key in CommonSuccessResponseCode]: SuccessResponse } = {
    [CommonSuccessResponseCode.SUCCESS]: {
        statusCode: HttpSuccessStatus.OK,
        code: CommonSuccessResponseCode.SUCCESS,
        message: "Success",
        description: "Success",
    },
};

export { SuccessResponses };

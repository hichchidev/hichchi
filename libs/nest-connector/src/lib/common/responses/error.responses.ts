const Errors = {
    E_400_EMPTY_ID: {
        statusCode: 400,
        code: "#{upperSnakeCase}_400_EMPTY_ID",
        message: "#{sentenceCase} id cannot be empty!",
    },
    E_400_EMPTY_IDS: {
        statusCode: 400,
        code: "#{upperSnakeCase}_400_EMPTY_IDS",
        message: "#{sentenceCase} ids cannot be empty!",
    },
    E_400_INVALID_ID: {
        statusCode: 400,
        code: "#{upperSnakeCase}_400_INVALID_ID",
        message: "Invalid value for #{lowerCase} ids!",
    },
    E_400_INVALID_IDS: {
        statusCode: 400,
        code: "#{upperSnakeCase}_400_INVALID_IDS",
        message: "Invalid value for #{lowerCase} ids!",
    },
    E_400_INVALID_UUID: {
        statusCode: 400,
        code: "#{upperSnakeCase}_400_INVALID_UUID",
        message: "Invalid value for #{lowerCase} id!",
    },
    E_400_NOT_ID_ARRAY: {
        statusCode: 400,
        code: "#{upperSnakeCase}_400_NOT_ID_ARRAY",
        message: "ids must be an array!",
    },
    E_404_FILE_NOT_EXIST: {
        statusCode: 404,
        code: "#{upperSnakeCase}_404_FILE_NOT_EXIST",
        message: "Error file does not exists!",
    },
    E_500_FILE_UPLOAD: {
        statusCode: 500,
        code: "#{upperSnakeCase}_500_FILE_UPLOAD",
        message: "Error occurred while uploading file!",
    },
    E_500_FILE_DELETE: {
        statusCode: 500,
        code: "#{upperSnakeCase}_500_FILE_DELETE",
        message: "Error occurred while deleting file!",
    },
    E_403: {
        statusCode: 403,
        code: "ERROR_403",
        message: "Forbidden!",
    },
    E_500: {
        statusCode: 500,
        code: "#{upperSnakeCase}_500",
        message: "Unspecific error!",
    },
    E_404_NOT_IMPLEMENTED: {
        statusCode: 404,
        code: "#{upperSnakeCase}_404_NOT_IMPLEMENTED",
        message: "API Not implemented!",
    },
    ERROR: {
        statusCode: 500,
        code: "ERROR_500",
        message: "Internal Server Error!",
    },
};

export { Errors };

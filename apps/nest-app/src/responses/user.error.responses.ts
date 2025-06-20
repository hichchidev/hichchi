// noinspection JSUnusedGlobalSymbols

export const UserErrors = {
    USER_400_EMPTY_CLIENT: {
        statusCode: 400,
        code: "USER_400_EMPTY_CLIENT",
        message: "Client details cannot be empty!",
    },
    USER_400_EMPTY_VENDOR: {
        statusCode: 400,
        code: "USER_400_EMPTY_VENDOR",
        message: "Vendor details cannot be empty!",
    },
    USER_400_EMPTY_PLANNER: {
        statusCode: 400,
        code: "USER_400_EMPTY_PLANNER",
        message: "Planner details cannot be empty!",
    },
    USER_400_EMPTY_ROLE: {
        statusCode: 400,
        code: "USER_400_EMPTY_ROLE",
        message: "Role cannot be empty!",
    },
    USER_400_INVALID_ROLE: {
        statusCode: 400,
        code: "USER_400_INVALID_ROLE",
        message: "Invalid value for user role!",
        description: "Valid values are 'admin', 'user', 'vendor', 'planner'",
    },
    USER_403_UPDATE_ADMIN: {
        statusCode: 400,
        code: "USER_403_UPDATE_ADMIN",
        message: "You cannot update an admin user!",
    },
    USER_403_DELETE_ADMIN: {
        statusCode: 400,
        code: "USER_403_UPDATE_ADMIN",
        message: "You cannot update an admin user!",
    },
    CLIENT_400_EMPTY_PLAN_STATUS: {
        statusCode: 400,
        code: "CLIENT_400_EMPTY_PLAN_STATUS",
        message: "Plan status cannot be empty!",
    },
    CLIENT_400_EMPTY_PARTNER_FNAME: {
        statusCode: 400,
        code: "CLIENT_400_EMPTY_PARTNER_FNAME",
        message: "Partner first name cannot be empty!",
    },
    CLIENT_400_EMPTY_PARTNER_LNAME: {
        statusCode: 400,
        code: "CLIENT_400_EMPTY_PARTNER_LNAME",
        message: "Partner last name cannot be empty!",
    },
    CLIENT_400_INVALID_PLAN_STATUS: {
        statusCode: 400,
        code: "CLIENT_400_INVALID_PLAN_STATUS",
        message: "Invalid value for plan status!",
        description: "Valid values are 'not-engaged', 'newly-engaged', 'planning', 'planning-booked', 'post-wedding'",
    },
    VENDOR_400_EMPTY_VENDOR_TYPE: {
        statusCode: 400,
        code: "VENDOR_400_EMPTY_VENDOR_TYPE",
        message: "Vendor type id cannot be empty!",
    },
    VENDOR_400_INVALID_VENDOR_TYPE: {
        statusCode: 400,
        code: "VENDOR_400_INVALID_VENDOR_TYPE",
        message: "Invalid value for vendor type!",
    },
    VENDOR_400_EMPTY_COMPANY_NAME: {
        statusCode: 400,
        code: "VENDOR_400_EMPTY_COMPANY_NAME",
        message: "Company name cannot be empty!",
    },
    VENDOR_400_EMPTY_ADDRESS: {
        statusCode: 400,
        code: "VENDOR_400_EMPTY_ADDRESS",
        message: "Address cannot be empty!",
    },
    VENDOR_400_EMPTY_CITY: {
        statusCode: 400,
        code: "VENDOR_400_EMPTY_CITY",
        message: "City cannot be empty!",
    },
    VENDOR_400_EMPTY_PHONE: {
        statusCode: 400,
        code: "VENDOR_400_EMPTY_PHONE",
        message: "Phone cannot be empty!",
    },
};

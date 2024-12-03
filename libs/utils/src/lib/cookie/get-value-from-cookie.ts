// noinspection JSUnusedGlobalSymbols

/**
 * Get value from cookie
 * @param name - Name of the cookie.
 * @param cookie - Cookie to get value from.
 * @returns - Value of the cookie.
 */
export const getValueFromCookie = (name: string, cookie: string): string => {
    const ca: Array<string> = cookie.split(";");
    const caLen: number = ca.length;
    const cookieName = `${name}=`;
    let c: string;

    for (let i = 0; i < caLen; i += 1) {
        c = ca[i].replace(/^\s+/g, "");
        if (c.indexOf(cookieName) === 0) {
            return c.substring(cookieName.length, c.length);
        }
    }
    return "";
};

// noinspection JSUnusedGlobalSymbols

import { getMapKey } from "../object";
import { mimeTypes } from "./mime-types";

/**
 * Get the file extension of the given mime type.
 * @param mimeType - Mime type.
 * @param allowedMimeTypes - Allowed mime types.
 * @returns File extension.
 */
export const getFileExt = (mimeType: string, allowedMimeTypes?: Map<string, string>): string | undefined => {
    return getMapKey(allowedMimeTypes ?? mimeTypes, mimeType);
};

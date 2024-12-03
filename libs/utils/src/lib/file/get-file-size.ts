// noinspection JSUnusedGlobalSymbols

/**
 * Get file size in human-readable format.
 * @param size - File size in bytes.
 * @param round - Whether to round the size.
 * @returns File size in human-readable format.
 */
export const getFileSize = (size: number, round?: boolean): string => {
    if (size < 1024) {
        return `${Math.round(size)} B`;
    }
    if (size < 1024 * 1024) {
        return `${(size / 1024).toFixed(round ? 0 : 2)} KB`;
    }
    if (size < 1024 * 1024 * 1024) {
        return `${(size / 1024 / 1024).toFixed(round ? 0 : 2)} MB`;
    }
    return `${(size / 1024 / 1024 / 1024).toFixed(round ? 0 : 2)} GB`;
};

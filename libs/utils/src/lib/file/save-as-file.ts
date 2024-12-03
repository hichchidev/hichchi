// noinspection JSUnusedGlobalSymbols

/**
 * Save a StreamableBlob as a file.
 * @param blob - Blob to save.
 * @param filename - File name.
 * @throws {Error} - Throws an error if used in a Node.js environment.
 */
export const saveAsFile = (blob: Blob, filename: string): void => {
    if (typeof window === "undefined" || typeof document === "undefined") {
        throw new Error("saveAsFile should be used only in the browser environment.");
    }

    const downloadURL: string = window.URL.createObjectURL(blob);
    const link: HTMLAnchorElement = document.createElement("a");
    link.href = downloadURL;
    link.download = filename;
    link.click();
};

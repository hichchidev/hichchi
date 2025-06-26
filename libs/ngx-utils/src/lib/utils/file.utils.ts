// noinspection JSUnusedGlobalSymbols

/**
 * Save a Blob as a file by triggering a download in the browser.
 * This function creates a temporary download link and triggers a click event to download the file.
 *
 * @param {Blob} blob - Blob to save.
 * @param {string} filename - File name with extension.
 * @throws {Error} Throws an error if used in a Node.js environment.
 *
 * @example
 * ```TypeScript
 * // Save a text file
 * const textBlob = new Blob(['Hello, World!'], { type: 'text/plain' });
 * saveAsFile(textBlob, 'hello.txt');
 * ```
 *
 * @example
 * ```TypeScript
 * // Save a JSON file
 * const data = { name: 'John', age: 30 };
 * const jsonBlob = new Blob([JSON.stringify(data)], { type: 'application/json' });
 * saveAsFile(jsonBlob, 'user.json');
 * ```
 *
 * @example
 * ```TypeScript
 * // Save a file from an API response
 * fetch('https://example.com/api/document')
 *   .then(response => response.blob())
 *   .then(blob => {
 *     saveAsFile(blob, 'document.pdf');
 *   });
 * ```
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

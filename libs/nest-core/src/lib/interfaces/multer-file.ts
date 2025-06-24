// noinspection JSUnusedGlobalSymbols

/**
 * Interface representing a file uploaded via Multer middleware in NestJS.
 *
 * The `MulterFile` interface defines the structure of file objects created by the
 * Multer middleware when handling file uploads in a NestJS application. This interface
 * represents files processed in memory storage mode (not disk storage).
 *
 * Multer is the recommended middleware for handling multipart/form-data in NestJS,
 * which is primarily used for file uploads. This interface provides type safety when
 * working with the uploaded files throughout the application.
 *
 * @remarks
 * This interface specifically represents files processed with memory storage.
 * When using disk storage, the object will also include properties like `filename`
 * and `path` instead of `buffer`.
 *
 * @example
 * ```typescript
 * // In a controller using FileInterceptor
 * @Post('upload')
 * @UseInterceptors(FileInterceptor('file'))
 * uploadFile(@UploadedFile() file: MulterFile) {
 *   console.log(`Received file: ${file.originalname}`);
 *   console.log(`Size: ${file.size} bytes`);
 *   console.log(`Type: ${file.mimetype}`);
 *
 *   // Process the file buffer
 *   // For example, upload to cloud storage
 *   return this.fileService.uploadToStorage(file);
 * }
 * ```
 */
export interface MulterFile {
    /**
     * The name of the form field associated with this file.
     *
     * This corresponds to the `name` attribute of the file input element
     * in the HTML form or the key used in FormData when uploading programmatically.
     *
     * @example
     * fieldname: 'profilePicture'
     */
    fieldname: string;

    /**
     * The original filename of the uploaded file on the user's device.
     *
     * This is the name of the file as it existed on the client's computer
     * before uploading, including the file extension.
     *
     * @example
     * originalname: 'vacation-photo.jpg'
     */
    originalname: string;

    /**
     * The encoding type of the file.
     *
     * This property specifies how the file was encoded during transmission.
     *
     * @example
     * encoding: '7bit'
     */
    encoding: string;

    /**
     * The MIME type of the file.
     *
     * The MIME (Multipurpose Internet Mail Extensions) type identifies the
     * format of the file. This can be used for validation and determining how
     * to process the file.
     *
     * @example
     * mimetype: 'image/jpeg'
     */
    mimetype: string;

    /**
     * The file data as a Buffer object.
     *
     * This contains the binary content of the uploaded file. When using memory
     * storage (as opposed to disk storage), Multer provides the entire file as
     * a Buffer in this property.
     *
     * @example
     * buffer: <Buffer ff d8 ff e0 00 10 4a 46 49 46 00 01 ...>
     */
    buffer: Buffer;

    /**
     * The size of the file in bytes.
     *
     * This represents the total size of the uploaded file, which can be used
     * for validation or informational purposes.
     *
     * @example
     * size: 1048576 // 1MB file
     */
    size: number;
}

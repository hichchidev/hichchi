// noinspection JSUnusedGlobalSymbols

import { FormArray, FormGroup } from "@angular/forms";
import { DataFormGroup } from "./form.interfaces";

/**
 * Recursively marks invalid form controls as dirty and touched
 *
 * This utility function traverses a form hierarchy and marks all invalid controls
 * as dirty and touched, which triggers validation error display in the UI. It works
 * recursively through nested FormGroups and FormArrays to ensure all invalid
 * controls are properly marked for error display.
 *
 * The function is particularly useful when you want to show all validation errors
 * at once, such as when a user attempts to submit a form. It only marks invalid
 * controls, leaving valid controls unchanged.
 *
 * Key features:
 * - Recursive traversal of form hierarchy
 * - Only marks invalid controls as dirty/touched
 * - Handles nested FormGroups and FormArrays
 * - Updates validation state after marking controls
 * - Non-destructive (doesn't affect valid controls)
 *
 * @param form - The FormGroup to process recursively
 *
 * @example
 * ```typescript
 * // Mark all invalid controls in a form for error display
 * export class UserFormComponent {
 *   userForm = this.fb.group({
 *     name: ['', Validators.required],
 *     email: ['', [Validators.required, Validators.email]],
 *     address: this.fb.group({
 *       street: ['', Validators.required],
 *       city: ['', Validators.required]
 *     })
 *   });
 *
 *   onSubmit() {
 *     if (this.userForm.invalid) {
 *       // Mark all invalid fields to show errors
 *       markFormDirty(this.userForm);
 *       return;
 *     }
 *     // Process valid form...
 *   }
 * }
 * ```
 *
 * @example
 * ```typescript
 * // Using with form arrays
 * export class DynamicFormComponent {
 *   form = this.fb.group({
 *     items: this.fb.array([
 *       this.fb.group({
 *         name: ['', Validators.required],
 *         quantity: [0, Validators.min(1)]
 *       })
 *     ])
 *   });
 *
 *   validateAll() {
 *     markFormDirty(this.form);
 *     // All invalid controls in the array will be marked
 *   }
 * }
 * ```
 *
 * @see {@link FormGroup} Angular reactive form group
 * @see {@link FormArray} Angular reactive form array
 * @see {@link validatedFormData} Function that uses this utility for validation
 */
export function markFormDirty(form: FormGroup): void {
    const markDirty = (form: FormGroup): void => {
        Object.keys(form.controls).forEach(field => {
            const control = form.get(field);
            if (control?.invalid) {
                control?.markAsDirty({ onlySelf: true });
                control?.markAsTouched({ onlySelf: true });
                control.updateValueAndValidity({ onlySelf: true });
            }

            if (control instanceof FormGroup) {
                markDirty(control);
            }

            if (control instanceof FormArray) {
                (control.controls as FormGroup[]).forEach((control: FormGroup) => {
                    markDirty(control);
                });
            }
        });
    };

    return markDirty(form);
}

/**
 * Removes null values from an object by deleting properties with null values
 *
 * This utility function creates a new object with all null properties removed.
 * It's particularly useful when working with form data where null values should
 * be omitted from API requests or when preparing data for processing that doesn't
 * handle null values well.
 *
 * The function performs a shallow copy of the object and removes any properties
 * that have null values. Properties with undefined values are preserved, as they
 * represent different semantic meaning (missing vs explicitly null).
 *
 * @template T - The type of the object being processed
 * @param obj - Object that may contain null values to be removed
 * @returns A new object with null properties removed
 *
 * @example
 * ```typescript
 * // Remove null values from form data
 * const formData = {
 *   name: 'John Doe',
 *   email: 'john@example.com',
 *   phone: null,
 *   address: null,
 *   age: 30
 * };
 *
 * const cleanData = replaceNulls(formData);
 * // Result: { name: 'John Doe', email: 'john@example.com', age: 30 }
 * ```
 *
 * @example
 * ```typescript
 * // Using with API request data
 * interface UserUpdate {
 *   name?: string | null;
 *   email?: string | null;
 *   phone?: string | null;
 * }
 *
 * const updateData: UserUpdate = {
 *   name: 'Jane Smith',
 *   email: null, // Don't update email
 *   phone: '555-1234'
 * };
 *
 * const apiPayload = replaceNulls(updateData);
 * // Result: { name: 'Jane Smith', phone: '555-1234' }
 * // API receives only the fields to update
 * ```
 *
 * @example
 * ```typescript
 * // Difference between null and undefined
 * const data = {
 *   field1: 'value',
 *   field2: null,      // Will be removed
 *   field3: undefined  // Will be preserved
 * };
 *
 * const result = replaceNulls(data);
 * // Result: { field1: 'value', field3: undefined }
 * ```
 *
 * @see {@link validatedFormData} Function that uses this utility to clean form data
 */
export function replaceNulls<T>(obj: { [K in keyof T]?: T[K] | null }): { [K in keyof T]?: T[K] } {
    const result = { ...obj };
    for (const key in result) {
        if (result[key] === null) {
            delete result[key];
        }
    }
    return result as { [K in keyof T]: T[K] };
}

/**
 * Validates a form and returns clean data if valid, or null if invalid
 *
 * This utility function combines form validation with data cleaning in a single operation.
 * It first marks all invalid controls as dirty (to show validation errors), then checks
 * if the form is valid. If valid, it returns the form data with null values removed.
 * If invalid, it returns null.
 *
 * This is particularly useful for form submission handlers where you want to:
 * 1. Show all validation errors if the form is invalid
 * 2. Get clean, validated data if the form is valid
 * 3. Handle both cases with a simple null check
 *
 * The function uses the DataFormGroup type to ensure type safety between the form
 * structure and the returned data type.
 *
 * @template T - The type of the data structure represented by the form
 * @param form - The DataFormGroup to validate and extract data from
 * @returns The validated and cleaned form data, or null if the form is invalid
 *
 * @example
 * ```typescript
 * // Basic form validation and submission
 * export class UserFormComponent {
 *   userForm: DataFormGroup<UserData> = this.fb.group({
 *     name: ['', Validators.required],
 *     email: ['', [Validators.required, Validators.email]],
 *     phone: [null], // Optional field
 *     age: [null, Validators.min(18)]
 *   });
 *
 *   onSubmit() {
 *     const validData = validatedFormData(this.userForm);
 *     if (validData) {
 *       // Form is valid, submit clean data
 *       this.userService.createUser(validData);
 *     } else {
 *       // Form is invalid, errors are now visible
 *       console.log('Please fix form errors');
 *     }
 *   }
 * }
 * ```
 *
 * @example
 * ```typescript
 * // Using with async operations
 * export class ProfileComponent {
 *   profileForm: DataFormGroup<ProfileUpdate> = this.fb.group({
 *     firstName: ['', Validators.required],
 *     lastName: ['', Validators.required],
 *     bio: [null], // Optional
 *     website: [null, Validators.pattern(/^https?:\/\/.+/)]
 *   });
 *
 *   async updateProfile() {
 *     const updateData = validatedFormData(this.profileForm);
 *     if (!updateData) {
 *       this.showErrorMessage('Please fix the form errors');
 *       return;
 *     }
 *
 *     try {
 *       await this.profileService.update(updateData);
 *       this.showSuccessMessage('Profile updated successfully');
 *     } catch (error) {
 *       this.showErrorMessage('Failed to update profile');
 *     }
 *   }
 * }
 * ```
 *
 * @example
 * ```typescript
 * // Type-safe form data extraction
 * interface ContactForm {
 *   name: string;
 *   email: string;
 *   message: string;
 *   newsletter?: boolean;
 * }
 *
 * const contactForm: DataFormGroup<ContactForm> = this.fb.group({
 *   name: ['', Validators.required],
 *   email: ['', [Validators.required, Validators.email]],
 *   message: ['', [Validators.required, Validators.minLength(10)]],
 *   newsletter: [null]
 * });
 *
 * const formData = validatedFormData(contactForm);
 * if (formData) {
 *   // TypeScript knows formData is ContactForm with null values removed
 *   console.log(formData.name); // string
 *   console.log(formData.email); // string
 *   console.log(formData.newsletter); // boolean | undefined (null was removed)
 * }
 * ```
 *
 * @see {@link DataFormGroup} Type-safe form group interface
 * @see {@link markFormDirty} Function used internally to mark invalid controls
 * @see {@link replaceNulls} Function used internally to clean the data
 */
export function validatedFormData<T>(form: DataFormGroup<T>): { [K in keyof T]: T[K] } | null {
    markFormDirty(form);

    if (form.invalid) return null;

    return replaceNulls(form.value) as { [K in keyof T]: T[K] };
}

/**
 * Creates a FormData object from a plain JavaScript object
 *
 * This utility function converts a plain object into a FormData object, which is
 * required for multipart/form-data HTTP requests, particularly when uploading files
 * or sending form data that includes binary content. The function handles different
 * data types appropriately, preserving file names for File objects and converting
 * other values to strings.
 *
 * The function is particularly useful when working with Angular forms that need to
 * submit both regular form fields and file uploads in a single request. It automatically
 * handles the conversion of various data types to the format expected by FormData.
 *
 * Key features:
 * - Preserves original file names for File objects
 * - Converts primitive values to strings
 * - Maintains type safety with generic constraints
 * - Handles Blob objects correctly
 * - Creates multipart/form-data compatible output
 *
 * @template T - Object type with string keys and values that can be converted to FormData
 * @param data - Object containing the data to convert to FormData
 * @returns A FormData object ready for HTTP submission
 *
 * @example
 * ```typescript
 * // Basic usage with mixed data types
 * const formData = createFormData({
 *   name: 'John Doe',
 *   age: 30,
 *   isActive: true,
 *   avatar: fileInput.files[0] // File object
 * });
 *
 * // Submit via HTTP
 * this.http.post('/api/users', formData).subscribe();
 * ```
 *
 * @example
 * ```typescript
 * // File upload with metadata
 * export class FileUploadComponent {
 *   onFileUpload(file: File, description: string, isPublic: boolean) {
 *     const uploadData = createFormData({
 *       file: file,
 *       description: description,
 *       isPublic: isPublic,
 *       uploadedAt: new Date().toISOString()
 *     });
 *
 *     this.fileService.upload(uploadData).subscribe({
 *       next: (response) => console.log('Upload successful'),
 *       error: (error) => console.error('Upload failed', error)
 *     });
 *   }
 * }
 * ```
 *
 * @example
 * ```typescript
 * // Using with form validation
 * export class ProfileFormComponent {
 *   profileForm = this.fb.group({
 *     name: ['', Validators.required],
 *     bio: [''],
 *     profilePicture: [null]
 *   });
 *
 *   onSubmit() {
 *     const formValue = validatedFormData(this.profileForm);
 *     if (!formValue) return;
 *
 *     // Convert to FormData for file upload
 *     const formData = createFormData({
 *       name: formValue.name,
 *       bio: formValue.bio || '',
 *       profilePicture: formValue.profilePicture,
 *       timestamp: Date.now()
 *     });
 *
 *     this.profileService.updateProfile(formData);
 *   }
 * }
 * ```
 *
 * @example
 * ```typescript
 * // Multiple file upload
 * interface UploadRequest {
 *   title: string;
 *   category: string;
 *   document: File;
 *   thumbnail: File;
 *   isPrivate: boolean;
 * }
 *
 * const uploadRequest: UploadRequest = {
 *   title: 'My Document',
 *   category: 'reports',
 *   document: documentFile,
 *   thumbnail: thumbnailFile,
 *   isPrivate: false
 * };
 *
 * const formData = createFormData(uploadRequest);
 * // FormData will contain:
 * // - title: "My Document"
 * // - category: "reports"
 * // - document: [File object with original name]
 * // - thumbnail: [File object with original name]
 * // - isPrivate: "false"
 * ```
 *
 * @see {@link FormData} Web API interface for form data
 * @see {@link File} Web API interface for file objects
 * @see {@link Blob} Web API interface for binary data
 * @see {@link validatedFormData} Function for getting validated form data to use with this utility
 */
export function createFormData<
    T extends {
        [key: string]: string | number | boolean | Blob;
    },
>(data: T): FormData {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
        if (value instanceof File) {
            formData.append(key, value, value.name);
        } else {
            formData.append(key, String(value));
        }
    });

    return formData;
}

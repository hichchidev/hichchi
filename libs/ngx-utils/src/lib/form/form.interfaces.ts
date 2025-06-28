import { FormControl, UntypedFormGroup } from "@angular/forms";

/**
 * Type representing the value structure of a type-safe form
 *
 * This type maps each property of the data type T to an optional property that can
 * be either the original type or null. This reflects how Angular forms handle values,
 * where form controls can have null values and some fields may be optional.
 *
 * The type is particularly useful when working with form.value in Angular reactive forms,
 * ensuring type safety while accounting for the possibility of null values that can
 * occur in form controls.
 *
 * @template T - The data type that the form represents
 *
 * @example
 * ```typescript
 * // Define the data structure
 * interface UserData {
 *   name: string;
 *   email: string;
 *   age: number;
 *   bio?: string;
 * }
 *
 * // The form values type will be:
 * type UserFormValues = DataFormValues<UserData>;
 * // Equivalent to:
 * // {
 * //   name?: string | null;
 * //   email?: string | null;
 * //   age?: number | null;
 * //   bio?: string | null;
 * // }
 * ```
 *
 * @example
 * ```typescript
 * // Using with form value extraction
 * export class UserFormComponent {
 *   userForm: DataFormGroup<UserData> = this.fb.group({
 *     name: ['', Validators.required],
 *     email: ['', Validators.required],
 *     age: [null, Validators.min(18)],
 *     bio: [null]
 *   });
 *
 *   getFormValues(): DataFormValues<UserData> {
 *     return this.userForm.value; // Type-safe access to form values
 *   }
 * }
 * ```
 *
 * @see {@link DataFormGroup} Interface that uses this type for form values
 * @see {@link DataFormControls} Related type for form controls structure
 * @see {@link validatedFormData} Function that works with this type
 */
export type DataFormValues<T> = {
    [K in keyof T]?: T[K] | null;
};

/**
 * Type representing the controls structure of a type-safe form
 *
 * This type maps each property of the data type T to a FormControl that can hold
 * either the original type or null. This ensures type safety when accessing form
 * controls while accounting for Angular's form control behavior where values can be null.
 *
 * The type is essential for creating strongly-typed reactive forms where each control
 * is properly typed according to the data structure it represents, providing compile-time
 * type checking and IntelliSense support.
 *
 * @template T - The data type that the form represents
 *
 * @example
 * ```typescript
 * // Define the data structure
 * interface ProductData {
 *   name: string;
 *   price: number;
 *   description: string;
 *   inStock: boolean;
 * }
 *
 * // The form controls type will be:
 * type ProductFormControls = DataFormControls<ProductData>;
 * // Equivalent to:
 * // {
 * //   name: FormControl<string | null>;
 * //   price: FormControl<number | null>;
 * //   description: FormControl<string | null>;
 * //   inStock: FormControl<boolean | null>;
 * // }
 * ```
 *
 * @example
 * ```typescript
 * // Using with form builder
 * export class ProductFormComponent {
 *   productForm: DataFormGroup<ProductData> = this.fb.group({
 *     name: ['', Validators.required],
 *     price: [null, [Validators.required, Validators.min(0)]],
 *     description: [''],
 *     inStock: [true]
 *   });
 *
 *   // Type-safe access to individual controls
 *   get nameControl(): FormControl<string | null> {
 *     return this.productForm.controls.name; // Fully typed
 *   }
 *
 *   get priceControl(): FormControl<number | null> {
 *     return this.productForm.controls.price; // Fully typed
 *   }
 * }
 * ```
 *
 * @see {@link DataFormGroup} Interface that uses this type for form controls
 * @see {@link DataFormValues} Related type for form values structure
 * @see {@link FormControl} Angular's FormControl class
 */
export type DataFormControls<T> = {
    [K in keyof T]: FormControl<T[K] | null>;
};

/**
 * Interface for a type-safe Angular reactive form group
 *
 * This interface extends Angular's UntypedFormGroup to provide strong typing for both
 * form controls and form values. It ensures that the form structure matches the data
 * type it represents, providing compile-time type safety and better developer experience.
 *
 * The interface bridges the gap between Angular's form system and TypeScript's type
 * system, allowing developers to work with forms in a type-safe manner while maintaining
 * compatibility with Angular's reactive forms API.
 *
 * Key benefits:
 * - Type-safe access to form controls
 * - Type-safe access to form values
 * - IntelliSense support for form properties
 * - Compile-time error detection for form structure mismatches
 * - Seamless integration with form utility functions
 *
 * @template T - The data type that the form represents
 *
 * @example
 * ```typescript
 * // Define the data structure
 * interface ContactForm {
 *   firstName: string;
 *   lastName: string;
 *   email: string;
 *   phone?: string;
 *   message: string;
 * }
 *
 * // Create a type-safe form
 * export class ContactComponent {
 *   contactForm: DataFormGroup<ContactForm> = this.fb.group({
 *     firstName: ['', Validators.required],
 *     lastName: ['', Validators.required],
 *     email: ['', [Validators.required, Validators.email]],
 *     phone: [null],
 *     message: ['', [Validators.required, Validators.minLength(10)]]
 *   });
 *
 *   onSubmit() {
 *     // Type-safe form validation and data extraction
 *     const formData = validatedFormData(this.contactForm);
 *     if (formData) {
 *       // formData is properly typed as ContactForm
 *       this.contactService.sendMessage(formData);
 *     }
 *   }
 * }
 * ```
 *
 * @example
 * ```typescript
 * // Advanced usage with nested forms
 * interface UserProfile {
 *   personal: {
 *     firstName: string;
 *     lastName: string;
 *     birthDate: Date;
 *   };
 *   contact: {
 *     email: string;
 *     phone: string;
 *   };
 *   preferences: {
 *     newsletter: boolean;
 *     notifications: boolean;
 *   };
 * }
 *
 * export class ProfileComponent {
 *   profileForm: DataFormGroup<UserProfile> = this.fb.group({
 *     personal: this.fb.group({
 *       firstName: ['', Validators.required],
 *       lastName: ['', Validators.required],
 *       birthDate: [null, Validators.required]
 *     }),
 *     contact: this.fb.group({
 *       email: ['', [Validators.required, Validators.email]],
 *       phone: ['', Validators.required]
 *     }),
 *     preferences: this.fb.group({
 *       newsletter: [false],
 *       notifications: [true]
 *     })
 *   });
 *
 *   // Type-safe access to nested controls
 *   get emailControl() {
 *     return this.profileForm.controls.contact.controls.email;
 *   }
 * }
 * ```
 *
 * @example
 * ```typescript
 * // Using with dynamic forms
 * interface DynamicField {
 *   id: string;
 *   label: string;
 *   value: string;
 *   required: boolean;
 * }
 *
 * export class DynamicFormComponent {
 *   dynamicForm: DataFormGroup<Record<string, string>> = this.fb.group({});
 *
 *   addField(field: DynamicField) {
 *     const validators = field.required ? [Validators.required] : [];
 *     this.dynamicForm.addControl(
 *       field.id,
 *       new FormControl(field.value, validators)
 *     );
 *   }
 *
 *   getFormData() {
 *     return validatedFormData(this.dynamicForm);
 *   }
 * }
 * ```
 *
 * @see {@link DataFormValues} Type for form values structure
 * @see {@link DataFormControls} Type for form controls structure
 * @see {@link UntypedFormGroup} Angular's base form group class
 * @see {@link validatedFormData} Function for extracting validated form data
 * @see {@link markFormDirty} Function for marking form controls as dirty
 */
export interface DataFormGroup<T> extends UntypedFormGroup {
    controls: DataFormControls<T>;
    value: DataFormValues<T>;
}

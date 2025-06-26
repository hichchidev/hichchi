// noinspection JSUnusedGlobalSymbols

import { FormArray, FormGroup } from "@angular/forms";
import { DataFormGroup } from "./form.interfaces";

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

export function replaceNulls<T>(obj: { [K in keyof T]?: T[K] | null }): { [K in keyof T]?: T[K] } {
    const result = { ...obj };
    for (const key in result) {
        if (result[key] === null) {
            delete result[key];
        }
    }
    return result as { [K in keyof T]: T[K] };
}

export function validatedFormData<T>(form: DataFormGroup<T>): { [K in keyof T]: T[K] } | null {
    markFormDirty(form);

    if (form.invalid) return null;

    return replaceNulls(form.value) as { [K in keyof T]: T[K] };
}

/**
 * Create a FormData object from an object.
 * @param data {object} - Object to convert to FormData.
 * @returns {FormData} - FormData object.
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

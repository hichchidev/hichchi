import { FormControl, UntypedFormGroup } from "@angular/forms";

export type DataFormValues<T> = {
    [K in keyof T]?: T[K] | null;
};

export type DataFormControls<T> = {
    [K in keyof T]: FormControl<T[K] | null>;
};

export interface DataFormGroup<T> extends UntypedFormGroup {
    controls: DataFormControls<T>;
    value: DataFormValues<T>;
}

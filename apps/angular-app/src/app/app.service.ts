import { inject, Injectable } from "@angular/core";
import { NavigationExtras, Router } from "@angular/router";
import { IndividualConfig, ToastrService } from "ngx-toastr";

@Injectable({
    providedIn: "root",
})
/**
 * App-level service for shared UI or startup concerns.
 */
export class AppService {
    private readonly router = inject(Router);

    private readonly toast = inject(ToastrService);

    toastConfig: Partial<IndividualConfig> = { positionClass: "toast-top-right", timeOut: 5000000 };

    public load(path: string | string[]): void;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public load(commands: any | any[], options: NavigationExtras): void;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public load(commands: any | any[], options?: NavigationExtras): void {
        if (options || typeof commands !== "string") {
            // eslint-disable-next-line no-void,@typescript-eslint/no-unsafe-argument
            void this.router.navigate(commands, options).then();
        } else {
            // eslint-disable-next-line no-void
            void this.router.navigateByUrl(commands).then();
        }
    }

    public success(message: string): void {
        this.toast.success(message, undefined, this.toastConfig);
    }

    public info(message: string): void {
        this.toast.info(message, undefined, this.toastConfig);
    }

    public error(message: string): void {
        this.toast.error(message, undefined, this.toastConfig);
    }

    public warning(message: string): void {
        this.toast.warning(message, undefined, this.toastConfig);
    }
}

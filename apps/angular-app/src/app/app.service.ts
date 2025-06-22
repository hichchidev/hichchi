import { Injectable } from "@angular/core";
import { NavigationExtras, Router } from "@angular/router";

@Injectable({
    providedIn: "root",
})
export class AppService {
    constructor(private readonly router: Router) {}

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
}

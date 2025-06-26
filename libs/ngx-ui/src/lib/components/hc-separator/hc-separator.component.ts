import { Component, input, InputSignal } from "@angular/core";

@Component({
    selector: "hc-separator",
    imports: [],
    templateUrl: "./hc-separator.component.html",
    styleUrl: "./hc-separator.component.scss",
})
export class HcSeparatorComponent {
    label: InputSignal<string> = input<string>("");
}

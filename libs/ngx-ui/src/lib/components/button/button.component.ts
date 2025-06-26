import { Component, input, InputSignal, output, OutputEmitterRef } from "@angular/core";
import { ButtonType, HcColor } from "../../types";

@Component({
    selector: "hc-button",
    imports: [],
    templateUrl: "./button.component.html",
    styleUrl: "./button.component.scss",
})
export class ButtonComponent {
    color: InputSignal<HcColor> = input<HcColor>("primary");

    class: InputSignal<string> = input<string>("");

    type: InputSignal<ButtonType> = input<ButtonType>("submit");

    // eslint-disable-next-line @angular-eslint/no-output-on-prefix
    onClick: OutputEmitterRef<MouseEvent> = output<MouseEvent>();
}

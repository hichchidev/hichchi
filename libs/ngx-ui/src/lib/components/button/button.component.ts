import { Component, input, InputSignal, output, OutputEmitterRef } from "@angular/core";
import { ButtonType, HcColor } from "../../types";

/**
 * Reusable button component for the Hichchi UI library
 *
 * This component provides a customizable button with consistent styling and behavior
 * across the application. It supports different colors, types, and custom CSS classes
 * while maintaining accessibility and user experience standards.
 *
 * The component uses Angular's new signal-based inputs and outputs for better
 * performance and reactivity.
 *
 * @example
 * ```html
 * <!-- Basic button -->
 * <hc-button>Click me</hc-button>
 * ```
 *
 * @example
 * ```html
 * <!-- Button with custom color and type -->
 * <hc-button
 *   [color]="'secondary'"
 *   [type]="'button'"
 *   (onClick)="handleClick($event)">
 *   Submit Form
 * </hc-button>
 * ```
 *
 * @example
 * ```html
 * <!-- Button with custom CSS classes -->
 * <hc-button
 *   [class]="'my-custom-class another-class'"
 *   [color]="'danger'">
 *   Delete Item
 * </hc-button>
 * ```
 *
 * @see {@link HcColor} Type defining available color options
 * @see {@link ButtonType} Type defining available button types
 */
@Component({
    selector: "hc-button",
    imports: [],
    templateUrl: "./button.component.html",
    styleUrl: "./button.component.scss",
})
export class ButtonComponent {
    /**
     * The color theme of the button
     *
     * Determines the visual appearance of the button based on predefined color schemes.
     * Each color represents a different semantic meaning (primary for main actions,
     * secondary for alternative actions, danger for destructive actions, etc.).
     *
     * @default "primary"
     */
    color: InputSignal<HcColor> = input<HcColor>("primary");

    /**
     * Additional CSS classes to apply to the button
     *
     * Allows for custom styling by adding extra CSS classes to the button element.
     * Multiple classes can be specified as a space-separated string.
     *
     * @default ""
     */
    class: InputSignal<string> = input<string>("");

    /**
     * The HTML button type attribute
     *
     * Specifies the behavior of the button when used within forms.
     * - "submit": Submits the form (default)
     * - "button": Regular button with no default behavior
     * - "reset": Resets the form to its initial state
     *
     * @default "submit"
     */
    type: InputSignal<ButtonType> = input<ButtonType>("submit");

    /**
     * Event emitted when the button is clicked
     *
     * Emits the native MouseEvent when the user clicks the button, allowing
     * parent components to handle the click interaction. The event contains
     * information about the click such as coordinates, modifier keys, etc.
     *
     * @example
     * ```typescript
     * handleButtonClick(event: MouseEvent) {
     *   console.log('Button clicked at:', event.clientX, event.clientY);
     *   // Handle the click event
     * }
     * ```
     */
    // eslint-disable-next-line @angular-eslint/no-output-on-prefix
    onClick: OutputEmitterRef<MouseEvent> = output<MouseEvent>();
}

import { Component, input, InputSignal } from "@angular/core";

/**
 * Reusable separator component for the Hichchi UI library
 *
 * This component provides a visual separator element that can be used to divide
 * content sections within a page or form. It supports an optional label that can
 * be displayed within or alongside the separator line.
 *
 * Separators are useful for creating visual breaks between different sections of
 * content, improving readability and organization of the user interface.
 *
 * @example
 * ```html
 * <!-- Basic separator without label -->
 * <hc-separator></hc-separator>
 * ```
 *
 * @example
 * ```html
 * <!-- Separator with label -->
 * <hc-separator [label]="'Personal Information'"></hc-separator>
 * ```
 *
 * @example
 * ```html
 * <!-- Using separator in a form -->
 * <form>
 *   <input type="text" placeholder="First Name">
 *   <input type="text" placeholder="Last Name">
 *
 *   <hc-separator [label]="'Contact Details'"></hc-separator>
 *
 *   <input type="email" placeholder="Email">
 *   <input type="tel" placeholder="Phone">
 * </form>
 * ```
 *
 * @example
 * ```html
 * <!-- Using separator between content sections -->
 * <div>
 *   <h2>Section 1</h2>
 *   <p>Content for section 1...</p>
 *
 *   <hc-separator [label]="'OR'"></hc-separator>
 *
 *   <h2>Section 2</h2>
 *   <p>Content for section 2...</p>
 * </div>
 * ```
 */
@Component({
    selector: "hc-separator",
    imports: [],
    templateUrl: "./hc-separator.component.html",
    styleUrl: "./hc-separator.component.scss",
})
export class HcSeparatorComponent {
    /**
     * Optional label text to display with the separator
     *
     * When provided, this text will be displayed as part of the separator,
     * typically centered within or alongside the separator line. This is useful
     * for creating labeled dividers that help organize content sections.
     *
     * @default ""
     */
    label: InputSignal<string> = input<string>("");
}

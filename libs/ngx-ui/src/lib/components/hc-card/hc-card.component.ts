import { Component } from "@angular/core";

/**
 * Reusable card component for the Hichchi UI library
 *
 * This component provides a container with consistent card styling that can be used
 * to group related content together. Cards are commonly used for displaying information
 * in a structured, visually appealing way with proper spacing, borders, and shadows.
 *
 * The component acts as a content wrapper and uses Angular's content projection
 * to display any content passed between the opening and closing tags.
 *
 * @example
 * ```html
 * <!-- Basic card -->
 * <hc-card>
 *   <h3>Card Title</h3>
 *   <p>This is some card content.</p>
 * </hc-card>
 * ```
 *
 * @example
 * ```html
 * <!-- Card with form content -->
 * <hc-card>
 *   <form>
 *     <input type="text" placeholder="Enter your name">
 *     <hc-button type="submit">Submit</hc-button>
 *   </form>
 * </hc-card>
 * ```
 *
 * @example
 * ```html
 * <!-- Card with mixed content -->
 * <hc-card>
 *   <div class="card-header">
 *     <h2>User Profile</h2>
 *   </div>
 *   <div class="card-body">
 *     <p>User information goes here...</p>
 *   </div>
 *   <div class="card-footer">
 *     <hc-button>Edit Profile</hc-button>
 *   </div>
 * </hc-card>
 * ```
 *
 * @see {@link ButtonComponent} Related button component often used within cards
 */
@Component({
    selector: "hc-card",
    imports: [],
    templateUrl: "./hc-card.component.html",
    styleUrl: "./hc-card.component.scss",
})
export class HcCardComponent {}

// noinspection JSUnusedGlobalSymbols

/**
 * Determines if an HTML element is scrollable
 *
 * This utility function checks whether an HTML element has scrollable content by examining
 * its computed CSS overflow-y property and comparing its scroll height to its client height.
 * An element is considered scrollable if it has overflow set to 'scroll' or 'auto' and
 * its content exceeds the visible area.
 *
 * This is useful for implementing scroll-related functionality, such as infinite scrolling,
 * scroll position tracking, or determining whether scroll indicators should be shown.
 *
 * @param el - The HTML element to check for scrollability
 * @returns True if the element is scrollable, false otherwise
 *
 * @example
 * ```typescript
 * // Check if a container element is scrollable
 * const container = document.getElementById('content-container');
 * if (container && isScrollable(container)) {
 *   console.log('Container has scrollable content');
 *   // Add scroll event listeners or show scroll indicators
 * }
 * ```
 *
 * @example
 * ```typescript
 * // Use in a component to conditionally show scroll indicators
 * @Component({
 *   selector: 'app-scrollable-content',
 *   template: `
 *     <div #contentContainer class="content">
 *       <!-- content -->
 *     </div>
 *     <div *ngIf="showScrollIndicator" class="scroll-indicator">
 *       Scroll for more content
 *     </div>
 *   `
 * })
 * export class ScrollableContentComponent implements AfterViewInit {
 *   @ViewChild('contentContainer') contentContainer!: ElementRef<HTMLElement>;
 *   showScrollIndicator = false;
 *
 *   ngAfterViewInit() {
 *     this.showScrollIndicator = isScrollable(this.contentContainer.nativeElement);
 *   }
 * }
 * ```
 *
 * @example
 * ```typescript
 * // Check multiple elements for scrollability
 * const elements = document.querySelectorAll('.potential-scroll-container');
 * const scrollableElements = Array.from(elements)
 *   .filter(el => isScrollable(el as HTMLElement));
 *
 * console.log(`Found ${scrollableElements.length} scrollable elements`);
 * ```
 *
 * @see {@link getClosestScrollableElement} Function to find the nearest scrollable ancestor
 * @see {@link isElementInView} Function to check if an element is visible within a container
 */
export function isScrollable(el: HTMLElement): boolean {
    const overflowY = window.getComputedStyle(el).overflowY;
    return (overflowY === "scroll" || overflowY === "auto") && el.scrollHeight > el.clientHeight;
}

/**
 * Determines if an element is fully visible within a container element
 *
 * This utility function checks whether a target element is completely visible within
 * the bounds of a container element. It compares the bounding rectangles of both
 * elements and optionally applies a threshold for more flexible visibility detection.
 *
 * This is particularly useful for implementing features like:
 * - Lazy loading of content when elements come into view
 * - Scroll-based animations and transitions
 * - Virtual scrolling implementations
 * - Accessibility features that track visible content
 *
 * @param el - The target element to check for visibility
 * @param container - The container element that defines the visible area
 * @param threshold - Optional threshold in pixels for more flexible visibility detection (default: 0)
 * @returns True if the element is fully visible within the container, false otherwise
 *
 * @example
 * ```typescript
 * // Check if a list item is visible in a scrollable container
 * const listItem = document.querySelector('.list-item');
 * const scrollContainer = document.querySelector('.scroll-container');
 *
 * if (listItem && scrollContainer && isElementInView(listItem, scrollContainer)) {
 *   console.log('List item is fully visible');
 *   // Trigger animations or load additional content
 * }
 * ```
 *
 * @example
 * ```typescript
 * // Use with a threshold for partial visibility detection
 * const image = document.querySelector('.lazy-image');
 * const viewport = document.querySelector('.viewport');
 *
 * // Check if image is visible with 50px threshold
 * if (image && viewport && isElementInView(image, viewport, 50)) {
 *   // Load the image when it's within 50px of being visible
 *   loadImage(image);
 * }
 * ```
 *
 * @example
 * ```typescript
 * // Implement scroll-based visibility tracking in Angular
 * @Component({
 *   selector: 'app-scroll-tracker',
 *   template: `
 *     <div #container class="scroll-container" (scroll)="onScroll()">
 *       <div #item *ngFor="let item of items; trackBy: trackByFn"
 *            class="scroll-item"
 *            [class.visible]="item.isVisible">
 *         {{ item.content }}
 *       </div>
 *     </div>
 *   `
 * })
 * export class ScrollTrackerComponent {
 *   @ViewChild('container') container!: ElementRef<HTMLElement>;
 *   @ViewChildren('item') itemElements!: QueryList<ElementRef<HTMLElement>>;
 *
 *   items = [
 *     { id: 1, content: 'Item 1', isVisible: false },
 *     { id: 2, content: 'Item 2', isVisible: false },
 *     // ... more items
 *   ];
 *
 *   onScroll() {
 *     this.itemElements.forEach((itemRef, index) => {
 *       this.items[index].isVisible = isElementInView(
 *         itemRef.nativeElement,
 *         this.container.nativeElement,
 *         20 // 20px threshold
 *       );
 *     });
 *   }
 * }
 * ```
 *
 * @see {@link isScrollable} Function to check if an element is scrollable
 * @see {@link getClosestScrollableElement} Function to find the nearest scrollable ancestor
 * @see {@link getBoundingClientRect} DOM method used internally for position calculation
 */
export function isElementInView(el: HTMLElement, container: HTMLElement, threshold = 0): boolean {
    const elRect = el.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();
    return elRect.top >= containerRect.top + threshold && elRect.bottom <= containerRect.bottom - threshold;
}

/**
 * Finds the closest scrollable ancestor element in the DOM tree
 *
 * This utility function traverses up the DOM tree from a given element to find the
 * nearest ancestor that is scrollable. It uses the isScrollable function to determine
 * scrollability and returns the first scrollable parent element found.
 *
 * This is useful for implementing scroll-related functionality that needs to work
 * with the appropriate scrollable container, such as:
 * - Implementing custom scroll behaviors
 * - Adding scroll event listeners to the correct container
 * - Calculating scroll positions relative to the scrollable parent
 * - Implementing scroll-to-element functionality
 *
 * @param el - The starting HTML element to search from
 * @returns The closest scrollable ancestor element, or null if none is found
 *
 * @example
 * ```typescript
 * // Find the scrollable container for a specific element
 * const targetElement = document.querySelector('.target-element');
 * if (targetElement) {
 *   const scrollableParent = getClosestScrollableElement(targetElement);
 *
 *   if (scrollableParent) {
 *     console.log('Found scrollable parent:', scrollableParent);
 *     // Add scroll event listener to the correct container
 *     scrollableParent.addEventListener('scroll', handleScroll);
 *   } else {
 *     console.log('No scrollable parent found');
 *   }
 * }
 * ```
 *
 * @example
 * ```typescript
 * // Implement scroll-to-element functionality
 * function scrollToElement(element: HTMLElement, behavior: ScrollBehavior = 'smooth') {
 *   const scrollableContainer = getClosestScrollableElement(element);
 *
 *   if (scrollableContainer) {
 *     // Calculate the position relative to the scrollable container
 *     const containerRect = scrollableContainer.getBoundingClientRect();
 *     const elementRect = element.getBoundingClientRect();
 *     const relativeTop = elementRect.top - containerRect.top + scrollableContainer.scrollTop;
 *
 *     scrollableContainer.scrollTo({
 *       top: relativeTop,
 *       behavior
 *     });
 *   } else {
 *     // Fallback to window scroll
 *     element.scrollIntoView({ behavior });
 *   }
 * }
 * ```
 *
 * @example
 * ```typescript
 * // Use in Angular directive for scroll-based functionality
 * @Directive({
 *   selector: '[appScrollSpy]'
 * })
 * export class ScrollSpyDirective implements OnInit, OnDestroy {
 *   private scrollContainer: HTMLElement | null = null;
 *   private scrollListener?: () => void;
 *
 *   constructor(private elementRef: ElementRef<HTMLElement>) {}
 *
 *   ngOnInit() {
 *     this.scrollContainer = getClosestScrollableElement(this.elementRef.nativeElement);
 *
 *     if (this.scrollContainer) {
 *       this.scrollListener = () => this.onScroll();
 *       this.scrollContainer.addEventListener('scroll', this.scrollListener);
 *     }
 *   }
 *
 *   ngOnDestroy() {
 *     if (this.scrollContainer && this.scrollListener) {
 *       this.scrollContainer.removeEventListener('scroll', this.scrollListener);
 *     }
 *   }
 *
 *   private onScroll() {
 *     // Implement scroll spy logic
 *     if (this.scrollContainer && isElementInView(this.elementRef.nativeElement, this.scrollContainer)) {
 *       // Element is in view
 *       console.log('Element is visible in scroll container');
 *     }
 *   }
 * }
 * ```
 *
 * @see {@link isScrollable} Function used internally to determine scrollability
 * @see {@link isElementInView} Function that can be used with the returned scrollable element
 * @see {@link HTMLElement.parentElement} DOM property used for tree traversal
 */
export function getClosestScrollableElement(el: HTMLElement): HTMLElement | null {
    while (el) {
        if (isScrollable(el)) {
            return el;
        }

        // eslint-disable-next-line no-param-reassign
        el = el.parentElement as HTMLElement;
    }
    return null;
}

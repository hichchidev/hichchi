// noinspection JSUnusedGlobalSymbols

export function isScrollable(el: HTMLElement): boolean {
    const overflowY = window.getComputedStyle(el).overflowY;
    return (overflowY === "scroll" || overflowY === "auto") && el.scrollHeight > el.clientHeight;
}

export function isElementInView(el: HTMLElement, container: HTMLElement, threshold = 0): boolean {
    const elRect = el.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();
    return elRect.top >= containerRect.top + threshold && elRect.bottom <= containerRect.bottom - threshold;
}

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

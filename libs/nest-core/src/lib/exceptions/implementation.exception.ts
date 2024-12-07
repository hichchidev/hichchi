export class ImplementationException extends Error {
    constructor(
        public heading: string,
        public override message: string,
        public description?: string,
    ) {
        super(message);
        this.stack = `${this.heading}\n\n    ${this.message}\n\n${this.description ? `    ${this.description}` : ""}`;
    }
}

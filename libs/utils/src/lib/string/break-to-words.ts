/**
 * Break a string into words.<br>
 * This function will break any of below to words into `['hello', 'world']`<br>
 * `HELLO_WORLD`<br>
 * `Hello_World`<br>
 * `hello_world`<br>
 * `Hello_world`<br>
 * `hello_World`<br>
 * `HelloWorld`<br>
 * `helloWorld`<br>
 * `Hello-World`<br>
 * `hello-world`<br>
 * `hello world`<br>
 * `Hello World`<br>
 * `HELLO WORLD`<br>
 * @example <em>`['hello', 'world']`</em>.
 * @param str - String to break into words.
 * @returns - Array of words.
 */
export const breakToWords = (str?: string): string[] => {
    if (!str) {
        return [];
    }
    try {
        return (
            str
                .match(/[A-Z]{2,}(?=[A-Z][a-z]+\d*|\b)|[A-Z]?[a-z]+\d*|[A-Z]+|\d+/g)
                ?.map((s: string) => s.toLowerCase()) ?? []
        );
    } catch {
        return [];
    }
};

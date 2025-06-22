module.exports = {
    "no-magic-strings": {
        create(context) {
            // noinspection JSUnusedGlobalSymbols
            return {
                Literal(node) {
                    if (
                        typeof node.value === "string" &&
                        node.value.length > 2 &&
                        !node.parent.type.includes("ImportDeclaration") &&
                        !node.parent.type.includes("ExportDeclaration")
                    ) {
                        context.report({
                            node,
                            message: "Avoid magic strings. Use constants instead.",
                        });
                    }
                },
            };
        },
    },
};

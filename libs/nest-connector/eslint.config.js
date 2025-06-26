const baseConfig = require("../../eslint.config.js");

module.exports = [
    ...baseConfig,
    {
        files: ["**/*.json"],
        rules: {
            "@nx/dependency-checks": [
                "error",
                {
                    ignoredFiles: ["{projectRoot}/eslint.config.{js,cjs,mjs}"],
                },
            ],
            "local-rules/no-magic-strings": "warn",
        },
        languageOptions: {
            parser: require("jsonc-eslint-parser"),
        },
    },
];

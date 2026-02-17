const { NxAppWebpackPlugin } = require("@nx/webpack/app-plugin");
const { join } = require("path");

module.exports = {
    output: {
        path: join(__dirname, "../../dist/apps/nest-app"),
    },
    plugins: [
        new NxAppWebpackPlugin({
            target: "node",
            compiler: "tsc",
            main: "./src/main.ts",
            tsConfig: "./tsconfig.app.json",
            assets: ["./src/assets"],
            optimization: false,
            outputHashing: "none",
            generatePackageJson: true,
        }),
    ],
    ignoreWarnings: [
        // Ignore all warnings about exports not found (type-only imports)
        {
            message: /export '.*' \(imported as '.*'\) was not found/
        }
    ]
};

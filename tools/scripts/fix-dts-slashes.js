const fs = require("fs");
const path = require("path");

const libName = process.argv[2];

if (!libName) {
    console.error("Usage: node fix-dts-slashes.js <lib-name>");
    process.exit(1);
}

const distDir = path.resolve(__dirname, `../../dist/libs/${libName}`);

if (!fs.existsSync(distDir)) {
    console.error(`Error: Directory does not exist: ${distDir}`);
    process.exit(1);
}

// Matches import/export statements with a path string (e.g., from '..\\something')
const importExportRegex = /^\s*(import|export)[^'"]+['"](.+?)['"]/;

function fixSlashes(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);

        if (entry.isDirectory()) {
            fixSlashes(fullPath);
        } else if (entry.isFile() && entry.name.endsWith(".d.ts")) {
            const lines = fs.readFileSync(fullPath, "utf8").split("\n");
            let changed = false;

            const fixedLines = lines.map(line => {
                const match = line.match(importExportRegex);
                if (match) {
                    const originalPath = match[2];
                    const fixedPath = originalPath.replace(/\\\\/g, "/");
                    if (fixedPath !== originalPath) {
                        changed = true;
                        return line.replace(originalPath, fixedPath);
                    }
                }
                return line;
            });

            if (changed) {
                fs.writeFileSync(fullPath, fixedLines.join("\n"), "utf8");
                console.log(`Fixed slashes in: ${fullPath}`);
            }
        }
    }
}

fixSlashes(distDir);
console.log(`Finished fixing .d.ts slashes for lib "${libName}".`);

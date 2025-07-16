const fs = require("fs");
const path = require("path");

/**
 * Removes the typedoc-generated header from README files
 * Pattern to remove: **@hichchi/<lib>**\n\n---\n\n
 */
function removeTypedocHeader(filePath) {
    try {
        // Read the file content
        const content = fs.readFileSync(filePath, "utf8");

        // Pattern to match: **@hichchi/<lib>** followed by empty line and ---
        // This regex matches the pattern at the beginning of the file
        const pattern = /^\*\*@hichchi\/[^*]+\*\*\s*\n\s*---\s*\n\s*/;

        // Check if the pattern exists
        if (pattern.test(content)) {
            // Remove the pattern
            const cleanedContent = content.replace(pattern, "");

            // Write the cleaned content back to the file
            fs.writeFileSync(filePath, cleanedContent, "utf8");

            console.log(`✅ Removed typedoc header from: ${filePath}`);
            return true;
        } else {
            console.log(`ℹ️  No typedoc header found in: ${filePath}`);
            return false;
        }
    } catch (error) {
        console.error(`❌ Error processing ${filePath}:`, error.message);
        return false;
    }
}

/**
 * Process a single library directory
 */
function processLibrary(libPath) {
    const readmePath = path.join(libPath, "README.md");

    if (fs.existsSync(readmePath)) {
        console.log(`\n📂 Processing library: ${path.basename(libPath)}`);
        return removeTypedocHeader(readmePath);
    } else {
        console.log(`⚠️  README.md not found in: ${libPath}`);
        return false;
    }
}

/**
 * Process all libraries in the libs directory
 */
function processAllLibraries() {
    const libsDir = path.join(__dirname, "libs");

    if (!fs.existsSync(libsDir)) {
        console.error("❌ libs directory not found");
        process.exit(1);
    }

    const libraries = fs
        .readdirSync(libsDir, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name);

    console.log(`🔍 Found ${libraries.length} libraries: ${libraries.join(", ")}`);

    let processedCount = 0;
    let modifiedCount = 0;

    libraries.forEach(lib => {
        const libPath = path.join(libsDir, lib);
        processedCount++;

        if (processLibrary(libPath)) {
            modifiedCount++;
        }
    });

    console.log(`\n📊 Summary:`);
    console.log(`   Libraries processed: ${processedCount}`);
    console.log(`   Files modified: ${modifiedCount}`);
}

/**
 * Main function
 */
function main() {
    const args = process.argv.slice(2);

    console.log("🧹 TypeDoc Header Remover");
    console.log("========================");

    if (args.length === 0) {
        // Process all libraries
        console.log("🔄 Processing all libraries...");
        processAllLibraries();
    } else if (args.length === 1) {
        // Process specific library
        const libName = args[0];
        const libPath = path.join(__dirname, "libs", libName);

        console.log(`🔄 Processing specific library: ${libName}`);

        if (!fs.existsSync(libPath)) {
            console.error(`❌ Library directory not found: ${libPath}`);
            process.exit(1);
        }

        processLibrary(libPath);
    } else {
        console.log("Usage:");
        console.log("  node remove-typedoc-header.js              # Process all libraries");
        console.log("  node remove-typedoc-header.js <lib-name>   # Process specific library");
        process.exit(1);
    }
}

// Run the script
main();

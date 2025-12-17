
const fs = require('fs');
const path = require('path');

const TARGET_DIRS = [
    'd:/Projects/ReLab/ui/registry',
    'd:/Projects/ReLab/ui/examples/playground/src',
    'd:/Projects/ReLab/ui/examples/my-app'
];

const EXTENSIONS = ['.tsx', '.ts'];

function processFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    let changed = false;

    // Regex to find "lucide-react" imports
    // import { X, Check } from "lucide-react"
    const importRegex = /import\s+\{\s*([^}]+)\s*\}\s+from\s+["']lucide-react["']/;

    if (importRegex.test(content)) {
        content = content.replace(importRegex, (match, imports) => {
            const iconNames = imports.split(',').map(s => s.trim()).filter(s => s);
            const newImports = iconNames.map(name => {
                const newName = `Lu${name}`;
                return `${newName}`;
            }).join(', ');

            changed = true;
            return `import { ${newImports} } from "react-icons/lu"`;
        });

        // Now replace usages
        // <Check className... /> -> <LuCheck className... />
        // We need to parse the original imports again or capture them better?
        // Actually, since I replaced the import line, I should have kept the mapping.
        // Let's redo the logic to be safer.
    }

    // Safer approach:
    // 1. Find the import line
    // 2. Extract names
    // 3. Create mapping: Name -> LuName
    // 4. Replace import line
    // 5. Replace usages in the whole string

    const match = content.match(/import\s+\{\s*([^}]+)\s*\}\s+from\s+["']lucide-react["']/);
    if (match) {
        const importStatement = match[0];
        const importsStr = match[1];
        const iconNames = importsStr.split(',').map(s => s.trim()).filter(s => s);

        const newImportNames = iconNames.map(name => `Lu${name}`);
        const newImportStatement = `import { ${newImportNames.join(', ')} } from "react-icons/lu"`;

        content = content.replace(importStatement, newImportStatement);

        iconNames.forEach(name => {
            // Replace <Name with <LuName
            // Use regex with word boundary to avoid partial matches
            // e.g. <Check should match, but CheckBox shouldn't if Check is not imported?
            // But we know 'name' comes from lucide import.
            // Replace usages like <Icon /> or Icon in code
            // We need to be careful about not replacing property keys if they happen to match?
            // But component usage is usually <MyIcon or MyIcon

            // Regex for JSX usage
            const jsxRegex = new RegExp(`<${name}(\\s|>)`, 'g');
            content = content.replace(jsxRegex, `<Lu${name}$1`);

            // Regex for usage as identifier (e.g. icon={Check})
            // This is tricky. simpler to assume identifiers are used as values.
            // We can look for word boundaries.
            // \bCheck\b -> LuCheck
            // avoiding the one we just wrote in the import (LuCheck contains Check?) No, LuCheck doesn't match \bCheck\b.
            // But we already replaced the import statement.

            const identRegex = new RegExp(`\\b${name}\\b`, 'g');
            content = content.replace(identRegex, `Lu${name}`);
        });

        // Wait, if I replace all identifiers \bCheck\b with LuCheck, it will also replace
        // <LuCheck /> (which was <Check />) -> But <LuCheck> has "LuCheck" which doesn't match \bCheck\b.
        // However, if I did step 4 first (replace import), then import has LuCheck.
        // If I replace <Check first, then import...

        // Let's refine:
        // 1. Get mapping.
        // 2. Replace usages first.
        // 3. Replace import statement last.
    }

    return { changed, content };
}

// Redefining processFile with better logic
function processFilerefined(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    const originalContent = content;

    // Find import
    const importRegex = /import\s+\{\s*([^}]+)\s*\}\s+from\s+["']lucide-react["']/;
    const match = content.match(importRegex);

    if (!match) return; // No lucide import

    const importStatement = match[0];
    const importsStr = match[1];

    // Handle aliases if any? e.g. { Check as CheckIcon }
    // Complexity? For now assume simple imports as per codebase analysis.

    const imports = importsStr.split(',').map(s => s.trim()).filter(s => s);
    const replacements = new Map();

    imports.forEach(imp => {
        // Check for alias "Original as Alias"
        const parts = imp.split(/\s+as\s+/);
        if (parts.length === 2) {
            // Alias case
            replacements.set(parts[1], `Lu${parts[0]}`); // Use alias name? No, usually we want LuOriginal.
            // But if user aliased, we should probably respect it?
            // Simplest: Just prefix Lu to the imported name.
            // If manual intervention needed, good test.
            // Let's assume no aliases for now based on grep.
        } else {
            replacements.set(imp, `Lu${imp}`);
        }
    });

    // Sort keys by length desc to avoid partial replacement issues if any
    const keys = Array.from(replacements.keys()).sort((a, b) => b.length - a.length);

    // Replace body usages first
    keys.forEach(key => {
        const replacement = replacements.get(key);
        // Replace <Icon ...
        content = content.replace(new RegExp(`<${key}(\\s|/|>)`, 'g'), `<${replacement}$1`);
        // Replace {Icon} (passing as prop)
        // or icon={Icon}
        // or [Icon]
        // Strictly identifiers: \bIcon\b
        // But exclude the import statement line itself?
        // Easier: Replace ALL \bIcon\b, then fix the import statement.
        content = content.replace(new RegExp(`\\b${key}\\b`, 'g'), replacement);
    });

    // Now replace the import statement.
    // The specific import statement might have been messed up by global replacement?
    // likely "import { LuCheck } from..."
    // We want "import { LuCheck } from 'react-icons/lu'"

    // Re-find import line changed
    const newKw = keys.map(k => replacements.get(k));
    // The previous global replace would have changed "import { Check } from ..." into "import { LuCheck } from ..."
    // So we just need to change "lucide-react" to "react-icons/lu"

    const packageRegex = /from\s+["']lucide-react["']/;
    content = content.replace(packageRegex, 'from "react-icons/lu"');

    if (content !== originalContent) {
        fs.writeFileSync(filePath, content);
        console.log(`Updated ${filePath}`);
    }
}

function traverse(dir) {
    if (!fs.existsSync(dir)) return;
    const items = fs.readdirSync(dir);

    items.forEach(item => {
        const fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
            if (item === 'node_modules' || item.startsWith('.')) return;
            traverse(fullPath);
        } else if (stat.isFile()) {
            if (EXTENSIONS.includes(path.extname(fullPath))) {
                processFilerefined(fullPath);
            }
        }
    });
}

TARGET_DIRS.forEach(dir => {
    console.log(`Scanning ${dir}...`);
    traverse(dir);
});

console.log('Migration script finished.');

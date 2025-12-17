
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
    const originalContent = content;

    // Find import
    const importRegex = /import\s+\{\s*([^}]+)\s*\}\s+from\s+["']lucide-react["']/;
    const match = content.match(importRegex);

    if (!match) return; // No lucide import

    const importStatement = match[0];
    const importsStr = match[1];

    const imports = importsStr.split(',').map(s => s.trim()).filter(s => s);
    const replacements = new Map();

    imports.forEach(imp => {
        // Check for alias "Original as Alias"
        const parts = imp.split(/\s+as\s+/);
        if (parts.length === 2) {
            replacements.set(parts[1], `Lu${parts[0]}`);
        } else {
            replacements.set(imp, `Lu${imp}`);
        }
    });

    // Sort keys by length desc to avoid partial replacement issues
    const keys = Array.from(replacements.keys()).sort((a, b) => b.length - a.length);

    // Replace usages first
    keys.forEach(key => {
        const replacement = replacements.get(key);
        // Replace <Icon ...
        content = content.replace(new RegExp(`<${key}(\\s|/|>)`, 'g'), `<${replacement}$1`);
        // Replace identifiers \bIcon\b
        content = content.replace(new RegExp(`\\b${key}\\b`, 'g'), replacement);
    });

    // Now replace the import statement.
    // Since we did global replacement, the import line also changed.
    // e.g. "import { Check }..." became "import { LuCheck }..."
    // We just need to change "from 'lucide-react'" to "from 'react-icons/lu'"

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
                processFile(fullPath);
            }
        }
    });
}

TARGET_DIRS.forEach(dir => {
    console.log(`Scanning ${dir}...`);
    traverse(dir);
});

console.log('Migration script finished.');

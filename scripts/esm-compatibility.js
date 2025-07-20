#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DIST_DIR = path.join(__dirname, '../dist');
const JS_IMPORT_REGEX = /((import|export)\s.*?from\s*['"])(\.\.?\/[^'".]+)(['"])/g;

function fixFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;
  content = content.replace(JS_IMPORT_REGEX, (match, start, _type, importPath, end) => {
    if (importPath.endsWith('.js')) return match;
    changed = true;
    return `${start}${importPath}.js${end}`;
  });
  if (changed) {
    fs.writeFileSync(filePath, content, 'utf8');
  }
}

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(fullPath);
    } else if (entry.isFile() && fullPath.endsWith('.js')) {
      fixFile(fullPath);
    }
  }
}

walk(DIST_DIR);
console.log('esm compatibility build success'); 
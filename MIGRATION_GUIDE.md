# Migration Guide: Upgrading to TypeScript ES2022

This document outlines the changes made to upgrade the handlebars-helpers project from JavaScript to TypeScript with ES2022 support.

## 🎯 Overview

The project has been completely modernized with:
- **TypeScript**: Full type safety and modern IDE support
- **ES2022**: Latest JavaScript features and module system
- **ESM Modules**: Native ES module support
- **Modern Build Process**: TypeScript compilation with source maps
- **Type Definitions**: Comprehensive types for all helpers and functions

## 📁 Project Structure Changes

### Before (JavaScript)
```
├── index.js                    # Main entry point
├── lib/                        # Helper categories
│   ├── array.js
│   ├── string.js
│   └── utils/
└── package.json
```

### After (TypeScript)
```
├── src/                        # TypeScript source files
│   ├── index.ts                # Main entry point
│   ├── types.ts                # Type definitions
│   └── lib/                    # Helper categories
│       ├── array.ts
│       ├── string.ts
│       └── utils/
├── dist/                       # Compiled JavaScript output
├── tsconfig.json               # TypeScript configuration
└── package.json                # Updated for ES modules
```

## 🔧 Key Changes

### 1. Package.json Updates

- **Module Type**: Added `"type": "module"` for ES module support
- **Main Entry**: Changed from `index.js` to `./dist/index.js`
- **Module Field**: Added `"module": "./dist/index.js"`
- **Types Field**: Added `"types": "./dist/index.d.ts"`
- **Exports Map**: Modern export map for better module resolution
- **Build Scripts**: New TypeScript build process
- **Dependencies**: Added TypeScript and related tooling

### 2. TypeScript Configuration

- **Target**: ES2022 for modern JavaScript features
- **Module System**: ES2022 modules with Node.js resolution
- **Strict Mode**: Full TypeScript strict checking enabled
- **Source Maps**: Enabled for debugging
- **Declarations**: Auto-generated `.d.ts` files

### 3. Type Safety

All helpers now have proper TypeScript types:

```typescript
// Before (JavaScript)
function after(array, n) {
  return array.slice(n);
}

// After (TypeScript)
export function after(array: any[], n: number): any[] | string {
  if (isUndefined(array)) return '';
  return array.slice(n);
}
```

### 4. Modern Import/Export Syntax

```typescript
// Before (CommonJS)
var helpers = require('./lib/array');
module.exports = helpers;

// After (ES Modules)
import * as array from './lib/array.js';
export { array };
```

## 🚀 Benefits

### For Users
- **Better IDE Support**: IntelliSense, auto-completion, and error checking
- **Type Safety**: Catch errors at compile time
- **Modern Modules**: Native ES module support
- **Tree Shaking**: Better bundling with module bundlers
- **Source Maps**: Better debugging experience

### For Developers
- **Type Definitions**: Comprehensive interfaces for all helpers
- **Modern Tooling**: ESLint, Prettier, and TypeScript integration
- **Better DX**: Auto-formatting and consistent code style
- **Compile-time Checking**: Catch errors before runtime

## 📦 Installation & Usage

### Installation
```bash
npm install handlebars-helpers-ctrf
```

### Usage (ES Modules)
```typescript
import helpers from 'handlebars-helpers-ctrf';
import { array, string } from 'handlebars-helpers-ctrf';

// Register all helpers
helpers();

// Register specific helper groups
helpers(['array', 'string']);

// Use individual helper groups
array.forEach(items, options);
string.capitalize('hello world');
```

### Usage (CommonJS - still supported)
```javascript
const helpers = require('handlebars-helpers-ctrf');

// Register all helpers
helpers();
```

## 🛠 Development

### Build Process
```bash
# Build TypeScript to JavaScript
npm run build

# Watch mode for development
npm run build:watch

# Clean build output
npm run clean
```

### Code Quality
```bash
# Lint TypeScript code
npm run lint

# Format code with Prettier
npm run format

# Run tests
npm test
```

### Environment Requirements
- **Node.js**: 20.0.0 or later
- **TypeScript**: 5.3.3 or later

## 🔄 Breaking Changes

1. **Module System**: Now uses ES modules by default
2. **Build Process**: TypeScript compilation required
3. **File Extensions**: Source files use `.ts` extension
4. **Import Paths**: Must include `.js` extension in imports (TypeScript requirement)

## 📋 Type Definitions

The project now includes comprehensive type definitions:

```typescript
interface HandlebarsHelperOptions {
  fn: (context: any) => string;
  inverse: (context: any) => string;
  hash: Record<string, any>;
  data?: Record<string, any>;
}

interface ArrayHelperOptions extends HandlebarsHelperOptions {
  property?: string;
  prop?: string;
}

// And many more...
```

## ✅ Backwards Compatibility

The compiled JavaScript output maintains compatibility with:
- CommonJS `require()` syntax
- Existing Handlebars templates
- Previous API signatures
- Node.js environments

## 🎉 What's Next?

This TypeScript upgrade provides a solid foundation for:
- Enhanced helper functions with better type safety
- Improved development experience
- Better integration with modern JavaScript tooling
- Future feature additions with confidence

The project is now ready for modern JavaScript/TypeScript development while maintaining full backwards compatibility with existing usage patterns. 
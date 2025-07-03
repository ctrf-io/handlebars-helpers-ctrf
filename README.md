# handlebars-helpers-ctrf

[![npm version](https://badge.fury.io/js/handlebars-helpers-ctrf.svg)](https://www.npmjs.com/package/handlebars-helpers-ctrf)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![ES2022](https://img.shields.io/badge/ES2022-F7DF1E?style=flat-square&logo=javascript&logoColor=black)](https://262.ecma-international.org/13.0/)

> **Modern TypeScript handlebars helpers for CTRF libraries**

A comprehensive collection of **180+ handlebars helpers** now fully modernized with TypeScript, ES2022 support, and enhanced type safety. Originally based on the popular `handlebars-helpers` library, this version has been completely rewritten for modern JavaScript development.

## 🚀 What's New in v0.0.3

- ✅ **Full TypeScript Support** - Complete type definitions for all helpers
- ✅ **ES2022 Modules** - Native ES module support with tree-shaking
- ✅ **Modern Build Process** - TypeScript compilation with source maps
- ✅ **Enhanced IDE Support** - IntelliSense, auto-completion, and error checking
- ✅ **Backwards Compatible** - Works with existing CommonJS projects
- ✅ **Type Safety** - Catch errors at compile time, not runtime

## 📦 Installation

```bash
npm install handlebars-helpers-ctrf
```

## 🛠 Usage

### ES Modules (Recommended)

```typescript
import helpers from 'handlebars-helpers-ctrf';
import { array, string, math } from 'handlebars-helpers-ctrf';

// Register all helpers
helpers();

// Register specific helper groups
helpers(['array', 'string']);

// Use individual helper groups with full type support
const items = ['apple', 'banana', 'cherry'];
array.first(items); // Type: any | any[] | string
string.capitalize('hello world'); // Type: string
math.add(5, 3); // Type: number
```

### CommonJS (Still Supported)

```javascript
const helpers = require('handlebars-helpers-ctrf');

helpers(); // Register all helpers
```

### With Handlebars

```javascript
import Handlebars from 'handlebars';
import helpers from 'handlebars-helpers-ctrf';

// Register helpers with your Handlebars instance
helpers({ handlebars: Handlebars });

// Now use in templates
const template = Handlebars.compile('{{capitalize name}}');
const result = template({ name: 'john doe' }); // "John doe"
```

## 📚 Helper Categories

All helpers are organized into logical categories with full TypeScript support:

| Category | Helpers | TypeScript Types | Description |
|----------|---------|------------------|-------------|
| **array** | 25+ | `ArrayHelperOptions` | Array manipulation and iteration |
| **collection** | 15+ | `CollectionHelperOptions` | Object and collection utilities |
| **comparison** | 20+ | `HandlebarsHelperOptions` | Conditional logic and comparisons |
| **date** | 10+ | `DateHelperOptions` | Date formatting and manipulation |
| **html** | 15+ | `HtmlHelperOptions` | HTML generation and escaping |
| **inflection** | 10+ | `InflectionHelperOptions` | String inflection and pluralization |
| **math** | 15+ | `MathHelperOptions` | Mathematical operations |
| **number** | 10+ | `NumberHelperOptions` | Number formatting and conversion |
| **object** | 15+ | `ObjectHelperOptions` | Object property manipulation |
| **path** | 10+ | `PathHelperOptions` | File path utilities |
| **regex** | 10+ | `RegexHelperOptions` | Regular expression operations |
| **string** | 25+ | `StringHelperOptions` | String manipulation and formatting |
| **url** | 15+ | `UrlHelperOptions` | URL parsing and manipulation |

## 💡 TypeScript Examples

### Array Helpers with Types

```typescript
import { array } from 'handlebars-helpers-ctrf';

const items = ['apple', 'banana', 'cherry'];

// All with proper TypeScript support
array.first(items, 2);        // Returns: ['apple', 'banana']
array.last(items);           // Returns: 'cherry'
array.length(items);         // Returns: 3
array.join(items, ' | ');    // Returns: 'apple | banana | cherry'
array.reverse(items);        // Returns: ['cherry', 'banana', 'apple']
```

### String Helpers with Types

```typescript
import { string } from 'handlebars-helpers-ctrf';

string.capitalize('hello world');     // Returns: 'Hello world'
string.truncate('Long text', 10);     // Returns: 'Long text...'
string.slugify('Hello World!');       // Returns: 'hello-world'
string.camelCase('hello-world');      // Returns: 'helloWorld'
```

### Math Helpers with Types

```typescript
import { math } from 'handlebars-helpers-ctrf';

math.add(5, 3);              // Returns: 8
math.round(3.14159, 2);      // Returns: 3.14
math.random(1, 10);          // Returns: random number between 1-10
math.sum(1, 2, 3, 4, 5);     // Returns: 15
```

## 🏗 Development

### Prerequisites

- Node.js 20.0.0 or later
- TypeScript 5.3.3 or later

### Building

```bash
# Install dependencies
npm install

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

# Fix linting issues
npm run lint:fix

# Format code with Prettier
npm run format

# Run tests
npm test
```

## 📋 Type Definitions

The library includes comprehensive TypeScript definitions:

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

// Full type definitions for all helper categories...
```

## 🔧 Migration from JavaScript

See our [Migration Guide](./MIGRATION_GUIDE.md) for detailed instructions on upgrading from the JavaScript version.

### Key Changes

- **Module System**: Now uses ES modules by default
- **Build Process**: TypeScript compilation required for development
- **Type Safety**: Full TypeScript support with strict type checking
- **Modern Features**: ES2022 syntax and module resolution

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](./CONTRIBUTING.md) for details.

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-helper`
3. Make your changes with proper TypeScript types
4. Add tests for new functionality
5. Run the build and tests: `npm run build && npm test`
6. Submit a pull request

## 📄 License

MIT License - see [LICENSE](./LICENSE) file for details.

## 🙏 Acknowledgments

This project is based on the original [handlebars-helpers](https://github.com/helpers/handlebars-helpers) library by Jon Schlinkert and contributors. We've modernized it with TypeScript and ES2022 support while maintaining backwards compatibility.

## 🔗 Related

- [CTRF](https://ctrf.io) - Common Test Report Format
- [Handlebars.js](https://handlebarsjs.com/) - The templating engine
- [TypeScript](https://www.typescriptlang.org/) - JavaScript with syntax for types

---

**Made with ❤️ for the CTRF community**
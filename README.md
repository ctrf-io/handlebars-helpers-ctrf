# Handlebars Helpers CTRF

A collection of Handlebars helpers for working with [Common Test Report Format](https://ctrf.io).

## Installation

```bash
npm install handlebars-helpers-ctrf
```

## Usage

```javascript
import Handlebars from 'handlebars'
import { loadHelpers } from 'handlebars-helpers-ctrf';

// Register all helpers with Handlebars
loadHelpers(Handlebars);


// Now you can use the helpers in your templates
const template = Handlebars.compile('{{append "test" ".html"}}');
const result = template({}); // "test.html"
```

## Development

Contributions are very welcome! Please see the [CONTRIBUTING.md](CONTRIBUTING.md) file for more information.

To build the project and run the tests:

```bash
npm run all
```

## Available Helpers

- [Ctrf Helpers](#ctrf-helpers)
- [Array Helpers](#array-helpers)
- [Collections Helpers](#collections-helpers)
- [Comparison Helpers](#comparison-helpers)
- [Date Helpers](#date-helpers)
- [Fs Helpers](#fs-helpers)
- [Inflection Helpers](#inflection-helpers)
- [Match Helpers](#match-helpers)
- [Math Helpers](#math-helpers)
- [Misc Helpers](#misc-helpers)
- [Number Helpers](#number-helpers)
- [Object Helpers](#object-helpers)
- [Path Helpers](#path-helpers)
- [Regex Helpers](#regex-helpers)
- [String Helpers](#string-helpers)
- [Url Helpers](#url-helpers)

<!-- DOCS_START -->

### Ctrf Helpers

#### `sortTestsByFailRate`

Sorts tests by their failure rate in descending order, showing the most unreliable tests first.

**Parameters:**

- `tests` (`unknown`) - An array of Test objects from CTRF report.

**Returns:** `Test[]` - A sorted array of tests that have a fail rate, from highest to lowest.

**Example:**

```handlebars
Most Unreliable Tests:
{{#each (sortTestsByFailRate tests)}}
{{this.name}} - Fail Rate: {{this.extra.failRate}}%
{{/each}}
```

---

#### `sortTestsByFlakyRate`

Sorts tests by their flaky rate in descending order, showing the most flaky tests first.

**Parameters:**

- `tests` (`unknown`) - An array of Test objects from CTRF report.

**Returns:** `Test[]` - A sorted array of tests that have a flaky rate, from highest to lowest.

**Example:**

```handlebars
Most Flaky Tests:
{{#each (sortTestsByFlakyRate tests)}}
{{this.name}} - Flaky Rate: {{this.extra.flakyRate}}%
{{/each}}
```

---

#### `filterPassedTests`

Filters test results to only include passed tests. Useful for creating success summaries or filtering out failures.

**Parameters:**

- `tests` (`unknown`) - An array of Test objects from CTRF report.

**Returns:** `Test[]` - An array of tests with "passed" status.

**Example:**

```handlebars
Passed Tests:
{{#each (filterPassedTests tests)}}
✓ {{this.name}} ({{formatDuration this.duration}})
{{/each}}
```

---

#### `filterFailedTests`

Filters test results to only include failed tests. Useful for creating failure summaries or error reports.

**Parameters:**

- `tests` (`unknown`) - An array of Test objects from CTRF report.

**Returns:** `Test[]` - An array of tests with "failed" status.

**Example:**

```handlebars
Failed Tests:
{{#each (filterFailedTests tests)}}
⊝ {{this.name}} ({{this.message}})
{{/each}}
```

---

#### `filterOtherTests`

Filters test results to only include tests with non-standard statuses (skipped, pending, other). Useful for creating comprehensive test summaries.

**Parameters:**

- `tests` (`unknown`) - An array of Test objects from CTRF report.

**Returns:** `Test[]` - An array of tests with non-standard statuses.

**Example:**

```handlebars
Other Status Tests:
{{#each (filterOtherTests tests)}}
⊝ {{this.name}} ({{this.status}})
{{/each}}
```

---

#### `countFlakyTests`

Counts the total number of flaky tests in the test results.

**Parameters:**

- `tests` (`unknown`) - An array of Test objects from CTRF report.

**Returns:** `number` - The total number of flaky tests.

**Example:**

```handlebars
Flaky tests detected: {{countFlaky tests}}
{{#if (countFlaky tests)}}⚠️{{/if}}
```

---

#### `anyFlakyTests`

Determines if there are any flaky tests in the test results. Useful for conditional rendering of flaky test warnings.

**Parameters:**

- `tests` (`unknown`) - An array of Test objects from CTRF report.

**Returns:** `boolean` - True if any test is marked as flaky, false otherwise.

**Example:**

```handlebars
{{#if (anyFlakyTests tests)}}
⚠️ Some tests are flaky and may need attention
{{else}}
✓ No flaky tests detected
{{/if}}
```

---

#### `formatDurationFromTimes`

Formats test execution duration from start and stop timestamps into a human-readable format. Handles edge cases where timing data might be missing or invalid.

**Parameters:**

- `start` (`unknown`) - The test start time in milliseconds.
- `stop` (`unknown`) - The test stop time in milliseconds.

**Returns:** `string` - A formatted duration string like "1ms", "1.2s", or "1m 30s".

**Example:**

```handlebars
Test Duration: {{formatDurationFromTimes test.start test.stop}}
<!-- Output: "Test Duration: 1.2s" -->
```

---

#### `formatDuration`

Formats a test duration value in milliseconds into a human-readable format. Perfect for displaying test execution times in reports.

**Parameters:**

- `duration` (`unknown`) - The test duration in milliseconds.

**Returns:** `string` - A formatted duration string like "1ms", "1.2s", or "1m 30s".

**Example:**

```handlebars
{{test.name}} completed in {{formatDuration test.duration}}
<!-- Output: "Login test completed in 250ms" -->
```

---

#### `formatTestMessage`

Converts ANSI-formatted test messages into HTML and replaces newlines with `<br>` tags. Specifically designed for formatting the `test.message` property in CTRF reports. Ideal for rendering multi-line console messages with colors in a human-friendly HTML format. This helper formats test messages so they behave well with markdown and regular HTML content.

**Parameters:**

- `text` (`string`) - The test message to format, possibly containing ANSI codes and newlines.

**Returns:** `string` - An HTML-formatted string with ANSI codes converted to HTML and line breaks replaced.

**Example:**

```handlebars
{{formatTestMessage test.message}}
Returns: HTML with ANSI colors converted to spans and line breaks as <br> tags
{{#if test.message}}
<div class="test-message">{{{formatTestMessage test.message}}}</div>
{{/if}}
```

---

#### `formatTestMessagePreCode`

Similar to `formatTestMessage`, but designed to preserve code formatting more closely. Converts ANSI to HTML and reduces consecutive newlines, but does not replace them with `<br>` tags. Perfect for formatting code blocks, stack traces, and other pre-formatted content in test messages. This helper is specifically designed to be used in pre code blocks where newlines need to be preserved.

**Parameters:**

- `text` (`unknown`) - The test message to format, possibly containing ANSI codes.

**Returns:** `string` - An HTML-formatted string with ANSI codes converted to HTML and consecutive newlines minimized.

**Example:**

```handlebars
<pre><code>{{#if message}}{{formatTestMessagePreCode message}}{{else}}No message available{{/if}}</code></pre>
{{formatTestMessagePreCode test.message}}
Returns: HTML with ANSI colors converted but newlines preserved for <pre> blocks
{{#if test.message}}
<pre class="test-code">{{{formatTestMessagePreCode test.message}}}</pre>
{{/if}}
```

---

#### `limitFailedTests`

Filters an array of tests to only those that have failed, then limits the result to a specified number. Perfect for displaying "Top N failed tests" in dashboards and summary reports.

**Parameters:**

- `tests` (`unknown`) - An array of Test objects from CTRF report.
- `limit` (`unknown`) - The maximum number of failed tests to return.

**Returns:** `Test[]` - An array of failed tests up to the specified limit.

**Example:**

```handlebars
{{#each (limitFailedTests tests 5)}}
<div class="failed-test">{{this.name}}</div>
{{/each}}
<!-- Shows up to 5 failed tests -->
{{#each (limitFailedTests suite.tests 3)}}
{{this.name}} - {{this.status}}
{{/each}}
<!-- Shows first 3 failed tests from a suite -->
```

---

#### `getCtrfEmoji`

Retrieves an emoji representation for a given test state or category. Useful for adding visual flair to CTRF test reports, dashboards, and summaries.

**Parameters:**

- `status` (`unknown`) - The test state or category to get an emoji for.

**Returns:** `string` - The emoji corresponding to the test state or category.

**Example:**

```handlebars
{{getCtrfEmoji "passed"}}
<!-- results in: "✅" -->
{{getCtrfEmoji "failed"}}
<!-- results in: "❌" -->
{{getCtrfEmoji "flaky"}}
<!-- results in: "🍂" -->
{{getCtrfEmoji "build"}}
<!-- results in: "🏗️" -->
**Use with CTRF templates**: Perfect for creating visually appealing test summaries, status indicators, and dashboard elements that make test reports more engaging and easier to scan.
```

---

### Array Helpers

#### `after`

Returns all of the items in an array after the specified index. Opposite of before. Useful for slicing test result arrays to show only later results in CTRF reports.

**Parameters:**

- `array` (`unknown`) - The array from test data.
- `n` (`unknown`) - Starting index (number of items to exclude).

**Returns:** `unknown[]` - Array excluding n items from the start.

**Example:**

```handlebars
{{after test.results 1}}
<!-- given that test.results is ["a", "b", "c", "d"] -->
<!-- results in: ["b", "c", "d"] -->
```

---

#### `arrayify`

Cast the given value to an array. Useful for normalizing test data fields to arrays for consistent rendering in test reports.

**Parameters:**

- `value` (`unknown`) - The value to cast.

**Returns:** `unknown[]` - The value as an array.

**Example:**

```handlebars
{{arrayify test.status}}
<!-- given that test.status is "passed" -->
<!-- results in: ["passed"] -->
```

---

#### `before`

Return all of the items in the collection before the specified count. Opposite of after. Useful for showing only the first N test results or errors in a summary table.

**Parameters:**

- `array` (`unknown`) - The array from test data.
- `n` (`unknown`) - Number of items to include from the start.

**Returns:** `unknown[]` - Array excluding items after the given number.

**Example:**

```handlebars
{{before test.results 2}}
<!-- given that test.results is ["a", "b", "c", "d"] -->
<!-- results in: ["a", "b"] -->
```

---

#### `eachIndex`

Iterates over each item in an array and exposes the current item and index to the block. Useful for rendering test steps or log entries with their index in CTRF reports.

**Parameters:**

- `array` (`unknown`) - The array from test data.
- `options` (`unknown`) - Handlebars options object.

**Returns:** `string` - Rendered block for each item with index.

**Example:**

```handlebars
{{#eachIndex test.results}}
{{item}} is {{index}}
{{/eachIndex}}
<!-- given that test.results is ["a", "b"] -->
<!-- results in: "a is 0b is 1" -->
```

---

#### `filter`

Block helper that filters the given array and renders the block for values that evaluate to true, otherwise the inverse block is returned. Useful for displaying only passing or failing tests in a filtered test report section.

**Parameters:**

- `array` (`unknown`) - The array from test data.
- `value` (`unknown`) - The value to filter by.
- `options` (`unknown`) - Handlebars options object.

**Returns:** `string` - Rendered block for filtered items.

**Example:**

```handlebars
{{#filter test.results "passed"}}AAA{{else}}BBB{{/filter}}
<!-- given that test.results is ["passed", "failed"] -->
<!-- results in: "AAA" for "passed", "BBB" for others -->
```

---

#### `first`

Returns the first item, or first n items of an array. Useful for showing the first test, or a summary of the first N failures in a report.

**Parameters:**

- `array` (`unknown`) - The array from test data.
- `n` (`unknown`) - Number of items to return from the start.

**Returns:** `unknown|unknown[]` - The first item or first n items.

**Example:**

```handlebars
{{first test.results 2}}
<!-- given that test.results is ["a", "b", "c"] -->
<!-- results in: ["a", "b"] -->
```

---

#### `forEach`

Iterates over each item in an array and exposes the current item as context to the inner block. Useful for rendering each test case, log entry, or assertion in a test report.

**Parameters:**

- `array` (`unknown`) - The array from test data.
- `options` (`unknown`) - Handlebars options object.

**Returns:** `string` - Rendered block for each item.

**Example:**

```handlebars
{{#forEach test.results}}
{{this}}
{{/forEach}}
<!-- given that test.results is ["a", "b"] -->
<!-- results in: "ab" -->
```

---

#### `inArray`

Block helper that renders the block if an array has the given value. Optionally specify an inverse block to render when the array does not have the value. Useful for conditionally rendering sections if a test status or tag is present in the results.

**Parameters:**

- `array` (`unknown`) - The array from test data.
- `value` (`unknown`) - The value to check for.
- `options` (`unknown`) - Handlebars options object.

**Returns:** `string` - Rendered block if value is present, else inverse.

**Example:**

```handlebars
{{#inArray test.results "passed"}}foo{{else}}bar{{/inArray}}
<!-- given that test.results is ["passed", "failed"] -->
<!-- results in: "foo" if "passed" is present, otherwise "bar" -->
```

---

#### `isArray`

Returns true if value is an ES5 array. Useful for checking if a test field is an array before iterating in a template.

**Parameters:**

- `value` (`unknown`) - The value to test.

**Returns:** `boolean` - True if value is an array.

**Example:**

```handlebars
{{isArray test.results}}
<!-- given that test.results is ["a", "b"] -->
<!-- results in: true -->
```

---

#### `itemAt`

Returns the item from array at index idx.

**Parameters:**

- `array` (`unknown`) - The array from test data.
- `idx` (`unknown`) - The index to retrieve.

**Returns:** `unknown` - The item at the given index.

**Example:**

```handlebars
{{itemAt test.results 1}}
<!-- given that test.results is ["a", "b", "c"] -->
<!-- results in: "b" -->
```

---

#### `join`

Join all elements of array into a string, optionally using a given separator.

**Parameters:**

- `array` (`unknown`) - The array from test data.
- `separator` (`unknown`) - The separator to use. Defaults to ','.

**Returns:** `string` - The joined string.

**Example:**

```handlebars
{{join test.results}}
<!-- given that test.results is ["a", "b", "c"] -->
<!-- results in: "a,b,c" -->
{{join test.results "-"}}
<!-- results in: "a-b-c" -->
```

---

#### `equalsLength`

Returns true if the length of the given value is equal to the given length. Can be used as a block or inline helper.

**Parameters:**

- `value` (`unknown`) - The value to test (array or string).
- `length` (`unknown`) - The length to compare to.

**Returns:** `boolean` - True if lengths are equal.

**Example:**

```handlebars
{{equalsLength test.results 2}}
<!-- given that test.results is ["a", "b"] -->
<!-- results in: true -->
```

---

#### `last`

Returns the last item, or last n items in an array or string. Opposite of first.

**Parameters:**

- `value` (`unknown`) - The array or string from test data.
- `n` (`unknown`) - Number of items to return from the end.

**Returns:** `unknown|unknown[]` - The last item or last n items.

**Example:**

```handlebars
{{last test.results}}
<!-- given that test.results is ["a", "b", "c"] -->
<!-- results in: "c" -->
{{last test.results 2}}
<!-- results in: ["b", "c"] -->
```

---

#### `slice`

Returns a slice of an array from the specified start index to the end index. Useful for pagination, limiting displayed items, or working with specific ranges of test results.

**Parameters:**

- `array` (`unknown`) - The array to be sliced.
- `start` (`unknown`) - The start index for the slice.
- `end` (`unknown`) - The end index for the slice (exclusive).
- `options` (`object`) - Handlebars options object, including the block to render.

**Returns:** `string` - A concatenated string of all rendered items within the slice.

**Example:**

```handlebars
{{#slice test.results 1 4}}
<li>{{this.name}}</li>
{{/slice}}
<!-- given that test.results has 10 items -->
<!-- renders items at indices 1, 2, and 3 (end index is exclusive) -->
```

---

#### `length`

Returns the length of the given string or array.

**Parameters:**

- `value` (`unknown`) - The value to measure (array, object, or string).

**Returns:** `number` - The length of the value.

**Example:**

```handlebars
{{length test.results}}
<!-- given that test.results is ["a", "b", "c"] -->
<!-- results in: 3 -->
```

---

#### `map`

Alias for equalsLength. / export const lengthEqualHelper = equalsLengthHelper; /** Returns a new array, created by calling function on each element of the given array.

**Parameters:**

- `array` (`unknown`) - The array from test data.
- `fn` (`unknown`) - The function to call on each element.

**Returns:** `unknown[]` - The mapped array.

**Example:**

```handlebars
{{map test.results double}}
<!-- given that test.results is [1, 2, 3] and double doubles the value -->
<!-- results in: [2, 4, 6] -->
```

---

#### `pluck`

Map over the given object or array of objects and create an array of values from the given prop. Dot-notation may be used (as a string) to get nested properties.

**Parameters:**

- `collection` (`unknown`) - The array or object from test data.
- `prop` (`unknown`) - The property to pluck (dot notation allowed).

**Returns:** `unknown[]` - The plucked values.

**Example:**

```handlebars
{{pluck test.results "name"}}
<!-- given that test.results is [{name: "a"}, {name: "b"}] -->
<!-- results in: ["a", "b"] -->
```

---

#### `reverse`

Reverse the elements in an array, or the characters in a string.

**Parameters:**

- `value` (`unknown`) - The array or string from test data.

**Returns:** `unknown` - The reversed array or string.

**Example:**

```handlebars
{{reverse test.results}}
<!-- given that test.results is ["a", "b", "c"] -->
<!-- results in: ["c", "b", "a"] -->
```

---

#### `some`

Block helper that returns the block if the callback returns true for some value in the given array.

**Parameters:**

- `array` (`unknown`) - The array from test data.
- `iter` (`unknown`) - The iteratee function.
- `options` (`unknown`) - Handlebars options object.

**Returns:** `string` - Rendered block if some item passes the iteratee.

**Example:**

```handlebars
{{#some test.results isString}}
Render me if the array has a string.
{{else}}
Render me if it doesn't.
{{/some}}
```

---

#### `sort`

Sort the given array. If an array of objects is passed, you may optionally pass a key to sort on as the second argument. You may alternatively pass a sorting function as the second argument.

**Parameters:**

- `array` (`unknown`) - The array from test data.
- `keyOrFn` (`unknown`) - The key to sort by, or a sorting function.

**Returns:** `unknown[]` - The sorted array.

**Example:**

```handlebars
{{sort test.results}}
<!-- given that test.results is [3, 1, 2] -->
<!-- results in: [1, 2, 3] -->
```

---

#### `sortBy`

Sort an array. If an array of objects is passed, you may optionally pass a key to sort on as the second argument. You may alternatively pass a sorting function as the second argument.

**Parameters:**

- `array` (`unknown`) - The array from test data.
- `props` (`unknown`) - The property or properties to sort by.

**Returns:** `unknown[]` - The sorted array.

**Example:**

```handlebars
{{sortBy test.results "score"}}
<!-- given that test.results is [{score: 2}, {score: 1}] -->
<!-- results in: [{score: 1}, {score: 2}] -->
```

---

#### `withAfter`

Use the items in the array after the specified index as context inside a block. Opposite of withBefore.

**Parameters:**

- `array` (`unknown`) - The array from test data.
- `idx` (`unknown`) - The index after which to use items.
- `options` (`unknown`) - Handlebars options object.

**Returns:** `string` - Rendered block for items after idx.

**Example:**

```handlebars
{{#withAfter test.results 2}}
{{this}}
{{/withAfter}}
<!-- given that test.results is ["a", "b", "c", "d"] -->
<!-- results in: "c d" -->
```

---

#### `withBefore`

Use the items in the array before the specified index as context inside a block. Opposite of withAfter.

**Parameters:**

- `array` (`unknown`) - The array from test data.
- `idx` (`unknown`) - The index before which to use items.
- `options` (`unknown`) - Handlebars options object.

**Returns:** `string` - Rendered block for items before idx.

**Example:**

```handlebars
{{#withBefore test.results 2}}
{{this}}
{{/withBefore}}
<!-- given that test.results is ["a", "b", "c", "d"] -->
<!-- results in: "a b" -->
```

---

#### `withFirst`

Use the first item in a collection inside a handlebars block expression. Opposite of withLast.

**Parameters:**

- `array` (`unknown`) - The array from test data.
- `options` (`unknown`) - Handlebars options object.

**Returns:** `string` - Rendered block for the first item.

**Example:**

```handlebars
{{#withFirst test.results}}
{{this}}
{{/withFirst}}
<!-- given that test.results is ["a", "b"] -->
<!-- results in: "a" -->
```

---

#### `withGroup`

Block helper that groups array elements by given group size.

**Parameters:**

- `array` (`unknown`) - The array from test data.
- `size` (`unknown`) - The desired length of each group.
- `options` (`unknown`) - Handlebars options object.

**Returns:** `string` - Rendered block for each group.

**Example:**

```handlebars
{{#withGroup test.results 2}}
{{#each this}}
{{.}}
{{/each}}
<br>
{{/withGroup}}
<!-- given that test.results is ["a", "b", "c", "d"] -->
<!-- results in: "a b<br>c d<br>" -->
```

---

#### `withLast`

Use the last item or n items in an array as context inside a block. Opposite of withFirst.

**Parameters:**

- `array` (`unknown`) - The array from test data.
- `options` (`unknown`) - Handlebars options object.

**Returns:** `string` - Rendered block for the last item.

**Example:**

```handlebars
{{#withLast test.results}}
{{this}}
{{/withLast}}
<!-- given that test.results is ["a", "b", "c"] -->
<!-- results in: "c" -->
```

---

#### `withSort`

Block helper that sorts a collection and exposes the sorted collection as context inside the block.

**Parameters:**

- `array` (`unknown`) - The array from test data.
- `prop` (`unknown`) - The property to sort by.
- `options` (`unknown`) - Handlebars options object.

**Returns:** `string` - Rendered block for sorted items.

**Example:**

```handlebars
{{#withSort test.results "score"}}{{this}}{{/withSort}}
<!-- given that test.results is [{score: 2}, {score: 1}] -->
<!-- results in: "{score: 1}{score: 2}" -->
```

---

#### `unique`

Block helper that returns an array with all duplicate values removed. Best used along with an each helper.

**Parameters:**

- `array` (`unknown`) - The array from test data.

**Returns:** `unknown[]` - Array with duplicates removed.

**Example:**

```handlebars
{{#each (unique test.results)}}{{.}}{{/each}}
<!-- given that test.results is ["a", "b", "a"] -->
<!-- results in: "ab" -->
```

---

### Collections Helpers

#### `isEmpty`

Checks if a collection (array, object, or string) is empty. Inline, subexpression, or block helper that returns true (or the block) if the given collection is empty, or false (or the inverse block, if supplied) if the collection is not empty. Useful in CTRF test reporting for conditionally rendering sections when there are no tests, errors, or results.

**Parameters:**

- `collection` (`unknown`) - The collection (array, object, or string) to check.
- `options` (`unknown`) - Handlebars options object (for block usage).

**Returns:** `boolean|string` - True/false for inline/subexpression, or rendered block for block usage.

**Example:**

```handlebars
{{#isEmpty test.results}}No results!{{else}}Results found.{{/isEmpty}}
<!-- Renders "No results!" if test.results is empty, otherwise "Results found." -->
{{isEmpty test.errors}}
<!-- Renders true if test.errors is empty, false otherwise -->
```

---

#### `iterate`

Block helper that iterates over an array or object, exposing each item (and key for objects) to the block. If an array is given, .forEach is called; if an object is given, .forOwn is called; otherwise the inverse block is returned. Useful in CTRF test reporting for iterating over dynamic test results, error maps, or grouped data.

**Parameters:**

- `collection` (`unknown`) - The collection (array or object) to iterate over.
- `options` (`unknown`) - Handlebars options object.

**Returns:** `string` - Rendered block for each item, or inverse block if not iterable.

**Example:**

```handlebars
{{#iterate test.results}}
Test: {{this.name}} - Status: {{this.status}}
{{else}}
No test results.
{{/iterate}}
<!-- Iterates over test.results array, or shows fallback if empty -->
{{#iterate test.stats}}
{{@key}}: {{this}}
{{/iterate}}
<!-- Iterates over object keys/values, e.g. test.stats = { passed: 5, failed: 2 } -->
```

---

### Comparison Helpers

#### `and`

Helper that renders the block if both of the given values are truthy. If an inverse block is specified it will be rendered when falsy. Works as a block helper, inline helper or subexpression.

**Example:**

```handlebars
{{#and test.passed (not test.flaky)}}Test is stable and passed{{else}}Unstable or failed{{/and}}
Use to show a message only if a test both passed and is not flaky in a CTRF report.
```

---

#### `compare`

Render a block when a comparison of the first and third arguments returns true. The second argument is the arithmetic operator to use. You may also optionally specify an inverse block to render when falsy.

**Example:**

```handlebars
{{#compare test.duration ">" 1000}}Long-running test{{else}}Quick test{{/compare}}
Use to highlight tests that exceed a duration threshold in test reports.
```

---

#### `contains`

Block helper that renders the block if collection has the given value, using strict equality (===) for comparison, otherwise the inverse block is rendered (if specified). If a startIndex is specified and is negative, it is used as the offset from the end of the collection.

**Example:**

```handlebars
{{#contains test.tags "flaky"}}Flaky test{{else}}Stable test{{/contains}}
Use to check if a test's tags include "flaky" or another status in a CTRF report.
```

---

#### `default`

Returns the first value that is not undefined, otherwise the default value is returned.

**Example:**

```handlebars
{{default test.error "No error message"}}
Use to provide fallback text for missing error messages in test reports.
```

---

#### `eq`

Block helper that renders a block if a is equal to b. If an inverse block is specified it will be rendered when falsy. You may optionally use the compare="" hash argument for the second value.

**Example:**

```handlebars
{{#eq test.status "passed"}}✓ Passed{{else}}✗ Failed{{/eq}}
Use to show a checkmark for passed tests and a cross for failed ones in a CTRF summary.
```

---

#### `gt`

Block helper that renders a block if a is greater than b. If an inverse block is specified it will be rendered when falsy. You may optionally use the compare="" hash argument for the second value.

**Example:**

```handlebars
{{#gt test.duration 2000}}Test took longer than 2s{{else}}Test was quick{{/gt}}
Use to highlight slow tests in a test duration report.
```

---

#### `gte`

Block helper that renders a block if a is greater than or equal to b. If an inverse block is specified it will be rendered when falsy. You may optionally use the compare="" hash argument for the second value.

**Example:**

```handlebars
{{#gte test.retries 1}}Test was retried{{else}}No retries{{/gte}}
Use to show a warning if a test was retried at least once in a CTRF report.
```

---

#### `has`

Block helper that renders a block if value has pattern. If an inverse block is specified it will be rendered when falsy.

**Example:**

```handlebars
{{#has test.message "timeout"}}Timeout error detected{{else}}No timeout{{/has}}
Use to check if a test's error message contains a specific keyword in a report.
```

---

#### `isFalsey`

Returns true if the given value is falsey. Uses JS falsey semantics.

**Example:**

```handlebars
{{#if (isFalsey test.error)}}No error present{{/if}}
Use to check if a test has no error message in a summary table.
```

---

#### `isTruthy`

Returns true if the given value is truthy. Uses JS truthy semantics.

**Example:**

```handlebars
{{#if (isTruthy test.passed)}}Test passed{{/if}}
Use to check if a test passed in a conditional block.
```

---

#### `ifEven`

Return true if the given value is an even number.

**Example:**

```handlebars
{{#ifEven @index}}Even row{{else}}Odd row{{/ifEven}}
Use to alternate row colors in a test report table by index.
```

---

#### `ifNth`

Conditionally renders a block if the remainder is zero when a operand is divided by b. If an inverse block is specified it will be rendered when the remainder is not zero.

**Example:**

```handlebars
{{#ifNth @index 3}}Every third row{{/ifNth}}
Use to highlight every nth test in a report table.
```

---

#### `ifOdd`

Block helper that renders a block if value is an odd number. If an inverse block is specified it will be rendered when falsy.

**Example:**

```handlebars
{{#ifOdd @index}}Odd row{{else}}Even row{{/ifOdd}}
Use to alternate row colors in a test report table by index.
```

---

#### `is`

Block helper that renders a block if a is equal to b. If an inverse block is specified it will be rendered when falsy. Similar to eq but does not do strict equality.

**Example:**

```handlebars
{{#is test.status 1}}Loose match for status{{/is}}
Use for loose equality checks on test status or codes in a report.
```

---

#### `isnt`

Block helper that renders a block if a is not equal to b. If an inverse block is specified it will be rendered when falsy. Similar to unlessEq but does not use strict equality for comparisons.

**Example:**

```handlebars
{{#isnt test.status "failed"}}Not failed{{/isnt}}
Use to show a message for tests that are not failed in a summary.
```

---

#### `lt`

Block helper that renders a block if a is less than b. If an inverse block is specified it will be rendered when falsy. You may optionally use the compare="" hash argument for the second value.

**Example:**

```handlebars
{{#lt test.duration 500}}Very fast test{{else}}Not very fast{{/lt}}
Use to highlight tests that are especially quick in a report.
```

---

#### `lte`

Block helper that renders a block if a is less than or equal to b. If an inverse block is specified it will be rendered when falsy. You may optionally use the compare="" hash argument for the second value.

**Example:**

```handlebars
{{#lte test.retries 0}}No retries{{else}}Retried{{/lte}}
Use to show a message for tests that were not retried in a CTRF report.
```

---

#### `neither`

Block helper that renders a block if neither of the given values are truthy. If an inverse block is specified it will be rendered when falsy.

**Example:**

```handlebars
{{#neither test.passed test.retryPassed}}Both failed{{/neither}}
Use to check if both a test and its retry failed in a report.
```

---

#### `not`

Returns true if val is falsey. Works as a block or inline helper.

**Example:**

```handlebars
{{#not test.passed}}Test failed{{/not}}
Use to show a message for failed tests in a summary table.
```

---

#### `or`

Block helper that renders a block if any of the given values is truthy. If an inverse block is specified it will be rendered when falsy.

**Example:**

```handlebars
{{#or test.failed test.flaky}}Attention needed{{/or}}
Use to show a warning if a test is either failed or flaky in a CTRF report.
```

---

#### `unlessEq`

Block helper that always renders the inverse block unless a is is equal to b.

**Example:**

```handlebars
{{#unlessEq test.status "failed"}}Not failed{{/unlessEq}}
Use to show a message for tests that are not failed in a CTRF report.
```

---

#### `unlessGt`

Block helper that always renders the inverse block unless a is is greater than b.

**Example:**

```handlebars
{{#unlessGt test.duration 1000}}Not long{{/unlessGt}}
Use to show a message for tests that are not long-running in a report.
```

---

#### `unlessLt`

Block helper that always renders the inverse block unless a is is less than b.

**Example:**

```handlebars
{{#unlessLt test.duration 500}}Not very fast{{/unlessLt}}
Use to show a message for tests that are not especially quick in a report.
```

---

#### `unlessGteq`

Block helper that always renders the inverse block unless a is is greater than or equal to b.

**Example:**

```handlebars
{{#unlessGteq test.retries 1}}No retries{{/unlessGteq}}
Use to show a message for tests that were not retried in a CTRF report.
```

---

#### `unlessLteq`

Block helper that always renders the inverse block unless a is is less than or equal to b.

**Example:**

```handlebars
{{#unlessLteq test.retries 0}}Retried at least once{{/unlessLteq}}
Use to show a message for tests that were retried in a CTRF report.
```

---

### Date Helpers

#### `year`

Handlebars helper that returns the current year.

**Returns:** `number` - The current year (e.g., 2024).

**Example:**

```handlebars
{{year}}
"date": "{{year}}"
```

---

### Fs Helpers

#### `read`

Read a file from the file system. Useful for including file contents in CTRF test reports or templates.

**Parameters:**

- `filepath` (`unknown`) - The path to the file to read (relative to process.cwd() or absolute).

**Returns:** `string` - The file contents as a string, or an empty string if not found.

**Example:**

```handlebars
{{read "src/test-data/sample-ctrf-data.ts"}}
<!-- includes the contents of the sample CTRF data file in the report -->
{{someHelper (read "output/test-report.html")}}
<!-- passes the HTML report content to another helper -->
```

---

#### `files`

Return an array of files from the given directory. Useful for listing test artifacts, screenshots, or log files in CTRF reports.

**Parameters:**

- `directory` (`unknown`) - The directory path (relative to process.cwd() or absolute).

**Returns:** `string[]` - Array of file names in the directory, or an empty array if not found.

**Example:**

```handlebars
{{#each (files "output/")}}
<li>{{this}}</li>
{{/each}}
<!-- lists all files in the output directory -->
```

---

### Github Helpers

#### `getGitHubIcon`

Retrieves a GitHub octicon URL for a given test state or category. Useful for creating GitHub-styled test reports, pull request comments, and GitHub Actions outputs.

**Parameters:**

- `status` (`unknown`) - The test state or category to get a GitHub octicon for.

**Returns:** `string` - The GitHub octicon URL corresponding to the provided state.

**Example:**

```handlebars
{{getGitHubIcon "passed"}}
<!-- results in: "https://ctrf.io/assets/github/check-circle.svg" -->
{{getGitHubIcon "failed"}}
<!-- results in: "https://ctrf.io/assets/github/stop.svg" -->
{{getGitHubIcon "flaky"}}
<!-- results in: "https://ctrf.io/assets/github/alert.svg" -->
{{getGitHubIcon "stats"}}
<!-- results in: "https://ctrf.io/assets/github/pulse.svg" -->
**Use with CTRF templates**: Perfect for creating GitHub-styled test reports, pull request status comments, GitHub Actions summaries, and any GitHub-integrated test reporting that needs consistent GitHub octicon iconography.
```

---

#### `formatTestPath`

Internal function that maps CTRF states and keywords to appropriate GitHub octicon names. Returns URLs to GitHub octicon SVGs hosted on ctrf.io.

**Parameters:**

- `suite` (`unknown`) - The test suite path (may contain spaces or ">" as separators).
- `name` (`unknown`) - The test name.

**Returns:** `string` - A formatted string with GitHub arrow-right icons between path segments.

**Example:**

```handlebars
{{formatTestPath "filename.ts > suiteone > suitetwo" "test name"}}
<!-- results in: "filename.ts ![arrow-right](https://ctrf.io/assets/github/arrow-right.svg) suiteone ![arrow-right](https://ctrf.io/assets/github/arrow-right.svg) suitetwo ![arrow-right](https://ctrf.io/assets/github/arrow-right.svg) test name" -->
{{formatTestPath suite.name "Login Test"}}
<!-- formats suite path with arrow separators -->
{{formatTestPath "User Tests > Authentication" "should login with valid credentials"}}
<!-- creates clear test hierarchy visualization -->
**Use with CTRF templates**: Perfect for creating GitHub-styled test reports, pull request comments, and any documentation that needs clear test path hierarchies with professional arrow separators.
```

---

### Inflection Helpers

#### `inflect`

Returns either the `singular` or `plural` inflection of a word based on the given `count`. Optionally includes the count in the result. Useful for displaying test counts, result summaries, and dynamic messaging in test reports.

**Parameters:**

- `count` (`unknown`) - The count to determine singular/plural form.
- `singular` (`unknown`) - The singular form of the word.
- `plural` (`unknown`) - The plural form of the word.
- `includeCount` (`unknown`) - Optional. If true, includes the count in the result.

**Returns:** `string` - The appropriate singular/plural form for use in test reports.

**Example:**

```handlebars
{{inflect tests.passed.length "test" "tests"}}
<!-- if 1 passed test: "test" -->
<!-- if 5 passed tests: "tests" -->
{{inflect tests.failed.length "failure" "failures" true}}
<!-- if 0 failures: "0 failures" -->
<!-- if 1 failure: "1 failure" -->
<!-- if 3 failures: "3 failures" -->
{{inflect suite.testCount "case" "cases" true}} found in {{suite.name}}
<!-- results in: "5 cases found in Login Suite" -->
Use in CTRF templates for dynamic test result messaging:
- Test count summaries: "{{inflect total "test" "tests" true}} executed"
- Error reporting: "{{inflect errors.length "error" "errors"}} detected"
- Suite descriptions: "{{inflect suite.tests.length "test case" "test cases"}}"
```

---

#### `ordinalize`

Returns an ordinalized number as a string (1st, 2nd, 3rd, etc.). Useful for ranking test results, iteration counts, and positional information in test reports.

**Parameters:**

- `val` (`unknown`) - The number to ordinalize (can be string or number).

**Returns:** `string` - The ordinalized number for use in test reports.

**Example:**

```handlebars
{{ordinalize test.attempt}}
<!-- if attempt is 1: "1st" -->
<!-- if attempt is 2: "2nd" -->
<!-- if attempt is 3: "3rd" -->
{{ordinalize suite.position}} test suite in the execution order
<!-- results in: "3rd test suite in the execution order" -->
This is the {{ordinalize test.retry}} retry of {{test.name}}
<!-- results in: "This is the 2nd retry of Login Test" -->
Use in CTRF templates for:
- Test execution order: "{{ordinalize index}} test executed"
- Retry information: "{{ordinalize retryCount}} attempt"
- Suite positioning: "{{ordinalize position}} suite in batch"
- Ranking results: "{{ordinalize rank}} fastest test"
```

---

### Match Helpers

#### `match`

Returns an array of strings that match the given glob pattern(s). Useful for filtering test files, assets, or any file paths in test reports based on patterns.

**Parameters:**

- `files` (`string[]|string`) - Array of file paths or single file path from test data.
- `patterns` (`string|string[]`) - One or more glob patterns to match against.
- `options` (`Object`) - Handlebars options object (optional).

**Returns:** `string[]` - Array of file paths that match the patterns for use in test reports.

**Example:**

```handlebars
{{match testFiles "*.spec.js"}}
{{match (readdir "tests") "**\/*.test.ts"}}
{{match test.artifacts "*.png"}}
Given testFiles: ["auth.test.js", "login.spec.js", "utils.js"]
Results in: ["login.spec.js"]
Use with CTRF templates to filter test files by pattern, extract specific artifacts, or organize test results by file type.
```

---

#### `isMatch`

Returns true if a filepath contains the given pattern. Useful for conditional logic in test reports to check if files match specific patterns.

**Parameters:**

- `filepath` (`string`) - The file path from test data to check.
- `pattern` (`string`) - The glob pattern to match against.
- `options` (`Object`) - Handlebars options object (optional).

**Returns:** `boolean` - True if the filepath matches the pattern for use in test reports.

**Example:**

```handlebars
{{isMatch "user-login.spec.ts" "*.spec.*"}}
{{isMatch test.file "*.test.js"}}
Results: true for matching patterns
Use with CTRF templates to conditionally render content based on file patterns, categorize tests by file type, or show different icons for different test categories.
```

---

### Math Helpers

#### `abs`

Return the magnitude (absolute value) of a number. Useful for normalizing test durations, error counts, or differences in CTRF reports.

**Parameters:**

- `a` (`unknown`) - The value to get the absolute value of.

**Returns:** `number` - The absolute value.

**Example:**

```handlebars
{{abs test.duration}}
<!-- given that test.duration is -42 -->
<!-- results in: 42 -->
```

---

#### `add`

Return the sum of a plus b. Useful for aggregating test metrics, such as total retries or combined durations.

**Parameters:**

- `a` (`unknown`) - First number.
- `b` (`unknown`) - Second number.

**Returns:** `number` - The sum.

**Example:**

```handlebars
{{add test.duration 100}}
<!-- given that test.duration is 50 -->
<!-- results in: 150 -->
```

---

#### `addAll`

Adds multiple numbers together and returns the sum. Useful for totaling multiple test metrics or values in a single expression.

**Parameters:**

- `args` (`...unknown`) - The numbers to be added (last argument is Handlebars options).

**Returns:** `number` - The sum of all provided numbers.

**Example:**

```handlebars
{{addAll test.duration test.retries 100}}
<!-- given that test.duration is 50 and test.retries is 3 -->
<!-- results in: 153 -->
{{addAll 1 2 3 4 5}}
<!-- results in: 15 -->
```

---

#### `avg`

Returns the average of all numbers in the given array. Useful for calculating average test durations, retry counts, or error rates in CTRF reports.

**Parameters:**

- `arr` (`unknown`) - Array of numbers (array or JSON string).

**Returns:** `number` - The average value.

**Example:**

```handlebars
{{avg "[1, 2, 3, 4, 5]"}}
<!-- results in: 3 -->
```

---

#### `ceil`

Get the Math.ceil() of the given value. Useful for rounding up test metrics, such as duration or retry counts.

**Parameters:**

- `value` (`unknown`) - The value to ceil.

**Returns:** `number` - The ceiled value.

**Example:**

```handlebars
{{ceil test.duration}}
<!-- given that test.duration is 1.2 -->
<!-- results in: 2 -->
```

---

#### `divide`

Divide a by b. Useful for calculating rates, averages, or percentages in CTRF reports.

**Parameters:**

- `a` (`unknown`) - Numerator.
- `b` (`unknown`) - Denominator.

**Returns:** `number` - The result of division, or 0 if denominator is 0.

**Example:**

```handlebars
{{divide test.duration test.retries}}
<!-- given that test.duration is 100, test.retries is 4 -->
<!-- results in: 25 -->
```

---

#### `floor`

Get the Math.floor() of the given value. Useful for rounding down test metrics, such as duration or retry counts.

**Parameters:**

- `value` (`unknown`) - The value to floor.

**Returns:** `number` - The floored value.

**Example:**

```handlebars
{{floor test.duration}}
<!-- given that test.duration is 1.8 -->
<!-- results in: 1 -->
```

---

#### `minus`

Return the difference of a minus b. Useful for calculating deltas between test metrics, such as duration differences.

**Parameters:**

- `a` (`unknown`) - First number.
- `b` (`unknown`) - Second number.

**Returns:** `number` - The difference.

**Example:**

```handlebars
{{minus test.duration 10}}
<!-- given that test.duration is 50 -->
<!-- results in: 40 -->
```

---

#### `modulo`

Get the remainder of a division operation (a % b). Useful for calculating modulo in test metrics, such as grouping or bucketing.

**Parameters:**

- `a` (`unknown`) - Numerator.
- `b` (`unknown`) - Denominator.

**Returns:** `number` - The remainder.

**Example:**

```handlebars
{{modulo test.index 3}}
<!-- given that test.index is 7 -->
<!-- results in: 1 -->
```

---

#### `multiply`

Return the product of a times b. Useful for scaling test metrics, such as multiplying durations or retry counts.

**Parameters:**

- `a` (`unknown`) - First factor.
- `b` (`unknown`) - Second factor.

**Returns:** `number` - The product.

**Example:**

```handlebars
{{multiply test.duration 2}}
<!-- given that test.duration is 10 -->
<!-- results in: 20 -->
```

---

#### `plus`

Add a by b (alias for add). Useful for summing test metrics.

**Parameters:**

- `a` (`unknown`) - First number.
- `b` (`unknown`) - Second number.

**Returns:** `number` - The sum.

**Example:**

```handlebars
{{plus test.duration 5}}
<!-- given that test.duration is 10 -->
<!-- results in: 15 -->
```

---

#### `random`

Generate a random number between two values (inclusive, integer). Useful for generating random test data or sampling in CTRF reports.

**Parameters:**

- `min` (`unknown`) - Minimum value.
- `max` (`unknown`) - Maximum value.

**Returns:** `number` - Random integer between min and max.

**Example:**

```handlebars
{{random 1 10}}
<!-- results in: 7 (random integer between 1 and 10) -->
```

---

#### `remainder`

Get the remainder when a is divided by b (alias for modulo). Useful for grouping or bucketing test metrics.

**Parameters:**

- `a` (`unknown`) - Numerator.
- `b` (`unknown`) - Denominator.

**Returns:** `number` - The remainder.

**Example:**

```handlebars
{{remainder test.index 4}}
<!-- given that test.index is 10 -->
<!-- results in: 2 -->
```

---

#### `round`

Round the given number to the nearest integer. Useful for rounding test metrics for display in CTRF reports.

**Parameters:**

- `number` (`unknown`) - The number to round.

**Returns:** `number` - The rounded value.

**Example:**

```handlebars
{{round test.duration}}
<!-- given that test.duration is 1.7 -->
<!-- results in: 2 -->
```

---

#### `subtract`

Return the difference of a minus b (alias for minus). Useful for calculating deltas between test metrics.

**Parameters:**

- `a` (`unknown`) - First number.
- `b` (`unknown`) - Second number.

**Returns:** `number` - The difference.

**Example:**

```handlebars
{{subtract test.duration 5}}
<!-- given that test.duration is 10 -->
<!-- results in: 5 -->
```

---

#### `sum`

Returns the sum of all numbers in the given array. Useful for calculating total durations, retries, or error counts in CTRF reports.

**Parameters:**

- `arr` (`unknown`) - Array of numbers (array or JSON string).

**Returns:** `number` - The sum.

**Example:**

```handlebars
{{sum "[1, 2, 3, 4, 5]"}}
<!-- results in: 15 -->
```

---

#### `times`

Multiply number a by number b (alias for multiply). Useful for scaling test metrics.

**Parameters:**

- `a` (`unknown`) - First factor.
- `b` (`unknown`) - Second factor.

**Returns:** `number` - The product.

**Example:**

```handlebars
{{times test.duration 3}}
<!-- given that test.duration is 5 -->
<!-- results in: 15 -->
```

---

### Misc Helpers

#### `option`

Return the given value of prop from this.options. Useful for accessing runtime options passed to the template, such as CTRF configuration or test report metadata.

**Parameters:**

- `prop` (`string`) - The dot-notated property path to retrieve from this.options.

**Returns:** `any` - The value at the given property path, or undefined if not found.

**Example:**

```handlebars
{{option "a.b.c"}}
<!-- If options = { a: { b: { c: "foo" } } }, results in: "foo" -->
```

---

#### `noop`

Block helper that renders the block without taking any arguments. Useful for grouping content or as a placeholder in CTRF test report templates.

**Parameters:**

- `options` (`object`) - Handlebars options object.

**Returns:** `string` - The rendered block content.

**Example:**

```handlebars
{{#noop}}
This block is always rendered.
{{/noop}}
```

---

#### `typeOf`

Get the native type of the given value. Useful for debugging or conditional logic in CTRF test report templates.

**Parameters:**

- `value` (`any`) - The value to check.

**Returns:** `string` - The native type of the value.

**Example:**

```handlebars
{{typeOf 1}}         //=> 'number'
{{typeOf "foo"}}     //=> 'string'
{{typeOf test.data}} //=> 'object'
```

---

#### `withHash`

Block helper that builds the context for the block from the options hash. Useful for injecting dynamic context in CTRF test report templates.

**Parameters:**

- `options` (`object`) - Handlebars options object with hash.

**Returns:** `string` - The rendered block with hash context.

**Example:**

```handlebars
{{#withHash foo="bar" count=3}}
Foo: {{foo}}, Count: {{count}}
{{/withHash}}
<!-- results in: Foo: bar, Count: 3 -->
```

---

### Number Helpers

#### `bytes`

Format a number to its equivalent in bytes. If a string is passed, its length will be formatted and returned. Useful for displaying test file sizes, memory usage, or data transfer amounts in test reports.

**Parameters:**

- `number` (`unknown`) - The number or string from test data to format as bytes.

**Returns:** `string` - The formatted byte string for use in test reports.

**Example:**

```handlebars
{{bytes test.stats.totalFileSize}}
<!-- given that totalFileSize is 13661855 -->
<!-- results in: "13.66 MB" -->
{{bytes test.name}}
<!-- given that test.name is "Login Test" -->
<!-- results in: "10 B" (length of string) -->
{{bytes test.stats.coverageSize}}
<!-- given that coverageSize is 825399 -->
<!-- results in: "825.39 kB" -->
**Use with CTRF templates**: Perfect for displaying test artifact sizes, log file sizes, or memory consumption metrics in test reports.
```

---

#### `addCommas`

Add commas to numbers for improved readability. Useful for formatting large numbers like test counts, execution times, or file sizes in test reports.

**Parameters:**

- `num` (`unknown`) - The number from test data to format with commas.

**Returns:** `string` - The comma-formatted number string for use in test reports.

**Example:**

```handlebars
{{addCommas test.stats.totalTests}}
<!-- given that totalTests is 1500 -->
<!-- results in: "1,500" -->
{{addCommas test.duration}}
<!-- given that duration is 123456 -->
<!-- results in: "123,456" -->
{{addCommas test.stats.assertions}}
<!-- given that assertions is 50000 -->
<!-- results in: "50,000" -->
**Use with CTRF templates**: Essential for making large test metrics readable, such as total test counts, assertion counts, or execution times in milliseconds.
```

---

#### `phoneNumber`

Convert a string or number to a formatted phone number. Useful for formatting contact information in test reports or user data validation tests.

**Parameters:**

- `num` (`unknown`) - The phone number from test data to format, e.g., `8005551212`.

**Returns:** `string` - Formatted phone number: `(800) 555-1212` for use in test reports.

**Example:**

```handlebars
{{phoneNumber test.user.phone}}
<!-- given that user.phone is "8005551212" -->
<!-- results in: "(800) 555-1212" -->
{{phoneNumber "5551234567"}}
<!-- results in: "(555) 123-4567" -->
{{phoneNumber test.contactInfo.emergencyPhone}}
<!-- formats emergency contact numbers in test user data -->
**Use with CTRF templates**: Useful when testing applications with user registration, contact forms, or when displaying formatted test data that includes phone numbers.
```

---

#### `abbreviateNumber`

Abbreviate numbers to the given number of precision. This is for general numbers, not size in bytes. Useful for displaying large test metrics like execution counts or performance numbers in test reports.

**Parameters:**

- `number` (`unknown`) - The number from test data to abbreviate.
- `precision` (`unknown`) - The number of decimal places to show.

**Returns:** `string` - The abbreviated number string for use in test reports.

**Example:**

```handlebars
{{abbreviateNumber test.stats.totalAssertions "2"}}
<!-- given that totalAssertions is 1234567 -->
<!-- results in: "1.23M" -->
{{abbreviateNumber test.performance.opsPerSecond "1"}}
<!-- given that opsPerSecond is 45000 -->
<!-- results in: "45.0k" -->
{{abbreviateNumber test.stats.memoryUsage "3"}}
<!-- given that memoryUsage is 5500000 -->
<!-- results in: "5.500M" -->
**Use with CTRF templates**: Perfect for dashboard displays showing abbreviated test metrics, performance indicators, or large statistical values without overwhelming the report layout.
```

---

#### `toExponential`

Returns a string representing the given number in exponential notation. Useful for displaying very large or very small test metrics and scientific notation in test reports.

**Parameters:**

- `number` (`unknown`) - The number from test data to convert to exponential notation.
- `fractionDigits` (`unknown`) - Optional. The number of digits after the decimal point.

**Returns:** `string` - The exponential notation string for use in test reports.

**Example:**

```handlebars
{{toExponential test.stats.totalExecutions}}
<!-- given that totalExecutions is 1234567 -->
<!-- results in: "1.234567e+6" -->
{{toExponential test.performance.nanoseconds "2"}}
<!-- given that nanoseconds is 0.000123 -->
<!-- results in: "1.23e-4" -->
{{toExponential test.stats.bigNumber "4"}}
<!-- formats very large numbers with 4 fraction digits -->
**Use with CTRF templates**: Ideal for scientific test data, performance benchmarks with extreme values, or when displaying test results that involve very large or very small numbers.
```

---

#### `toFixed`

Formats the given number using fixed-point notation. Useful for displaying consistent decimal precision in test metrics, percentages, and measurements in test reports.

**Parameters:**

- `number` (`unknown`) - The number from test data to format with fixed-point notation.
- `digits` (`unknown`) - Optional. The number of digits after the decimal point (0-20).

**Returns:** `string` - The fixed-point formatted string for use in test reports.

**Example:**

```handlebars
{{toFixed test.coverage.percentage "2"}}
<!-- given that percentage is 85.1234 -->
<!-- results in: "85.12" -->
{{toFixed test.performance.avgResponseTime "3"}}
<!-- given that avgResponseTime is 1.23456 -->
<!-- results in: "1.235" -->
{{toFixed test.stats.successRate "1"}}
<!-- given that successRate is 0.9876 -->
<!-- results in: "1.0" -->
**Use with CTRF templates**: Essential for displaying consistent formatting of percentages, timing data, success rates, and any decimal values in test reports.
```

---

#### `toPrecision`

Returns a string representing the Number object to the specified precision. Useful for displaying test metrics with consistent significant digits and scientific precision in test reports.

**Parameters:**

- `number` (`unknown`) - The number from test data to format with specified precision.
- `precision` (`unknown`) - Optional. The number of significant digits (1-100).

**Returns:** `string` - The precision-formatted string for use in test reports.

**Example:**

```handlebars
{{toPrecision test.performance.throughput "3"}}
<!-- given that throughput is 1.23456 -->
<!-- results in: "1.23" -->
{{toPrecision test.stats.memoryUsage "5"}}
<!-- given that memoryUsage is 123456.789 -->
<!-- results in: "1.2346e+5" -->
{{toPrecision test.timing.duration "2"}}
<!-- given that duration is 0.00123 -->
<!-- results in: "0.0012" -->
**Use with CTRF templates**: Perfect for displaying performance metrics, scientific test data, or any values where you need consistent significant digit precision across different scales.
```

---

#### `toPercent`

Converts a decimal rate (0-1) to a percentage with fixed decimal places. This is specifically for rates from the CTRF insights that are calculated as decimals. Useful for displaying test success rates, failure rates, flaky rates, and coverage percentages in test reports.

**Parameters:**

- `rate` (`unknown`) - The numeric rate as a decimal (0-1) from test data.
- `fractionDigits` (`unknown`) - Optional. The number of decimal places (0-20). Defaults to 2.

**Returns:** `string` - The formatted percentage string for use in test reports.

**Example:**

```handlebars
{{toPercent test.stats.successRate 2}}
<!-- given that successRate is 0.9876 -->
<!-- results in: "98.76" -->
{{toPercent test.coverage.failRate 1}}
<!-- given that failRate is 0.0525 -->
<!-- results in: "5.3" -->
{{toPercent test.performance.flakyRate 3}}
<!-- given that flakyRate is 0.001 -->
<!-- results in: "0.100" -->
**Use with CTRF templates**: Essential for displaying test rates, success/failure percentages, coverage metrics, and any decimal values that represent ratios as readable percentages in test reports.
```

---

### Object Helpers

#### `extend`

Extend the context with the properties of other objects. A shallow merge is performed to avoid mutating the context. Useful for combining test metadata, configuration objects, and report data in CTRF templates.

**Parameters:**

- `context` (`unknown`) - The base context object from test data.
- `objects` (`...unknown`) - One or more objects to extend with.

**Returns:** `Record<string, unknown>` - The extended object for use in test reports.

**Example:**

```handlebars
{{extend test.metadata test.config}}
<!-- merges test metadata with configuration for comprehensive reporting -->
{{extend test.results test.summary}}
<!-- combines test results with summary data for complete report -->
```

---

#### `forIn`

Block helper that iterates over the properties of an object, exposing each key and value on the context. Useful for rendering test metadata, configuration settings, or nested test data in CTRF reports.

**Parameters:**

- `context` (`unknown`) - The object to iterate over from test data.
- `options` (`unknown`) - Handlebars options object.

**Returns:** `string` - Rendered block for each property with key and value exposed.

**Example:**

```handlebars
{{#forIn test.metadata}}
{{@key}}: {{this}}
{{/forIn}}
<!-- renders all metadata key-value pairs -->
{{#forIn test.config}}
<tr><td>{{@key}}</td><td>{{this}}</td></tr>
{{/forIn}}
<!-- creates table rows for configuration settings -->
```

---

#### `forOwn`

Block helper that iterates over the **own** properties of an object, exposing each key and value on the context. Useful for rendering test-specific data without inherited properties in CTRF reports.

**Parameters:**

- `obj` (`unknown`) - The object to iterate over from test data.
- `options` (`unknown`) - Handlebars options object.

**Returns:** `string` - Rendered block for each own property with key and value exposed.

**Example:**

```handlebars
{{#forOwn test.results}}
{{@key}}: {{this}}
{{/forOwn}}
<!-- renders only own properties of test results -->
{{#forOwn test.metadata}}
<li>{{@key}}: {{this}}</li>
{{/forOwn}}
<!-- creates list items for metadata properties -->
```

---

#### `toPath`

Take arguments and, if they are string or number, convert them to a dot-delineated object property path. Useful for creating dynamic property paths for accessing nested test data in CTRF reports.

**Parameters:**

- `props` (`...unknown`) - The property segments to assemble (can be multiple).

**Returns:** `string` - The dot-delineated property path for use in test reports.

**Example:**

```handlebars
{{toPath "test" "results" "status"}}
<!-- results in: "test.results.status" -->
{{toPath "suite" 0 "name"}}
<!-- results in: "suite.0.name" -->
```

---

#### `get`

Use property paths (`a.b.c`) to get a value or nested value from the context. Works as a regular helper or block helper. Useful for accessing deeply nested test data, configuration values, or metadata in CTRF reports.

**Parameters:**

- `prop` (`unknown`) - The property to get, optionally using dot notation for nested properties.
- `context` (`unknown`) - The context object from test data.
- `options` (`unknown`) - The handlebars options object, if used as a block helper.

**Returns:** `unknown` - The retrieved value for use in test reports.

**Example:**

```handlebars
{{get "test.results.status" test}}
<!-- gets the status from nested test results -->
{{get "suite.tests.0.name" data}}
<!-- gets the name of the first test in a suite -->
{{#get "test.metadata" test}}
{{this}}
{{/get}}
<!-- renders metadata as block content -->
```

---

#### `getObject`

Use property paths (`a.b.c`) to get an object from the context. Differs from the `get` helper in that this helper will return the actual object, including the given property key. Also, this helper does not work as a block helper. Useful for accessing parent objects or containers in CTRF reports.

**Parameters:**

- `prop` (`unknown`) - The property to get, optionally using dot notation for nested properties.
- `context` (`unknown`) - The context object from test data.

**Returns:** `unknown` - The retrieved object for use in test reports.

**Example:**

```handlebars
{{getObject "test.results" test}}
<!-- gets the entire results object, not just a nested value -->
{{getObject "suite.tests" data}}
<!-- gets the tests array object from the suite -->
```

---

#### `hasOwn`

Return true if `key` is an own, enumerable property of the given `context` object. Useful for conditional logic and validation in CTRF report templates.

**Parameters:**

- `context` (`unknown`) - The context object from test data.
- `key` (`unknown`) - The property key to check.

**Returns:** `boolean` - True if the key is an own, enumerable property for use in test reports.

**Example:**

```handlebars
{{hasOwn test "status"}}
<!-- returns true if test has own status property -->
{{#if (hasOwn test.metadata "priority")}}
Priority: {{test.metadata.priority}}
{{/if}}
<!-- conditionally displays priority if it exists -->
```

---

#### `isObject`

Return true if `value` is an object. Useful for conditional logic and type checking in CTRF report templates.

**Parameters:**

- `value` (`unknown`) - The value from test data to check.

**Returns:** `boolean` - True if the value is an object for use in test reports.

**Example:**

```handlebars
{{isObject test.results}}
<!-- returns true if test.results is an object -->
{{isObject "string"}}
<!-- returns false -->
{{#if (isObject test.metadata)}}
{{#forIn test.metadata}}
{{@key}}: {{this}}
{{/forIn}}
{{/if}}
<!-- only iterate if metadata is an object -->
```

---

#### `JSONparse`

Parses the given string using `JSON.parse`. Useful for parsing JSON strings from test data, configuration, or API responses in CTRF reports.

**Parameters:**

- `string` (`unknown`) - The string to parse from test data.
- `options` (`unknown`) - Handlebars options object for block usage.

**Returns:** `unknown` - The parsed object for use in test reports.

**Example:**

```handlebars
{{JSONparse test.jsonData}}
<!-- given that test.jsonData is '{"status": "passed", "duration": 1000}' -->
<!-- results in: { status: 'passed', duration: 1000 } -->
{{#JSONparse test.configString}}
{{status}} - {{duration}}ms
{{/JSONparse}}
<!-- parses and renders parsed JSON as block content -->
```

---

#### `JSONstringify`

Stringify an object using `JSON.stringify`. Useful for serializing test data, configuration objects, or complex data structures in CTRF reports.

**Parameters:**

- `obj` (`unknown`) - Object to stringify from test data.

**Returns:** `string` - The JSON string for use in test reports.

**Example:**

```handlebars
{{JSONstringify test.results}}
<!-- given that test.results is { status: 'passed', duration: 1000 } -->
<!-- results in: '{"status":"passed","duration":1000}' -->
{{JSONstringify test.metadata}}
<!-- serializes metadata for logging or debugging -->
```

---

#### `merge`

Deeply merge the properties of the given `objects` with the context object. Useful for combining test data, configuration, and metadata with deep merging in CTRF reports.

**Parameters:**

- `object` (`unknown`) - The target object. Pass an empty object to shallow clone.
- `objects` (`...unknown`) - Additional objects to merge.

**Returns:** `Record<string, unknown>` - The merged object for use in test reports.

**Example:**

```handlebars
{{merge test.results test.metadata}}
<!-- deeply merges test results with metadata -->
{{merge {} test.config test.overrides}}
<!-- creates a new object by merging config with overrides -->
```

---

#### `pick`

Pick properties from the context object. Useful for selecting specific test data fields, creating filtered views, or extracting relevant information in CTRF reports.

**Parameters:**

- `properties` (`unknown`) - One or more properties to pick.
- `context` (`unknown`) - The context object from test data.
- `options` (`unknown`) - Handlebars options object.

**Returns:** `unknown` - Returns an object with the picked values. If used as a block helper, the values are passed as context to the inner block. If no values are found, the context is passed to the inverse block.

**Example:**

```handlebars
{{pick test "name" "status" "duration"}}
<!-- picks only name, status, and duration from test object -->
{{#pick test.metadata "priority" "category"}}
{{priority}} - {{category}}
{{/pick}}
<!-- picks specific metadata fields and renders as block -->
{{#pick test.results "passed" "failed"}}
Passed: {{passed}}, Failed: {{failed}}
{{else}}
No results available
{{/pick}}
<!-- conditionally renders picked values or fallback -->
```

---

### Path Helpers

#### `dirname`

Get the directory path segment from the given `filepath`.

**Parameters:**

- `filepath` (`unknown`) - The file path to extract the directory from.

**Returns:** `string` - The directory path segment for use in test reports.

**Example:**

```handlebars
{{dirname "docs/toc.md"}}
<!-- results in: 'docs' -->
```

---

#### `relative`

Get the relative filepath from `a` to `b`.

**Parameters:**

- `a` (`unknown`) - The base path.
- `b` (`unknown`) - The target path.

**Returns:** `string` - The relative path for use in test reports.

**Example:**

```handlebars
{{relative a b}}
<!-- results in: 'b' relative to 'a' -->
```

---

#### `extname`

Get the file extension from the given `filepath`.

**Parameters:**

- `filepath` (`unknown`) - The file path to extract the extension from.

**Returns:** `string` - The file extension for use in test reports.

**Example:**

```handlebars
{{extname "docs/toc.md"}}
<!-- results in: '.md' -->
```

---

#### `stem`

Get the "stem" (filename without extension) from the given `filepath`.

**Parameters:**

- `filepath` (`unknown`) - The file path to extract the stem from.

**Returns:** `string` - The stem for use in test reports.

**Example:**

```handlebars
{{stem "docs/toc.md"}}
<!-- results in: 'toc' -->
```

---

#### `basename`

Get the file name from the given `filepath`.

**Parameters:**

- `filepath` (`unknown`) - The file path to extract the base name from.

**Returns:** `string` - The base name for use in test reports.

**Example:**

```handlebars
{{basename "docs/toc.md"}}
<!-- results in: 'toc.md' -->
```

---

#### `resolve`

Resolve an absolute path from the given `filepath`.

**Parameters:**

- `filepath` (`unknown`) - The file path to resolve.

**Returns:** `string` - The absolute path for use in test reports.

**Example:**

```handlebars
{{resolve "docs/toc.md"}}
<!-- results in: '/User/dev/docs/toc.md' -->
```

---

#### `segments`

Get specific (joined) segments of a file path by passing a range of array indices.

**Parameters:**

- `filepath` (`unknown`) - The file path to split into segments.
- `start` (`unknown`) - The start index (string or number).
- `end` (`unknown`) - The end index (string or number, inclusive).

**Returns:** `string` - Returns a single, joined file path.

**Example:**

```handlebars
{{segments "a/b/c/d" "2" "3"}}
<!-- results in: 'c/d' -->
{{segments "a/b/c/d" "1" "3"}}
<!-- results in: 'b/c/d' -->
{{segments "a/b/c/d" "1" "2"}}
<!-- results in: 'b/c' -->
```

---

#### `absolute`

Get the directory path segment from the given `filepath` (alias for dirname).

**Parameters:**

- `filepath` (`unknown`) - The file path to extract the directory from.

**Returns:** `string` - The directory path segment for use in test reports.

**Example:**

```handlebars
{{absolute "docs/toc.md"}}
<!-- results in: 'docs' -->
```

---

### Regex Helpers

#### `toRegex`

Convert the given string to a regular expression.

**Parameters:**

- `str` (`unknown`) - The string pattern to convert to a RegExp (from test data or template input).

**Returns:** `RegExp|null` - The RegExp object for use in test reporting, or null if input is invalid.

**Example:**

```handlebars
{{toRegex "foo"}}
<!-- results in: /foo/ -->
{{#if (test test.name (toRegex "^Login"))}}
<!-- Only show for tests whose name starts with 'Login' -->
{{/if}}
Use with CTRF templates to dynamically filter or highlight test names, error messages, or log lines that match a pattern.
```

---

#### `test`

Returns true if the given `str` matches the given regex. A regex can be passed on the context, or using the [toRegex](#toregex) helper as a subexpression.

**Parameters:**

- `str` (`unknown`) - The string to test (from test data).
- `regex` (`unknown`) - The RegExp to test against (from toRegex or context).

**Returns:** `boolean` - True if the string matches the regex, false otherwise.

**Example:**

```handlebars
{{test "bar" (toRegex "foo")}}
<!-- results in: false -->
{{test "foobar" (toRegex "foo")}}
<!-- results in: true -->
{{test "foobar" (toRegex "^foo$")}}
<!-- results in: false -->
{{#if (test test.error (toRegex "timeout"))}}
<!-- Highlight tests with timeout errors in CTRF reports -->
{{/if}}
Use with CTRF templates to conditionally render sections, highlight failures, or group tests by matching patterns in names, errors, or logs.
```

---

### String Helpers

#### `append`

Append the specified `suffix` to the given string.

**Parameters:**

- `str` (`unknown`) - The base string from test data.
- `suffix` (`unknown`) - The suffix to append (e.g., status, file extension, identifier).

**Returns:** `string` - The concatenated string for use in test reports.

**Example:**

```handlebars
{{append test.name " [FLAKY]"}}
<!-- given that "test.name" is "Login Test" -->
<!-- results in: "Login Test [FLAKY]" -->
{{append test.suite.name "."}}{{append test.name ".log"}}
<!-- results in: "AuthSuite.Login Test.log" -->
```

---

#### `camelcase`

Convert the given string to camelCase format. Useful for creating consistent property names, test identifiers, or file naming conventions in test reports.

**Parameters:**

- `str` (`unknown`) - The string from test data to convert to camelCase.

**Returns:** `string` - The camelCased string for use in test reports and identifiers.

**Example:**

```handlebars
{{camelcase "User Login Test"}}
<!-- given that test name is "User Login Test" -->
<!-- results in: "userLoginTest" -->
{{camelcase test.suite.name}}
<!-- converts "Database Connection Suite" to "databaseConnectionSuite" -->
```

---

#### `capitalize`

Capitalize the first word in a sentence. Useful for formatting test names, suite descriptions, and error messages in test reports.

**Parameters:**

- `str` (`unknown`) - The string from test data to capitalize.

**Returns:** `string` - The string with the first character capitalized for use in test reports.

**Example:**

```handlebars
{{capitalize test.name}}
<!-- given that test.name is "user authentication should work" -->
<!-- results in: "User authentication should work" -->
{{capitalize test.suite.name}}
<!-- given that suite.name is "integration tests" -->
<!-- results in: "Integration tests" -->
```

---

#### `capitalizeAll`

Capitalize all words in a string. Useful for formatting test suite titles, section headers, and display names in test reports.

**Parameters:**

- `str` (`unknown`) - The string from test data to capitalize all words.

**Returns:** `string` - The string with all words capitalized for use in test reports.

**Example:**

```handlebars
{{capitalizeAll test.suite.name}}
<!-- given that suite.name is "user authentication tests" -->
<!-- results in: "User Authentication Tests" -->
{{capitalizeAll "api endpoint validation"}}
<!-- results in: "Api Endpoint Validation" -->
```

---

#### `center`

Center a string using non-breaking spaces. Useful for formatting test report headers, status indicators, and table columns.

**Parameters:**

- `str` (`unknown`) - The string from test data to center.
- `spaces` (`unknown`) - The total width for centering.

**Returns:** `string` - The centered string for use in test reports.

**Example:**

```handlebars
{{center test.status "20"}}
<!-- given that test.status is "PASSED" -->
<!-- results in: "       PASSED        " (centered in 20 characters) -->
{{center "Test Results" "30"}}
<!-- results in: "         Test Results          " -->
```

---

#### `chop`

Remove both extraneous whitespace and non-word characters from the beginning and end of a string. Useful for cleaning test names, error messages, and file paths in test reports.

**Parameters:**

- `str` (`unknown`) - The string from test data to clean.

**Returns:** `string` - The cleaned string for use in test reports.

**Example:**

```handlebars
{{chop " __Test Name__ "}}
<!-- results in: "Test Name" -->
{{chop "---API-Test---"}}
<!-- results in: "API-Test" -->
{{chop test.name}}
<!-- cleans test names of extra formatting characters -->
```

---

#### `dashcase`

Convert characters to dash-case (kebab-case). Useful for creating URL-friendly test identifiers, file names, and CSS classes in test reports.

**Parameters:**

- `str` (`unknown`) - The string from test data to convert to dash-case.

**Returns:** `string` - The dash-cased string for use in test reports and identifiers.

**Example:**

```handlebars
{{dashcase "User Login Test"}}
<!-- results in: "user-login-test" -->
{{dashcase test.suite.name}}
<!-- converts "API Endpoint Tests" to "api-endpoint-tests" -->
{{dashcase "Database_Connection Test"}}
<!-- results in: "database-connection-test" -->
```

---

#### `dotcase`

Convert characters to dot.case format. Useful for creating property paths, configuration keys, and structured identifiers in test reports.

**Parameters:**

- `str` (`unknown`) - The string from test data to convert to dot.case.

**Returns:** `string` - The dot.cased string for use in test reports and identifiers.

**Example:**

```handlebars
{{dotcase "User Login Test"}}
<!-- results in: "user.login.test" -->
{{dotcase test.suite.name}}
<!-- converts "API Endpoint Tests" to "api.endpoint.tests" -->
{{dotcase "Database_Connection-Test"}}
<!-- results in: "database.connection.test" -->
```

---

#### `downcase`

Convert all characters to lowercase. Useful for normalizing test names, tags, and identifiers in test reports.

**Parameters:**

- `str` (`unknown`) - The string from test data to convert to lowercase.

**Returns:** `string` - The lowercased string for use in test reports.

**Example:**

```handlebars
{{downcase test.status}}
<!-- converts "PASSED" to "passed" -->
{{downcase "API ENDPOINT TEST"}}
<!-- results in: "api endpoint test" -->
{{downcase test.suite.name}}
<!-- normalizes suite names to lowercase -->
```

---

#### `ellipsis`

Truncate a string to the specified length and append an ellipsis (…). Useful for creating summary views and limiting long test names or messages in test reports.

**Parameters:**

- `str` (`unknown`) - The string from test data to truncate.
- `length` (`unknown`) - The maximum length before truncation.

**Returns:** `string` - The truncated string with ellipsis for use in test reports.

**Example:**

```handlebars
{{ellipsis test.name "20"}}
<!-- given long test name "User Authentication Integration Test" -->
<!-- results in: "User Authentication…" -->
{{ellipsis test.message "50"}}
<!-- truncates error messages for display in tables -->
```

---

#### `hyphenate`

Replace spaces in a string with hyphens. Useful for creating URL-friendly identifiers and file names in test reports.

**Parameters:**

- `str` (`unknown`) - The string from test data to hyphenate.

**Returns:** `string` - The hyphenated string for use in test reports.

**Example:**

```handlebars
{{hyphenate test.name}}
<!-- converts "User Login Test" to "User-Login-Test" -->
{{hyphenate test.suite.name}}
<!-- converts "API Endpoint Tests" to "API-Endpoint-Tests" -->
```

---

#### `isString`

Return true if the value is a string. Useful for conditional logic and validation in test report templates.

**Parameters:**

- `value` (`unknown`) - The value from test data to check.

**Returns:** `boolean` - True if the value is a string for use in test reports.

**Example:**

```handlebars
{{#if (isString test.name)}}
Test: {{test.name}}
{{/if}}
{{isString test.status}}
<!-- results in: true -->
```

---

#### `lowercase`

Convert all characters to lowercase. Useful for normalizing test names, tags, and identifiers in test reports.

**Parameters:**

- `str` (`unknown`) - The string from test data to convert to lowercase.

**Returns:** `string` - The lowercased string for use in test reports.

**Example:**

```handlebars
{{lowercase test.status}}
<!-- converts "PASSED" to "passed" -->
{{lowercase "API ENDPOINT TEST"}}
<!-- results in: "api endpoint test" -->
{{lowercase test.suite.name}}
<!-- normalizes suite names to lowercase -->
```

---

#### `occurrences`

Count the number of occurrences of a substring within a string. Useful for analyzing test patterns, counting failures, or frequency analysis in test reports.

**Parameters:**

- `str` (`unknown`) - The string from test data to search in.
- `substring` (`unknown`) - The substring to count occurrences of.

**Returns:** `number` - The number of occurrences for use in test reports.

**Example:**

```handlebars
{{occurrences test.name "API"}}
<!-- counts how many times "API" appears in test name -->
{{occurrences test.message "error"}}
<!-- counts error occurrences in test messages -->
```

---

#### `pascalcase`

Convert string to PascalCase format. Useful for creating class names, component names, and identifiers in test reports.

**Parameters:**

- `str` (`unknown`) - The string from test data to convert to PascalCase.

**Returns:** `string` - The PascalCased string for use in test reports.

**Example:**

```handlebars
{{pascalcase "user login test"}}
<!-- results in: "UserLoginTest" -->
{{pascalcase test.suite.name}}
<!-- converts "API endpoint tests" to "ApiEndpointTests" -->
```

---

#### `pathcase`

Convert string to path/case format using forward slashes. Useful for creating file paths, URL paths, and hierarchical identifiers in test reports.

**Parameters:**

- `str` (`unknown`) - The string from test data to convert to path/case.

**Returns:** `string` - The path/cased string for use in test reports.

**Example:**

```handlebars
{{pathcase "User Login Test"}}
<!-- results in: "user/login/test" -->
{{pathcase test.suite.name}}
<!-- converts "API Endpoint Tests" to "api/endpoint/tests" -->
```

---

#### `plusify`

Replace spaces in the given string with pluses. Useful for creating URL-safe query parameters and encoded test identifiers in test reports.

**Parameters:**

- `str` (`unknown`) - The string from test data to convert spaces to pluses.

**Returns:** `string` - The string with spaces replaced by plus signs for use in test reports.

**Example:**

```handlebars
{{plusify test.name}}
<!-- converts "User Login Test" to "User+Login+Test" -->
{{plusify "API Endpoint Test"}}
<!-- results in: "API+Endpoint+Test" -->
```

---

#### `prepend`

Prepend the given string with the specified prefix. Useful for adding status indicators, test categories, or formatting in test reports.

**Parameters:**

- `str` (`unknown`) - The base string from test data.
- `prefix` (`unknown`) - The prefix to prepend (e.g., status, category, icon).

**Returns:** `string` - The prefixed string for use in test reports.

**Example:**

```handlebars
{{prepend test.name "✓ "}}
<!-- given that test.name is "User Login" -->
<!-- results in: "✓ User Login" -->
{{prepend test.status "Status: "}}
<!-- results in: "Status: PASSED" -->
```

---

#### `raw`

Render a block without processing Handlebars templates inside the block. Useful for displaying raw template code or examples in test documentation.

**Parameters:**

- `options` (`Object`) - Handlebars options object.

**Returns:** `string` - The raw content without template processing.

**Example:**

```handlebars
{{{{#raw}}}}
{{test.name}} - {{test.status}}
{{{{/raw}}}}
<!-- results in: "{{test.name}} - {{test.status}}" -->
```

---

#### `remove`

Remove all occurrences of substring from the given string. Useful for cleaning test names, removing unwanted characters, or filtering content in test reports.

**Parameters:**

- `str` (`unknown`) - The string from test data to process.
- `substring` (`unknown`) - The substring to remove from the string.

**Returns:** `string` - The string with all occurrences removed for use in test reports.

**Example:**

```handlebars
{{remove test.name "_test"}}
<!-- removes all "_test" occurrences from test names -->
{{remove "User_Login_Test_Suite" "_"}}
<!-- results in: "UserLoginTestSuite" -->
```

---

#### `removeFirst`

Remove the first occurrence of substring from the given string. Useful for cleaning test prefixes or removing specific patterns in test reports.

**Parameters:**

- `str` (`unknown`) - The string from test data to process.
- `substring` (`unknown`) - The substring to remove (first occurrence only).

**Returns:** `string` - The string with first occurrence removed for use in test reports.

**Example:**

```handlebars
{{removeFirst test.name "test_"}}
<!-- removes only the first "test_" from test names -->
{{removeFirst "API_Test_API_Suite" "API_"}}
<!-- results in: "Test_API_Suite" -->
```

---

#### `replace`

Replace all occurrences of substring a with substring b. Useful for normalizing test data, fixing formatting, or transforming content in test reports.

**Parameters:**

- `str` (`unknown`) - The string from test data to process.
- `a` (`unknown`) - The substring to find and replace.
- `b` (`unknown`) - The replacement substring.

**Returns:** `string` - The string with all replacements made for use in test reports.

**Example:**

```handlebars
{{replace test.name "_" " "}}
<!-- converts "User_Login_Test" to "User Login Test" -->
{{replace test.status "PASSED" "✓ PASSED"}}
<!-- adds checkmark to passed status -->
```

---

#### `replaceFirst`

Replace the first occurrence of substring a with substring b. Useful for targeted replacements and formatting in test reports.

**Parameters:**

- `str` (`unknown`) - The string from test data to process.
- `a` (`unknown`) - The substring to find and replace (first occurrence only).
- `b` (`unknown`) - The replacement substring.

**Returns:** `string` - The string with first replacement made for use in test reports.

**Example:**

```handlebars
{{replaceFirst test.name "Test" "Suite"}}
<!-- converts "Test Login Test" to "Suite Login Test" -->
{{replaceFirst test.message "Error:" "⚠️ Error:"}}
<!-- adds warning icon to first error -->
```

---

#### `reverse`

Reverse a string. Useful for creating reversed views, debugging, or special formatting in test reports.

**Parameters:**

- `str` (`unknown`) - The string from test data to reverse.

**Returns:** `string` - The reversed string for use in test reports.

**Example:**

```handlebars
{{reverse test.name}}
<!-- converts "Login Test" to "tseT nigoL" -->
{{reverse "API"}}
<!-- results in: "IPA" -->
```

---

#### `sentence`

Sentence case the given string - capitalize first letter of each sentence. Useful for formatting test descriptions and error messages in test reports.

**Parameters:**

- `str` (`unknown`) - The string from test data to convert to sentence case.

**Returns:** `string` - The sentence-cased string for use in test reports.

**Example:**

```handlebars
{{sentence "hello world. goodbye world."}}
<!-- results in: "Hello world. Goodbye world." -->
{{sentence test.message}}
<!-- properly capitalizes error messages -->
```

---

#### `snakecase`

Convert string to snake_case format. Useful for creating database-friendly identifiers and consistent naming in test reports.

**Parameters:**

- `str` (`unknown`) - The string from test data to convert to snake_case.

**Returns:** `string` - The snake_cased string for use in test reports.

**Example:**

```handlebars
{{snakecase "User Login Test"}}
<!-- results in: "user_login_test" -->
{{snakecase test.suite.name}}
<!-- converts "API Endpoint Tests" to "api_endpoint_tests" -->
```

---

#### `split`

Split string by the given character. Useful for parsing test data, tags, or creating arrays from delimited strings in test reports.

**Parameters:**

- `str` (`unknown`) - The string from test data to split.
- `separator` (`unknown`) - The character or string to split by.

**Returns:** `string[]` - The array of split strings for use in test reports.

**Example:**

```handlebars
{{split test.tags ","}}
<!-- splits "unit,integration,api" into ["unit", "integration", "api"] -->
{{split test.name " "}}
<!-- splits test name into individual words -->
```

---

#### `splitLines`

Splits the given text into an array of lines, omitting any empty lines. Useful for processing multiline strings and iterating over each line in test reports. Perfect for handling stack traces, error messages, or console output.

**Parameters:**

- `str` (`unknown`) - The input string containing one or more lines.

**Returns:** `string[]` - An array of non-empty lines.

**Example:**

```handlebars
{{#each (splitLines test.error.stack)}}
<div class="stack-line">{{this}}</div>
{{/each}}
{{splitLines "Line one\n\nLine two\nLine three"}}
<!-- results in: ["Line one", "Line two", "Line three"] -->
```

---

#### `sliceString`

Extracts a section of a string and returns a new string based on start and end indices. Useful for extracting portions of test IDs, commit hashes, or truncating strings to specific positions.

**Parameters:**

- `str` (`unknown`) - The input string to slice.
- `start` (`unknown`) - The index of the first character to include in the returned substring.
- `end` (`unknown`) - Optional. The index of the first character to exclude from the returned substring.

**Returns:** `string` - A new string containing the extracted section.

**Example:**

```handlebars
{{sliceString "d9a40a70dd26e3b309e9d106adaca2417d4ffb1e" 0 7}}
<!-- results in: "d9a40a7" -->
{{sliceString test.commitHash 0 8}}
<!-- extracts first 8 characters of commit hash -->
{{sliceString test.name 5}}
<!-- extracts from index 5 to end of string -->
```

---

#### `startsWith`

Test whether a string begins with the given prefix. Useful for conditional logic and filtering in test report templates.

**Parameters:**

- `str` (`unknown`) - The string from test data to check.
- `prefix` (`unknown`) - The prefix to test for.

**Returns:** `boolean` - True if string starts with prefix for use in test reports.

**Example:**

```handlebars
{{#if (startsWith test.name "API")}}
🌐 {{test.name}}
{{else}}
{{test.name}}
{{/if}}
{{startsWith test.suite.name "Integration"}}
<!-- results in: true/false -->
```

---

#### `titleize`

Title case the given string - capitalize the first letter of each word. Useful for formatting test suite names, section headers, and display titles in test reports.

**Parameters:**

- `str` (`unknown`) - The string from test data to convert to title case.

**Returns:** `string` - The title-cased string for use in test reports.

**Example:**

```handlebars
{{titleize "this is title case"}}
<!-- results in: "This Is Title Case" -->
{{titleize test.suite.name}}
<!-- converts "integration test suite" to "Integration Test Suite" -->
```

---

#### `trim`

Remove extraneous whitespace from the beginning and end of a string. Useful for cleaning test data and normalizing input in test reports.

**Parameters:**

- `str` (`unknown`) - The string from test data to trim.

**Returns:** `string` - The trimmed string for use in test reports.

**Example:**

```handlebars
{{trim " User Login Test "}}
<!-- results in: "User Login Test" -->
{{trim test.name}}
<!-- cleans whitespace from test names -->
```

---

#### `trimLeft`

Remove extraneous whitespace from the beginning of a string. Useful for cleaning left-aligned content and formatting in test reports.

**Parameters:**

- `str` (`unknown`) - The string from test data to left-trim.

**Returns:** `string` - The left-trimmed string for use in test reports.

**Example:**

```handlebars
{{trimLeft " User Login Test "}}
<!-- results in: "User Login Test " -->
{{trimLeft test.name}}
<!-- removes leading whitespace from test names -->
```

---

#### `trimRight`

Remove extraneous whitespace from the end of a string. Useful for cleaning right-aligned content and formatting in test reports.

**Parameters:**

- `str` (`unknown`) - The string from test data to right-trim.

**Returns:** `string` - The right-trimmed string for use in test reports.

**Example:**

```handlebars
{{trimRight " User Login Test "}}
<!-- results in: " User Login Test" -->
{{trimRight test.name}}
<!-- removes trailing whitespace from test names -->
```

---

#### `truncate`

Truncate a string to the specified length. Useful for creating consistent layouts and limiting content length in test reports.

**Parameters:**

- `str` (`unknown`) - The string from test data to truncate.
- `limit` (`unknown`) - The maximum length as a string.
- `suffix` (`unknown`) - Optional suffix when truncated (defaults to "…").

**Returns:** `string` - The truncated string for use in test reports.

**Example:**

```handlebars
{{truncate test.name "15"}}
<!-- truncates long test names to 15 characters -->
{{truncate test.message "50" "..."}}
<!-- truncates error messages with custom suffix -->
```

---

#### `truncateWords`

Truncate a string to have the specified number of words. Useful for creating word-limited summaries and previews in test reports.

**Parameters:**

- `str` (`unknown`) - The string from test data to truncate.
- `limit` (`unknown`) - The maximum number of words as a string.
- `suffix` (`unknown`) - Optional suffix when truncated (defaults to "...").

**Returns:** `string` - The word-truncated string for use in test reports.

**Example:**

```handlebars
{{truncateWords test.name "3"}}
<!-- truncates "User Login Integration Test Suite" to "User Login Integration..." -->
{{truncateWords test.message "5" " [...]"}}
<!-- truncates error messages to 5 words with custom suffix -->
```

---

#### `upcase`

Uppercase all characters in the given string. Alias for uppercase. Useful for creating emphasis, headers, and status indicators in test reports.

**Parameters:**

- `str` (`unknown`) - The string from test data to convert to uppercase.

**Returns:** `string` - The uppercased string for use in test reports.

**Example:**

```handlebars
{{upcase test.status}}
<!-- converts "passed" to "PASSED" -->
{{upcase "api test"}}
<!-- results in: "API TEST" -->
```

---

#### `uppercase`

Uppercase all characters in the given string. Useful for creating emphasis, headers, and status indicators in test reports.

**Parameters:**

- `str` (`unknown`) - The string from test data to convert to uppercase.

**Returns:** `string` - The uppercased string for use in test reports.

**Example:**

```handlebars
{{uppercase test.status}}
<!-- converts "passed" to "PASSED" -->
{{uppercase "api endpoint test"}}
<!-- results in: "API ENDPOINT TEST" -->
```

---

#### `escapeMarkdown`

Escapes special Markdown characters in the given string. This is useful to ensure that characters like `*`, `_`, `(`, `)`, etc. don't inadvertently format the output as Markdown in test reports or documentation.

**Parameters:**

- `str` (`unknown`) - The input string containing potential Markdown characters.

**Returns:** `string` - The string with Markdown characters escaped.

**Example:**

```handlebars
{{escapeMarkdown "Hello *world*"}}
<!-- results in: "Hello \\*world\\*" -->
{{escapeMarkdown test.name}}
<!-- given that test.name is "test_[important]_case" -->
<!-- results in: "test\\_\\[important\\]\\_case" -->
```

---

#### `stripAnsi`

Strips ANSI escape codes from the given message.

**Parameters:**

- `message` (`unknown`) - The string potentially containing ANSI escape codes.

**Returns:** `string` - The string with all ANSI escape codes removed.

**Example:**

```handlebars
{{stripAnsi "Hello \u001b[31mRed\u001b[0m"}}
Returns: "Hello Red"
```

---

#### `stripAnsi`

Strips ANSI escape codes from a given string.

---

#### `ansiRegex`

Returns a regular expression for matching ANSI escape codes.

---

#### `ansiToHtml`

Converts ANSI escape codes in the given message to HTML. This is useful for displaying colorized console output in a browser.

**Parameters:**

- `message` (`unknown`) - The ANSI-colored string.

**Returns:** `string` - An HTML-formatted string reflecting the original ANSI colors.

**Example:**

```handlebars
{{ansiToHtml "Hello \u001b[31mRed\u001b[0m"}}
Returns: "Hello <span style=\"color:#A00\">Red</span>"
```

---

### Timestamp Helpers

#### `formatTimestampShort`

Converts an ISO 8601 timestamp to a human-readable short format. Perfect for displaying test timestamps, build times, or execution dates in a compact format.

**Parameters:**

- `timestamp` (`unknown`) - The ISO 8601 timestamp string to convert.

**Returns:** `string` - A human-readable string in format "Mon DD, YY, H:MM AM/PM".

**Example:**

```handlebars
{{formatTimestampShort "2025-01-19T15:06:45Z"}}
<!-- results in: "Jan 19, 25, 3:06 PM" -->
{{formatTimestampShort test.timestamp}}
<!-- converts test execution time to readable format -->
{{formatTimestampShort build.createdAt}}
<!-- shows build creation time in short format -->
```

---

### Url Helpers

#### `encodeURIComponent`

Encode a Uniform Resource Identifier (URI) component by replacing each instance of certain characters by one, two, three, or four escape sequences representing the UTF-8 encoding of the character.

**Parameters:**

- `str` (`unknown`) - The un-encoded string from test data or CTRF report.

**Returns:** `string` - The encoded string for use in URLs or test report links.

**Example:**

```handlebars
{{encodeURIComponent test.name}}
<!-- given test.name = "User Login Test" -->
<!-- results in: "User%20Login%20Test" -->
```

---

#### `escapeUrl`

Escape the given string by replacing characters with escape sequences. Useful for allowing the string to be used in a URL, etc.

**Parameters:**

- `str` (`unknown`) - The string to escape from test data or CTRF report.

**Returns:** `string` - Escaped string for use in URLs or test report links.

**Example:**

```handlebars
{{escapeUrl test.name}}
<!-- given test.name = "User/Login?Test" -->
<!-- results in: "User%2FLogin%3FTest" -->
```

---

#### `decodeURIComponent`

Decode a Uniform Resource Identifier (URI) component.

**Parameters:**

- `str` (`unknown`) - The encoded string from test data or CTRF report.

**Returns:** `string` - The decoded string for display in test reports.

**Example:**

```handlebars
{{decodeURIComponent encodedName}}
<!-- given encodedName = "User%20Login%20Test" -->
<!-- results in: "User Login Test" -->
```

---

#### `resolveUrl`

Take a base URL and a href URL, and resolve them as a browser would for an anchor tag.

**Parameters:**

- `base` (`unknown`) - The base URL (e.g., test report root).
- `href` (`unknown`) - The href to resolve (e.g., relative path to resource).

**Returns:** `string` - The resolved URL for use in test report links.

**Example:**

```handlebars
{{resolveUrl baseUrl href}}
<!-- baseUrl = "https://example.com/tests/", href = "../report.html" -->
<!-- results in: "https://example.com/report.html" -->
```

---

#### `stripQueryString`

Strip the query string from the given URL.

**Parameters:**

- `url` (`unknown`) - The URL to strip query string from.

**Returns:** `string` - The URL without the query string, for clean display in test reports.

**Example:**

```handlebars
{{stripQueryString url}}
<!-- url = "https://example.com/test?run=123" -->
<!-- results in: "https://example.com/test" -->
```

---

#### `stripProtocol`

Strip protocol from a URL. Useful for displaying media that may have an 'http' protocol on secure connections.

**Parameters:**

- `str` (`unknown`) - The URL string to strip protocol from.

**Returns:** `string` - The URL with http/https protocol stripped, for use in test report links.

**Example:**

```handlebars
<!-- url = 'http://foo.bar' -->
{{stripProtocol url}}
<!-- results in: '//foo.bar' -->
```

---

<!-- DOCS_END -->

## Development

### Building

```bash
npm run build
```

### Testing

```bash
npm test
```

### Linting

```bash
npm run lint
```

### Running Tests

```bash
npm run test
```

### Generating Documentation

Generate HTML documentation:

```bash
npm run docs
```

Generate and update README with documentation:

```bash
npm run docs:readme
```

Watch for changes and regenerate docs:

```bash
npm run docs:watch
```

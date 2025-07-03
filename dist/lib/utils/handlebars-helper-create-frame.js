import { createFrame } from './index.js';
/**
 * Block helper for exposing private `@` variables on the context
 */
export function frame(options) {
    createFrame(options, options.hash);
    return options.fn(this);
}
export default frame;
//# sourceMappingURL=handlebars-helper-create-frame.js.map
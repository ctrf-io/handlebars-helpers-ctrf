import type { HandlebarsHelperOptions } from '../../types.js';
import { createFrame } from './index.js';

/**
 * Block helper for exposing private `@` variables on the context
 */
export function frame(this: any, options: HandlebarsHelperOptions): string {
  createFrame(options, options.hash);
  return options.fn(this);
}

export default frame; 
import type { HelperOptions } from 'handlebars';

export interface HandlebarsHelperOptions extends HelperOptions {
  fn: (context: any) => string;
  inverse: (context: any) => string;
  hash: Record<string, any>;
  data?: Record<string, any>;
}

export interface HandlebarsHelpers {
  [key: string]: (...args: any[]) => any;
}

export interface HelperGroup {
  [key: string]: HandlebarsHelper;
}

export type HandlebarsHelper = (...args: any[]) => any;

export interface HandlebarsInstance {
  registerHelper(name: string, fn: HandlebarsHelper): void;
  registerHelper(helpers: Record<string, HandlebarsHelper>): void;
  helpers: Record<string, HandlebarsHelper>;
}

export interface HelperRegistrationOptions {
  handlebars?: HandlebarsInstance;
  hbs?: HandlebarsInstance;
}

export interface ArrayHelperOptions extends HandlebarsHelperOptions {
  property?: string;
  prop?: string;
}

export interface ComparisonValue {
  operator?: string;
  value?: any;
}

export interface FrameData {
  [key: string]: any;
}

export interface UtilsInterface {
  isUndefined(value: any): boolean;
  isNumber(value: any): boolean;
  isString(value: any): boolean;
  isArray(value: any): boolean;
  isObject(value: any): boolean;
  isFunction(value: any): boolean;
  get(object: any, path: string): any;
  createFrame(options: HandlebarsHelperOptions, hash?: Record<string, any>): FrameData;
  contains(array: any[], item: any, start?: number): boolean;
  chop(str: string): string;
  changecase(str: string, fn?: (ch: string) => string): string;
  random(min: number, max: number): number;
  identity<T>(value: T): T;
}

export interface KindOfFunction {
  (value: any): string;
}

export interface DateHelperOptions {
  format?: string;
  locale?: string;
}

export interface MathHelperOptions {
  precision?: number;
}

export interface StringHelperOptions {
  length?: number;
  truncate?: boolean;
  suffix?: string;
}

export interface UrlHelperOptions {
  relative?: boolean;
  stripWWW?: boolean;
}

export interface ObjectHelperOptions {
  keys?: boolean;
  values?: boolean;
  entries?: boolean;
}

export interface CollectionHelperOptions {
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  filterBy?: string;
  filterValue?: any;
}

export interface I18nHelperOptions {
  locale?: string;
  fallback?: string;
}

export interface MarkdownHelperOptions {
  gfm?: boolean;
  breaks?: boolean;
  sanitize?: boolean;
}

export interface LoggingHelperOptions {
  level?: 'debug' | 'info' | 'warn' | 'error';
  prefix?: string;
}

export interface PathHelperOptions {
  relative?: boolean;
  absolute?: boolean;
}

export interface RegexHelperOptions {
  flags?: string;
  global?: boolean;
}

export interface HtmlHelperOptions {
  escape?: boolean;
  attributes?: Record<string, string>;
}

export interface NumberHelperOptions {
  precision?: number;
  format?: string;
  locale?: string;
}

export interface CodeHelperOptions {
  language?: string;
  lineNumbers?: boolean;
  theme?: string;
}

export interface InflectionHelperOptions {
  count?: number;
  includeNumber?: boolean;
}

export interface FsHelperOptions {
  encoding?: string;
  flag?: string;
}

export interface MatchHelperOptions {
  ignoreCase?: boolean;
  exact?: boolean;
}

export interface MiscHelperOptions {
  [key: string]: any;
} 
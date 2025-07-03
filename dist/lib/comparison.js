/**
 * Block helper that renders a block if `a` is equal to `b`.
 */
export function eq(a, b, options) {
    if (arguments.length === 2) {
        options = b;
        b = options.hash?.compare;
    }
    if (a === b) {
        return options.fn(this);
    }
    return options.inverse(this);
}
/**
 * Block helper that renders a block if `a` is not equal to `b`.
 */
export function ne(a, b, options) {
    if (arguments.length === 2) {
        options = b;
        b = options.hash?.compare;
    }
    if (a !== b) {
        return options.fn(this);
    }
    return options.inverse(this);
}
/**
 * Block helper that renders a block if `a` is less than `b`.
 */
export function lt(a, b, options) {
    if (arguments.length === 2) {
        options = b;
        b = options.hash?.compare;
    }
    if (a < b) {
        return options.fn(this);
    }
    return options.inverse(this);
}
/**
 * Block helper that renders a block if `a` is greater than `b`.
 */
export function gt(a, b, options) {
    if (arguments.length === 2) {
        options = b;
        b = options.hash?.compare;
    }
    if (a > b) {
        return options.fn(this);
    }
    return options.inverse(this);
}
/**
 * Block helper that renders a block if `a` is less than or equal to `b`.
 */
export function lte(a, b, options) {
    if (arguments.length === 2) {
        options = b;
        b = options.hash?.compare;
    }
    if (a <= b) {
        return options.fn(this);
    }
    return options.inverse(this);
}
/**
 * Block helper that renders a block if `a` is greater than or equal to `b`.
 */
export function gte(a, b, options) {
    if (arguments.length === 2) {
        options = b;
        b = options.hash?.compare;
    }
    if (a >= b) {
        return options.fn(this);
    }
    return options.inverse(this);
}
/**
 * Block helper that renders a block if `value` is falsy.
 */
export function ifFalsy(value, options) {
    if (!value) {
        return options.fn(this);
    }
    return options.inverse(this);
}
/**
 * Block helper that renders a block if `value` is truthy.
 */
export function ifTruthy(value, options) {
    if (value) {
        return options.fn(this);
    }
    return options.inverse(this);
}
/**
 * Block helper that renders a block if `value` is defined.
 */
export function ifDefined(value, options) {
    if (value !== undefined) {
        return options.fn(this);
    }
    return options.inverse(this);
}
/**
 * Block helper that renders a block if `value` is undefined.
 */
export function ifUndefined(value, options) {
    if (value === undefined) {
        return options.fn(this);
    }
    return options.inverse(this);
}
/**
 * Block helper that renders a block if any of the given values are truthy.
 */
export function or(...args) {
    const options = args[args.length - 1];
    const values = args.slice(0, -1);
    if (values.some(Boolean)) {
        return options.fn(this);
    }
    return options.inverse(this);
}
/**
 * Block helper that renders a block if all of the given values are truthy.
 */
export function and(...args) {
    const options = args[args.length - 1];
    const values = args.slice(0, -1);
    if (values.every(Boolean)) {
        return options.fn(this);
    }
    return options.inverse(this);
}
//# sourceMappingURL=comparison.js.map
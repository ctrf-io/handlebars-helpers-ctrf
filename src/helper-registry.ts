/**
 * Represents a Handlebars instance for registering and compiling templates.
 */
export interface HandlebarsInstance {
	registerHelper: (name: string, fn: (...args: unknown[]) => unknown) => void;
	unregisterHelper: (name: string) => void;
	compile: (template: string) => (data: unknown) => string;
	helpers: Record<string, unknown>;
}

/**
 * Describes a filter for selecting helpers by name or category.
 */
export type HelperFilter = {
	name?: string;
	category?: string;
};

/**
 * Represents a single Handlebars helper.
 */
export type Helper = {
	name: string;
	category: string;
	fn: (...arguments_: unknown[]) => unknown;
};

/**
 * Registry for managing Handlebars helpers.
 */
export class HelperRegistry {
	private readonly _helpers: Helper[] = [];

	/**
	 * Creates a new HelperRegistry and initializes it.
	 */
	constructor() {
		this.init();
	}

	/**
	 * Initializes the helper registry. Override to add custom initialization logic.
	 */
	public init() {}

	/**
	 * Registers a helper.
	 * @param helper - The helper to register.
	 * @returns True if the helper was registered, false if it already exists.
	 */
	public register(helper: Helper): boolean {
		if (!this.has(helper.name)) {
			this._helpers.push(helper);
			return true;
		}

		return false;
	}

	/**
	 * Registers multiple helpers.
	 * @param helpers - The helpers to register.
	 */
	public registerHelpers(helpers: Helper[]) {
		for (const helper of helpers) {
			this.register(helper);
		}
	}

	/**
	 * Checks if a helper is registered.
	 * @param name - The name of the helper.
	 * @returns True if the helper is registered, false if it is not.
	 */
	public has(name: string): boolean {
		return this._helpers.some((helper) => helper.name === name);
	}

	/**
	 * Filters helpers by name and/or category.
	 * @param filter - The filter to apply.
	 * @returns The filtered helpers.
	 */
	public filter(filter: HelperFilter): Helper[] {
		return this._helpers.filter(
			(helper) =>
				(!filter.name || helper.name === filter.name) &&
				(!filter.category || helper.category === filter.category),
		);
	}

	/**
	 * Loads all registered helpers into a Handlebars instance.
	 * @param handlebars - The Handlebars instance.
	 */
	public loadHandlebars(handlebars: HandlebarsInstance) {
		for (const helper of this._helpers) {
			handlebars.registerHelper(helper.name, helper.fn);
		}
	}

	/**
	 * Swaps (replaces) helpers in a Handlebars instance with the registered helpers.
	 * @param handlebars - The Handlebars instance.
	 */
	public swapHelpers(handlebars: HandlebarsInstance) {
		for (const helper of this._helpers) {
			handlebars.unregisterHelper(helper.name);
			handlebars.registerHelper(helper.name, helper.fn);
		}
	}
}

// @ts-types="npm:@types/jsdom@21.1.7"
import { JSDOM } from "jsdom";

/**
 * Default JSDOM `html` parameter for {@linkcode registerDomGlobals}.
 *
 * ```html
 * <!DOCTYPE html>
 * <html>
 *   <body>
 *     <div id="root"></div>
 *   </body>
 * </html>
 * ```
 */
export const DEFAULT_HTML: ConstructorParameters<typeof JSDOM>[0] = `
  <!DOCTYPE html>
  <html>
    <body>
      <div id="root"></div>
    </body>
  </html>
`;

/**
 * Register JSDOM globals.
 *
 * After its invocation, `window` and `document` are available in the global scope:
 * - `globalThis.window` or `window` => `DOMWindow`
 * - `globalThis.document` or `document` => `Document`
 *
 * @param {JSDOM} dom [JSDOM](https://github.com/jsdom/jsdom#jsdom-object-api) instance (default `html` parameter: {@linkcode DEFAULT_HTML})
 * @returns {JSDOM} [JSDOM](https://github.com/jsdom/jsdom#jsdom-object-api) instance
 */
export function registerDomGlobals(
  dom: JSDOM = new JSDOM(DEFAULT_HTML),
): JSDOM {
  const window = dom.window;
  const document = window.document;

  // deno-lint-ignore no-explicit-any
  (globalThis as any).window = window;
  // deno-lint-ignore no-explicit-any
  (globalThis as any).document = document;

  return dom;
}

/**
 * Unregister JSDOM globals.
 *
 * After its invocation, `window` and `document` are not available anymore:
 * - `globalThis.window` or `window` => `undefined`
 * - `globalThis.document` or `document` => `undefined`
 */
export function unregisterDomGlobals(): void {
  // deno-lint-ignore no-explicit-any
  (globalThis as any).window = undefined;
  // deno-lint-ignore no-explicit-any
  (globalThis as any).document = undefined;
}

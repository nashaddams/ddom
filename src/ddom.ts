// @ts-types="npm:@types/jsdom@27.0.0"
import { JSDOM } from "jsdom";

/**
 * Register and unregister JSDOM globals.
 */
export class DDOM {
  /**
   * Default JSDOM `html` parameter for {@linkcode DDOM.register}.
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
  static readonly DEFAULT_HTML: ConstructorParameters<typeof JSDOM>[0] = `
    <!DOCTYPE html>
    <html>
      <body>
        <div id="root"></div>
      </body>
    </html>
  `;

  /**
   * Default JSDOM `options.url` parameter for {@linkcode DDOM.register}.
   *
   * ```
   * http://localhost
   * ```
   */
  static readonly DEFAULT_URL: string = "http://localhost";

  /**
   * Register JSDOM globals.
   *
   * After its invocation, `window` and `document` are available in the global scope:
   * - `globalThis.window` or `window` => `DOMWindow`
   * - `globalThis.document` or `document` => `Document`
   *
   * @param {JSDOM} dom [JSDOM](https://github.com/jsdom/jsdom#jsdom-object-api) instance
   * @returns {JSDOM} [JSDOM](https://github.com/jsdom/jsdom#jsdom-object-api) instance
   */
  static register(
    dom: JSDOM = new JSDOM(DDOM.DEFAULT_HTML, { url: DDOM.DEFAULT_URL }),
  ): JSDOM & { [Symbol.dispose](): void } {
    // deno-lint-ignore no-explicit-any
    (globalThis as any).window = dom.window;
    // deno-lint-ignore no-explicit-any
    (globalThis as any).document = dom.window.document;

    return Object.assign(dom, {
      [Symbol.dispose]() {
        // deno-lint-ignore no-explicit-any
        (globalThis as any).window = undefined;
        // deno-lint-ignore no-explicit-any
        (globalThis as any).document = undefined;
      },
    });
  }

  /**
   * Unregister JSDOM globals.
   *
   * After its invocation, `window` and `document` are not available anymore:
   * - `globalThis.window` or `window` => `undefined`
   * - `globalThis.document` or `document` => `undefined`
   */
  static unregister(): void {
    // deno-lint-ignore no-explicit-any
    (globalThis as any).window = undefined;
    // deno-lint-ignore no-explicit-any
    (globalThis as any).document = undefined;
  }
}

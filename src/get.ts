/**
 * Get an element by its test ID.
 *
 * @param testId The `data-testid` value.
 * @returns The HTML element.
 *
 * @example Get an element
 * ```ts
 * registerDomGlobals(
 *   new JSDOM(`
 *     <!DOCTYPE html>
 *     <html>
 *       <body>
 *         <button data-testid="my-button">Click me!</button>
 *       </body>
 *     </html>
 *   `),
 * );
 *
 * getByTestId<HTMLButtonElement>("my-button").click();
 * ```
 */
export function getByTestId<T extends Element = Element>(testId: string): T {
  const element = document.querySelector<T>(`[data-testid="${testId}"]`);

  if (!element) {
    throw new Error(`No element found with data-testid="${testId}"`);
  }

  return element as T;
}

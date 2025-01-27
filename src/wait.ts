import { RetryError } from "@std/async/retry";

/** Retry options for {@linkcode waitFor}. */
export type RetryOptions = {
  /**
   * Maximum retry attempts.
   *
   * @default {1}
   */
  maxAttempts?: number;
  /**
   * Delay in milliseconds after a failed attempt.
   *
   * @default {100}
   */
  delay?: number;
};

/**
 * Calls the given function and retries as long as it throws.
 *
 * @example Wait for a button click
 * ```ts
 * const count = getByTestId("count");
 * getByTestId<HTMLButtonElement>("increment").click();
 * await waitFor(() => assertEquals(count.textContent, "4711"));
 * ```
 *
 * @example Wait for the root to be rendered
 * ```ts
 * createRoot(document.body).render(<Counter initialCount={5} />);
 * await waitFor(() => assertGreater(document.body.children.length, 0));
 * ```
 *
 * @typeParam T The return type of the function to retry and returned promise.
 * @param fn The function to retry.
 * @param {RetryOptions} retryOptions Retry options.
 * @returns The promise that resolves with the value returned by the function to retry.
 */
export async function waitFor<T>(
  fn: (() => Promise<T>) | (() => T),
  retryOptions?: RetryOptions,
): Promise<T> {
  const {
    maxAttempts = 10,
    delay = 100,
  } = retryOptions ?? {};

  let attempt = 0;

  while (true) {
    try {
      return await fn();
    } catch (err) {
      if (attempt + 1 >= maxAttempts) {
        throw new RetryError(err, maxAttempts);
      }

      await new Promise((r) => setTimeout(r, delay));
    }

    attempt++;
  }
}

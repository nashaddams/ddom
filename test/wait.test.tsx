import { assertEquals, assertRejects } from "@std/assert";
import { waitFor } from "../mod.ts";

Deno.test("should wait and retry for a function result", async () => {
  let value = 4711;
  const timeoutId = setTimeout(() => {
    value = 4712;
  }, 200);

  await waitFor(() => {
    assertEquals(value, 4712);
  });

  clearTimeout(timeoutId);
});

Deno.test("should wait, retry, and throw if the timeout is reached", async () => {
  let timeoutId: number | undefined;

  await assertRejects(
    async () => {
      let value = 4711;
      timeoutId = setTimeout(() => {
        value = 4712;
      }, 300);

      await waitFor(() => {
        assertEquals(value, 4712);
      }, {
        delay: 10,
      });
    },
    Error,
    "Retrying exceeded",
  );

  clearTimeout(timeoutId);
});

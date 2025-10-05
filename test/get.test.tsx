// @ts-types="npm:@types/jsdom@21.1.7"
import { JSDOM } from "jsdom";
import { assertEquals, assertThrows } from "@std/assert";
import { DDOM, getByTestId } from "../mod.ts";

DDOM.register(
  new JSDOM(`
    <!DOCTYPE html>
    <html>
      <body>
        <div data-testid="hello">Hello there!</div>
      </body>
    </html>
  `),
);

Deno.test("should get an element by test id", () => {
  assertEquals(getByTestId("hello").textContent, "Hello there!");
});

Deno.test("should throw if an element can't be found", () => {
  assertThrows(
    () => {
      getByTestId("there");
    },
    Error,
    'No element found with data-testid="there"',
  );
});

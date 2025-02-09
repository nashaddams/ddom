import { assert, assertEquals } from "@std/assert";
import { registerDOM, unregisterDOM } from "../mod.ts";

Deno.test("should register and unregister dom globals", () => {
  assertEquals(globalThis.window, undefined);
  assertEquals(globalThis.document, undefined);

  registerDOM();

  assert(globalThis.window);
  assert(globalThis.document);

  unregisterDOM();

  assertEquals(globalThis.window, undefined);
  assertEquals(globalThis.document, undefined);
});

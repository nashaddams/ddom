import { assert, assertEquals } from "@std/assert";
import { DDOM } from "../mod.ts";

Deno.test("should register and unregister dom globals", () => {
  assertEquals(globalThis.window, undefined);
  assertEquals(globalThis.document, undefined);

  DDOM.register();

  assert(globalThis.window);
  assert(globalThis.document);

  DDOM.unregister();

  assertEquals(globalThis.window, undefined);
  assertEquals(globalThis.document, undefined);
});

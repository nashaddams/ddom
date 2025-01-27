import { assert, assertEquals } from "@std/assert";
import { registerDomGlobals, unregisterDomGlobals } from "../mod.ts";

Deno.test("should register and unregister dom globals", () => {
  assertEquals(globalThis.window, undefined);
  assertEquals(globalThis.document, undefined);

  registerDomGlobals();

  assert(globalThis.window);
  assert(globalThis.document);

  unregisterDomGlobals();

  assertEquals(globalThis.window, undefined);
  assertEquals(globalThis.document, undefined);
});

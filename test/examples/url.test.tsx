import { assertEquals, assertGreater } from "@std/assert";
import { createRoot } from "react-dom/client";
import { DDOM, getByTestId, waitFor } from "../../mod.ts";
import { Url } from "./url.tsx";

Deno.test("should change and recognize search params", async () => {
  using dom = DDOM.register();
  const root = document.getElementById("root")!;

  createRoot(root).render(<Url />);
  await waitFor(() => assertGreater(root.children.length, 0));

  getByTestId<HTMLButtonElement>("set-param").click();
  await waitFor(() =>
    assertEquals(dom.window.document.location.search, "?hello=there")
  );
});

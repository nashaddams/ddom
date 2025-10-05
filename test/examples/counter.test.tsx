import { assertEquals, assertGreater } from "@std/assert";
import { createRoot } from "react-dom/client";
import { DDOM, getByTestId, waitFor } from "../../mod.ts";
import { Counter } from "./counter.tsx";

Deno.test("should render and interact with a react component", async () => {
  using _ = DDOM.register();

  const root = document.getElementById("root")!;
  assertEquals(root.children.length, 0);

  createRoot(root).render(<Counter initialCount={4711} />);
  await waitFor(() => assertGreater(root.children.length, 0));

  const count = getByTestId("count");

  getByTestId<HTMLButtonElement>("increment").click();
  await waitFor(() => assertEquals(count.textContent, "4712"));
});

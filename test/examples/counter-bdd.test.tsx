import { afterEach, beforeEach, describe, it } from "@std/testing/bdd";
import { assertEquals, assertGreater } from "@std/assert";
import { createRoot } from "react-dom/client";
import { getByTestId, registerDOM, unregisterDOM, waitFor } from "../../mod.ts";
import { Counter } from "./counter.tsx";

describe("counter (bdd)", () => {
  beforeEach(() => {
    registerDOM();
  });

  afterEach(() => {
    unregisterDOM();
  });

  it("should render and interact with a react component", async () => {
    const root = document.getElementById("root")!;
    assertEquals(root.children.length, 0);

    createRoot(root).render(<Counter initialCount={4711} />);
    await waitFor(() => assertGreater(root.children.length, 0));

    const count = getByTestId("count");

    getByTestId<HTMLButtonElement>("increment").click();
    await waitFor(() => assertEquals(count.textContent, "4712"));
  });
});

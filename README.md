# DDOM

[![JSR](https://jsr.io/badges/@nashaddams/ddom)](https://jsr.io/@nashaddams/ddom)
[![JSR score](https://jsr.io/badges/@nashaddams/ddom/score)](https://jsr.io/@nashaddams/ddom)
[![main](https://github.com/nashaddams/ddom/actions/workflows/tests.yml/badge.svg)](https://github.com/nashaddams/ddom/actions)

Testing utilities for React components and vanilla HTML/JS, powered by
[`JSDOM`](https://github.com/jsdom/jsdom).

## Usage

```tsx
import { useState } from "react";

export function Counter({ initialCount }: { initialCount: number }) {
  const [count, setCount] = useState(initialCount);
  const increment = () => setCount((prev) => prev + 1);

  return (
    <div>
      <span>Current value:&nbsp;</span>
      <span data-testid="count">{count}</span>
      <button data-testid="increment" onClick={increment}>
        Increment
      </button>
    </div>
  );
}
```

```tsx
import { afterEach, beforeEach, describe, it } from "@std/testing/bdd";
import { assertEquals, assertGreater } from "@std/assert";
import {
  getByTestId,
  registerDomGlobals,
  unregisterDomGlobals,
  waitFor,
} from "@nashaddams/ddom";
import { createRoot } from "react-dom/client";
import { Counter } from "./counter.tsx";

describe("counter", () => {
  beforeEach(() => {
    registerDomGlobals();
  });

  afterEach(() => {
    unregisterDomGlobals();
  });

  it("should render and interact with a react component", async () => {
    const root = document.body;
    assertEquals(root.children.length, 0);

    createRoot(root).render(<Counter initialCount={4711} />);
    await waitFor(() => assertGreater(root.children.length, 0));

    const count = getByTestId("count");

    getByTestId<HTMLButtonElement>("increment").click();
    await waitFor(() => assertEquals(count.textContent, "4712"));
  });
});
```

See [the docs](https://jsr.io/@nashaddams/ddom/doc) for further details.

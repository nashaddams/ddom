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

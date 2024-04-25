import { useState } from "react";
import "./App.css";

import * as Comlink from "comlink";

// I'm just using comlink here as an abstraction for postMessage(...)
const MyWorker = Comlink.wrap(
  new Worker(new URL("./worker.ts", import.meta.url), {
    type: "module",
  })
) as unknown as { counter: Promise<number>; inc(): Promise<void> };

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="card">
      <button
        onClick={async () => {
          await MyWorker.inc();
          setCount(await MyWorker.counter);
        }}
      >
        count is {count}
      </button>
    </div>
  );
}

export default App;

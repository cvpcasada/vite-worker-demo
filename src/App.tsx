import { useEffect } from "react";
import "./App.css";

import * as Comlink from "comlink";

import type { Store } from "./worker";
import { proxy, snapshot, subscribe, useSnapshot } from "valtio";
import { getChanges } from "sinks";

const initial = { count: 0, arr: [] as number[] };
const store = proxy(structuredClone(initial));
let prevSnap = snapshot(store);

// I'm just using comlink here as an abstraction for postMessage(...)
const MyWorker = Comlink.wrap<Store>(
  new Worker(new URL("./worker.ts", import.meta.url), {
    type: "module",
  })
);

function App() {
  const data = useSnapshot(store);

  useEffect(() => {
    return subscribe(store, async () => {
      const newSnapshot = snapshot(store);
      if (prevSnap === newSnapshot) return;

      const changes = getChanges(prevSnap, newSnapshot);
      prevSnap = newSnapshot;
      await MyWorker.updateStore(changes);
    });
  }, []);

  return (
    <div className="card">
      <button
        onClick={async () => {
          const count = store.count + 1;
          store.count = count;
          store.arr.push(count);
        }}
      >
        count is {data.count}
      </button>

      <button
        onClick={async () => {
          Object.assign(store, structuredClone(initial));
        }}
      >
        reset
      </button>
    </div>
  );
}

export default App;

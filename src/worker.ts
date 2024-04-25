// note: normal imports!!!
import * as Comlink from "comlink";
import { proxy, snapshot, subscribe } from "valtio/vanilla";
import { updateObject } from "sinks";

// ----------------------------------------------------------------------
export class Store {
  private initial = { count: 0, arr: [] as number[] };
  private store = proxy(structuredClone(this.initial));
  destroy: () => void;

  constructor() {
    this.destroy = subscribe(this.store, () => {
      console.log("w: ", snapshot(this.store));
    });
  }

  // our schema is large so we only send store diffs to worker
  updateStore(diff: unknown) {
    Object.assign(this.store, updateObject(this.store, diff));
  }

}

Comlink.expose(new Store());

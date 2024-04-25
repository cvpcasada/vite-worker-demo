// note: normal imports!!!
import * as Comlink from "comlink";

const obj = {
  counter: 0,
  inc() {
    this.counter++;
  },
};

export type TWorker = typeof obj; 

Comlink.expose(obj);

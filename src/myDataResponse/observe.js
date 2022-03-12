import { Observer } from "./observer.js";
import reactArray from "./reactArray.js";

export default function observe(obj) {
  if (typeof obj != "object") {
    return;
  }
  let ob;
  ob = Observer(obj);
  if (Array.isArray(obj)) {
    obj.__proto__ = reactArray.prototype;
  }
  return ob;
}

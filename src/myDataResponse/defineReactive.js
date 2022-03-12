import Dep from "./Dep.js";
import observe from "./observe.js";
import { Observer } from "./observer.js";

export default function defineReactive(obj, key, value) {
  let dep = new Dep();

  if (arguments.length == 2) {
    value = obj[key];
  }

  let ob = observe(value);

  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get() {
      if (Dep.target) {
        dep.depend();
        if (ob) {
          ob.dep.depend();
        }
      }
      return value;
    },
    set(newValue) {
      if (value == newValue) {
        return;
      }
      ob = observe(newValue);
      value = newValue;
      dep.notify();
      if (ob) {
        ob.dep.notify();
      }
    },
  });
}

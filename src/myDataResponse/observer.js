import defineReactive from "./defineReactive.js";
import Dep from "./Dep.js";

function def(obj, key, value, enumerable) {
  Object.defineProperty(obj, key, {
    value,
    enumerable,
    writable: true,
    configurable: true,
  });
}

export function walk(obj) {
  for (let key in obj) {
    defineReactive(obj, key);
  }
}

export function Observer(obj) {
  if (obj.hasOwnProperty("__ob__")) {
    return obj["__ob__"];
  }
  let ob = { dep: new Dep() };
  def(obj, "__ob__", ob, false);
  walk(obj);
  ob.__proto__ = Observer.prototype;
  return ob;
}

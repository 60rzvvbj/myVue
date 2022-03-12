import observe from "./observe.js";
import { walk } from "./observer.js";

let fun = ["push", "pop", "shift", "unshift", "splice", "sort", "reverse"];

export default function reactArray() {}

for (let f of fun) {
  reactArray.prototype[f] = function () {
    console.log(f + " --- " + JSON.stringify(arguments));
    let inserted;
    if (f == "push") {
      inserted = arguments;
    } else if (f == "shift") {
      inserted = arguments;
    } else if (f == "splice") {
      inserted = arguments[2];
    }

    Array.prototype[f].call(this, ...arguments);

    if (inserted) {
      // 版本一，可以监听所有变化，但是会触发数组中所有元素的get
      // walk(this);

      // 版本二，不能监听数组对新增元素的变化，可以监听新增元素内部的变化
      for (let i = 0; i < inserted.length; i++) {
        observe(inserted[i]);
      }
    }
  };
}

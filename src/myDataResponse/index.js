import observe from "./observe.js";
import Watcher from "./Watcher.js";

let obj = {
  a: {
    b: {
      c: {
        d: {
          e: 1,
        },
      },
    },
  },
  b: [1, 2],
};

observe(obj);

new Watcher(obj, "a.b.c.d.e", function () {
  console.log(arguments);
});
new Watcher(obj, "b", function () {
  console.log(arguments);
});
new Watcher(obj, "c", function () {
  console.log(arguments);
});
window.obj = obj;

console.log(obj);

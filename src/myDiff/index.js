import patch from "./patch.js";
import h from "./h.js";

let main = document.querySelector(".main");
// let vnode1 = h("h2", {}, "hello");
// let vnode2 = h("h2", {}, "hello world");
let vnode1 = h("h2", {}, [
  h("li", { key: "A" }, [h("div", {}, "hello")]),
  h("li", { key: "B" }, "B"),
  h("li", { key: "C" }, "C"),
  h("li", { key: "D" }, "D"),
  h("li", { key: "E" }, "E"),
]);
let vnode2 = h("h2", {}, [
  h("li", { key: "F" }, "F"),
  h("li", { key: "A" }, [
    h("div", {}, [
      h("li", { key: "F" }, "F"),
      h("li", { key: "G" }, "G"),
      h("li", { key: "E" }, "E"),
    ]),
  ]),
  h("li", { key: "G" }, "G"),
  h("li", { key: "E" }, "E"),
  h("li", { key: "B" }, "B"),
]);

console.log(vnode1);
console.log(vnode2);

patch(main, vnode1);

function getDoubleRandom(l, r) {
  return l + Math.random() * (r - l + 1);
}
function getIntRandom(l, r) {
  return parseInt(getDoubleRandom(l, r));
}
function randomColor(l, r) {
  return (
    "rgb(" +
    getIntRandom(l, r) +
    "," +
    getIntRandom(l, r) +
    "," +
    getIntRandom(l, r) +
    ")"
  );
}

document.addEventListener("keyup", function (e) {
  if (e.key == "s") {
    let doms = document.querySelectorAll("*");
    for (let dom of doms) {
      dom.style.backgroundColor = randomColor(160, 220);
    }
  } else if (e.key == "c") {
    patch(vnode1, vnode2);
  }
});

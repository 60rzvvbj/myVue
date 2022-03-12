import { vnode, isVnode, sameVnode } from "./vnode.js";
import createElement from "./createElement.js";
import patchChildren from "./patchChildren.js";

export default function patchVnode(vnode2, vnode1) {
  vnode2.elm = vnode1.elm;
  if (vnode2.text != undefined) {
    if (vnode1.text != vnode2.text) {
      vnode1.elm.innerText = vnode2.text;
    }
  } else {
    let dom = vnode1.elm;
    if (vnode1.text != undefined) {
      dom.innerText = "";
      for (let ch of vnode2.children) {
        dom.appendChild(createElement(ch));
      }
    } else {
      patchChildren(dom, vnode1.children, vnode2.children);
    }
  }
}

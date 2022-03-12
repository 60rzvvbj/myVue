import { vnode, isVnode, sameVnode } from "./vnode.js";
import createElement from "./createElement.js";
import patchVnode from "./patchVnode.js";

export default function (vnode1, vnode2) {
  if (isVnode(vnode1)) {
    if (sameVnode(vnode1, vnode2)) {
      // 如果是同一节点，则进行精细比较
      patchVnode(vnode2, vnode1);
    } else {
      // 否则直接新的覆盖旧的
      let dom = createElement(vnode2);
      let parentNode = vnode1.elm.parentElement;
      parentNode.insertBefore(dom, vnode1.elm);
      parentNode.removeChild(vnode1.elm);
    }
  } else {
    vnode1 = vnode(vnode1.tagName.toLowerCase(), {}, "", undefined, vnode1);
    let dom = createElement(vnode2);
    let parentNode = vnode1.elm.parentElement;
    parentNode.insertBefore(dom, vnode1.elm);
    parentNode.removeChild(vnode1.elm);
    return dom;
  }
}

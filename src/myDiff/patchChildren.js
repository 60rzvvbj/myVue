import { vnode, isVnode, sameVnode } from "./vnode.js";
import createElement from "./createElement.js";
import patchVnode from "./patchVnode.js";

function insertBefore(parent, node2, node1) {
  if (node1) {
    parent.insertBefore(node2, node1.nextElementSibling);
  } else {
    parent.appendChild(node2);
  }
}

function insertAfter(parent, node2, node1) {
  if (node1) {
    parent.insertBefore(node2, node1);
  } else {
    parent.appendChild(node2);
  }
}

/**
 * 更新子节点
 * @param {Node} parent 父节点
 * @param {Array} ch1 旧
 * @param {Array} ch2 新
 */
export default function patchChildren(parent, ch1, ch2) {
  let newStartIndex = 0;
  let newEndIndex = ch2.length - 1;
  let oldStartIndex = 0;
  let oldEndIndex = ch1.length - 1;

  while (newStartIndex <= newEndIndex && oldStartIndex <= oldEndIndex) {
    if (ch1[oldStartIndex] == undefined) {
      oldStartIndex++;
    } else if (ch1[oldEndIndex] == undefined) {
      oldEndIndex--;
    } else if (sameVnode(ch2[newStartIndex], ch1[oldStartIndex])) {
      patchVnode(ch2[newStartIndex], ch1[oldStartIndex]);
      newStartIndex++;
      oldStartIndex++;
    } else if (sameVnode(ch2[newEndIndex], ch1[oldEndIndex])) {
      patchVnode(ch2[newEndIndex], ch1[oldEndIndex]);
      newEndIndex--;
      oldEndIndex--;
    } else if (sameVnode(ch2[newEndIndex], ch1[oldStartIndex])) {
      patchVnode(ch2[newEndIndex], ch1[oldStartIndex]);
      insertAfter(parent, ch1[oldStartIndex].elm, ch1[oldEndIndex].elm);
      newEndIndex--;
      oldStartIndex++;
    } else if (sameVnode(ch2[newStartIndex], ch1[oldEndIndex])) {
      patchVnode(ch2[newStartIndex], ch1[oldEndIndex]);
      insertBefore(parent, ch1[oldEndIndex].elm, ch1[oldStartIndex].elm);
      newStartIndex++;
      oldEndIndex--;
    } else {
      let flag = true;
      for (let i = oldStartIndex; i <= oldEndIndex; i++) {
        if (sameVnode(ch2[newStartIndex], ch1[i])) {
          patchVnode(ch2[newStartIndex], ch1[i]);
          insertBefore(parent, ch1[i].elm, ch1[oldStartIndex].elm);
          ch1[i] = undefined;
          flag = false;
          break;
        }
      }
      if (flag) {
        let dom = createElement(ch2[newStartIndex]);
        insertBefore(parent, dom, ch1[oldStartIndex].elm);
      }
      newStartIndex++;
    }
  }

  if (newStartIndex <= newEndIndex) {
    for (let i = newStartIndex; i <= newEndIndex; i++) {
      insertAfter(
        parent,
        createElement(ch2[i]),
        ch1[oldStartIndex] ? ch1[oldStartIndex].elm : null
      );
    }
  } else if (oldStartIndex <= oldEndIndex) {
    for (let i = oldStartIndex; i <= oldEndIndex; i++) {
      parent.removeChild(ch1[i].elm);
    }
  }
}

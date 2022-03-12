import { vnode, isVnode } from "./vnode.js";

export default function (sel, data, content) {
  if (typeof content == "string" || typeof content == "number") {
    return vnode(sel, data, content, undefined, undefined);
  } else if (Array.isArray(content)) {
    return vnode(sel, data, undefined, content, undefined);
  } else if (isVnode(content)) {
    return vnode(sel, data, undefined, [content], undefined);
  } else {
    console.log("error");
  }
}

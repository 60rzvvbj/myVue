export function vnode(sel, data, text, children, elm) {
  return { sel, data, text, children, elm, key: data.key };
}

export function isVnode(obj) {
  return obj.hasOwnProperty("sel") && obj.hasOwnProperty("sel");
}

export function sameVnode(vnode1, vnode2) {
  return vnode1.sel == vnode2.sel && vnode1.key == vnode2.key;
}

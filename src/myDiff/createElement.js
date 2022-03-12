export default function createElement(vnode) {
  let dom = document.createElement(vnode.sel);
  if (vnode.data.attrs) {
    for (let i = 0; i < vnode.data.attrs.length; i++) {
      dom.setAttribute(vnode.data.attrs[i].name, vnode.data.attrs[i].value);
    }
  }
  if (vnode.data.events) {
    for (let i = 0; i < vnode.data.events.length; i++) {
      dom.addEventListener(
        vnode.data.events[i].eventType,
        vnode.data.events[i].value
      );
    }
  }
  if (vnode.text != undefined) {
    dom.innerText = vnode.text;
  } else {
    for (let ch of vnode.children) {
      dom.appendChild(createElement(ch));
    }
  }
  vnode.elm = dom;
  return dom;
}

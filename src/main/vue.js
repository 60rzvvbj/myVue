import observe from "../myDataResponse/observe.js";
import parseAST from "../myAST/parseAST.js";
import findData from "./findData.js";
import doWatcher from "./doWatcher.js";
import getVDom from "./getVDom.js";
import patch from "../myDiff/patch.js";

export default class Vue {
  constructor(options) {
    // beforeCreate生命周期
    options.beforeCreate && options.beforeCreate.call(this);

    // 数据初始化
    let _data = options.data();
    for (let key in _data) {
      this[key] = _data[key];
    }
    let ob = observe(this);

    // created生命周期
    options.created && options.created.call(this);

    // 初始化render
    let el = document.querySelector(options.el);
    let templateStr = el.innerHTML;

    // 模板解析成AST
    let ast = parseAST(templateStr);

    // 解析指令
    // 解析数据
    let wData = findData(ast);

    // update
    function update() {
      // beforeUpdate生命周期
      options.beforeUpdate && options.beforeUpdate.call(this);

      // update
      let vDom = getVDom(this, ast);
      patch(this.$vDom, vDom);
      this.$vDom = vDom;

      // updated生命周期
      options.updated && options.updated.call(this);
    }

    // 调用watcher
    doWatcher(this, wData, update);

    // beforeMount生命周期
    options.beforeMount && options.beforeMount.call(this);

    // 初始化虚拟dom
    this.$vDom = getVDom(this, ast);
    this.$el = el;

    // 初始化dom
    this.$el = patch(el, this.$vDom);

    // mounted生命周期
    options.mounted && options.mounted.call(this);
  }
}

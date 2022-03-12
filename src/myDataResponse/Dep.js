export default class Dep {
  constructor() {
    this.subs = [];
  }

  // 添加依赖
  depend() {
    if (Dep.target) {
      this.subs.push(Dep.target);
    }
  }

  // 通知更新
  notify() {
    for (let sub of this.subs) {
      sub.callback();
      break;
    }
  }
}

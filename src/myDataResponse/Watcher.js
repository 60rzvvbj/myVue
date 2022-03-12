import Dep from "./Dep";

// function parsePath(expression) {
//   let attrs = expression.split(".");

//   return function (target) {
//     let obj = target;
//     for (let i = 0; i < attrs.length; i++) {
//       if (obj) {
//         obj = obj[attrs[i]];
//       }
//     }
//     return obj;
//   };
// }

function parse(expression) {
  return function (data) {
    let res;
    let statement = "";
    for (let attr in data) {
      statement += `let ${attr} = data['${attr}'];\n`;
    }

    let code = `
			${statement}
			res = ${expression};
		`;

    eval(code);
    return res;
  };
}

export default class Watcher {
  constructor(target, expression, callback) {
    this.target = target;
    this.getter = parse(expression);

    Dep.target = this;
    this.value = this.getter(target);
    Dep.target = null;
    this.callback = function () {
      let newValue = this.getter(target);
      let oldValue = this.value;
      this.value = newValue;
      callback.call(target, newValue, oldValue);
    };
  }
}

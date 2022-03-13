import h from "../myDiff/h.js";
import templateToTokens from "../myTemplateEngine/templateToTokens";
import Vue from "./vue.js";

function parse(data, expression) {
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
}

function parseEvent(expression) {
  let vue = Vue.prototype.now;
  let methods = vue._methods;
  if (methods.hasOwnProperty(expression)) {
    return methods[expression];
  } else {
    let statement = "";
    for (let m in methods) {
      if (typeof methods[m] == "function") {
        statement += `let ${m} = methods['${m}'].bind(vue);\n`;
      }
    }

    let code = `
			${statement};
			${expression};
		`;

    return function () {
      eval(code);
    };
  }
}

export default function getVDom(data, ast) {
  if (ast.type == "container") {
    // 处理v-if
    if (ast.if) {
      if (!parse(data, ast.if)) {
        return [];
      }
    }

    let properties = {
      attrs: [...ast.attrs],
    };

    // 处理v-bind
    if (ast.bind) {
      for (let i = 0; i < ast.bind.length; i++) {
        if (ast.bind[i].attr == "key") {
          properties.key = parse(data, ast.bind[i].value);
        } else {
          properties.attrs.push({
            name: ast.bind[i].attr,
            value: parse(data, ast.bind[i].value),
          });
        }
      }
    }

    // 处理events
    if (ast.events) {
      for (let i = 0; i < ast.events.length; i++) {
        ast.events[i].value = parseEvent(ast.events[i].value);
      }
      properties.events = ast.events;
    }

    if (ast.children) {
      // 如果只有一个文本子节点
      if (ast.children.length == 1 && ast.children[0].type == "text") {
        let tokens = templateToTokens(ast.children[0].text);

        let content = "";

        // 数据注入
        for (let i = 0; i < tokens.length; i++) {
          if (tokens[i][0] == "name") {
            content += parse(data, tokens[i][1]);
          } else {
            content += tokens[i][1];
          }
        }

        return h(ast.tag, properties, content);
      } else {
        let res = [];
        for (let i = 0; i < ast.children.length; i++) {
          let child = getVDom(data, ast.children[i]);
          if (child.length != 0) {
            res.push(child);
          }
        }

        return h(ast.tag, properties, res);
      }
    } else {
      return [];
    }
  } else {
    throw new Error("type error");
  }
}

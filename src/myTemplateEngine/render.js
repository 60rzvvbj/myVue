import templateToTokens from "./templateToTokens.js";

function parse(tokens, data) {
  let res = "";
  for (let item of tokens) {
    if (item[0] == "text") {
      res += item[1];
    } else if (item[0] == "name") {
      res += getData(data, item[1]);
    } else if (item[0] == "#") {
      for (let d of getData(data, item[1])) {
        res += parse(item[2], {
          ".": d,
          ...d,
        });
      }
    }
  }
  return res;
}

function getData(data, attr) {
  let res = data;
  if (attr != ".") {
    let strArr = attr.split(".");
    for (let str of strArr) {
      res = res[str];
    }
  } else {
    res = res[attr];
  }
  return res;
}

export default function render(templateStr, data) {
  let tokens = templateToTokens(templateStr);
  let res = parse(tokens, data);
  return res;
}

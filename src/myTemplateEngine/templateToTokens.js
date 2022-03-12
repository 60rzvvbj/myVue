import Scanner from "./scanner.js";

export default function templateToTokens(templateStr) {
  let sca = new Scanner(templateStr);
  let tokens = [];

  // 扫描
  while (!sca.end()) {
    let str = sca.scanUntil("{{");
    sca.scan("{{");
    if (str.length > 0) {
      tokens.push(["text", str]);
    }
    str = sca.scanUntil("}}");
    if (str.length > 0) {
      if (str[0] == "#") {
        tokens.push(["#", str.substring(1)]);
      } else if (str[0] == "/") {
        tokens.push(["/", str.substring(1)]);
      } else {
        tokens.push(["name", str]);
      }
    }
    sca.scan("}}");
  }

  // 封装
  let stack = [[]];
  for (let item of tokens) {
    if (item[0] == "#") {
      let arr = [];
      stack[stack.length - 1].push(["#", item[1], arr]);
      stack.push(arr);
    } else if (item[0] == "/") {
      stack.pop();
    } else {
      stack[stack.length - 1].push(item);
    }
  }

  return stack[0];
}

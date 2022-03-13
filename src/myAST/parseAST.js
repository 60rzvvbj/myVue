import attributes from "./attrs.js";
import Scanner from "./scanner.js";

const singleLabel = ["input", "img", "hr", "br"];

export default function parseAST(str) {
  let arr = [];
  let sca = new Scanner(str);
  while (!sca.end()) {
    let s;
    s = sca.scanUntil("<");
    if (s == "") {
      break;
    }
    if (arr.length != 0 && arr[arr.length - 1].type != "end") {
      arr.push({ type: "text", text: s });
    }
    sca.scan("<");

    s = sca.scanUntil(">");
    if (s == "") {
      break;
    }
    if (s.startsWith("/")) {
      arr.push({ type: "end", tag: s.substring(1) });
    } else {
      let { tag, attrs, other } = attributes(s);
      if (arr.length != 0 && arr[arr.length - 1].type == "text") {
        arr.pop();
      }
      arr.push({
        type: singleLabel.includes(tag) ? "element" : "container",
        tag,
        attrs,
        ...other,
      });
    }
    sca.scan(">");
  }

  let stack = [{ type: "root", children: [] }];

  for (let item of arr) {
    if (item.type == "container") {
      item.children = [];
      stack[stack.length - 1].children.push(item);
      stack.push(item);
    } else if (item.type == "element") {
      stack[stack.length - 1].children.push(item);
    } else if (item.type == "text") {
      stack[stack.length - 1].children.push(item);
    } else if (item.type == "end") {
      if (item.tag == stack[stack.length - 1].tag) {
        stack.pop();
      } else {
        throw new Error("template error");
      }
    }
  }

  return stack[0].children[0];
}

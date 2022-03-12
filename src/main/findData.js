import templateToTokens from "../myTemplateEngine/templateToTokens.js";

export default function findData(ast) {
  let res = [];

  if (ast.if) {
    res.push(ast.if);
  }

  if (ast.bind) {
    for (let i = 0; i < ast.bind.length; i++) {
      res.push(ast.bind[i].value);
    }
  }

  if (ast.type == "text") {
    let tokens = templateToTokens(ast.text);
    for (let i = 0; i < tokens.length; i++) {
      if (tokens[i][0] == "name") {
        res.push(tokens[i][1]);
      }
    }
  } else {
    if (ast && ast.children) {
      for (let i = 0; i < ast.children.length; i++) {
        res.push(findData(ast.children[i]));
      }
    }
  }

  return res;
}

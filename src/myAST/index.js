import parseAST from "./parseAST.js";
let templateStr = document.getElementById("temp").innerHTML;

let res = parseAST(templateStr);

console.log(res);
console.log(JSON.stringify(res));

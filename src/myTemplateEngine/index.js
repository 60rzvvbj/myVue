import render from "./render.js";
let templateStr = document.getElementById("temp").innerHTML;
let data = {
  arr: [
    {
      name: "张三",
      info: {
        age: 18,
        sex: "男",
      },
      like: ["唱", "跳", "rap"],
    },
    {
      name: "李四",
      info: {
        age: 22,
        sex: "女",
      },
      like: ["吃", "喝", "赌"],
    },
    {
      name: "王五",
      info: {
        age: 20,
        sex: "男",
      },
      like: ["前端", "算法", "后端"],
    },
  ],
};

let res = render(templateStr, data);
let main = document.querySelector(".main");
main.innerHTML = res;

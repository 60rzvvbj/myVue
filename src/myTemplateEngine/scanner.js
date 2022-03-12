export default class Scanner {
  constructor(s) {
    let str = s;
    let p = 0;

    this.scanUntil = function (s) {
      let res = "";
      while (!this.end() && !str.substring(p).startsWith(s)) {
        res += str[p];
        p++;
      }
      return res;
    };
    this.scan = function (s) {
      p += s.length;
    };
    this.end = function () {
      return p >= str.length;
    };
  }
}

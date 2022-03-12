import Scanner from "./scanner";

export default function attrs(str) {
  let sca = new Scanner(str);
  let tag = sca.scanUntil(" ");
  sca.scan(" ");
  let attrs = [];
  let other = {};
  while (!sca.end()) {
    let name = sca.scanUntil('="');
    name = name.trim();
    sca.scan('="');
    let value = sca.scanUntil('"');
    sca.scan('"');

    if (name == "v-if") {
      other.if = value;
    } else if (name.startsWith(":")) {
      if (!other.bind) {
        other.bind = [];
      }
      other.bind.push({ attr: name.substring(1), value });
    } else if (name.startsWith("@")) {
      if (!other.events) {
        other.events = [];
      }
      other.events.push({ eventType: name.substring(1), value });
    } else {
      attrs.push({ name, value });
    }
  }
  return { tag, attrs, other };
}

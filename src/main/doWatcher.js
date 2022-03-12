import Watcher from "../myDataResponse/Watcher.js";

export default function doWatcher(data, wData, update) {
  for (let i = 0; i < wData.length; i++) {
    if (Array.isArray(wData[i])) {
      doWatcher(data, wData[i], update);
    } else {
      new Watcher(data, wData[i], update);
    }
  }
}

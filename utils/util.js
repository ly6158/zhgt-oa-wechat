export const formatTime = (time, cFormat) => {
  if (!time) return "";
  const format = cFormat || "{y}-{m}-{d} {h}:{i}:{s}";
  let date;
  if (typeof time === "object") {
    date = time;
  } else {
    if (("" + time).length === 10) time = parseInt(time) * 1000;
    date = new Date(parseInt(time));
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay(),
  };
  return format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key];

    if (key === "a") 
      return ["日", "一", "二", "三", "四", "五", "六"][value];
    if (result.length > 0 && value < 10) {
      value = "0" + value;
    }
    return value || 0;
  });
};

export const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
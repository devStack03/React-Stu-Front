function toQueryString(obj, prefix) {
  var str = [],
    k,
    v;
  for (var p in obj) {
    if (!obj.hasOwnProperty(p)) {
      continue;
    } // skip things from the prototype
    if (~p.indexOf("[")) {
      k = prefix
        ? prefix +
          "[" +
          p.substring(0, p.indexOf("[")) +
          "]" +
          p.substring(p.indexOf("["))
        : p;
      // only put whatever is before the bracket into new brackets; append the rest
    } else {
      k = prefix ? prefix + "[" + p + "]" : p;
    }
    v = obj[p];
    str.push(
      typeof v == "object"
        ? toQueryString(v, k)
        : encodeURIComponent(k) + "=" + encodeURIComponent(v)
    );
  }
  return str.join("&");
}

export default toQueryString;

(function (k) {
  function n(c, a) {
    k.ajax({
      url: c,
      async: !1,
      cache: a.cache,
      contentType: "text/plain;charset=" + a.encoding,
      dataType: "text",
      success: function (b) {
        r(b, a.mode);
      },
    });
  }
  function r(c, a) {
    for (
      var b = "",
        e = c.split(/\n/),
        d = /(\{\d+\})/g,
        q = /\{(\d+)\}/g,
        m = /(\\u.{4})/gi,
        f = 0;
      f < e.length;
      f++
    )
      if (
        ((e[f] = e[f].replace(/^\s\s*/, "").replace(/\s\s*$/, "")),
        e[f].length > 0 && e[f].match("^#") != "#")
      ) {
        var g = e[f].split("=");
        if (g.length > 0) {
          for (
            var o = unescape(g[0])
                .replace(/^\s\s*/, "")
                .replace(/\s\s*$/, ""),
              h = g.length == 1 ? "" : g[1];
            h.match(/\\$/) == "\\";

          )
            (h = h.substring(0, h.length - 1)),
              (h += e[++f].replace(/\s\s*$/, ""));
          for (var l = 2; l < g.length; l++) h += "=" + g[l];
          h = h.replace(/^\s\s*/, "").replace(/\s\s*$/, "");
          if (a == "map" || a == "both") {
            if ((g = h.match(m)))
              for (l = 0; l < g.length; l++) h = h.replace(g[l], s(g[l]));
            k.i18n.map[o] = h;
          }
          if (a == "vars" || a == "both")
            if (((h = h.replace(/"/g, '\\"')), t(o), d.test(h))) {
              for (
                var g = h.split(d), l = !0, j = "", n = [], p = 0;
                p < g.length;
                p++
              )
                if (d.test(g[p]) && (n.length == 0 || n.indexOf(g[p]) == -1))
                  l || (j += ","),
                    (j += g[p].replace(q, "v$1")),
                    n.push(g[p]),
                    (l = !1);
              b += o + "=function(" + j + "){";
              o = '"' + h.replace(q, '"+v$1+"') + '"';
              b += "return " + o + ";};";
            } else b += o + '="' + h + '";';
        }
      }
    eval(b);
  }
  function t(c) {
    if (/\./.test(c))
      for (var a = "", c = c.split(/\./), b = 0; b < c.length; b++)
        b > 0 && (a += "."),
          (a += c[b]),
          eval("typeof " + a + ' == "undefined"') && eval(a + "={};");
  }
  function s(c) {
    var a = [],
      c = parseInt(c.substr(2), 16);
    c >= 0 && c < Math.pow(2, 16) && a.push(c);
    for (var c = "", b = 0; b < a.length; ++b) c += String.fromCharCode(a[b]);
    return c;
  }
  k.i18n = {};
  k.i18n.map = {};
  k.i18n.properties = function (c) {
    c = k.extend(
      {
        name: "Messages",
        language: "",
        path: "",
        mode: "vars",
        cache: !1,
        encoding: "UTF-8",
        callback: null,
      },
      c
    );
    if (c.language === null || c.language == "")
      c.language = k.i18n.browserLang();
    if (c.language === null) c.language = "";
    var a = c.name && c.name.constructor == Array ? c.name : [c.name];
    for (i = 0; i < a.length; i++)
      n(c.path + a[i] + ".properties", c),
        c.language.length >= 2 &&
          n(
            c.path + a[i] + "_" + c.language.substring(0, 2) + ".properties",
            c
          ),
        c.language.length >= 5 &&
          n(
            c.path + a[i] + "_" + c.language.substring(0, 5) + ".properties",
            c
          );
    c.callback && c.callback();
  };
  k.i18n.prop = function (c) {
    var a = k.i18n.map[c];
    if (a == null) return "[" + c + "]";
    var b;
    if (typeof a == "string") {
      for (b = 0; (b = a.indexOf("\\", b)) != -1; )
        a =
          a[b + 1] == "t"
            ? a.substring(0, b) + "\t" + a.substring(b++ + 2)
            : a[b + 1] == "r"
            ? a.substring(0, b) + "\r" + a.substring(b++ + 2)
            : a[b + 1] == "n"
            ? a.substring(0, b) + "\n" + a.substring(b++ + 2)
            : a[b + 1] == "f"
            ? a.substring(0, b) + "\u000c" + a.substring(b++ + 2)
            : a[b + 1] == "\\"
            ? a.substring(0, b) + "\\" + a.substring(b++ + 2)
            : a.substring(0, b) + a.substring(b + 1);
      var e = [],
        d,
        j;
      for (b = 0; b < a.length; )
        if (a[b] == "'")
          if (b == a.length - 1) a = a.substring(0, b);
          else if (a[b + 1] == "'") a = a.substring(0, b) + a.substring(++b);
          else {
            for (d = b + 2; (d = a.indexOf("'", d)) != -1; )
              if (d == a.length - 1 || a[d + 1] != "'") {
                a =
                  a.substring(0, b) +
                  a.substring(b + 1, d) +
                  a.substring(d + 1);
                b = d - 1;
                break;
              } else a = a.substring(0, d) + a.substring(++d);
            d == -1 && (a = a.substring(0, b) + a.substring(b + 1));
          }
        else if (a[b] == "{")
          if (((d = a.indexOf("}", b + 1)), d == -1)) b++;
          else if (
            ((j = parseInt(a.substring(b + 1, d))), !isNaN(j) && j >= 0)
          ) {
            var m = a.substring(0, b);
            m != "" && e.push(m);
            e.push(j);
            b = 0;
            a = a.substring(d + 1);
          } else b = d + 1;
        else b++;
      a != "" && e.push(a);
      a = e;
      k.i18n.map[c] = e;
    }
    if (a.length == 0) return "";
    if (a.lengh == 1 && typeof a[0] == "string") return a[0];
    m = "";
    for (b = 0; b < a.length; b++)
      m +=
        typeof a[b] == "string"
          ? a[b]
          : a[b] + 1 < arguments.length
          ? arguments[a[b] + 1]
          : "{" + a[b] + "}";
    return m;
  };
  k.i18n.browserLang = function () {
    var c = navigator.language || navigator.userLanguage,
      c = c.toLowerCase();
    c.length > 3 && (c = c.substring(0, 3) + c.substring(3).toUpperCase());
    return c;
  };
  var j;
  if (!j)
    (j = function (c, a, b) {
      if (Object.prototype.toString.call(a) !== "[object RegExp]")
        return typeof j._nativeSplit == "undefined"
          ? c.split(a, b)
          : j._nativeSplit.call(c, a, b);
      var e = [],
        d = 0,
        k =
          (a.ignoreCase ? "i" : "") +
          (a.multiline ? "m" : "") +
          (a.sticky ? "y" : ""),
        a = RegExp(a.source, k + "g"),
        m,
        f,
        g;
      c += "";
      j._compliantExecNpcg || (m = RegExp("^" + a.source + "$(?!\\s)", k));
      if (b === void 0 || +b < 0) b = Infinity;
      else if (((b = Math.floor(+b)), !b)) return [];
      for (; (f = a.exec(c)); ) {
        k = f.index + f[0].length;
        if (
          k > d &&
          (e.push(c.slice(d, f.index)),
          !j._compliantExecNpcg &&
            f.length > 1 &&
            f[0].replace(m, function () {
              for (var a = 1; a < arguments.length - 2; a++)
                arguments[a] === void 0 && (f[a] = void 0);
            }),
          f.length > 1 &&
            f.index < c.length &&
            Array.prototype.push.apply(e, f.slice(1)),
          (g = f[0].length),
          (d = k),
          e.length >= b)
        )
          break;
        a.lastIndex === f.index && a.lastIndex++;
      }
      d === c.length ? (g || !a.test("")) && e.push("") : e.push(c.slice(d));
      return e.length > b ? e.slice(0, b) : e;
    }),
      (j._compliantExecNpcg = /()??/.exec("")[1] === void 0),
      (j._nativeSplit = String.prototype.split);
  String.prototype.split = function (c, a) {
    return j(this, c, a);
  };
})(jQuery);

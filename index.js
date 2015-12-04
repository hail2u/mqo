"use strict";

var postcss = require("postcss");
var matchMedia = require("matchmedia");
var pkg = require("./package.json");

module.exports = postcss.plugin(pkg.name, function (o) {
  return function (c) {
    c.walkAtRules("media", function (r) {
      if (!matchMedia(r.params, {
        height: o.height,
        width: o.width
      }).matches) {
        r.remove();
      }
    });

    return c;
  };
});

module.exports.optimize = function (c, o) {
  return postcss([
    this(o)
  ]).process(c, o);
};

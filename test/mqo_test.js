"use strict";

var mqo = require("../index");
var postcss = require("postcss");

exports["Public API"] = function (test) {
  var i = ".foo{color:red}@media(min-width:1px){.foo{color:green}}";
  var e = ".foo{color:red}";
  var o = {
    height: 0,
    width: 0
  };

  test.expect(2);

  test.strictEqual(
    postcss([mqo(o)]).process(i).css,
    e
  );

  test.strictEqual(
    mqo.optimize(i, o).css,
    e
  );

  test.done();
};

exports["Option: height"] = function (test) {
  var i = ".foo{color:red}@media(min-height:2px){.foo{color:green}}";
  var e = i;
  var o = {
    height: 2,
    width: 0
  };

  test.expect(2);

  test.strictEqual(
    mqo.optimize(i, o).css,
    e
  );

  e = ".foo{color:red}";
  o.height = 0;
  test.strictEqual(
    mqo.optimize(i, o).css,
    e
  );

  test.done();
};

exports["Option: width"] = function (test) {
  var i = ".foo{color:red}@media(min-width:2px){.foo{color:green}}";
  var e = i;
  var o = {
    height: 0,
    width: 2
  };

  test.expect(2);

  test.strictEqual(
    mqo.optimize(i, o).css,
    e
  );

  e = ".foo{color:red}";
  o.width = 0;
  test.strictEqual(
    mqo.optimize(i, o).css,
    e
  );

  test.done();
};

exports["Option: sourcemap"] = function (test) {
  var i = ".foo{color:red}@media(min-width:2px){.foo{color:green}}\n\n/*# sourceMappingURL=from.css.map */\n";
  var o = {
    from: "from.css",
    height: 2,
    map: {
      inline: false
    },
    width: 2
  };

  test.expect(1);

  test.deepEqual(
    mqo.optimize(i, o).map,
    postcss().process(i, o).map
  );

  test.done();
};

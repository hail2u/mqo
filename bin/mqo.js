"use strict";

var fs = require("fs");
var mqo = require("../index");
var minimist = require("minimist");
var pkg = require("../package.json");

var a = minimist(process.argv.slice(2), {
  boolean: [
    "help",
    "sourcemap",
    "version"
  ],
  alias: {
    "e": "height",
    "h": "help",
    "v": "version",
    "w": "width"
  },
  default: {
    "height": 0,
    "help": false,
    "sourcemap": false,
    "version": false,
    "width": 0
  }
});

if (a.help || a._.length < 1) {
  console.log("Usage: mqo --width=<WIDTH> --height=<HEIGHT> [--sourcemap] INPUT [OUTPUT]");

  process.exit(0);
}

if (a.version) {
  console.log(pkg.name + " v" + pkg.version);

  process.exit(0);
}

var c = a._[0];
var o = {
  from: c,
  height: a.height,
  map: a.sourcemap,
  width: a.width
};

if (c === "-") {
  delete o.from;
  c = process.stdin.fd;
}

if (a._[1]) {
  o.to = a._[1];
}

if (o.map && o.to) {
  o.map = {
    inline: false
  };
}

c = fs.readFileSync(c, "utf8");
mqo.optimize(c, o).then(function (r) {
  if (!o.to) {
    process.stdout.write(r.css);

    return;
  }

  fs.writeFileSync(o.to, r.css);

  if (r.map) {
    fs.writeFileSync(o.to + ".map", r.map);
  }
}).catch(function (err) {
  if (err.name === "CssSyntaxError") {
    console.error([
      err.file,
      err.line,
      err.column,
      " " + err.reason
    ].join(":"));
    process.exit(1);
  }

  throw err;
});

MQO
===

Optimize CSS file for specified width and height.


SYNOPSIS
--------

Almost all CSS file contains some media queries:

    .foo {
      color: red;
    }
    
    @media (min-width: 1280px) {
      .foo {
        color: green;
      }
    }

This tool filters some media queries that does not match given viewport size. If
you specify viewport width `1024`, this tool optimize previous CSS like this:

    .foo {
      color: red;
    }

Because `min-width: 1280px` does not match against `1024` width viewport.


USAGE
-----

    $ mqo --height=<HEIGHT> --width=<WIDTH> [--sourcemap] INPUT [OUTPUT]


LICENSE
-------

MIT: http://hail2u.mit-license.org/2015

"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.prefix = prefix;

var _postcss = _interopRequireDefault(require("postcss"));

var _autoprefixer = _interopRequireDefault(require("autoprefixer"));

function prefix(css, pathname) {
  var prefixer = (0, _postcss["default"])([_autoprefixer["default"]]);

  try {
    return prefixer.process(css, {
      from: undefined
    }).css;
  } catch (error) {
    if (error.name === "CssSyntaxError") {
      throw new Error("Pathname: " + pathname + " " + error.toString());
    }

    throw error;
  }
}
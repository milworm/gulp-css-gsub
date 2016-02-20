"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var through = require("through2"),
    Replacer = require("./replacer.js"),
    File = require("vinyl"),
    fs = require("fs");

exports.default = function (config) {
    return through.obj(function (file, encoding, callback) {
        config = Object.assign({
            cssIn: file.path
        }, config);

        var replacer, cssCode, jsCode;

        replacer = new Replacer(config);
        replacer.run();

        cssCode = replacer.generateCss(), jsCode = replacer.generateJs();

        fs.writeFileSync(config.jsOut, jsCode);

        file = new File({
            cwd: "/",
            base: "/",
            path: "/",
            contents: new Buffer(cssCode)
        });

        callback(null, file);
    });
};
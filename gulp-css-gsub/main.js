var through = require("through2"),
    gutil = require("gulp-util"),
    Replacer = require("./lib/replacer.js"),
    File = require("vinyl"),
    fs = require("fs");

module.exports = function(config) {
    return through.obj(function(file, encoding, callback) {
        var replacer,
            file;

        replacer = new Replacer({
            cssIn: file.path,
            jsIn: config.jsIn,
            prefix: config.prefix
        });

        replacer.run();
        
        var cssText = replacer.generateCss(),
            jsText = replacer.generateJs();

        fs.writeFileSync(config.jsOut, jsText);

        file = new File({
            cwd: "/",
            base: "/",
            path: "/",
            contents: new Buffer(cssText)
        });

        callback(null, file);
    });
};
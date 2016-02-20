var through = require("through2"),
    Replacer = require("./replacer.js"),
    File = require("vinyl"),
    fs = require("fs");

export default (config) => {
    return through.obj((file, encoding, callback) => {
        config = Object.assign({
            cssIn: file.path
        }, config);

        var replacer,
            cssCode,
            jsCode;

        replacer = new Replacer(config);
        replacer.run();

        cssCode = replacer.generateCss(),
        jsCode = replacer.generateJs();

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
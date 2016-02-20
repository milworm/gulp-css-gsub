var assert = require("assert"),
    Replacer = require("../lib/replacer.js").default,
    fs = require("fs");

describe("replacements", function () {
    it("should replace 'd-example' with 'a0'", function () {
        var replacer,
            css,
            js;

        replacer = new Replacer({
            cssIn: "./test/example1/file.css",
            jsIn: "./test/example1/file.js"
        });

        replacer.run();

        css = replacer.generateCss();
        js = replacer.generateJs();

        assert.equal(true, css.indexOf("a0") > -1);
        assert.equal(true, css.indexOf("a0") > -1);
    });

    it("should make 5 replacements", function () {
        var replacer,
            css,
            js;

        replacer = new Replacer({
            cssIn: "./test/example2/file.css",
            jsIn: "./test/example2/file.js"
        });

        replacer.run();

        css = replacer.generateCss();
        js = replacer.generateJs();

        assert.equal(5, replacer.getReplacementsCount());
    });

    it("should make 3 replacements with prefix 'a'", function () {
        var replacer,
            css,
            js;

        replacer = new Replacer({
            cssIn: "./test/example3/file.css",
            jsIn: "./test/example3/file.js",
            prefix: "a-"
        });

        replacer.run();

        css = replacer.generateCss();
        js = replacer.generateJs();

        assert.equal(3, replacer.getReplacementsCount());
    });

    it("should make #rules.count replacements with prefix 'fa-'", function () {
        var replacer,
            css,
            js;

        replacer = new Replacer({
            cssIn: "./test/example5/file.css",
            jsIn: "./test/example5/file.js",
            prefix: "fa-",
            replaceAll: true
        });

        replacer.run();

        css = replacer.generateCss();
        js = replacer.generateJs();

        fs.writeFileSync("./test/example5/result.css", css);
        fs.writeFileSync("./test/example5/result.js", js);

        assert.equal(replacer.getReplacementsCount(), replacer.getReplacementsCount());
    });

    it("should make 5 replacements without a prefix (based on css-file)", function () {
        var replacer,
            css,
            js;

        replacer = new Replacer({
            cssIn: "./test/example6/file.css",
            jsIn: "./test/example6/file.js"
        });

        replacer.run();

        css = replacer.generateCss();
        js = replacer.generateJs();

        fs.writeFileSync("./test/example6/result.css", css);
        fs.writeFileSync("./test/example6/result.js", js);

        assert.equal(true, true);
    });
});

describe("replace functions", function() {
    describe("Sencha Touch / ExtJS", function() {
        it("should use sencha-plugin to replace #baseCls+'inner'", function () {
            var replacer,
                css,
                js;

            replacer = new Replacer({
                cssIn: "./test/example4/file.css",
                jsIn: "./test/example4/file.js",
                prefix: "d-",
                replace: function(node) {
                    do {
                        if(node.type != "Property")
                            break;

                        if(node.key.name != "baseCls")
                            break;

                        if(node.value.type != "Literal")
                            break;

                        var baseCls = node.value.value,
                            innerCls = baseCls + "-inner";

                        if(! this.replacements.items[baseCls]) {
                            this.replacements.items[baseCls] = this.key;
                            this.key = this.succ(this.key);
                            this.replacements.count ++;
                        }

                        if(! this.replacements.items[innerCls]) {
                            this.replacements.items[innerCls] = this.key;
                            this.key = this.succ(this.key);
                            this.replacements.count ++;
                        }
                    } while(false);
                }
            });

            replacer.run();

            css = replacer.generateCss();
            js = replacer.generateJs();

            assert.equal(6, replacer.getReplacementsCount());
        });
    });

    describe("ReactJS", function() {
        it("should use ReactJS-plugin to replace ...", function () {
            // @TODO
        });
    });

    describe("EmberJS", function() {
        it("should use EmberJS-plugin to replace ...", function () {
            // @TODO
        });
    });
});
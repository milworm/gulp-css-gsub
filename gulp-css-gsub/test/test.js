var assert = require("assert"),
    Replacer = require("../lib/replacer");

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

        assert.equal(5, replacer.getReplacedCount());
    });

    it("should make 3 replacements with prefix 'a'", function () {
        var replacer,
            css,
            js;

        replacer = new Replacer({
            cssIn: "./test/example3/file.css",
            jsIn: "./test/example3/file.js",
            prefix: "a"
        });

        replacer.run();

        css = replacer.generateCss();
        js = replacer.generateJs();

        assert.equal(3, replacer.getReplacedCount());
    });
});

describe("plugin functions", function() {
    describe("Sencha Touch / ExtJS", function() {
        it("should use sencha-plugin to replace #baseCls+'inner'", function () {
            var replacer,
                css,
                js;

            replacer = new Replacer({
                cssIn: "./test/example4/file.css",
                jsIn: "./test/example4/file.js",
                prefix: "d",
                plugin: function(node) {
                    do {
                        if(node.type != "Property")
                            break;

                        if(node.key.name != "baseCls")
                            break;

                        if(node.value.type != "Literal")
                            break;

                        var baseCls = node.value.value,
                            innerCls = baseCls + "-inner";

                        if(! this.replacements[baseCls]) {
                            this.replacements[baseCls] = this.key;
                            this.key = this.succ(this.key);
                            this.replacedCount ++;
                        }

                        if(! this.replacements[innerCls]) {
                            this.replacements[innerCls] = this.key;
                            this.key = this.succ(this.key);
                            this.replacedCount ++;
                        }
                    } while(false);
                }
            });

            replacer.run();

            css = replacer.generateCss();
            js = replacer.generateJs();

            assert.equal(6, replacer.getReplacedCount());
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
var esprima = require("esprima"),
    css = require("css"),
    estraverse = require("estraverse"),
    escodegen = require("escodegen"),
    fs = require("fs"),
    succ = require("underscore.string/succ");

function Replacer(config) {
    config.prefix = config.prefix || "d";
    config.plugin = config.plugin || this.emptyFn;

    this.replacedCount = 0;
    this.replacements = {};
    this.key = "a0";
    this.config = config;
}

Replacer.prototype = {
    emptyFn: function() {},
    succ: function(key) {
        return succ(key);
    },

    run: function() {
        this.openFiles();
        this.initFilesAst();
        this.parseCssRules();
        this.replace();
    },

    openFiles: function() {
        this.cssText = fs.readFileSync(this.config.cssIn, "utf8");
        this.jsText = fs.readFileSync(this.config.jsIn, "utf8");
    },

    initFilesAst: function() {
        this.cssAst = css.parse(this.cssText);
        this.jsAst = esprima.parse(this.jsText, {
            attachComment: true
        });
    },

    parseCssRules: function() {
        this.re = new RegExp("\\.[" + this.config.prefix + "]{1}\\-[0-9a-zA-Z\\-_]+", "g");
        this.rules = this.cssAst.stylesheet.rules;

        var classes = [];

        for(var i=0, rule; rule=this.rules[i]; i++) {
            if(rule.type != "rule")
                continue;

            var selectors = rule.selectors.join(" ").match(this.re);

            if(selectors)
                classes = classes.concat(selectors.join(" ").replace(/\./g, "").split(" "));
        }

        this.classes = classes.sort(function(a, b) {
            return b.length - a.length;
        }).filter(function(cls, pos) {
            return classes.indexOf(cls) == pos;
        });
    },

    replace: function() {
        estraverse.traverse(this.jsAst, {
            enter: function(node, parent) {
                this.config.plugin.call(this, node, parent);

                if(node.type != "Literal")
                    return ;

                if(typeof node.value != "string")
                    return ;

                this.replaceItem(node);
            }.bind(this)
        });

        return this;
    },

    replaceItem: function(node) {
        var rules = this.rules,
            classes = this.classes,
            value = node.value,
            key = this.key,
            matches = value.match(new RegExp("[" + this.config.prefix + "]{1}\\-[0-9a-zA-Z\\-_]+", "g"));

        if(! matches)
            return ;

        for(var i=0, match; match=matches[i]; i++) {
            if(! this.replacements[match]) {
                this.replacements[match] = key;
                key = this.succ(key);
            }

            value = value.replace(match, this.replacements[match]);
            this.replacedCount ++;
        }

        node.value = value;
        this.key = this.succ(key);
    },

    generateCss: function() {
        var replacements = this.replacements,
            prefix = this.config.prefix;

        for(var i=0, rule; rule=this.rules[i]; i++) {
            if(rule.type != "rule")
                continue;

            var newSelectors = [];

            for(var j=0, selector; selector=rule.selectors[j]; j++) {
                selector = selector.replace(new RegExp("\\.([" + prefix + "]{1}\\-[0-9a-zA-Z\\-_]+)", "g"), function(a, b) {
                    return "." + replacements[b];
                });

                if(/undefined/.test(selector))
                    console.log("undefined in " + selector + " === " + rule.selectors.join(" "))
                else
                    newSelectors.push(selector);
            }

            if(newSelectors.length == rule.selectors.length) 
                rule.selectors = newSelectors;
            else
                rule.selectors = []; // remove rule, because of unused selector.
        }

        return css.stringify(this.cssAst);
    },

    generateJs: function() {
        return escodegen.generate(this.jsAst);
    },

    getReplacedCount: function() {
        return this.replacedCount;
    }
}

module.exports = Replacer;
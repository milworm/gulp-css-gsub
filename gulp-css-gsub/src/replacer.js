var esprima = require("esprima"),
    css = require("css"),
    estraverse = require("estraverse"),
    escodegen = require("escodegen"),
    fs = require("fs");

export default class Replacer {

    /**
     * @param {Object} config
     * @param {String} config.prefix Used when css classes look like "{prefix}-profile"
     * @param {RegExp} config.regexp Used when css classes use non-prefix declaration format.
     * @param {Function} config.replace Function that will be called for each node from JS-AST, Here you can write your 
     *                                  own logic to replace css-classes, that can't be replaced with prefix/regexp.
     * @param {Boolean} replaceAll Should be true to rename all css classes including those classes that couldn't be 
     *                             found in js-file.
     */
    constructor(config) {
        this.config = Object.assign({
            re: null,
            prefix: "d-",
            replace: this.emptyFn,
            replaceAll: false
        }, config);
        
        this.key = "a0";
        this.replacements = {
            count: 0,
            items: {}
        };
    }
    
    /**
     * a reusable empty function
     */
    emptyFn() {}
    
    /**
     * @param {String}
     * @return {String}
     */
    succ(input) {
        var alphabet = 'abcdefghijklmnopqrstuvwxyz',
            length = alphabet.length,
            result = input,
            i = input.length,
            index;
            
        while(i >= 0) {
            var last = input.charAt(--i),
                next = '',
                carry = false;
            
            if (isNaN(last)) {
                index = alphabet.indexOf(last.toLowerCase());
                
                if (index === -1) {
                    next = last;
                    carry = true;
                }
                else {
                    var isUpperCase = last === last.toUpperCase();
                    next = alphabet.charAt((index + 1) % length);
                    if (isUpperCase) {
                        next = next.toUpperCase();
                    }
                    
                    carry = index + 1 >= length;
                    if (carry && i === 0) {
                        var added = isUpperCase ? 'A' : 'a';
                        result = added + next + result.slice(1);
                        break;
                    }
                }
            }
            else {
                next = +last + 1;
                if(next > 9) {
                    next = 0;
                    carry = true
                }
                
                if (carry && i === 0) {
                    result = '1' + next + result.slice(1);
                    break;
                }
            }
            
            result = result.slice(0, i) + next + result.slice(i + 1);
            if (!carry) {
                break;
            }
        }

        return result;
    }
    
    /**
     * an entry point.
     */
    run() {
        this.openFiles();
        this.initFilesAst();
        this.parseCssRules();
        this.replace();
    }
    
    /**
     * simply reads the content of css and js file.
     */
    openFiles() {
        this.cssText = fs.readFileSync(this.config.cssIn, "utf8");
        this.jsText = fs.readFileSync(this.config.jsIn, "utf8");
    }
    
    /**
     * initializes AST for both css and js.
     */
    initFilesAst() {
        this.cssAst = css.parse(this.cssText);
        this.jsAst = esprima.parse(this.jsText);
    }
    
    /**
     * starts parsing css file and extracts all css classes in required order.
     */
    parseCssRules() {
        var config = this.config,
            classes = [];

        if(config.prefix)
            this.re = new RegExp("\\.(" + config.prefix + "){1}[0-9a-zA-Z\\-_]+", "g");
        else
            this.re = config.re;

        this.rules = this.cssAst.stylesheet.rules;

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
    }

    replace() {
        estraverse.traverse(this.jsAst, {
            enter: function(node, parent) {
                this.config.replace.call(this, node, parent);

                if(node.type != "Literal")
                    return ;

                if(typeof node.value != "string")
                    return ;

                this.replaceItem(node);
            }.bind(this)
        });

        if(! this.config.replaceAll)
            return this;

        var replacements = this.replacements,
            key = this.key;

        this.classes.forEach((cls) => {
            if(! replacements.items[cls]) {
                replacements.items[cls] = key;
                key = this.succ(key);
                replacements.count ++;
            }
        });

        return this;
    }

    replaceItem(node) {
        var value = node.value,
            key = this.key,
            config = this.config,
            replacements = this.replacements,
            re;

        if(config.prefix)
            re = new RegExp("(" + config.prefix + "){1}[0-9a-zA-Z\\-_]+", "g");
        else
            re = config.re;

        var matches = value.match(re);

        if(! matches)
            return ;

        for(var i=0, match; match=matches[i]; i++) {
            if(! replacements.items[match]) {
                replacements.items[match] = key;
                key = this.succ(key);
            }

            value = value.replace(match, replacements.items[match]);
            replacements.count ++;
        }

        node.value = value;
        this.key = key;
    }
    
    /**
     * @returns {String} a resulting CSS code with replacements based on CSS AST.
     */
    generateCss() {
        var replacements = this.replacements,
            re = this.getCssItemRegExp();

        for(var i=0, rule; rule=this.rules[i]; i++) {
            if(rule.type != "rule")
                continue;

            var newSelectors = [];

            for(var j=0, selector; selector=rule.selectors[j]; j++) {
                selector = selector.replace(re, function(a, b) {
                    return "." + replacements.items[b];
                });

                if(/undefined/.test(selector))
                    ;//console.log("undefined in " + selector + " === " + rule.selectors.join(" "))
                else
                    newSelectors.push(selector);
            }

            if(newSelectors.length == rule.selectors.length) 
                rule.selectors = newSelectors;
            else
                rule.selectors = []; // remove rule, because of unused selector.
        }

        return css.stringify(this.cssAst);
    }

    getCssItemRegExp() {
        var config = this.config;

        if(config.re)
            return config.re;

        return new RegExp("\\.((?:" + config.prefix + "){1}[0-9a-zA-Z\\-_]+)", "g");
    }
    
    /**
     * @returns {String} a resulting JS code with replacements based on JS AST.
     */
    generateJs() {
        return escodegen.generate(this.jsAst);
    }

    /**
     * @return {Number} number of replacments.
     */
    getReplacementsCount() {
        return this.replacements.count;
    }
}
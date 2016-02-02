"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Application = function () {
    function Application() {
        _classCallCheck(this, Application);

        this.initTpl();
    }

    _createClass(Application, [{
        key: "initTpl",
        value: function initTpl() {
            this.tpl = "\n            <div class=\"d-root grey lighten-4\">\n                <div class=\"container\">\n                    <div class=\"row\">\n                        <div class=\"col s12 m4 d-side-bar\">\n                            <div class=\"col s12 m10 offset-m1 white z-depth-1\">\n                                <div class=\"row green lighten-1 white-text d-avatar valign-wrapper\">\n                                    <h2 class=\"col s12 center\">Avatar</h2>\n                                </div>\n                                <div class=\"row d-description\">\n                                    <div class=\"col s12\">\n                                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>\n                                        <br/>\n                                    </div>\n                                    <div class=\"col s12\">\n                                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>\n                                        <br/>\n                                    </div>\n                                    <div class=\"col s12\">\n                                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>\n                                        <br/>\n                                    </div>\n                                    <div class=\"col s12\">\n                                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>\n                                        <br/>\n                                    </div>\n                                    <div class=\"col s12\">\n                                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>\n                                    </div>\n                                </div>\n                            </div>\n                        </div>\n                        <div class=\"col s12 m8\">\n                            <div class=\"col s12 white z-depth-1\">\n                                <h1 class=\"col s10 offset-s1 d-title\">Profile Form</h1>\n\n                                <div class=\"col s10 offset-s1\">\n                                    <div class=\"input-field col s12\">\n                                        <input placeholder=\"First name\" id=\"first_name\" type=\"text\" class=\"validate\">\n                                        <label for=\"first_name\" class=\"active\">First Name</label>\n                                    </div>\n                                    <div class=\"input-field col s12\">\n                                      <input placeholder=\"Last name\" id=\"last_name\" type=\"text\" class=\"validate\">\n                                      <label for=\"last_name\" class=\"active\">Last Name</label>\n                                    </div>\n                                    <div class=\"input-field col s12\">\n                                      <input id=\"email\" type=\"email\" class=\"validate\">\n                                      <label for=\"email\" class=\"active\">Email</label>\n                                    </div>\n                                    <div class=\"input-field col s12\">\n                                      <input id=\"password\" type=\"password\" class=\"validate\">\n                                      <label for=\"password\" class=\"active\">Password</label>\n                                    </div>\n                                </div>\n\n                                <div class=\"col s10 offset-s1 d-buttons\">\n                                    <div class=\"right\">\n                                        <button class=\"btn-flat waves-effect waves-light grey darken-3 white-text\">Reset</button>\n                                        <button class=\"btn-flat waves-effect waves-light orange darken-3 white-text\">Submit</button>\n                                    </div>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        ";
        }
    }, {
        key: "render",
        value: function render() {
            document.getElementById("root").innerHTML = this.tpl;
        }
    }]);

    return Application;
}();

new Application().render();
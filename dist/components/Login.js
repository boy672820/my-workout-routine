"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint no-useless-escape: 0 */
var react_1 = require("react");
var react_bootstrap_1 = require("react-bootstrap");
require("./login.css");
var Login = /** @class */ (function (_super) {
    __extends(Login, _super);
    function Login() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            email: '',
            valid_email: true,
            valid_password: true
        };
        _this.handleChange = function (_a) {
            var target = _a.target;
            var value = target.value;
            _this.setState({
                email: value
            });
        };
        _this.handleSubmit = function (e) {
            e.preventDefault();
            var email = _this.state.email;
            var password = _this.passwordRef.value;
            var regEmail = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
            var validate = {
                valid_email: false,
                valid_password: false
            };
            if (!email || !regEmail.test(email))
                validate.valid_email = false;
            else
                validate.valid_email = true;
            if (!password)
                validate.valid_password = false;
            else
                validate.valid_password = true;
            _this.setState(validate);
            if (validate.valid_email && validate.valid_password) {
            }
        };
        return _this;
    }
    Login.prototype.render = function () {
        var _this = this;
        var displayNone = { display: 'none' };
        var displayBlock = { display: 'block' };
        var is_alert = !this.state.valid_email || !this.state.valid_password ? false : true;
        return (react_1.default.createElement("main", { className: "form-signin" },
            react_1.default.createElement(react_bootstrap_1.Container, null,
                react_1.default.createElement(react_bootstrap_1.Alert, { variant: "danger", hidden: is_alert, className: "text align left" },
                    react_1.default.createElement("div", { style: this.state.valid_email ? displayNone : displayBlock }, "\uC774\uBA54\uC77C \uC591\uC2DD\uC5D0 \uB9DE\uAC8C \uC785\uB825\uD574\uC8FC\uC138\uC694.(\uC608: example@gmail.com)"),
                    react_1.default.createElement("div", { style: this.state.valid_password ? displayNone : displayBlock }, "\uBE44\uBC00\uBC88\uD638\uB97C \uC785\uB825\uD574\uC8FC\uC138\uC694.")),
                react_1.default.createElement("h3", { className: "h3 mb-3 fw-normal" }, "\uB85C\uADF8\uC778 \uD574\uC8FC\uC138\uC694."),
                react_1.default.createElement(react_bootstrap_1.Form, { onSubmit: this.handleSubmit },
                    react_1.default.createElement(react_bootstrap_1.Form.Group, null,
                        react_1.default.createElement(react_bootstrap_1.Form.Label, { htmlFor: "email", hidden: true }, "\uC774\uBA54\uC77C"),
                        react_1.default.createElement(react_bootstrap_1.Form.Control, { type: "text", placeholder: "example@gmail.com", title: "\uC774\uBA54\uC77C\uC744 \uC785\uB825\uD574\uC8FC\uC138\uC694.", id: "email", name: "email", className: "login-form-top", size: "lg", onChange: this.handleChange, value: this.state.email }),
                        react_1.default.createElement(react_bootstrap_1.Form.Label, { htmlFor: "password", hidden: true }, "\uBE44\uBC00\uBC88\uD638"),
                        react_1.default.createElement(react_bootstrap_1.Form.Control, { type: "password", placeholder: "\uBE44\uBC00\uBC88\uD638\uB97C \uC785\uB825\uD574\uC8FC\uC138\uC694.", title: "\uBE44\uBC00\uBC88\uD638\uB97C \uC785\uB825\uD574\uC8FC\uC138\uC694.", id: "password", name: "password", className: "login-form-bottom", size: "lg", ref: function (ref) { return _this.passwordRef = ref; } })),
                    react_1.default.createElement(react_bootstrap_1.Form.Group, null,
                        react_1.default.createElement(react_bootstrap_1.Button, { type: "submit", size: "lg", block: true }, "\uB85C\uADF8\uC778"))))));
    };
    return Login;
}(react_1.Component));
exports.default = Login;
//# sourceMappingURL=Login.js.map
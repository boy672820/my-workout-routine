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
var react_1 = require("react");
var Form = /** @class */ (function (_super) {
    __extends(Form, _super);
    function Form() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.initialState = {
            name: '',
            job: '',
        };
        _this.state = _this.initialState;
        _this.handleChange = function (event) {
            var _a;
            var _b = event.target, name = _b.name, value = _b.value;
            _this.setState((_a = {},
                _a[name] = value,
                _a));
        };
        _this.submitForm = function () {
            _this.props.handleSubmit(_this.state);
            _this.setState(_this.initialState);
        };
        return _this;
    }
    Form.prototype.render = function () {
        var _a = this.state, name = _a.name, job = _a.job;
        return (react_1.default.createElement("form", null,
            react_1.default.createElement("label", { htmlFor: "name" }, "Name"),
            react_1.default.createElement("input", { type: "text", name: "name", id: "name", value: name, onChange: this.handleChange }),
            react_1.default.createElement("label", { htmlFor: "job" }, "Job"),
            react_1.default.createElement("input", { type: "text", name: "job", id: "id", value: job, onChange: this.handleChange }),
            react_1.default.createElement("button", { type: "button", onClick: this.submitForm }, "Submit")));
    };
    return Form;
}(react_1.Component));
exports.default = Form;
//# sourceMappingURL=Form.js.map
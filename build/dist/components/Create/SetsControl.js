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
var react_bootstrap_1 = require("react-bootstrap");
var SetsControl = /** @class */ (function (_super) {
    __extends(SetsControl, _super);
    function SetsControl() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            sets: _this.props.defaultValue
        };
        _this.handleClick = function (e) {
            var calc = Number(e.target.dataset.calc);
            var res = _this.state.sets + calc;
            if (res <= 0)
                res = 1;
            // Control component from parent.
            _this.props.handleChild({
                sets: res
            });
            // Control component from this.
            _this.setState({
                sets: res
            });
        };
        _this.handleChange = function (e) {
            var value = Number(e.target.value);
            // Check NaN.
            if (isNaN(value)) {
                _this.setState({ sets: 1 });
                return false;
            }
            // Check form control in state.
            if (_this.props.validate('sets', value))
                return false;
            // Control component from parent.
            _this.props.handleChild({ sets: value });
            // Control component from this.
            _this.setState({ sets: value });
        };
        return _this;
    }
    SetsControl.prototype.render = function () {
        return (react_1.default.createElement(react_bootstrap_1.Form.Group, { ref: this.props.controlRef },
            react_1.default.createElement(react_bootstrap_1.Form.Label, { htmlFor: "set" }, "Set"),
            react_1.default.createElement(react_bootstrap_1.InputGroup, null,
                react_1.default.createElement(react_bootstrap_1.InputGroup.Prepend, null,
                    react_1.default.createElement(react_bootstrap_1.Button, { variant: "outline-secondary", "data-calc": -1, onClick: this.handleClick }, "-")),
                react_1.default.createElement(react_bootstrap_1.Form.Control, { type: "text", id: "sets", name: "sets", value: this.state.sets, onChange: this.handleChange, title: "Please enter at least 1 set." }),
                react_1.default.createElement(react_bootstrap_1.InputGroup.Append, null,
                    react_1.default.createElement(react_bootstrap_1.Button, { variant: "outline-secondary", "data-calc": 1, onClick: this.handleClick }, "+"))),
            react_1.default.createElement(react_bootstrap_1.Form.Text, { id: "valid-sets", className: "text-muted", style: { display: 'none' } },
                react_1.default.createElement("span", { style: { color: 'red' } }, "Please enter at least 1 set.")),
            react_1.default.createElement(react_bootstrap_1.Form.Text, { className: "text-muted" }, "Enter only numbers.")));
    };
    return SetsControl;
}(react_1.Component));
exports.default = SetsControl;
//# sourceMappingURL=SetsControl.js.map
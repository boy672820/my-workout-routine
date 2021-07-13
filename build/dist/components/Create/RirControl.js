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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_bootstrap_1 = require("react-bootstrap");
var RirControl = /** @class */ (function (_super) {
    __extends(RirControl, _super);
    function RirControl() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            rir: _this.props.defaultValue
        };
        _this.handleClick = function (e) {
            var calc = Number(e.target.dataset.calc);
            var res = _this.state.rir + calc;
            if (res <= 0)
                res = 0;
            // Control component from parent.
            _this.props.handleChild({
                rir: res
            });
            // Control component from this.
            _this.setState({
                rir: res
            });
        };
        _this.handleChange = function (e) {
            var value = Number(e.target.value);
            // Check NaN.
            if (isNaN(value)) {
                _this.setState({ rir: 0 });
                return false;
            }
            // Control component from parent.
            _this.props.handleChild({ rir: value });
            // Control component from this.
            _this.setState({ rir: value });
        };
        return _this;
    }
    RirControl.prototype.render = function () {
        return (react_1.default.createElement(react_bootstrap_1.Form.Group, null,
            react_1.default.createElement(react_bootstrap_1.Form.Label, null, "RIR(Reps In Reserve)"),
            react_1.default.createElement(react_bootstrap_1.Form.Control, { as: "select", name: "rir", id: "rir", title: "Please enter your rir.", onChange: this.handleChange, value: this.state.rir }, __spreadArrays(Array(10)).map(function (n, index) {
                return (react_1.default.createElement("option", { key: index }, index));
            }))));
    };
    return RirControl;
}(react_1.Component));
exports.default = RirControl;
//# sourceMappingURL=RirControl.js.map
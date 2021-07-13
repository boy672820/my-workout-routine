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
var RepsControl = /** @class */ (function (_super) {
    __extends(RepsControl, _super);
    function RepsControl() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            disableRange: _this.props.defaultValue.disableRange,
            reps: _this.props.defaultValue.reps,
            maxReps: _this.props.defaultValue.maxReps
        };
        _this.handleReps = function (e) {
            var value = Number(e.target.value), update = { reps: value };
            // maxReps increase value.
            var increase = 2;
            switch (value) {
                case 100:
                    increase = 0;
                    break;
                case 99:
                    increase = 1;
                    break;
                default:
                    increase = 2;
                    break;
            }
            update['maxReps'] = value + increase;
            // Update current state.
            _this.setState(update);
            // Update parent state.
            _this.props.handleChild(update);
        };
        _this.handleMaxReps = function (e) {
            var value = Number(e.target.value), update = { maxReps: value };
            // reps decrease value.
            var decrease = 2;
            switch (value) {
                case 1:
                    decrease = 0;
                    break;
                case 2:
                    decrease = 1;
                    break;
                default:
                    decrease = 2;
                    break;
            }
            update['reps'] = value - decrease;
            // Update current state.
            _this.setState(update);
            // Update parent state.
            _this.props.handleChild(update);
        };
        _this.handleCheckbox = function (e) {
            var checked = e.target.checked, update = { disableRange: !checked };
            // Update current state.
            _this.setState(update);
            /**
             * Update current state.
             * If not checked, returns 0.
             */
            _this.props.handleChild(update);
        };
        return _this;
    }
    RepsControl.prototype.render = function () {
        return (react_1.default.createElement(react_bootstrap_1.Form.Group, null,
            react_1.default.createElement(react_bootstrap_1.Form.Label, { htmlFor: "reps" }, "Reps"),
            react_1.default.createElement(react_bootstrap_1.Form.Row, { className: "align-items-center" },
                react_1.default.createElement(react_bootstrap_1.Col, { xs: "auto" },
                    react_1.default.createElement(react_bootstrap_1.Form.Control, { as: "select", name: "reps", id: "reps", onChange: this.handleReps, value: this.state.reps }, __spreadArrays(Array(100)).map(function (n, index) {
                        return (react_1.default.createElement("option", { value: index + 1, key: index }, index + 1));
                    })),
                    react_1.default.createElement(react_bootstrap_1.Form.Text, null, "Default reps.")),
                react_1.default.createElement(react_bootstrap_1.Col, { xs: "auto" },
                    react_1.default.createElement(react_bootstrap_1.Form.Check, { type: "checkbox", id: "rep-range-enable", label: "Enable range.", onChange: this.handleCheckbox })),
                react_1.default.createElement(react_bootstrap_1.Col, { xs: "auto" },
                    react_1.default.createElement(react_bootstrap_1.Form.Control, { as: "select", name: "maxReps", id: "maxReps", disabled: this.state.disableRange, onChange: this.handleMaxReps, value: this.state.maxReps }, __spreadArrays(Array(100)).map(function (n, index) {
                        return (react_1.default.createElement("option", { key: index }, index + 1));
                    })),
                    react_1.default.createElement(react_bootstrap_1.Form.Text, null, "Maximum reps.")))));
    };
    return RepsControl;
}(react_1.Component));
exports.default = RepsControl;
//# sourceMappingURL=RepsControl.js.map
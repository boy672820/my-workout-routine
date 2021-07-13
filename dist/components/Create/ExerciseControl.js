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
var ExerciseControl = /** @class */ (function (_super) {
    __extends(ExerciseControl, _super);
    function ExerciseControl() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            exercise: _this.props.defaultValue
        };
        _this.handleChange = function (e) {
            var value = e.target.value;
            // Check form control in state.
            _this.props.validate('exercise', value);
            // Update state this.
            _this.setState({
                exercise: value
            });
            // Update state parent.
            _this.props.handleChild({
                exercise: value
            });
        };
        return _this;
    }
    ExerciseControl.prototype.render = function () {
        return (react_1.default.createElement(react_bootstrap_1.Form.Group, { ref: this.props.controlRef },
            react_1.default.createElement(react_bootstrap_1.Form.Label, null, "Exercise"),
            react_1.default.createElement(react_bootstrap_1.Form.Control, { type: "text", id: "exercise", title: "Please enter your exercise.", placeholder: "Please enter your exercise.", onChange: this.handleChange, value: this.state.exercise }),
            react_1.default.createElement(react_bootstrap_1.Form.Text, { id: "valid-exercise", className: "text-muted", style: { display: 'none' } },
                react_1.default.createElement("span", { style: { color: 'red' } }, "Please enter your exercise."))));
    };
    return ExerciseControl;
}(react_1.Component));
exports.default = ExerciseControl;
//# sourceMappingURL=ExerciseControl.js.map
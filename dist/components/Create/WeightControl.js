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
var WeightControl = /** @class */ (function (_super) {
    __extends(WeightControl, _super);
    function WeightControl() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            plate_weight: '2.5',
            weight: _this.props.defaultValue
        };
        _this.RadioToggleButton = function () {
            var radios = [
                { name: '2.5kg', value: '2.5' },
                { name: '5kg', value: '5' },
                { name: '10kg', value: '10' },
                { name: '15kg', value: '15' },
                { name: '20kg', value: '20' },
                { name: '25kg', value: '25' }
            ];
            return (react_1.default.createElement(react_bootstrap_1.ButtonGroup, null,
                react_1.default.createElement(react_bootstrap_1.DropdownButton, { title: 'Select plate(' + _this.state.plate_weight + 'kg)', variant: "secondary" }, radios.map(function (radio, index) { return (react_1.default.createElement(react_bootstrap_1.Dropdown.Item, { key: index, type: "radio", variant: "secondary", name: "weight-increase-value", size: "sm", onSelect: function (eKey) { return _this.setState({ plate_weight: eKey }); }, eventKey: radio.value }, radio.name)); }))));
        };
        _this.handleClick = function (e) {
            var calc = e.target.dataset.calc;
            var calc_weight = Number(_this.state.plate_weight) * calc, state_weight = _this.state.weight;
            var res = state_weight + calc_weight;
            if (res <= 0)
                res = 0;
            // Control component from parent.
            _this.props.handleChild({ weight: res });
            // Control component from this.
            _this.setState({
                weight: res
            });
        };
        _this.handleChange = function (e) {
            var value = Number(e.target.value);
            // Check NaN.
            if (isNaN(value)) {
                _this.setState({ weight: 0 });
                return false;
            }
            // Check form control in state.
            if (!_this.props.validate('weight', value))
                return false;
            // Control component from parent.
            _this.props.handleChild({ weight: value });
            // Control component from this.
            _this.setState({ weight: value });
        };
        return _this;
    }
    WeightControl.prototype.render = function () {
        return (react_1.default.createElement(react_bootstrap_1.Form.Group, { ref: this.props.controlRef },
            react_1.default.createElement(react_bootstrap_1.Form.Label, { htmlFor: "weight" }, "Weight(kg)"),
            react_1.default.createElement(react_bootstrap_1.Form.Group, null,
                react_1.default.createElement(this.RadioToggleButton, null)),
            react_1.default.createElement(react_bootstrap_1.InputGroup, null,
                react_1.default.createElement(react_bootstrap_1.InputGroup.Prepend, null,
                    react_1.default.createElement(react_bootstrap_1.Button, { variant: "outline-secondary", onClick: this.handleClick, "data-calc": -1 }, "-")),
                react_1.default.createElement(react_bootstrap_1.Form.Control, { type: "text", id: "weight", name: "weight", value: this.state.weight, onChange: this.handleChange, title: "Please enter at least 1 weight." }),
                react_1.default.createElement(react_bootstrap_1.InputGroup.Append, null,
                    react_1.default.createElement(react_bootstrap_1.Button, { variant: "outline-secondary", onClick: this.handleClick, "data-calc": 1 }, "+"))),
            react_1.default.createElement(react_bootstrap_1.Form.Text, { id: "valid-weight", className: "text-muted", style: { display: 'none' } },
                react_1.default.createElement("span", { style: { color: 'red' } }, "Please enter at least 1 weight.")),
            react_1.default.createElement(react_bootstrap_1.Form.Text, { className: "text-muted" }, "Enter only numbers.")));
    };
    return WeightControl;
}(react_1.Component));
exports.default = WeightControl;
//# sourceMappingURL=WeightControl.js.map
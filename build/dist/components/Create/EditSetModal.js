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
var EditSetModal = /** @class */ (function (_super) {
    __extends(EditSetModal, _super);
    function EditSetModal() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            is_derived: false,
            plate_weight: 2.5,
            // Form state.
            exercise_idx: null,
            set_idx: null,
            reps: 1,
            maxReps: 1,
            disableRange: true,
            weight: 0,
            rir: 0
        };
        /**
         * Control reps.
         * @param {*} e
         */
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
        };
        /**
         * Control maxReps.
         * @param {*} e
         */
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
        };
        /**
         * control the disable range.
         * @param {*} e
         */
        _this.handleCheckbox = function (e) {
            var checked = e.target.checked, update = { disableRange: !checked };
            // Update current state.
            _this.setState(update);
        };
        /**
         * Weight toggle button component.
         */
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
        /**
         * Increase and decrease to weight value.
         * @param {*} e
         */
        _this.handleInreaseButton = function (e) {
            var calc = e.target.dataset.calc;
            var calc_weight = Number(_this.state.plate_weight) * calc, state_weight = _this.state.weight;
            var res = state_weight + calc_weight;
            if (res <= 0)
                res = 0;
            // Control component from this.
            _this.setState({
                weight: res
            });
        };
        /**
         * Control weight.
         * @param {*} e
         */
        _this.handleWeight = function (e) {
            var value = Number(e.target.value);
            var ref = _this.weightRef;
            // Check NaN.
            if (isNaN(value)) {
                ref.querySelector('#edit-weight').style.borderColor = 'red';
                ref.querySelector('#valid-edit-weight').style.display = 'block';
                return false;
            }
            else {
                ref.querySelector('#edit-weight').style.borderColor = '#ced4da';
                ref.querySelector('#valid-edit-weight').style.display = 'none';
            }
            _this.setState({
                weight: value
            });
        };
        /**
         * Control rir.
         * @param {*} e
         */
        _this.handleRir = function (e) {
            var value = Number(e.target.value);
            _this.setState({
                rir: value
            });
        };
        /**
         * Submit edit.
         * @param {*} e
         */
        _this.handleSubmit = function (e) {
            var update = _this.props.exerciseListData.slice();
            var updateItem = update[_this.state.exercise_idx].sets[_this.state.set_idx];
            updateItem.weight = _this.state.weight;
            updateItem.reps = _this.state.reps;
            updateItem.maxReps = _this.state.maxReps;
            updateItem.disableRange = _this.state.disableRange;
            updateItem.rir = _this.state.rir;
            _this.props.handleChild(update);
            _this.props.handleModal();
            e.preventDefault();
        };
        return _this;
    }
    // Init state to props.
    EditSetModal.getDerivedStateFromProps = function (props, state) {
        // Initial init when open modal.
        if (props.is_modal && !state.is_derived) {
            return {
                is_derived: true,
                exercise_idx: props.data.exercise_idx,
                set_idx: props.data.set_idx,
                reps: props.data.reps,
                maxReps: props.data.maxReps,
                disableRange: props.data.disableRange,
                weight: props.data.weight,
                rir: props.data.rir
            };
        }
        // Return initial when close modal.
        else if (!props.is_modal && state.is_derived) {
            return {
                is_derived: false,
                exercise_idx: null,
                set_idx: null,
                reps: 1,
                maxReps: 1,
                disableRange: true,
                weight: 0,
                rir: 0
            };
        }
        return null;
    };
    EditSetModal.prototype.render = function () {
        var _this = this;
        return (react_1.default.createElement(react_bootstrap_1.Modal, { show: this.props.is_modal, onHide: this.props.handleModal },
            react_1.default.createElement(react_bootstrap_1.Form, { onSubmit: this.handleSubmit },
                react_1.default.createElement(react_bootstrap_1.Modal.Header, { closeButton: true },
                    react_1.default.createElement(react_bootstrap_1.Modal.Title, null, "Edit set")),
                react_1.default.createElement(react_bootstrap_1.Modal.Body, null,
                    react_1.default.createElement(react_bootstrap_1.Form.Group, { ref: function (ref) { return _this.weightRef = ref; } },
                        react_1.default.createElement(react_bootstrap_1.Form.Label, { htmlFor: "edit-weight" }, "Weight"),
                        react_1.default.createElement(react_bootstrap_1.Form.Group, null,
                            react_1.default.createElement(this.RadioToggleButton, null)),
                        react_1.default.createElement(react_bootstrap_1.InputGroup, null,
                            react_1.default.createElement(react_bootstrap_1.InputGroup.Prepend, null,
                                react_1.default.createElement(react_bootstrap_1.Button, { variant: "outline-secondary", onClick: this.handleInreaseButton, "data-calc": -1 }, "-")),
                            react_1.default.createElement(react_bootstrap_1.Form.Control, { type: "text", id: "edit-weight", name: "edit-weight", onChange: this.handleWeight, value: this.state.weight }),
                            react_1.default.createElement(react_bootstrap_1.InputGroup.Append, null,
                                react_1.default.createElement(react_bootstrap_1.Button, { variant: "outline-secondary", onClick: this.handleInreaseButton, "data-calc": 1 }, "+"))),
                        react_1.default.createElement(react_bootstrap_1.Form.Text, { id: "valid-edit-weight", className: "text-muted", style: { display: 'none' } },
                            react_1.default.createElement("span", { style: { color: 'red' } }, "Only enter number."))),
                    react_1.default.createElement(react_bootstrap_1.Form.Group, null,
                        react_1.default.createElement(react_bootstrap_1.Form.Label, { htmlFor: "edit-Reps" }, "Reps"),
                        react_1.default.createElement(react_bootstrap_1.Form.Row, { className: "align-items-center" },
                            react_1.default.createElement(react_bootstrap_1.Col, { xs: "auto" },
                                react_1.default.createElement(react_bootstrap_1.Form.Control, { as: "select", name: "edit-reps", id: "edit-reps", onChange: this.handleReps, value: this.state.reps }, __spreadArrays(Array(100)).map(function (n, index) {
                                    return (react_1.default.createElement("option", { value: index + 1, key: index }, index + 1));
                                })),
                                react_1.default.createElement(react_bootstrap_1.Form.Text, null, "Default reps.")),
                            react_1.default.createElement(react_bootstrap_1.Col, { xs: "auto" },
                                react_1.default.createElement(react_bootstrap_1.Form.Check, { type: "checkbox", id: "edit-rep-range-enable", label: "Enable range.", onChange: this.handleCheckbox, checked: !this.state.disableRange })),
                            react_1.default.createElement(react_bootstrap_1.Col, { xs: "auto" },
                                react_1.default.createElement(react_bootstrap_1.Form.Control, { as: "select", name: "edit-maxReps", id: "edit-maxReps", disabled: this.state.disableRange, onChange: this.handleMaxReps, value: this.state.maxReps }, __spreadArrays(Array(100)).map(function (n, index) {
                                    return (react_1.default.createElement("option", { key: index }, index + 1));
                                })),
                                react_1.default.createElement(react_bootstrap_1.Form.Text, null, "Maximum reps.")))),
                    react_1.default.createElement(react_bootstrap_1.Form.Group, null,
                        react_1.default.createElement(react_bootstrap_1.Form.Label, { htmlFor: "edit-rir" }, "RIR(Reps In Reserve)"),
                        react_1.default.createElement(react_bootstrap_1.Form.Control, { as: "select", id: "edit-rir", name: "edit-rir", onChange: this.handleRir, value: this.state.rir }, __spreadArrays(Array(10)).map(function (n, i) {
                            return (react_1.default.createElement("option", { key: i, value: i }, i));
                        })))),
                react_1.default.createElement(react_bootstrap_1.Modal.Footer, null,
                    react_1.default.createElement(react_bootstrap_1.Button, { variant: "secondary", onClick: this.props.handleModal }, "Close"),
                    react_1.default.createElement(react_bootstrap_1.Button, { type: "submit", variant: "primary" }, "Save Changes")))));
    };
    return EditSetModal;
}(react_1.Component));
exports.default = EditSetModal;
//# sourceMappingURL=EditSetModal.js.map
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
var ExerciseControl_1 = require("./ExerciseControl");
var WeightControl_1 = require("./WeightControl");
var SetsControl_1 = require("./SetsControl");
var RepsControl_1 = require("./RepsControl");
var RirControl_1 = require("./RirControl");
var ExerciseList_1 = require("./ExerciseList");
require("./create.css");
var Create = /** @class */ (function (_super) {
    __extends(Create, _super);
    function Create() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            // The form data of create exercise.
            exercise: '',
            weight: 0,
            sets: 1,
            reps: 1,
            maxReps: 0,
            disableRange: true,
            rir: 0,
            // The result list of create form.
            exerciseList: []
        };
        /**
         * Control from child component.
         * @param {Object} res
         */
        _this.handleChild = function (res, callback) {
            if (typeof callback === 'function')
                _this.setState(res, callback);
            else
                _this.setState(res);
        };
        /**
         * Handle submit.
         * @param {*} e
         */
        _this.handleSubmit = function (e) {
            e.preventDefault();
            // Form validation.
            if (!_this.formValidation())
                return;
            // Copy state object.
            var data = Object.assign({}, _this.state);
            // Remove exerciseList element in data.
            delete data.exerciseList;
            // Create state data.
            var update = {
                exercise: data.exercise,
                sets: []
            };
            var i = 1;
            // Set standard.
            for (i; i <= data.sets; i += 1) {
                update.sets.push({
                    set: i,
                    weight: data.weight,
                    reps: data.reps,
                    maxReps: data.maxReps,
                    disableRange: data.disableRange,
                    rir: data.rir
                });
            }
            // Update this state.
            _this.setState(function (prevState) { return ({
                // Add element from exerciseList state.
                exerciseList: __spreadArrays(prevState.exerciseList, [
                    update
                ])
            }); });
        };
        /**
         * Check form validation.
         */
        _this.formValidation = function () {
            var state = _this.state;
            // Checked to be form controls.
            var targets = Object.entries({
                exercise: _this.exerciseRef,
                sets: _this.setsRef,
                reps: _this.repsRef
            });
            // Results of validation.
            var res = true;
            // Check form control in state.
            for (var _i = 0, targets_1 = targets; _i < targets_1.length; _i++) {
                var _a = targets_1[_i], key = _a[0], ref = _a[1];
                var state_target = state[key];
                // Check null.
                if (!state_target) {
                    var input = ref.querySelector('#' + key), // Form control.
                    message = ref.querySelector('#valid-' + key); // Worning message.
                    input.style.borderColor = 'red';
                    message.style.display = 'block';
                    // Validation failed.
                    res = false;
                }
            }
            if (!res)
                window.scrollTo(0, 0);
            return res;
        };
        /**
         * Dynamic validation.
         * @param {*} key Ref prefix name.
         * @param {*} value Value to check.
         */
        _this.CheckedForm = function (key, value) {
            // Check state.
            if (!value)
                return false;
            var ref = _this[key + 'Ref'];
            var refInput = ref.querySelector('#' + key);
            var refMessage = ref.querySelector('#valid-' + key);
            refInput.style.borderColor = '#ced4da';
            refMessage.style.display = 'none';
            return true;
        };
        return _this;
    }
    Create.prototype.render = function () {
        var _this = this;
        return (react_1.default.createElement(react_bootstrap_1.Container, { id: "createContainer", ref: function (ref) { return _this.createContainerRef = ref; } },
            react_1.default.createElement(react_bootstrap_1.Card, null,
                react_1.default.createElement(react_bootstrap_1.Card.Body, null,
                    react_1.default.createElement("h2", null, "Create routine"),
                    react_1.default.createElement(react_bootstrap_1.Form, { onSubmit: this.handleSubmit },
                        react_1.default.createElement(ExerciseControl_1.default, { defaultValue: this.state.exercise, handleChild: this.handleChild, controlRef: function (ref) { return _this.exerciseRef = ref; }, validate: this.CheckedForm }),
                        react_1.default.createElement(WeightControl_1.default, { defaultValue: this.state.weight, handleChild: this.handleChild, controlRef: function (ref) { return _this.weightRef = ref; }, validate: this.CheckedForm }),
                        react_1.default.createElement(SetsControl_1.default, { defaultValue: this.state.sets, handleChild: this.handleChild, controlRef: function (ref) { return _this.setsRef = ref; }, validate: this.CheckedForm }),
                        react_1.default.createElement(RepsControl_1.default, { defaultValue: {
                                reps: this.state.reps,
                                maxReps: this.state.maxReps,
                                disableRange: this.state.disableRange
                            }, handleChild: this.handleChild, controlRef: function (ref) { return _this.repsRef = ref; } }),
                        react_1.default.createElement(RirControl_1.default, { defaultValue: this.state.rir, handleChild: this.handleChild }),
                        react_1.default.createElement(react_bootstrap_1.Button, { variant: "primary", type: "submit" }, "Submit")))),
            react_1.default.createElement(ExerciseList_1.default, { data: this.state.exerciseList, handleChild: this.handleChild })));
    };
    return Create;
}(react_1.Component));
exports.default = Create;
//# sourceMappingURL=Create.js.map
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
var EditSetModal_1 = require("./EditSetModal");
var ExerciseList = /** @class */ (function (_super) {
    __extends(ExerciseList, _super);
    function ExerciseList() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            is_modal: false,
            editSetData: 0
        };
        /**
         * Remove exercise.
         */
        _this.handleRemoveExercise = function (e) {
            var idx = _this.state.deleteFade; // Target index.
            var res = _this.props.data.slice(); // Copy props data(exerciseList in state from parent).
            // Remove target element.
            res.splice(idx, 1);
            // Lifting state up.
            _this.props.handleChild({
                exerciseList: res
            });
        };
        /**
         * Remove set in exercise.
         */
        _this.handleRemoveSet = function (e) {
            var dataset = e.target.dataset;
            var idx = dataset.idx; // Set index.
            var exercise_idx = dataset.exercise; // Parent index.
            var res = _this.props.data.slice(); // Copy props data.
            // Remove set.
            res[exercise_idx].sets.splice(idx, 1);
            // Reset column set in exercise sets.
            for (var _i = 0, _a = Object.entries(res[exercise_idx].sets); _i < _a.length; _i++) {
                var _b = _a[_i], key = _b[0], value = _b[1];
                value.set = Number(key) + 1;
            }
            // Lifting state up.
            _this.props.handleChild({
                exerciseList: res
            });
        };
        _this.handleModal = function () {
            _this.setState({
                is_modal: !_this.state.is_modal
            });
        };
        _this.handleEditSet = function (e) {
            var dataset = e.target.dataset;
            _this.setState({
                is_modal: true,
                editSetData: {
                    exercise_idx: Number(dataset.exercise),
                    set_idx: Number(dataset.set),
                    reps: Number(dataset.reps),
                    maxReps: Number(dataset.maxreps),
                    disableRange: dataset.disablerange === 'true' ? true : false,
                    rir: Number(dataset.rir),
                    weight: Number(dataset.weight)
                }
            });
        };
        return _this;
    }
    ExerciseList.prototype.render = function () {
        var _this = this;
        return (react_1.default.createElement("div", null,
            react_1.default.createElement("hr", null),
            this.props.data.map(function (row, index) {
                return (react_1.default.createElement("div", { key: index },
                    react_1.default.createElement(react_bootstrap_1.Row, null,
                        react_1.default.createElement(react_bootstrap_1.Col, null,
                            react_1.default.createElement("h3", null, row.exercise)),
                        react_1.default.createElement(react_bootstrap_1.Col, { className: "text align right" },
                            react_1.default.createElement(react_bootstrap_1.Button, { variant: "danger", size: "sm", onClick: _this.handleRemoveExercise, "data-idx": index }, "Delete"))),
                    react_1.default.createElement(react_bootstrap_1.Table, { className: "exercise-volum-table", striped: true, bordered: true, hover: true, size: "sm", responsive: true },
                        react_1.default.createElement("thead", null,
                            react_1.default.createElement("tr", null,
                                react_1.default.createElement("th", null, "Preview"),
                                react_1.default.createElement("th", { className: "text align center" }, "Set"),
                                react_1.default.createElement("th", { className: "text align center" }, "Weight(kg)"),
                                react_1.default.createElement("th", { className: "text align center" }, "Reps"),
                                react_1.default.createElement("th", { className: "text align center" }, "RIR"),
                                react_1.default.createElement("th", { className: "text align center" }),
                                react_1.default.createElement("th", { className: "text align center" }))),
                        react_1.default.createElement("tbody", null, row.sets.map(function (set, i) {
                            return (react_1.default.createElement("tr", { key: i },
                                react_1.default.createElement("td", null,
                                    set.set,
                                    "Set \u00A0/\u00A0",
                                    set.weight,
                                    "Kg \u00A0/\u00A0",
                                    set.reps,
                                    "Reps",
                                    !set.disableRange ? '~' + set.maxReps + 'Reps' : '',
                                    "\u00A0/\u00A0",
                                    set.rir,
                                    "RIR"),
                                react_1.default.createElement("td", { width: 50, className: "text align center" }, set.set),
                                react_1.default.createElement("td", { width: 100, className: "text align center" }, set.weight),
                                react_1.default.createElement("td", { width: 80, className: "text align center" },
                                    set.reps,
                                    !set.disableRange ? '~' + set.maxReps : ''),
                                react_1.default.createElement("td", { width: 50, className: "text align center" }, set.rir),
                                react_1.default.createElement("td", { width: 50, className: "text align center" },
                                    react_1.default.createElement(react_bootstrap_1.Button, { variant: "outline-info", size: "sm", onClick: _this.handleEditSet, "data-exercise": index, "data-set": i, "data-weight": set.weight, "data-reps": set.reps, "data-maxreps": set.maxReps, "data-disablerange": set.disableRange, "data-rir": set.rir }, "Edit")),
                                react_1.default.createElement("td", { width: 50, className: "text align center" },
                                    react_1.default.createElement(react_bootstrap_1.Button, { variant: "outline-danger", size: "sm", onClick: _this.handleRemoveSet, "data-idx": i, "data-exercise": index }, "X"))));
                        })))));
            }),
            react_1.default.createElement(EditSetModal_1.default, { data: this.state.editSetData, exerciseListData: this.props.data, handleChild: this.props.handleChild, handleModal: this.handleModal, is_modal: this.state.is_modal })) //.container
        );
    };
    return ExerciseList;
}(react_1.Component));
exports.default = ExerciseList;
//# sourceMappingURL=ExerciseList.js.map
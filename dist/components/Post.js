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
var Modal_1 = require("./Modal");
require("./post.css");
var ROUTINES = [
    {
        index: 1,
        exercise: 'Squat',
        sets: [
            { set: 1, reps: 10, weight: 150 },
            { set: 2, reps: 9, weight: 150 },
            { set: 3, reps: 9, weight: 145 },
            { set: 4, reps: 8, weight: 140 },
            { set: 5, reps: 8, weight: 135 },
        ],
        memo: 'Shut up and Squat!'
    },
    {
        index: 2,
        exercise: 'Deadlift',
        sets: [
            { set: 1, reps: 6, weight: 180 },
        ],
        memo: 'This exercise is Deadlift.'
    },
    {
        index: 3,
        exercise: 'Steaf-Leg Deadlift',
        sets: [
            { set: 1, reps: 12, weight: 90 },
            { set: 2, reps: 12, weight: 90 },
            { set: 3, reps: 12, weight: 90 },
            { set: 4, reps: 12, weight: 90 },
        ],
        memo: 'Stop set.'
    },
];
var Form = /** @class */ (function (_super) {
    __extends(Form, _super);
    function Form() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            index: 0,
            set: 0,
            reps: 0,
            weight: 0,
        };
        _this.handleChange = function (e) {
            var _a;
            var _b = e.target, name = _b.name, value = _b.value;
            _this.setState((_a = {},
                _a[name] = value,
                _a));
        };
        _this.handleSubmit = function (e) {
            e.preventDefault();
            _this.props.updateData(_this.state);
        };
        _this.updateFormData = function (data) {
            var index = data.index, set = data.set, reps = data.reps, weight = data.weight;
            _this.setState({
                index: index,
                set: set,
                reps: reps,
                weight: weight
            });
        };
        _this.removeForm = function () {
            _this.props.handleModal(false);
            _this.setState({ index: 0, set: 0, reps: 0, weight: 0 });
        };
        return _this;
    }
    Form.prototype.render = function () {
        return (react_1.default.createElement("div", { className: "form-container" },
            react_1.default.createElement("form", { action: "#", method: "post", id: "form-set", onSubmit: this.handleSubmit },
                react_1.default.createElement("fieldset", null,
                    react_1.default.createElement("p", null,
                        react_1.default.createElement("label", { htmlFor: "reps" }, "Reps"),
                        react_1.default.createElement("input", { type: "text", name: "reps", id: "reps", value: this.state.reps, onChange: this.handleChange })),
                    react_1.default.createElement("p", null,
                        react_1.default.createElement("label", { htmlFor: "weight" }, "Weight"),
                        react_1.default.createElement("input", { type: "text", name: "weight", id: "weight", value: this.state.weight, onChange: this.handleChange })),
                    react_1.default.createElement("button", { type: "submit" }, "update"))),
            react_1.default.createElement("p", { className: "close" },
                react_1.default.createElement("button", { className: "close-modal", onClick: this.removeForm }, "Close"))));
    };
    return Form;
}(react_1.Component));
var ExerciseSet = function (_a) {
    var index = _a.index, sets = _a.sets, editSet = _a.editSet;
    return (react_1.default.createElement("ul", { className: "sets" }, sets.map(function (row, i) {
        return (react_1.default.createElement("li", { className: "set", key: i },
            react_1.default.createElement("p", { className: "reps" },
                react_1.default.createElement("span", null, row.reps),
                "Reps"),
            react_1.default.createElement("p", { className: "weight" },
                react_1.default.createElement("span", null, row.weight),
                "Kg"),
            react_1.default.createElement("button", { onClick: editSet, "data-index": index, "data-set": row.set, "data-reps": row.reps, "data-weight": row.weight }, "1\uC138\uD2B8 \uC218\uC815")));
    })));
};
var ExerciseItem = function (_a) {
    var data = _a.data, editSet = _a.editSet;
    return (react_1.default.createElement("ul", { className: "list" }, data.map(function (row, index) {
        return (react_1.default.createElement("li", { className: "item", key: index },
            react_1.default.createElement("div", { className: "main" },
                react_1.default.createElement("h6", { className: "excercise" }, row.exercise),
                react_1.default.createElement(ExerciseSet, { index: row.index, sets: row.sets, editSet: editSet })),
            react_1.default.createElement("div", { className: "sub" },
                react_1.default.createElement("textarea", { name: "memo", className: "memo", defaultValue: row.memo }))));
    })));
};
var Post = /** @class */ (function (_super) {
    __extends(Post, _super);
    function Post() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            JSON: ROUTINES,
            modal_display: false,
        };
        _this.handleModal = function (boolean) {
            _this.setState({ modal_display: boolean });
        };
        _this.updateData = function (updated) {
            var data = _this.state.JSON;
            var index = updated.index, set = updated.set, reps = updated.reps, weight = updated.weight;
            data[index - 1].sets[set - 1].reps = reps;
            data[index - 1].sets[set - 1].weight = weight;
            _this.setState({ JSON: data });
            _this.handleModal(false);
        };
        _this.editSet = function (e) {
            var _a = e.target.dataset, index = _a.index, set = _a.set, reps = _a.reps, weight = _a.weight;
            _this.setState({ modal_display: true });
            _this.refs.FormComponent.updateFormData({
                index: index,
                set: set,
                reps: reps,
                weight: weight
            });
        };
        return _this;
    }
    Post.prototype.render = function () {
        return (react_1.default.createElement("div", { className: "post-container" },
            react_1.default.createElement(ExerciseItem, { data: this.state.JSON, editSet: this.editSet }),
            react_1.default.createElement(Modal_1.default, { display: this.state.modal_display },
                react_1.default.createElement(Form, { handleModal: this.handleModal, updateData: this.updateData, ref: "FormComponent" }))));
    };
    return Post;
}(react_1.Component));
exports.default = Post;
//# sourceMappingURL=Post.js.map
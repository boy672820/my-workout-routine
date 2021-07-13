"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var TableHeader = function () {
    return (react_1.default.createElement("thead", null,
        react_1.default.createElement("tr", null,
            react_1.default.createElement("th", null, "Name"),
            react_1.default.createElement("th", null, "Job"))));
};
var TableBody = function (props) {
    var rows = props.characterData.map(function (row, index) {
        return (react_1.default.createElement("tr", { key: index },
            react_1.default.createElement("td", null, row.name),
            react_1.default.createElement("td", null, row.job),
            react_1.default.createElement("td", null,
                react_1.default.createElement("button", { onClick: function () { return props.removeCharacter(index); } }, "Delete"))));
    });
    return react_1.default.createElement("tbody", null, rows);
};
var Table = function (props) {
    var characterData = props.characterData, removeCharacter = props.removeCharacter;
    return (react_1.default.createElement("table", null,
        react_1.default.createElement(TableHeader, null),
        react_1.default.createElement(TableBody, { characterData: characterData, removeCharacter: removeCharacter })));
};
exports.default = Table;
//# sourceMappingURL=Table.js.map
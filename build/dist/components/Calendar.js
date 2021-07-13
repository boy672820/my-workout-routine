"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
require("./calendar.css");
var init = {
    month: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    day: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    today: new Date()
};
var Month = function () {
    return (react_1.default.createElement("h1", { className: "month" }, init.month[init.today.getMonth()]));
};
var TableHeader = function () {
    return (react_1.default.createElement("thead", { className: "week" },
        react_1.default.createElement("tr", null, init.day.map(function (item, index) {
            return react_1.default.createElement("td", { key: index }, item);
        }))));
};
var CalendarDays = function (props) {
    return (props.items.map(function (item, index) {
        return react_1.default.createElement("td", { className: "day", key: index }, item === 0 ? '' : item);
    }));
};
var CalendarWeeks = function (props) {
    return (props.rows.map(function (row, index) {
        return (react_1.default.createElement("tr", { key: index },
            react_1.default.createElement(CalendarDays, { items: row })));
    }));
};
var TableBody = function () {
    var calendarData = [];
    var firstDate = new Date(init.today.getFullYear(), init.today.getMonth(), 1), lastDate = new Date(init.today.getFullYear(), init.today.getMonth() + 1, 0);
    var calendar_total_date = firstDate.getDay() + lastDate.getDate();
    calendar_total_date = calendar_total_date / 7;
    calendar_total_date = Math.ceil(calendar_total_date);
    // Create week rows to calendarData.
    for (var i = 0; i < calendar_total_date; i += 1) {
        calendarData.push(new Array());
    }
    // Push first week to calendarData.
    for (var i = 0, first_week_date = 1; i <= 6; i += 1) {
        if (firstDate.getDay() <= i) {
            calendarData[0].push(first_week_date);
            first_week_date += 1;
        }
        else
            calendarData[0].push(0);
    }
    // Push date of week to calendarData.
    for (var i = 1; i < calendar_total_date - 1; i += 1) {
        var first_date_of_week = calendarData[i - 1][6] + 1;
        for (var j = first_date_of_week; j <= first_date_of_week + 6; j += 1)
            calendarData[i].push(j);
    }
    // Push date of last week to calendarData.
    var first_date_of_last_week = lastDate.getDate() - lastDate.getDay();
    for (var i = first_date_of_last_week; i <= lastDate.getDate(); i += 1) {
        calendarData[calendar_total_date - 1].push(i);
    }
    return (react_1.default.createElement("tbody", { className: "days" },
        react_1.default.createElement(CalendarWeeks, { rows: calendarData })));
};
var Calendar = function () {
    var style = {
        height: window.screen.height - 100
    };
    return (react_1.default.createElement("div", { className: "calendar_wrap" },
        react_1.default.createElement(Month, null),
        react_1.default.createElement("table", { className: "calendar", style: style },
            react_1.default.createElement(TableHeader, null),
            react_1.default.createElement(TableBody, null))));
};
exports.default = Calendar;
//# sourceMappingURL=Calendar.js.map
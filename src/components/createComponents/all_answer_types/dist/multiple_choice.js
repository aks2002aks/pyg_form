"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
var react_1 = require("react");
var Multiple_choice = function (_a) {
    var options = _a.options, setOptions = _a.setOptions;
    var handleOptionChange = function (index, value) {
        var newOptions = __spreadArrays(options);
        newOptions[index] = value;
        setOptions(newOptions);
    };
    var handleAddOption = function () {
        var NOption = "Option " + (options.length + 1);
        setOptions(__spreadArrays(options, [NOption]));
    };
    return (react_1["default"].createElement("div", null,
        options.map(function (option, index) { return (react_1["default"].createElement("div", { key: index, className: "pb-4" },
            react_1["default"].createElement("input", { type: "radio", name: "multiple_choice", className: "mr-2", value: option }),
            react_1["default"].createElement("input", { type: "text", value: option, onChange: function (e) { return handleOptionChange(index, e.target.value); }, className: "border-b outline-none " }))); }),
        react_1["default"].createElement("div", null,
            react_1["default"].createElement("input", { type: "radio", name: "multiple_choice", className: "mr-2", disabled: true }),
            react_1["default"].createElement("input", { type: "text", value: "Add option", onClick: handleAddOption, className: "border-b outline-none" }))));
};
exports["default"] = Multiple_choice;

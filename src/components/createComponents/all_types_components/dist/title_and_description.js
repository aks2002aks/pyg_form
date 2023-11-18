"use client";
"use strict";
exports.__esModule = true;
var react_1 = require("react");
var question_input_1 = require("./question_input");
var Title_and_description = function () {
    return (react_1["default"].createElement("div", { className: "bg-white container max-w-3xl rounded-xl border-t-8 border-t-red-200" },
        react_1["default"].createElement("div", { className: "p-5 w-full border-l-[6px] rounded-lg space-y-4 " },
            react_1["default"].createElement(question_input_1["default"], { input_label: "Title", placeholder_text: "Untitled Form", text_size: "5xl" }),
            react_1["default"].createElement(question_input_1["default"], { input_label: "Description", placeholder_text: "Description", text_size: "base" }))));
};
exports["default"] = Title_and_description;

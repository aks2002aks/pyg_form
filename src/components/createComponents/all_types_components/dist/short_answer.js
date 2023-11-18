"use client";
"use strict";
exports.__esModule = true;
var react_1 = require("react");
var question_input_1 = require("./question_input");
var fa_1 = require("react-icons/fa");
var question_type_1 = require("./question_type");
var Short_answer = function () {
    var _a = react_1.useState(""), selectedValue = _a[0], setSelectedValue = _a[1];
    return (react_1["default"].createElement("div", { className: "bg-white container max-w-3xl rounded-xl" },
        react_1["default"].createElement("div", { className: "p-5 w-full border-l-[6px] rounded-lg space-y-4 " },
            react_1["default"].createElement("div", { className: "flex sm:flex-row flex-col space-x-4 sm:items-center items-start space-y-4" },
                react_1["default"].createElement("div", { className: "sm:w-2/3 w-full" },
                    react_1["default"].createElement(question_input_1["default"], { input_label: "short_answer", placeholder_text: "Short Answer Question", text_size: "md" })),
                react_1["default"].createElement("div", { className: "flex sm:w-1/3 w-full space-x-4  items-center" },
                    react_1["default"].createElement("div", { className: "flex sm:h-10 h-14 items-center" },
                        react_1["default"].createElement(fa_1.FaRegImages, { size: 20 })),
                    react_1["default"].createElement("div", { className: "w-full  p-3 rounded-md" },
                        react_1["default"].createElement(question_type_1["default"], { selectedValue: selectedValue, setSelectedValue: setSelectedValue })))),
            react_1["default"].createElement("div", { className: "" },
                react_1["default"].createElement("textarea", { className: "w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none", rows: 4, placeholder: "Enter paragraph here..." })))));
};
exports["default"] = Short_answer;

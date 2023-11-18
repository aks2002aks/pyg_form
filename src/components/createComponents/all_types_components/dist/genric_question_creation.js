"use client";
"use strict";
exports.__esModule = true;
var react_1 = require("react");
var question_input_1 = require("../all_types_components/question_input");
var fa_1 = require("react-icons/fa");
var hi_1 = require("react-icons/hi");
var question_type_1 = require("../all_types_components/question_type");
var short_answer_1 = require("../all_answer_types/short_answer");
var paragraph_1 = require("../all_answer_types/paragraph");
var multiple_choice_1 = require("../all_answer_types/multiple_choice");
var Genric_Question_Creation = function () {
    var _a = react_1.useState("Short answer"), selectedValue = _a[0], setSelectedValue = _a[1];
    var _b = react_1.useState(["Option 1", "Option 2"]), options = _b[0], setOptions = _b[1];
    var _c = react_1.useState(false), isChecked = _c[0], setIsChecked = _c[1];
    var handleCheckboxChange = function () {
        setIsChecked(!isChecked);
    };
    var rendorAnswerType = function (selectedValue) {
        if (selectedValue == "Short answer") {
            return react_1["default"].createElement(short_answer_1["default"], null);
        }
        else if (selectedValue == "Paragraph") {
            return react_1["default"].createElement(paragraph_1["default"], null);
        }
        else if (selectedValue == "Multiple choice") {
            return react_1["default"].createElement(multiple_choice_1["default"], { options: options, setOptions: setOptions });
        }
        else if (selectedValue == "Drop-down") {
            return react_1["default"].createElement(paragraph_1["default"], null);
        }
        else if (selectedValue == "Checkboxes") {
            return react_1["default"].createElement(paragraph_1["default"], null);
        }
        else if (selectedValue == "File upload") {
            return react_1["default"].createElement(paragraph_1["default"], null);
        }
        else if (selectedValue == "Date") {
            return react_1["default"].createElement(paragraph_1["default"], null);
        }
        else if (selectedValue == "Time") {
            return react_1["default"].createElement(paragraph_1["default"], null);
        }
    };
    return (react_1["default"].createElement("div", { className: "bg-white container max-w-3xl rounded-xl" },
        react_1["default"].createElement("div", { className: "p-5 w-full border-l-[6px] rounded-lg space-y-4 " },
            react_1["default"].createElement("div", { className: "flex sm:flex-row flex-col space-x-4 sm:items-center items-start space-y-4" },
                react_1["default"].createElement("div", { className: "sm:w-2/3 w-full" },
                    react_1["default"].createElement(question_input_1["default"], { input_label: selectedValue.replace(/ /g, "_").toLowerCase(), placeholder_text: selectedValue + " Question here ....", text_size: "base" })),
                react_1["default"].createElement("div", { className: "flex sm:w-1/3 w-full space-x-4  items-center" },
                    react_1["default"].createElement("div", { className: "flex sm:h-10 h-14 items-center" },
                        react_1["default"].createElement(fa_1.FaRegImages, { size: 20 })),
                    react_1["default"].createElement("div", { className: "w-full  p-3 rounded-md" },
                        react_1["default"].createElement(question_type_1["default"], { selectedValue: selectedValue, setSelectedValue: setSelectedValue })))),
            rendorAnswerType(selectedValue),
            react_1["default"].createElement("div", { className: "border-b py-4" }),
            react_1["default"].createElement("div", { className: "flex justify-end items-center" },
                react_1["default"].createElement("div", { className: "relative inline-block" },
                    react_1["default"].createElement("input", { type: "checkbox", id: "hs-small-switch-soft-with-icons", className: "peer relative shrink-0 w-11 h-6 p-px bg-gray-100 border border-gray-200 text-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:ring-blue-600 disabled:opacity-50 disabled:pointer-events-none checked:bg-none checked:text-blue-100 checked:border-blue-200 focus:checked:border-blue-200 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-800/30 dark:checked:border-blue-800 dark:focus:ring-offset-gray-600 before:inline-block before:w-5 before:h-5 before:bg-white checked:before:bg-blue-600 before:translate-x-0 checked:before:translate-x-full before:rounded-full before:transform before:ring-0 before:transition before:ease-in-out before:duration-200 dark:before:bg-gray-400 dark:checked:before:bg-blue-500" }),
                    react_1["default"].createElement("label", { htmlFor: "hs-small-switch-soft-with-icons", className: "sr-only" }, "switch"),
                    react_1["default"].createElement("span", { className: "peer-checked:text-blue-600 text-gray-500  w-5 h-5 absolute top-[3px] start-0.5 flex justify-center items-center pointer-events-none transition-colors ease-in-out duration-200" },
                        react_1["default"].createElement("svg", { className: "flex-shrink-0 w-3 h-3", xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", "stroke-width": "2.5", "stroke-linecap": "round", "stroke-linejoin": "round" },
                            react_1["default"].createElement("path", { d: "M18 6 6 18" }),
                            react_1["default"].createElement("path", { d: "m6 6 12 12" }))),
                    react_1["default"].createElement("span", { className: "peer-checked:text-white w-5 h-5 absolute top-[3px] end-0.5 flex justify-center items-center pointer-events-none transition-colors ease-in-out duration-200" },
                        react_1["default"].createElement("svg", { className: "flex-shrink-0 w-3 h-3", xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", "stroke-width": "2.5", "stroke-linecap": "round", "stroke-linejoin": "round" },
                            react_1["default"].createElement("polyline", { points: "20 6 9 17 4 12" })))),
                react_1["default"].createElement(hi_1.HiOutlineDotsVertical, null)))));
};
exports["default"] = Genric_Question_Creation;

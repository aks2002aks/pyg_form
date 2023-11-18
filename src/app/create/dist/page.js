"use client";
"use strict";
exports.__esModule = true;
var add_question_component_1 = require("@/components/all_types_components/add_question_component");
var genric_question_creation_1 = require("@/components/all_types_components/genric_question_creation");
var title_and_description_1 = require("@/components/all_types_components/title_and_description");
var react_1 = require("react");
function Page() {
    var _a = react_1.useState([]), formFields = _a[0], setFormFields = _a[1];
    var _b = react_1.useState(true), focus = _b[0], setFocus = _b[1];
    return (react_1["default"].createElement("main", { className: " bg-gray-100 flex flex-col space-y-4 justify-center items-center p-4 md:p-12 " },
        react_1["default"].createElement(title_and_description_1["default"], null),
        react_1["default"].createElement("div", { className: "relative flex w-full justify-center items-center max-w-4xl" },
            react_1["default"].createElement(genric_question_creation_1["default"], { focus: focus }),
            focus && (react_1["default"].createElement("div", { className: "absolute right-0" },
                react_1["default"].createElement(add_question_component_1["default"], null))))));
}
exports["default"] = Page;

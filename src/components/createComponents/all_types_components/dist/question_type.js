"use client";
"use strict";
exports.__esModule = true;
var react_1 = require("react");
var md_1 = require("react-icons/md");
var gr_1 = require("react-icons/gr");
var fa6_1 = require("react-icons/fa6");
var io5_1 = require("react-icons/io5");
var ci_1 = require("react-icons/ci");
var bi_1 = require("react-icons/bi");
var bs_1 = require("react-icons/bs");
var md_2 = require("react-icons/md");
var framer_motion_1 = require("framer-motion");
var Question_type = function (_a) {
    var selectedValue = _a.selectedValue, setSelectedValue = _a.setSelectedValue;
    var _b = react_1.useState(false), isOpen = _b[0], setIsOpen = _b[1];
    var dropdownRef = react_1.useRef(null);
    var handleOptionClick = function (value) {
        setSelectedValue(value);
        setIsOpen(false);
    };
    var variants = {
        open: { opacity: 1, y: 0 },
        closed: { opacity: 0, y: -10 }
    };
    react_1.useEffect(function () {
        var handleClickOutside = function (event) {
            if (dropdownRef.current &&
                !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("click", handleClickOutside);
        return function () {
            document.removeEventListener("click", handleClickOutside);
        };
    }, [dropdownRef]);
    return (react_1["default"].createElement("div", null,
        react_1["default"].createElement("div", { className: "relative max-w-xs" },
            react_1["default"].createElement("div", { className: "flex items-center justify-between w-full border rounded-md shadow-sm text-sm", ref: dropdownRef, onClick: function () { return setIsOpen(!isOpen); } },
                react_1["default"].createElement("div", { className: "flex items-center flex-1 py-2 pl-3" },
                    selectedValue === "Short answer" && (react_1["default"].createElement(md_1.MdOutlineShortText, { className: "mr-2" })),
                    selectedValue === "Paragraph" && (react_1["default"].createElement(gr_1.GrTextAlignFull, { className: "mr-2" })),
                    selectedValue === "Multiple choice" && (react_1["default"].createElement(fa6_1.FaRegCircleDot, { className: "mr-2" })),
                    selectedValue === "Drop-down" && (react_1["default"].createElement(io5_1.IoCaretDownCircleOutline, { className: "mr-2" })),
                    selectedValue === "Checkboxes" && (react_1["default"].createElement(ci_1.CiSquareCheck, { className: "mr-2" })),
                    selectedValue === "File upload" && (react_1["default"].createElement(bi_1.BiSolidCloudUpload, { className: "mr-2" })),
                    selectedValue === "Date" && react_1["default"].createElement(bs_1.BsCalendar2Date, { className: "mr-2" }),
                    selectedValue === "Time" && (react_1["default"].createElement(md_2.MdOutlineAccessTime, { className: "mr-2" })),
                    react_1["default"].createElement("span", null, selectedValue || "Select a vehicle")),
                react_1["default"].createElement("div", { className: "flex-shrink-0 pr-2" },
                    react_1["default"].createElement("svg", { className: "w-5 h-5 text-gray-400", viewBox: "0 0 20 20", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
                        react_1["default"].createElement("path", { d: "M7 7L10 10L13 7", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" })))),
            isOpen && (react_1["default"].createElement(framer_motion_1.motion.div, { className: "absolute z-10 w-full mt-1 bg-white rounded-md  top-7 shadow-2xl", initial: "closed", animate: "open", variants: {
                    open: { opacity: 1, y: 10 },
                    closed: { opacity: 0, y: -10 }
                }, transition: { duration: 0.5 } },
                react_1["default"].createElement("ul", { className: "py-1" },
                    react_1["default"].createElement("li", { className: "flex items-center px-3 py-2 cursor-pointer hover:bg-gray-100", onClick: function () { return handleOptionClick("Short answer"); } },
                        react_1["default"].createElement(md_1.MdOutlineShortText, { className: "mr-2" }),
                        react_1["default"].createElement("span", null, "Short answer")),
                    react_1["default"].createElement("li", { className: "flex items-center px-3 py-2 cursor-pointer hover:bg-gray-100", onClick: function () { return handleOptionClick("Paragraph"); } },
                        react_1["default"].createElement(gr_1.GrTextAlignFull, { className: "mr-2" }),
                        react_1["default"].createElement("span", null, "Paragraph")),
                    react_1["default"].createElement("li", { className: "flex items-center px-3 py-2 cursor-pointer hover:bg-gray-100", onClick: function () { return handleOptionClick("Multiple choice"); } },
                        react_1["default"].createElement(fa6_1.FaRegCircleDot, { className: "mr-2" }),
                        react_1["default"].createElement("span", null, "Multiple choice")),
                    react_1["default"].createElement("li", { className: "flex items-center px-3 py-2 cursor-pointer hover:bg-gray-100", onClick: function () { return handleOptionClick("Drop-down"); } },
                        react_1["default"].createElement(io5_1.IoCaretDownCircleOutline, { className: "mr-2" }),
                        react_1["default"].createElement("span", null, "Drop-down")),
                    react_1["default"].createElement("li", { className: "flex items-center px-3 py-2 cursor-pointer hover:bg-gray-100", onClick: function () { return handleOptionClick("Checkboxes"); } },
                        react_1["default"].createElement(ci_1.CiSquareCheck, { className: "mr-2" }),
                        react_1["default"].createElement("span", null, "Checkboxes")),
                    react_1["default"].createElement("li", { className: "flex items-center px-3 py-2 cursor-pointer hover:bg-gray-100", onClick: function () { return handleOptionClick("File upload"); } },
                        react_1["default"].createElement(bi_1.BiSolidCloudUpload, { className: "mr-2" }),
                        react_1["default"].createElement("span", null, "File upload")),
                    react_1["default"].createElement("li", { className: "flex items-center px-3 py-2 cursor-pointer hover:bg-gray-100", onClick: function () { return handleOptionClick("Date"); } },
                        react_1["default"].createElement(bs_1.BsCalendar2Date, { className: "mr-2" }),
                        react_1["default"].createElement("span", null, "Date")),
                    react_1["default"].createElement("li", { className: "flex items-center px-3 py-2 cursor-pointer hover:bg-gray-100", onClick: function () { return handleOptionClick("Time"); } },
                        react_1["default"].createElement(md_2.MdOutlineAccessTime, { className: "mr-2" }),
                        react_1["default"].createElement("span", null, "Time"))))))));
};
exports["default"] = Question_type;

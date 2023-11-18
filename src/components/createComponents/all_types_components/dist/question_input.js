"use client";
"use strict";
exports.__esModule = true;
var react_1 = require("react");
var bi_1 = require("react-icons/bi");
var framer_motion_1 = require("framer-motion");
var QuestionInput = function (_a) {
    var placeholder_text = _a.placeholder_text, input_label = _a.input_label, text_size = _a.text_size;
    var _b = react_1.useState(""), text = _b[0], setText = _b[1];
    var textAreaRef = react_1.useRef(null);
    var parentRef = react_1.useRef(null);
    var _c = react_1.useState(false), isBold = _c[0], setIsBold = _c[1];
    var _d = react_1.useState(false), isItalic = _d[0], setIsItalic = _d[1];
    var _e = react_1.useState(false), isUnderline = _e[0], setIsUnderline = _e[1];
    var _f = react_1.useState(false), showButtons = _f[0], setShowButtons = _f[1];
    var handleInputChange = function (event) {
        setText(event.target.value);
    };
    var handleBoldClick = function () {
        setIsBold(!isBold);
    };
    var handleItalicClick = function () {
        setIsItalic(!isItalic);
    };
    var handleUnderlineClick = function () {
        setIsUnderline(!isUnderline);
    };
    react_1.useEffect(function () {
        if (textAreaRef.current) {
            textAreaRef.current.style.height = "auto";
            textAreaRef.current.style.height = textAreaRef.current.scrollHeight + "px";
        }
    }, [text]);
    react_1.useEffect(function () {
        var handleClickOutside = function (event) {
            if (parentRef.current &&
                !parentRef.current.contains(event.target)) {
                setShowButtons(false);
            }
        };
        document.addEventListener("click", handleClickOutside);
        return function () {
            document.removeEventListener("click", handleClickOutside);
        };
    }, [parentRef]);
    return (react_1["default"].createElement("div", { className: "flex flex-col items-start space-y-2", ref: parentRef },
        react_1["default"].createElement("textarea", { ref: textAreaRef, id: input_label, name: input_label, className: "w-full  text-black text-" + text_size + " focus:outline-none focus:border-red-500 transition-colors ease-in-out duration-500 focus:border-b-2 break-words resize-none overflow-hidden leading-none p-3 " + (isBold ? "font-bold" : "") + " " + (isItalic ? "italic" : "") + " " + (isUnderline ? "underline" : "") + "  " + (showButtons ? "border-b-2" : ""), rows: 1, placeholder: placeholder_text, onChange: handleInputChange, value: text, onClick: function () { return setShowButtons(true); } }),
        showButtons && (react_1["default"].createElement(framer_motion_1.motion.div, { className: "flex items-center space-x-2", initial: { opacity: 0, y: -10 }, animate: { opacity: showButtons ? 1 : 0, y: showButtons ? 0 : -10 }, transition: { duration: 0.5 } },
            react_1["default"].createElement("div", { className: "", onClick: handleBoldClick },
                react_1["default"].createElement(bi_1.BiBold, { className: "text-xl cursor-pointer  hover:text-black rounded-md p-2 transition-colors duration-200 ease-in  " + (isBold ? " bg-gray-200" : "text-gray-500 hover:bg-gray-100"), size: 40 })),
            react_1["default"].createElement("div", { className: "", onClick: handleItalicClick },
                react_1["default"].createElement(bi_1.BiItalic, { className: "text-xl cursor-pointer  hover:text-black rounded-md p-2 transition-colors duration-200 ease-in   " + (isItalic ? " bg-gray-200" : "text-gray-500 hover:bg-gray-100"), size: 40 })),
            react_1["default"].createElement("div", { className: "", onClick: handleUnderlineClick },
                react_1["default"].createElement(bi_1.BiUnderline, { className: "text-xl cursor-pointer  hover:text-black rounded-md p-2 transition-colors duration-200 ease-in   " + (isUnderline ? " bg-gray-200" : "text-gray-500 hover:bg-gray-100"), size: 40 }))))));
};
exports["default"] = QuestionInput;

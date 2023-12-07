// // Editor.tsx

// import React, { useState, useEffect, useRef } from "react";
// import "react-quill/dist/quill.snow.css";

// // Check if window is defined (avoid SSR issues)
// const ReactQuill =
//   typeof window !== "undefined" ? require("react-quill") : null;

// // ... (other imports)


// const modules = {
//   toolbar: false,
// };

// const formats = ["bold", "italic", "underline"];

// const EditorToolbar: React.FC<{
//   handleBold: () => void;
//   handleItalic: () => void;
//   handleUnderline: () => void;
// }> = ({ handleBold, handleItalic, handleUnderline }) => {
//   return (
//     <div className="bg-gray-800 p-2">
//       <button className="text-white mr-2" onClick={handleBold}>
//         Bold
//       </button>
//       <button className="text-white mr-2" onClick={handleItalic}>
//         Italic
//       </button>
//       <button className="text-white" onClick={handleUnderline}>
//         Underline
//       </button>
//     </div>
//   );
// };

// const MyEditor: React.FC = () => {
//   const [state, setState] = useState<{ value: string }>({ value: "" });
//   const [isFocused, setIsFocused] = useState<boolean>(false);

//   const handleChange = (value: string) => {
//     setState({ value });
//   };

//   const handleBold = () => {
//     const quill = quillRef.current?.getEditor();
//     quill?.format("bold", !quill.getFormat().bold);
//   };

//   const handleItalic = () => {
//     const quill = quillRef.current?.getEditor();
//     quill?.format("italic", !quill.getFormat().italic);
//   };

//   const handleUnderline = () => {
//     const quill = quillRef.current?.getEditor();
//     quill?.format("underline", !quill.getFormat().underline);
//   };

//   const quillRef = useRef<any>(null); // Use 'any' to avoid type issues

//   useEffect(() => {
//     if (quillRef.current) {
//       const quill = quillRef.current.getEditor();
//       if (quill) {
//         quill.on("text-change", function () {
//           const value = quill.root.innerHTML;
//           setState({ value });
//         });
//       }
//     }
//   }, []);

//   return (
//     <div className="text-editor">
//       {ReactQuill && (
//         <ReactQuill
//           theme="snow"
//           value={state.value}
//           onChange={handleChange}
//           placeholder="Write something awesome..."
//           modules={modules}
//           formats={formats}
//           ref={quillRef}
//           onFocus={() => setIsFocused(true)}
//           onBlur={() => setIsFocused(false)}
//         />
//       )}

//       {isFocused && (
//         <EditorToolbar
//           handleBold={handleBold}
//           handleItalic={handleItalic}
//           handleUnderline={handleUnderline}
//         />
//       )}
//     </div>
//   );
// };

// export default MyEditor;

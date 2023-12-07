import React, { useEffect, useRef, useState } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import StarterKit from "@tiptap/starter-kit";
import Text from "@tiptap/extension-text";
import { Color } from "@tiptap/extension-color";
import { TextStyle } from "@tiptap/extension-text-style";
import Underline from "@tiptap/extension-underline";
import History from "@tiptap/extension-history";
import Bold from "@tiptap/extension-bold";
import Code from "@tiptap/extension-code";
import Blockquote from "@tiptap/extension-blockquote";
import CodeBlock from "@tiptap/extension-code-block";
import Italic from "@tiptap/extension-italic";

import "./styles.scss";

import {
  FaBold,
  FaItalic,
  FaUnderline,
  FaListUl,
  FaListOl,
  FaCode,
  FaQuoteLeft,
  FaUndo,
  FaRedo,
} from "react-icons/fa";

export default function Editor() {
  const [isEditorFocus, setIsEditorFocus] = useState(false);

  const editor = useEditor({
    extensions: [
      Document,
      Paragraph,
      Text,
      TextStyle,
      Color,
      Underline,
      History,
      Bold,
      Code,
      Blockquote,
      CodeBlock,
      Italic,
    ],
    content: `
        <p><span style="color: #958DF1">Oh, for some reason that’s purple.</span></p>
      `,
    editorProps: {
      attributes: {
        class: `w-full outline-none focus:border-red-500 transition-colors ease-in-out duration-500 focus:border-b-2 break-words resize-none overflow-hidden leading-none p-3  ${
          isEditorFocus ? "border-b-2" : ""
        }`,
      },
    },
  });

  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutsideEditor = (event: MouseEvent) => {
      if (
        editorRef.current &&
        !editorRef.current.contains(event.target as Node)
      ) {
        setIsEditorFocus(false);
      } else {
        setIsEditorFocus(true);
      }
    };
    document.body.addEventListener("click", handleClickOutsideEditor);
    return () => {
      document.body.removeEventListener("click", handleClickOutsideEditor);
    };
  }, [editorRef]);

  if (!editor) {
    return null;
  }

  const executeCommand = (command: string) => () =>
    (editor.chain() as any).focus()[command]().run();

  return (
    <>
      <div className="" ref={editorRef}>
        <EditorContent editor={editor} />
        {isEditorFocus && (
          <div className="mt-2 flex space-x-2">
            <FaBold
              onClick={executeCommand("toggleBold")}
              className="hover:bg-gray-200 rounded-full p-2"
              size={30}
            />
            <FaItalic
              onClick={executeCommand("toggleItalic")}
              className="hover:bg-gray-200 rounded-full p-2"
              size={30}
            />
            <FaUnderline
              onClick={executeCommand("toggleUnderline")}
              className="hover:bg-gray-200 rounded-full p-2"
              size={30}
            />

            <button
              className="hover:bg-gray-200 rounded-full p-2 "
              onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            >
              <FaCode size={30} />
            </button>

            <FaUndo
              onClick={executeCommand("undo")}
              className="hover:bg-gray-200 rounded-full p-2"
              size={30}
            />
            <FaRedo
              onClick={executeCommand("redo")}
              className="hover:bg-gray-200 rounded-full p-2"
              size={30}
            />
          </div>
        )}
      </div>
    </>
  );
}

import React, { useEffect, useRef, useState } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
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
import Placeholder from "@tiptap/extension-placeholder";
import Link from "@tiptap/extension-link";
import BulletList from "@tiptap/extension-bullet-list";
import ListItem from "@tiptap/extension-list-item";
import OrderedList from "@tiptap/extension-ordered-list";
import { MdFormatClear } from "react-icons/md";

import "./styles.scss";

import {
  FaBold,
  FaItalic,
  FaUnderline,
  FaCode,
  FaUndo,
  FaRedo,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { LuLink2 } from "react-icons/lu";
import UrlPromter from "./urlPromter";
import { PiListBullets } from "react-icons/pi";
import { GrOrderedList } from "react-icons/gr";

interface Props {
  input_label: string;
  placeholder_text: string;
  text_size: string;
  label: string;
  handleInputChange: (content: string) => void;
}

export default function Editor({
  input_label,
  placeholder_text,
  text_size,
  label,
  handleInputChange,
}: Props) {
  const [isEditorFocus, setIsEditorFocus] = useState(false);
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [linkFieldModal, setLinkFieldModal] = useState(false);

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
      CodeBlock,
      Italic,
      BulletList,
      ListItem,
      Placeholder.configure({
        placeholder: placeholder_text,
      }),
      Link,
      OrderedList,
    ],
    content: label ? label : ``,

    editorProps: {
      attributes: {
        class: `w-full outline-none focus:border-red-500 transition-colors ease-in-out duration-500 focus:border-b-2 break-words resize-none overflow-hidden leading-none p-3  ${
          isEditorFocus ? "border-b-2" : ""
        } `,
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

  const handleBoldClick = () => {
    setIsBold(!isBold);
  };

  const handleItalicClick = () => {
    setIsItalic(!isItalic);
  };

  const handleUnderlineClick = () => {
    setIsUnderline(!isUnderline);
  };

  const setLink = () => {
    setLinkFieldModal(true);
  };

  return (
    <>
      {linkFieldModal && (
        <UrlPromter setLinkFieldModal={setLinkFieldModal} editor={editor} />
      )}
      <div className="" ref={editorRef}>
        <EditorContent
          editor={editor}
          id={input_label}
          name={input_label}
          style={{ fontSize: `${text_size}px` }}
          onBlur={() => {
            const content = editor.getHTML();
            handleInputChange(content);
            console.log(content);
          }}
        />
        {isEditorFocus && (
          <motion.div
            className="mt-2 flex space-x-2 flex-wrap"
            initial={{ opacity: 0, y: -10 }}
            animate={{
              opacity: isEditorFocus ? 1 : 0,
              y: isEditorFocus ? 0 : -10,
            }}
            transition={{ duration: 0.5 }}
          >
            <button
              className={`hover:bg-gray-200 rounded-full p-2 ${
                isBold && `bg-gray-300`
              }`}
              onClick={() => {
                editor.chain().focus().toggleBold().run();
                handleBoldClick();
              }}
            >
              <FaBold size={15} />
            </button>
            <button
              className={`hover:bg-gray-200 rounded-full p-2 ${
                isItalic && `bg-gray-300`
              }`}
              onClick={() => {
                editor.chain().focus().toggleItalic().run();
                handleItalicClick();
              }}
            >
              <FaItalic size={15} />
            </button>
            <button
              className={`hover:bg-gray-200 rounded-full p-2 ${
                isUnderline && `bg-gray-300`
              }`}
              onClick={() => {
                editor.chain().focus().toggleUnderline().run();
                handleUnderlineClick();
              }}
            >
              <FaUnderline size={15} />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              className={`hover:bg-gray-200 rounded-full p-2`}
            >
              <PiListBullets size={20} />
            </button>

            <button
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
              className={`hover:bg-gray-200 rounded-full p-2`}
            >
              <GrOrderedList size={20} />
            </button>

            <button
              className={`hover:bg-gray-200 rounded-full p-2`}
              onClick={setLink}
            >
              <LuLink2 size={15} />
            </button>
            <button
              className={`hover:bg-gray-200 rounded-full p-2 `}
              onClick={() => {
                editor.chain().focus().toggleCodeBlock().run();
              }}
            >
              <FaCode size={15} />
            </button>
            <button
              className={`hover:bg-gray-200 rounded-full p-2
              }`}
              onClick={() => {
                editor.chain().focus().undo().run();
              }}
            >
              <FaUndo size={15} />
            </button>
            <button
              className={`hover:bg-gray-200 rounded-full p-2 
              }`}
              onClick={() => {
                editor.chain().focus().redo().run();
              }}
            >
              <FaRedo size={15} />
            </button>

            <button
              className={`hover:bg-gray-200 rounded-full p-2 
              }`}
              onClick={() => {
                editor.chain().focus().unsetAllMarks().run();
              }}
            >
              <MdFormatClear size={15} />
            </button>
          </motion.div>
        )}
      </div>
    </>
  );
}

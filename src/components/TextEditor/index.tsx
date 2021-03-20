import React from "react";
import Button from "../Button";
import "./styles.scss";

export interface TextEditorProps {
  placeholder?: string;
}

const TextEditor: React.FC<TextEditorProps> = () => {
  return (
    <div className="editor-container">
      <div className="editor">
        <div className="editor__title">
          <input type="text" placeholder="Title" />
        </div>

        <div className="editor__description">
          <textarea name="description" id="description"></textarea>
        </div>

        <div className="editor__actions">
          Click, drag & drop or copy and paste image files to upload
        </div>
      </div>

      <Button
        onClick={() => {
          console.log("hello");
        }}
      >
        Submit
      </Button>
    </div>
  );
};

export default TextEditor;

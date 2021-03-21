import React, { useState, useEffect } from "react";
import Button from "../Button";
import marked from "marked";
import "./styles.scss";

export interface TextEditorProps {
  placeholder?: string;
}

const TAB_OPTIONS = {
  edit: "edit-tab",
  preview: "preview-tab",
};

const TextEditor: React.FC<TextEditorProps> = () => {
  const [markdown, setMarkdown] = useState<string>("");
  const [markedText, setMarkedText] = useState<string>("");
  const [activeTab, setActiveTab] = useState<string>("edit-tab");

  const handleTabChange = (activeTab: string) => {
    setActiveTab(activeTab);
  };

  const handleMarkdownChange = ({
    target: { value },
  }: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMarkdown(value);
  };

  useEffect(() => {
    setMarkedText(marked(markdown));
  }, [markdown]);

  const renderMarkedText = () => {
    if (activeTab === TAB_OPTIONS.preview) {
      return (
        <div
          className="editor__preview"
          dangerouslySetInnerHTML={{ __html: markedText }}
        ></div>
      );
    }
    return null;
  };

  const renderTextArea = () => {
    if (activeTab === TAB_OPTIONS.edit) {
      return (
        <textarea
          name="description"
          id="description"
          placeholder="Type here..."
          value={markdown}
          onChange={handleMarkdownChange}
        ></textarea>
      );
    }
  };

  return (
    <div className="editor-container">
      <div className="editor">
        <div className="editor__title">
          <input type="text" placeholder="Title" />
        </div>
        <div className="editor__tabs">
          <div
            className={
              activeTab === TAB_OPTIONS.edit
                ? "editor__edit-tab editor__tabs--active"
                : "editor__edit-tab"
            }
            onClick={() => handleTabChange(TAB_OPTIONS.edit)}
          >
            Edit
          </div>

          <div
            className={
              activeTab === TAB_OPTIONS.preview
                ? "editor__preview-tab editor__tabs--active"
                : "editor__preview-tab"
            }
            onClick={() => handleTabChange(TAB_OPTIONS.preview)}
          >
            Preview
          </div>
        </div>
        <div className="editor__description">
          {renderTextArea()}
          {renderMarkedText()}
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

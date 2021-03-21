import React, { useState, useEffect, useRef } from "react";
import Button from "../Button";
import marked from "marked";
import { saveFormData } from "../../redux/actions/saveRichFormData";
import { useDispatch } from "react-redux";
import { uploadFile } from "../../firebase";
import "./styles.scss";

interface TextEditorProps {
  placeholder?: string;
}

const TAB_OPTIONS = {
  edit: "edit-tab",
  preview: "preview-tab",
};

const TextEditor: React.FC<TextEditorProps> = () => {
  const [markdown, setMarkdown] = useState<string>("");
  const [markedText, setMarkedText] = useState<string>("");
  const [title, setTitle] = useState("");
  const [activeTab, setActiveTab] = useState<string>("edit-tab");

  // files

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const fileBrowserRef = useRef<HTMLInputElement>(null);
  const dropAreaRef = useRef<HTMLDivElement>(null);
  const [imageURL, setImageURL] = useState<string | undefined>("");

  useEffect(() => {
    if (selectedFile) {
      handleImageUpload();
    }
  }, [selectedFile]);

  useEffect(() => {
    if (imageURL?.length) {
      setMarkdown((prev) => `${prev} \n ![image](${imageURL})`);
    }
  }, [imageURL]);

  const dispatch = useDispatch();

  const handleTabChange = (activeTab: string) => {
    setActiveTab(activeTab);
  };

  const handleMarkdownChange = ({
    target: { value },
  }: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMarkdown(value);
  };

  const handleTitleChange = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(value);
  };

  useEffect(() => {
    setMarkedText(marked(markdown));
  }, [markdown]);

  const handleFileSelected = ({
    target: { files },
  }: React.ChangeEvent<HTMLInputElement>) => {
    if (files) {
      setSelectedFile(files[0]);
    }
  };

  const handleImageUpload = () => {
    if (selectedFile) {
      uploadFile(selectedFile, setImageURL);
    }
  };

  const handlePaseImage = (event: React.ClipboardEvent) => {
    const items = event.clipboardData.files;
    for (const item of items) {
      if (item.type.indexOf("image") === 0) {
        uploadFile(item, setImageURL);
      }
    }
  };

  const handleSubmit = () => {
    saveFormData({
      title,
      markedText,
    })(dispatch);
  };

  useEffect(() => {
    if (dropAreaRef?.current) {
      const dropArea = dropAreaRef.current;
      ["dragenter", "dragover", "dragleave", "drop"].forEach((eventName) => {
        dropArea.addEventListener(
          eventName,
          (event) => {
            event.preventDefault;
            event.stopPropagation();
          },
          false
        );
      });

      dropArea.addEventListener(
        "dragleave",
        (event) => {
          event.preventDefault();
          dropArea.classList.remove("drag-over");
        },
        false
      );

      ["dragenter", "dragover"].forEach((eventName) => {
        dropArea.addEventListener(
          eventName,
          (_) => {
            _.preventDefault();
            dropArea.classList.add("drag-over");
          },
          false
        );
      });

      dropArea.addEventListener(
        "drop",
        (e: DragEvent) => {
          e.preventDefault();
          dropArea.classList.remove("drag-over");
          const dragData = e.dataTransfer;
          const files = dragData?.files;

          if (files) {
            for (const file of files) {
              uploadFile(file, setImageURL);
            }
          }
        },
        false
      );
    }
  }, []);

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
          onPaste={handlePaseImage}
        ></textarea>
      );
    }
  };

  return (
    <div className="editor-container">
      <div className="editor" ref={dropAreaRef}>
        <div className="editor__title">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={handleTitleChange}
          />
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

        <div
          className="editor__actions"
          onClick={() => fileBrowserRef.current?.click()}
        >
          <input
            type="file"
            className="file-browser"
            onChange={handleFileSelected}
            ref={fileBrowserRef}
          />
          Click, drag & drop or copy and paste image files to upload
        </div>
      </div>

      <Button onClick={handleSubmit}>Submit</Button>
    </div>
  );
};

export default TextEditor;

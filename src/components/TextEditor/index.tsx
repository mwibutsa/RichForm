import React, { useState, useEffect, useRef } from "react";
import Button from "../Button";
import marked from "marked";
import { saveFormData } from "../../redux/actions/saveRichFormData";
import { useDispatch } from "react-redux";
import { uploadFile } from "../../firebase";
import Loader from "../Loader";
import "./styles.scss";

interface TextEditorProps {
  placeholder?: string;
}

const TAB_OPTIONS = {
  edit: "edit-tab",
  preview: "preview-tab",
};

const TextEditor: React.FC<TextEditorProps> = () => {
  const [activeTab, setActiveTab] = useState<string>("edit-tab");

  // form inputs
  const [markdown, setMarkdown] = useState<string>("");
  const [markedText, setMarkedText] = useState<string>("");
  const [title, setTitle] = useState("");

  // form file
  const fileBrowserRef = useRef<HTMLInputElement>(null);
  const dropAreaRef = useRef<HTMLDivElement>(null);
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imageURL, setImageURL] = useState<string | undefined>("");
  const dispatch = useDispatch();

  const handleTabChange = (activeTab: string) => {
    setActiveTab(activeTab);
  };
  // input change handlers

  const handleTitleChange = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(value);
  };

  const handleFileSelected = ({
    target: { files },
  }: React.ChangeEvent<HTMLInputElement>) => {
    if (files) {
      setSelectedFile(files[0]);
    }
  };
  const handleMarkdownChange = ({
    target: { value },
  }: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMarkdown(value);
  };

  // upload selected image
  useEffect(() => {
    if (selectedFile) {
      handleImageUpload();
    }
  }, [selectedFile]);

  // Add uploaded image to markdown

  useEffect(() => {
    if (imageURL?.length) {
      setMarkdown((prev) => `${prev} \n ![image](${imageURL})`);
    }
  }, [imageURL]);

  useEffect(() => {
    setMarkedText(marked(markdown));
  }, [markdown]);

  // upload Image to firebase

  const handleImageUpload = () => {
    if (selectedFile) {
      setUploading(true);
      uploadFile(selectedFile, getImageURL);
    }
  };

  // get uploaded image URL
  const getImageURL = (url: string | undefined): void => {
    setImageURL(url);
    setUploading(false);
  };

  // upload pasted image
  const handlePaseImage = (event: React.ClipboardEvent) => {
    const items = event.clipboardData.files;
    for (const item of items) {
      if (item.type.indexOf("image") === 0) {
        setUploading(true);
        uploadFile(item, getImageURL);
      }
    }
  };

  useEffect(() => {
    if (dropAreaRef?.current) {
      const dropArea = dropAreaRef.current;

      // prevent drag & drop default behavior and stop event propagation
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

      // highlight  drop target

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

      // Get & Upload dropped files

      dropArea.addEventListener(
        "drop",
        (e: DragEvent) => {
          e.preventDefault();
          dropArea.classList.remove("drag-over");
          const dragData = e.dataTransfer;
          const files = dragData?.files;

          if (files) {
            for (const file of files) {
              setUploading(true);
              uploadFile(file, getImageURL);
            }
          }
        },
        false
      );
    }
  }, []);

  // Submit the form to firebase
  const handleSubmit = () => {
    saveFormData({
      title,
      markedText,
    })(dispatch);
  };

  // JSX RENDER helper functions
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

  const renderLoader = () => {
    if (activeTab === TAB_OPTIONS.edit && uploading) {
      return (
        <div className="editor__loader">
          <Loader />
        </div>
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
          {renderLoader()}
        </div>

        <div
          className="editor__actions"
          onClick={() => {
            if (!uploading) {
              fileBrowserRef.current?.click();
            }
          }}
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

      <Button onClick={handleSubmit} disabled={uploading}>
        Submit
      </Button>
    </div>
  );
};

export default TextEditor;

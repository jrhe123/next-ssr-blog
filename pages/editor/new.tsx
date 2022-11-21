import React, { useState } from "react";
//
import type { NextPage } from "next";
//
import { wrapper } from "store";
//
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import dynamic from "next/dynamic";
import { Input, Button, message } from "antd";
//
import styles from "./index.module.scss";

interface NewEditorProps {
  host: string;
}

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

const NewEditor: NextPage<NewEditorProps> = () => {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setTitle(value);
  };

  const handleContentChange = (newContent: string | undefined) => {
    if (newContent) {
      setContent(newContent);
    }
  };

  const handlePublish = () => {
    if (!title) {
      message.warning("Please enter title");
      return;
    }
    if (!content) {
      message.warning("Please enter content");
      return;
    }
    console.log("call api now");
  };

  return (
    <div className={styles.container}>
      <div className={styles.operation}>
        <Input
          className={styles.title}
          value={title}
          placeholder={"Article title.."}
          onChange={handleTitleChange}
        />
        <Button
          className={styles.button}
          type={"primary"}
          onClick={handlePublish}
        >
          Publish
        </Button>
      </div>
      <MDEditor value={content} height={300} onChange={handleContentChange} />
    </div>
  );
};

// hide layout in _app
(NewEditor as any).hideLayout = true;

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ query, req }) => {
      return {
        props: {},
      };
    }
);
export default NewEditor;

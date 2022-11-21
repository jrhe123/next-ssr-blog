import React, { useState } from "react";
//
import type { NextPage } from "next";
//
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import dynamic from "next/dynamic";
import { Input, Button, message } from "antd";
//
import styles from "./index.module.scss";
//
import { useArticleService } from "../hooks";

interface PublishArticleContainerProps {}

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

const PublishArticleContainer: NextPage<PublishArticleContainerProps> = () => {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const { publishArticle } = useArticleService();

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
    publishArticle({
      title,
      content,
    });
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

export default PublishArticleContainer;

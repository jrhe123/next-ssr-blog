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
// redux
import { useArticleService } from "../hooks";
import { Article as IArticle } from "features/article/types";
interface PublishArticleContainerProps {
  article?: IArticle;
}

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

const PublishArticleContainer: NextPage<PublishArticleContainerProps> = ({
  article,
}) => {
  const [title, setTitle] = useState<string>(article ? article.title : "");
  const [content, setContent] = useState<string>(
    article ? article.content : ""
  );
  const { publishArticle, updateArticle } = useArticleService();

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
    if (article?.id) {
      updateArticle({
        id: article.id,
        title,
        content,
      });
    } else {
      publishArticle({
        title,
        content,
      });
    }
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
          {article?.id ? "Update" : "Publish"}
        </Button>
      </div>
      <MDEditor value={content} height={900} onChange={handleContentChange} />
    </div>
  );
};

export default PublishArticleContainer;

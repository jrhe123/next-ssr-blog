import React, { useEffect, useState } from "react";
//
import type { NextPage } from "next";
//
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import dynamic from "next/dynamic";
import { Input, Button, Select, message } from "antd";
//
import styles from "./index.module.scss";
// redux
import { useArticleService } from "../hooks";
import { Article as IArticle } from "features/article/types";
import { useTagService } from "features/tag";
import { DefaultOptionType } from "antd/lib/select";
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
  const [tagIds, setTagIds] = useState<number[]>(
    article ? article.tags.map((tag) => tag.id) : []
  );

  const { publishArticle, updateArticle } = useArticleService();
  const { getTags, allTags } = useTagService();

  useEffect(() => {
    getTags();
  }, [getTags]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setTitle(value);
  };

  const handleContentChange = (newContent: string | undefined) => {
    if (newContent) {
      setContent(newContent);
    }
  };

  const handleSelectTags = (value: number[]) => {
    // setTagIds
    setTagIds(value);
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
        tagIds,
      });
    } else {
      publishArticle({
        title,
        content,
        tagIds,
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
        <Select
          className={styles.tag}
          mode="multiple"
          allowClear
          placeholder={"Select tags.."}
          onChange={handleSelectTags}
          value={tagIds}
        >
          {allTags.map((tag) => (
            <Select.Option key={tag.id} value={tag.id}>
              {tag.title}
            </Select.Option>
          ))}
        </Select>
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

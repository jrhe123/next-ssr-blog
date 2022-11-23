// react
import React, { useState } from "react";
// antd
import { Avatar, Input, Button, Divider } from "antd";
//
import type { NextPage } from "next";
// style
import styles from "./index.module.scss";
import { useArticleService } from "../hooks";

type SendCommentContainerProps = {
  articleId: number;
  avatar: string;
};
const SendCommentContainer: NextPage<SendCommentContainerProps> = ({
  articleId,
  avatar,
}) => {
  const [inputVal, setInputVal] = useState<string>("");
  const { publishComment } = useArticleService();

  const handleComment = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.preventDefault();
    publishComment({
      articleId,
      content: inputVal,
    });
    setInputVal("");
  };

  return (
    <div className={styles.enter}>
      <Avatar src={avatar} size={40} />
      <div className={styles.content}>
        <Input.TextArea
          placeholder="Comment.."
          rows={4}
          value={inputVal}
          onChange={(event) => setInputVal(event?.target?.value)}
        />
        <Button type="primary" onClick={handleComment}>
          Post
        </Button>
      </div>
    </div>
  );
};

export default SendCommentContainer;

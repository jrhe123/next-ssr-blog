import type { NextPage } from "next";
import Link from "next/link";
// react
import React, { useState, useEffect } from "react";
// lib
import { formatDistanceToNow } from "date-fns";
import { Avatar } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import { markdownToTxt } from "markdown-to-txt";
// style
import styles from "./index.module.scss";
import classnames from "classnames";
// type
import { Article as IArticle } from "features/article/types";
import { Tag as ITag } from "features/tag/types";
import { useArticleService } from "../hooks";
interface IArticleListContainerProps {
  articles: IArticle[];
  tags: ITag[];
}

const ArticleListContainer: NextPage<IArticleListContainerProps> = ({
  articles,
  tags,
}) => {
  const [selectTag, setSelectTag] = useState<number>(0);
  const { getArticle } = useArticleService();

  const handleSelectTags = (e: React.SyntheticEvent<EventTarget>) => {
    if (!(e.target instanceof HTMLDivElement)) {
      return;
    }
    const tagid = e.target.dataset["tagid"];
    setSelectTag(Number(tagid));
  };

  useEffect(() => {
    getArticle({
      tagId: selectTag === 0 ? "" : selectTag,
    });
  }, [getArticle, selectTag]);

  const formattedTags = [
    {
      id: 0,
      title: "All",
      icon: "all",
      follow_count: 0,
      article_count: 0,
      users: [],
      articles: [],
    },
    ...tags,
  ];

  return (
    <div>
      <div className={styles.tags} onClick={handleSelectTags}>
        {formattedTags.map((tag) => (
          <div
            key={tag.id}
            data-tagid={tag.id}
            className={classnames(
              styles.tag,
              selectTag === tag.id ? styles.active : ""
            )}
          >
            <p>{tag.title}</p>
          </div>
        ))}
      </div>
      <div>
        {articles.map((article, index) => (
          <Link key={index} href={`/article/${article.id}`}>
            <div className={styles.list_item_container}>
              <div className={styles.article}>
                <div className={styles.userInfo}>
                  <span className={styles.name}>{article.user?.nickname}</span>
                  <span className={styles.date}>
                    {formatDistanceToNow(new Date(article?.update_time))}
                  </span>
                </div>
                <h4 className={styles.title}>{article?.title}</h4>
                <p className={styles.content}>
                  {markdownToTxt(article?.content)}
                </p>
                <div className={styles.statistics}>
                  <EyeOutlined />
                  <span className={styles.item}>{article?.views}</span>
                </div>
              </div>
              <Avatar src={article.user?.avatar} size={48} />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ArticleListContainer;

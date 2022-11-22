import type { NextPage } from "next";
import Link from "next/link";
// lib
import { formatDistanceToNow } from "date-fns";
import { Avatar } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import { markdownToTxt } from "markdown-to-txt";
// style
import styles from "./index.module.scss";
// type
import { Article as IArticle } from "features/article/types";

interface IArticleListContainerProps {
  articles: IArticle[];
}

const ArticleListContainer: NextPage<IArticleListContainerProps> = ({
  articles,
}) => (
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
            <p className={styles.content}>{markdownToTxt(article?.content)}</p>
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
);

export default ArticleListContainer;

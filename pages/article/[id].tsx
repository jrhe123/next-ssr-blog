import type { GetServerSideProps, NextPage } from "next";
import Link from "next/link";
// react
import { useState } from "react";
// antd
import { Avatar, Input, Button, Divider } from "antd";
import MarkDown from "markdown-to-jsx";
import { format } from "date-fns";
// db
import { prepareConnection } from "db";
import { Article } from "db/entity";
// redux
import { Article as IArticle } from "features/article/types";
import { useUserService } from "features/user";
// style
import styles from "./index.module.scss";

interface IArticleDetailProps {
  article: IArticle;
}

const ArticleDetail: NextPage<IArticleDetailProps> = ({ article }) => {
  const [inputVal, setInputVal] = useState<string>("");
  const { user } = useUserService();
  const {
    user: { nickname, avatar, id },
  } = article;

  return (
    <div className={styles.container}>
      <div className={styles.content_layout}>
        <div className={styles.content_container}>
          <h2 className={styles.title}>{article?.title}</h2>
          <div className={styles.user}>
            <Avatar src={avatar} size={50} />
            <div className={styles.info}>
              <div className={styles.name}>{nickname}</div>
              <div className={styles.date}>
                <div>
                  {format(
                    new Date(article?.update_time),
                    "yyyy-MM-dd hh:mm:ss"
                  )}
                </div>
                <div>views {article?.views}</div>
                {Number(user?.userId) === Number(id) && (
                  <Link href={`/editor/${article?.id}`}>edit</Link>
                )}
              </div>
            </div>
          </div>
          <MarkDown className={styles.markdown}>{article?.content}</MarkDown>
        </div>
        <div className={styles.divider}></div>
        <div className={styles.content_layout}>
          <div className={styles.comment}>
            <h3 className={styles.comment_title}>Comments</h3>
            {user?.userId && (
              <div className={styles.enter}>
                <Avatar src={avatar} size={40} />
                <div className={styles.content}>
                  <Input.TextArea
                    placeholder="Comment.."
                    rows={4}
                    value={inputVal}
                    onChange={(event) => setInputVal(event?.target?.value)}
                  />
                  <Button
                    type="primary"
                    // onClick={handleComment}
                  >
                    Post
                  </Button>
                </div>
              </div>
            )}
            <Divider />
            {/* <div className={styles.display}>
        {comments?.map((comment: any) => (
          <div className={styles.wrapper} key={comment?.id}>
            <Avatar src={comment?.user?.avatar} size={40} />
            <div className={styles.info}>
              <div className={styles.name}>
                <div>{comment?.user?.nickname}</div>
                <div className={styles.date}>
                  {format(
                    new Date(comment?.update_time),
                    'yyyy-MM-dd hh:mm:ss'
                  )}
                </div>
              </div>
              <div className={styles.content}>{comment?.content}</div>
            </div>
          </div>
        ))}
      </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps =
  async function getServerSideProps(ctx) {
    // get params from context
    const { params } = ctx;
    const { id } = params as { id: string };
    // SSR fetch data
    const db = await prepareConnection();
    const articleRepo = db.getRepository(Article);
    const article = await articleRepo.findOne({
      where: {
        id: Number(id),
      },
      relations: ["user"],
    });
    // views increase by 1
    if (article) {
      article.views += 1;
      articleRepo.save(article);
    }
    // return
    const formatted = JSON.parse(JSON.stringify(article));
    return {
      props: {
        article: formatted || {},
      },
    };
  };

export default ArticleDetail;

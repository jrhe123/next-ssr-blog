import type { GetServerSideProps, NextPage } from "next";
import Link from "next/link";
// db
import { prepareConnection } from "db";
import { Article, User } from "db/entity";
// antd
import { Avatar, Button, Divider } from "antd";
import {
  CodeOutlined,
  FireOutlined,
  FundViewOutlined,
} from "@ant-design/icons";
import { formatDistanceToNow } from "date-fns";
import { EyeOutlined } from "@ant-design/icons";
import { markdownToTxt } from "markdown-to-txt";
//
import { wrapper } from "store";
//
import styles from "./index.module.scss";

type IUser = {
  id: number;
  nickname: string;
  avatar: string;
  job: string;
  introduce: string;
};
type IArticle = {
  id: number;
  title: string;
  content: string;
  views: number;
  create_time: Date;
  update_time: Date;
  is_delete: number;
  user: User;
  comments?: Comment[];
  tags: ITag[];
};
type ITag = {
  id: number;
  title: string;
  icon: string;
  follow_count: number;
  article_count: number;
  users: User[];
  articles: Article[];
};
interface UserProps {
  userInfo: IUser;
  userArticles: IArticle[];
}

const UserProfile: NextPage<UserProps> = ({ userInfo, userArticles }) => {
  const viewsCount = userArticles.reduce((prev, next) => prev + next.views, 0);
  return (
    <div className={styles.container}>
      <div className={styles.userDetail}>
        {/* left */}
        <div className={styles.left}>
          <div className={styles.userInfo_v2}>
            <Avatar className={styles.avatar} src={userInfo.avatar} size={90} />
            <div>
              <div className={styles.nickname}>{userInfo.nickname}</div>
              <div className={styles.desc}>
                <CodeOutlined /> {userInfo.job}
              </div>
              <div className={styles.desc}>
                <FireOutlined /> {userInfo.introduce}
              </div>
            </div>
            <Link href={"/user/profile"}>
              <Button>Edit</Button>
            </Link>
          </div>
          <Divider />
          {/* article list */}
          <div className={styles.article}>
            {userArticles.map((article) => (
              <div key={article.id}>
                <div className={styles.list_item_container}>
                  <div className={styles.article}>
                    <div className={styles.userInfo}>
                      <span className={styles.name}>
                        {article.user?.nickname}&nbsp;
                      </span>
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
              </div>
            ))}
          </div>
        </div>
        {/* right */}
        <div className={styles.right}>
          <div className={styles.achievement}>
            <div className={styles.header}>Achievements</div>
            <div className={styles.number}>
              <div className={styles.wrapper}>
                <FundViewOutlined />
                <span>{userArticles.length} articles</span>
              </div>
              <div className={styles.wrapper}>
                <FundViewOutlined />
                <span>{viewsCount} views</span>
              </div>
            </div>
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
    const userRepo = db.getRepository(User);
    const articleRepo = db.getRepository(Article);
    const userRes = await userRepo.findOne({
      where: {
        id: Number(id),
      },
    });
    const articleListRes = await articleRepo.find({
      where: {
        user: {
          id: Number(id),
        },
      },
      relations: ["user", "tags"],
    });
    // return
    const formattedUser = JSON.parse(JSON.stringify(userRes));
    const formattedArticleList = JSON.parse(JSON.stringify(articleListRes));
    return {
      props: {
        userInfo: formattedUser,
        userArticles: formattedArticleList,
      },
    };
  };

export default UserProfile;

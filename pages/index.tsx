import type { NextPage } from "next";
// db
import { prepareConnection } from "db";
import { Article } from "db/entity";
// redux
import { END } from "redux-saga";
import { wrapper } from "store";
import { Article as IArticle } from "features/article/types";
import { useArticleService } from "features/article";
import ArticleListContainer from "features/article/components/ArticleListContainer";
// style
import styles from "./index.module.scss";
interface IHomeProps {
  articles: IArticle[];
}

const Home: NextPage<IHomeProps> = ({ articles }) => {
  // we can use articles from page props
  // OR
  // get it from redux
  // const {
  //   // articles,
  // } = useArticleService();
  return (
    <div>
      <div className={styles.container}>
        <ArticleListContainer articles={articles} />
      </div>
    </div>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ query, req }) => {
      // SSR fetch data
      const db = await prepareConnection();
      const articleRepo = db.getRepository(Article);
      const articles = await articleRepo.find({
        relations: ["user"],
      });
      const formatted = JSON.parse(JSON.stringify(articles));
      return {
        props: {
          articles: formatted || [],
        },
      };
    }
);

export default Home;

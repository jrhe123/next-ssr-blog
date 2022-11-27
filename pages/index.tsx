import type { NextPage } from "next";
// db
import { prepareConnection } from "db";
import { Article, Tag } from "db/entity";
// redux
import { END } from "redux-saga";
import { wrapper } from "store";
import { Article as IArticle } from "features/article/types";
import { Tag as ITag } from "features/tag/types";
import { useArticleService } from "features/article";
import ArticleListContainer from "features/article/components/ArticleListContainer";
// style
import styles from "./index.module.scss";
interface IHomeProps {
  articles: IArticle[];
  allTags: ITag[];
}

const Home: NextPage<IHomeProps> = ({ articles, allTags }) => {
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
      const tagRepo = db.getRepository(Tag);
      const articles = await articleRepo.find({
        relations: ["user", "tags"],
      });
      const tags = await tagRepo.find({
        relations: ["users"],
      });
      const formattedArticles = JSON.parse(JSON.stringify(articles));
      const formattedTags = JSON.parse(JSON.stringify(tags));
      return {
        props: {
          articles: formattedArticles || [],
          allTags: formattedTags || [],
        },
      };
    }
);

export default Home;

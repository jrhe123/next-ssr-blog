import type { NextPage } from "next";
//
import { wrapper } from "store";
import { END } from "redux-saga";
// db
import { prepareConnection } from "db";
import { Article } from "db/entity";
//
import { Article as IArticle } from "features/article/types";

interface IHomeProps {
  articles: IArticle[];
}

const Home: NextPage<IHomeProps> = ({ articles }) => {
  console.log("articles: ", articles);
  return (
    <div>
      <p>tag page</p>
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

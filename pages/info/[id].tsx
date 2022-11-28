import type { GetStaticProps, NextPage } from "next";
//
import { wrapper } from "store";
import { END } from "redux-saga";
//
import styles from "./index.module.scss";
// db
import { prepareConnection } from "db";
import { Article, User } from "db/entity";

interface InfoProps {}

const Info: NextPage<InfoProps> = () => {
  return (
    <div className={styles.container}>
      <p>path - info/1</p>
      <p>path - info/2</p>
      <p>path - info/3</p>
      <p>etc..</p>
      <p>this is a SSG page</p>
    </div>
  );
};

export async function getStaticPaths() {
  // info/[id]
  const db = await prepareConnection();
  const userRepo = db.getRepository(User);
  const userListRes = await userRepo.find();
  const userIds = userListRes.map((user) => ({
    params: {
      id: String(user.id),
    },
  }));
  // paths: [{ params: { id: "1" } }, { params: { id: "2" } }]
  // blocking -> just like SSR
  // false -> 404
  // true -> loading component
  return {
    paths: userIds,
    fallback: "blocking", // can also be true / false or 'blocking'
  };
}

export const getStaticProps: GetStaticProps = async function getStaticProps(
  ctx
) {
  // static page props - generated in build time
  // render the page is available at build time ahead of user request
  // data comes from a headless CMS
  // page must be pre-rendered for SEO and be very fast
  const { params } = ctx;
  const { id } = params as { id: string };
  // SSG fetch data
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

  return { props: { status: "online" } };
};

export default Info;

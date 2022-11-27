import type { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
// db
import { prepareConnection } from "db";
import { Article } from "db/entity";
//
import styles from "./index.module.scss";
// redux
import { Article as IArticle } from "features/article/types";
//
import PublishArticleContainer from "features/article/components/PublishArticleContainer";
import { useUserService } from "features/user";

interface ModifyEditorProps {
  article: IArticle;
}

const ModifyEditor: NextPage<ModifyEditorProps> = ({ article }) => {
  const { user } = useUserService();
  const { push } = useRouter();

  console.log("user: ", user);
  console.log("article: ", article);

  if (!user || user.userId != article.user.id) {
    push("/");
  }

  return (
    <div>
      <PublishArticleContainer article={article} />
    </div>
  );
};

// hide layout in _app
(ModifyEditor as any).hideLayout = true;

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
      relations: ["user", "tags"],
    });
    // return
    const formatted = JSON.parse(JSON.stringify(article));
    return {
      props: {
        article: formatted || {},
      },
    };
  };

export default ModifyEditor;

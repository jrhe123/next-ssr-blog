//
import type { NextPage } from "next";
//
import { wrapper } from "store";
//
import styles from "./index.module.scss";
//
import PublishArticleContainer from "features/article/components/PublishArticleContainer";

interface NewEditorProps {
  host: string;
}

const NewEditor: NextPage<NewEditorProps> = () => {
  return (
    <div>
      <PublishArticleContainer />
    </div>
  );
};

// hide layout in _app
(NewEditor as any).hideLayout = true;

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ query, req }) => {
      return {
        props: {},
      };
    }
);
export default NewEditor;

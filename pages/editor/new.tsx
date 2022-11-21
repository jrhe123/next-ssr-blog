import type { NextPage } from "next";
//
import { wrapper } from "store";

interface InfoProps {
  host: string;
}

const Editor: NextPage<InfoProps> = () => <div>Editor page</div>;

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ query, req }) => {
      return {
        props: {},
      };
    }
);
export default Editor;

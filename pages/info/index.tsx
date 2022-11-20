import type { NextPage } from "next";
//
import { wrapper } from "store";
import { END } from "redux-saga";

interface InfoProps {
  host: string;
}

const Info: NextPage<InfoProps> = () => {
  return (
    <div>
      <p>info page</p>
    </div>
  );
};

export const getStaticProps = wrapper.getStaticProps((store) => (params) => {
  console.log("2. Page.getStaticProps uses the store to dispatch things");
  // store.dispatch({ type: "SET_NAME", payload: "Seymur" });
  console.log("+++++++ getStaticProps params: ", params);
  return { props: { status: "online" } };
});

export default Info;

import type { NextPage } from "next";
//
import { wrapper } from "store";
import { END } from "redux-saga";

const Tag: NextPage = () => {
  return (
    <div>
      <p>tag page</p>
    </div>
  );
};

Tag.getInitialProps = wrapper.getInitialPageProps(
  (store) =>
    async ({ pathname, req, res }) => {
      console.log("+++++++ getInitialPageProps pathname: ", pathname);
      // console.log("+++++++ req: ", req);
      // console.log("+++++++ res: ", res);
      // console.log('2. Page.getInitialProps uses the store to dispatch things');
      // store.dispatch({
      //   type: 'TICK',
      //   payload: 'was set in error page ' + pathname,
      // });
    }
);
// https://github.com/kirill-konshin/next-redux-wrapper#pagegetinitialprops

export default Tag;

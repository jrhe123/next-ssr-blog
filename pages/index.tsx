import type { NextPage } from "next";
//
import { wrapper } from "store";
import { END } from "redux-saga";

const Home: NextPage = (props) => {
  return <div>home page</div>;
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ query }) => {
      console.log("+++++++ getServerSideProps query: ", query);
      // store.dispatch(tickClock(false))
      // if (!store.getState().placeholderData) {
      //   store.dispatch(loadData())
      //   store.dispatch(END)
      // }
      // await store.sagaTask.toPromise();

      // console.log('store state on the server before dispatch', store.getState());
      // const response = await fetch(
      //     `https://reqres.in/api/users/${Math.floor(Math.random() * 10 + 1)}`
      // );
      // const { data } = await response.json();
      // const data2 = data.first_name;
      // store.dispatch(setProfileData(`${data.first_name}`));

      return {
        props: {
          title: "my title",
          content: "123",
        },
      };
    }
);
// https://nextjs.org/docs/basic-features/data-fetching/get-server-side-props

export default Home;

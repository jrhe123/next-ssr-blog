export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ query, req }) => {
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
        props: {},
      };
    }
);
// https://nextjs.org/docs/basic-features/data-fetching/get-server-side-props


export async function getServerSideProps() {
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
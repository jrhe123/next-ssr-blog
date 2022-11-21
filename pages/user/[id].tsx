import type { NextPage } from "next";
//
import { wrapper } from "store";

interface UserProps {
  host: string;
}

const User: NextPage<UserProps> = () => <div>User profile page</div>;

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ query, req }) => {
      return {
        props: {},
      };
    }
);
export default User;

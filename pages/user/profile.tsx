import UpdateProfileContainer from "features/user/components/UpdateProfileContainer";
import type { NextPage } from "next";
//
import styles from "./index.module.scss";

const UserProfile: NextPage = () => {
  return (
    <div className={styles.container}>
      <UpdateProfileContainer />
    </div>
  );
};

export default UserProfile;

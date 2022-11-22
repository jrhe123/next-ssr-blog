import type { NextPage } from "next";
import styles from "./index.module.scss";

const Footer: NextPage = () => {
  return (
    <div className={styles.footer}>
      <p>©2022 created with NextJS</p>
    </div>
  );
};

export default Footer;

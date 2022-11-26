import type { NextPage } from "next";
// react
import React, { useState, useEffect } from "react";
//
import { wrapper } from "store";
import { END } from "redux-saga";
//
import styles from "./index.module.scss";
//
import TagListContainer from "features/tag/components/TagListContainer";

const Tag: NextPage = () => {
  return (
    <div className={styles.container}>
      <TagListContainer />
    </div>
  );
};

// export const getServerSideProps = wrapper.getServerSideProps(
//   (store) =>
//     async ({ query, req }) => {
//       return {
//         props: {},
//       };
//     }
// );

export default Tag;

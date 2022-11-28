import type { NextPage } from "next";
import dynamic from "next/dynamic";
// react
import React, { useState, useEffect } from "react";
//
import { wrapper } from "store";
import { END } from "redux-saga";
//
import styles from "./index.module.scss";
//
import TagListContainer from "features/tag/components/TagListContainer";

const DynamicComponent = dynamic(() => import("components/Demo"), {
  loading: () => <p>loading..</p>,
});

const Tag: NextPage = () => {
  const [showDynamic, setShowDynamic] = useState<boolean>(false);

  return (
    <div className={styles.container}>
      <TagListContainer />
      <p
        onClick={() => {
          setShowDynamic(!showDynamic);
        }}
      >
        toggle now
      </p>
      {showDynamic && <DynamicComponent />}
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

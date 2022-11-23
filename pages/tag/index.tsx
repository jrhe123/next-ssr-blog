import type { NextPage } from "next";
// react
import React, { useState, useEffect } from "react";
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

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ query, req }) => {
      return {
        props: {},
      };
    }
);

export default Tag;

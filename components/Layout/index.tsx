import type { NextPage } from "next";
import React from "react";

import Footer from "components/Footer";
import Navbar from "components/Navbar";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: NextPage<LayoutProps> = ({ children }) => (
  <div>
    <Navbar />
    <main>{children}</main>
    <Footer />
  </div>
);

export default Layout;

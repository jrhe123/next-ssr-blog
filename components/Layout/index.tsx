import type { NextPage } from 'next';
import React from 'react';
import Footer from '../Footer';
import Navbar from '../Navbar';

type LayoutProps = {
  children: React.ReactNode,
};

const Layout: NextPage<LayoutProps> = ({ children }) => (
  <div>
    <Navbar />
    <main>{children}</main>
    <Footer />
  </div>
);

export default Layout;

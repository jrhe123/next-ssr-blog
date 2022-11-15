// react
import React, { useState } from "react";
// next
import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
// ui
import { Button } from "antd";
// others
import { navs } from "./config";
import styles from "./index.module.scss";
// components
import SigninPopup from "components/SigninPopup";

const Navbar: NextPage = () => {
  const { pathname } = useRouter();
  const [isShowSignin, setIsShowSignin] = useState<boolean>(false);

  const handleGoToEditorPage = (
    e: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    e.preventDefault();
  };

  const handleSignin = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.preventDefault();
    setIsShowSignin(true);
  };

  const handleClose = () => {
    setIsShowSignin(false);
  };

  return (
    <div className={styles.navbar}>
      <section className={styles.logoArea}>稀土掘金</section>
      <section className={styles.linkArea}>
        {navs?.map((nav, index) => (
          <Link key={index} href={nav?.value} legacyBehavior>
            <a className={pathname === nav?.value ? styles.active : ""}>
              {nav.label}
            </a>
          </Link>
        ))}
      </section>
      <section className={styles.operationArea}>
        <Button onClick={handleGoToEditorPage}>Post</Button>
        <Button onClick={handleSignin} type={"primary"}>
          SignIn
        </Button>
      </section>
      {/* popup */}
      <SigninPopup isShow={isShowSignin} onClose={handleClose} />
    </div>
  );
};

export default Navbar;

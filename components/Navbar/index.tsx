// react
import React, { useState } from "react";
// next
import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
// ui
import { Button, Dropdown, Avatar, Menu, message } from "antd";
import { LoginOutlined, HomeOutlined } from "@ant-design/icons";
// others
import { navs } from "./config";
import styles from "./index.module.scss";
// components
import SigninPopupContainer from "features/user/components/SigninPopupContainer";
// redux service
import { useUserService } from "features/user";

const Navbar: NextPage = () => {
  const { pathname, push } = useRouter();
  const [isShowSignin, setIsShowSignin] = useState<boolean>(false);
  const { user, signout } = useUserService();

  const handleGoToEditorPage = (
    e: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (user?.userId) {
      push("/editor/new");
    } else {
      message.warning("Please sign in..");
    }
  };

  const handleClose = () => {
    setIsShowSignin(false);
  };

  const handleSignin = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.preventDefault();
    setIsShowSignin(true);
  };

  const handleGoToProfilePage = () => {
    push(`/user/${user?.userId}`);
  };

  const handleSignout = () => {
    signout();
  };

  const menuItems = [
    {
      label: "Profile",
      key: "&nbsp;profile",
      icon: <HomeOutlined />,
      onClick: handleGoToProfilePage,
    },
    {
      label: "Sign out",
      key: "&nbsp;signout",
      icon: <LoginOutlined />,
      onClick: handleSignout,
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.navbar}>
        <section className={styles.logoArea}>Rare Earth</section>
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
          {/* btn 1 */}
          <Button onClick={handleGoToEditorPage}>Post</Button>
          {/* btn 2 */}
          {user?.userId ? (
            <>
              <Dropdown menu={{ items: menuItems }} placement={"bottomLeft"}>
                <Avatar
                  src={user.avatar}
                  size={32}
                  style={{ cursor: "pointer" }}
                />
              </Dropdown>
            </>
          ) : (
            <Button onClick={handleSignin} type={"primary"}>
              SignIn
            </Button>
          )}
        </section>
        {/* popup */}
        <SigninPopupContainer isShow={isShowSignin} onClose={handleClose} />
      </div>
    </div>
  );
};

export default Navbar;

// react
import React, { useState } from "react";
// next
import type { NextPage } from "next";
// other
import styles from "./index.module.scss";

type SigninPopupProps = {
  isShow?: boolean;
  onClose: () => void;
};
type SigninForm = {
  phone: string;
  verify: string;
};

const SigninPopup: NextPage<SigninPopupProps> = ({
  isShow = false,
  onClose,
}) => {
  const [form, setForm] = useState<SigninForm>({
    phone: "",
    verify: "",
  });

  const handleClose = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.preventDefault();
    onClose();
  };

  const handleGetVerifyCode = (
    e: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    e.preventDefault();
  };

  const handleSign = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.preventDefault();
  };

  const handleOAuth = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.preventDefault();
  };

  if (!isShow) return null;
  return (
    <div className={styles.loginArea}>
      <div className={styles.loginBox}>
        {/* title */}
        <div className={styles.loginTitle}>
          <div>Signin</div>
          <div className={styles.close} onClick={handleClose}>
            x
          </div>
        </div>
        {/* phone */}
        <input
          value={form.phone}
          name={"phone"}
          type={"text"}
          placeholder={"Phone number"}
        />
        {/* verify */}
        <div className={styles.verifyCodeArea}>
          <input
            value={form.verify}
            name={"verify"}
            type={"text"}
            placeholder={"Verification"}
          />
          <span onClick={handleGetVerifyCode} className={styles.verifyCode}>
            SMS
          </span>
        </div>
        {/* btns */}
        <div onClick={handleSign} className={styles.loginBtn}>
          Signin
        </div>
        <div onClick={handleOAuth} className={styles.otherLogin}>
          Github login
        </div>
        <div className={styles.loginPrivacy}>
          <a
            href="https://github.com/jrhe123"
            target={"_blank"}
            rel={"noreferrer"}
          >
            Terms & conditions
          </a>
        </div>
      </div>
    </div>
  );
};

export default SigninPopup;

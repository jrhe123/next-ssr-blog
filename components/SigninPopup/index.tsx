// react
import React, { useState } from "react";
// next
import type { NextPage } from "next";
// ui
import { message } from "antd";
import { CloseOutlined, SendOutlined, GithubOutlined } from "@ant-design/icons";
// other
import styles from "./index.module.scss";
// component
import CountDown from "components/CountDown";

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
  const [isVerify, setIsVerify] = useState<boolean>(false);

  const handleClose = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.preventDefault();
    onClose();
  };

  const handleGetVerifyCode = (
    e: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    e.preventDefault();
    const regex = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
    if (!form.phone || !form.phone.match(regex)) {
      message.warning("Please enter your phone number");
      return;
    }
    setIsVerify(true);
  };

  const handleCountDownEnd = () => {
    setIsVerify(false);
  };

  const handleSign = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.preventDefault();
  };

  const handleOAuth = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.preventDefault();
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  if (!isShow) return null;
  return (
    <div className={styles.loginArea}>
      <div className={styles.loginBox}>
        {/* title */}
        <div className={styles.loginTitle}>
          <div>Sign In</div>
          <div className={styles.close} onClick={handleClose}>
            <CloseOutlined />
          </div>
        </div>
        {/* phone */}
        <input
          value={form.phone}
          name={"phone"}
          type={"text"}
          placeholder={"Phone number"}
          onChange={handleFormChange}
        />
        {/* verify */}
        <div className={styles.verifyCodeArea}>
          <input
            value={form.verify}
            name={"verify"}
            type={"text"}
            placeholder={"Text message"}
            onChange={handleFormChange}
          />
          <span className={styles.verifyCode}>
            {isVerify ? (
              <CountDown time={10} onEnd={handleCountDownEnd} />
            ) : (
              <SendOutlined onClick={handleGetVerifyCode} />
            )}
          </span>
        </div>
        {/* btns */}
        <div onClick={handleSign} className={styles.loginBtn}>
          Signin
        </div>
        <div onClick={handleOAuth} className={styles.otherLogin}>
          <span>
            Github&nbsp;&nbsp;
            <GithubOutlined />
          </span>
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

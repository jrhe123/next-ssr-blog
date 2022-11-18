// react
import React, { useState } from "react";
// next
import type { NextPage } from "next";
// ui
import { message } from "antd";
import { CloseOutlined, SendOutlined, GithubOutlined } from "@ant-design/icons";
// other
import styles from "./index.module.scss";
import request from "service/fetch";
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
type APIResponse = {
  code: number;
  data?: object;
  message?: string;
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

  const handleGetVerifyCode = async (
    e: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    e.preventDefault();
    const regex = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
    if (!form.phone || !form.phone.match(regex)) {
      message.warning("Please enter your phone number");
      return;
    }
    const response: APIResponse = await request.post(
      "/api/user/sendVerifyCode",
      {
        to: form.phone,
      }
    );
    if (response.code === 0) {
      setIsVerify(true);
    } else {
      message.error(response.message || "API error");
    }
  };

  const handleCountDownEnd = () => {
    setIsVerify(false);
  };

  const handleSign = async (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.preventDefault();
    const response: APIResponse = await request.post("/api/user/login", {
      ...form,
    });
    if (response.code !== 0) {
      message.error(response.message || "API error");
    }
    console.log("success");
    onClose && onClose();
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
          type={"number"}
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
            maxLength={4}
          />
          <span className={styles.verifyCode}>
            {isVerify ? (
              <CountDown time={10} onEnd={handleCountDownEnd} />
            ) : (
              <SendOutlined onClick={(e) => handleGetVerifyCode(e)} />
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

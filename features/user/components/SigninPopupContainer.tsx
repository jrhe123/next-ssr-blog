// react
import React, { useState, useEffect } from "react";
// next
import type { NextPage } from "next";
// ui
import { message } from "antd";
import { CloseOutlined, SendOutlined, GithubOutlined } from "@ant-design/icons";
// other
import styles from "./index.module.scss";
// component
import CountDown from "components/CountDown";
// redux service
import { useUserService } from "../hooks";

type SigninPopupContainerProps = {
  isShow?: boolean;
  onClose: () => void;
};
type SigninForm = {
  phone: string;
  verify: string;
};
const regex = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;

const SigninPopupContainer: NextPage<SigninPopupContainerProps> = ({
  isShow = false,
  onClose,
}) => {
  const [form, setForm] = useState<SigninForm>({
    phone: "",
    verify: "",
  });
  const [isVerify, setIsVerify] = useState<boolean>(false);
  const { isLoading, user, getVerifyCode, signin } = useUserService();

  useEffect(() => {
    if (user?.userId) {
      setForm({
        phone: "",
        verify: "",
      });
      onClose && onClose();
    }
  }, [user, onClose]);

  const handleClose = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.preventDefault();
    onClose();
  };

  const handleCountDownEnd = () => {
    setIsVerify(false);
  };

  const handleGetVerifyCode = async (
    e: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (isLoading) return;
    if (!form.phone || !form.phone.match(regex)) {
      message.warning("Please enter your phone number");
      return;
    }
    setIsVerify(true);
    getVerifyCode({
      to: form.phone,
    });
  };

  const handleSign = async (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    if (isLoading) return;
    e.preventDefault();
    handleCountDownEnd();
    if (!form.phone || !form.phone.match(regex)) {
      message.warning("Please enter your phone number");
      return;
    }
    if (!form.verify || form.verify.length !== 4) {
      message.warning("Please enter your 4 digit verify code");
      return;
    }
    signin({
      ...form,
      identity_type: "phone",
    });
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

export default SigninPopupContainer;

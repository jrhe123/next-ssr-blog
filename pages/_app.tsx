import "../styles/globals.css";
//
import { useEffect } from "react";
import type { AppProps } from "next/app";
import App, { AppContext } from "next/app";
//
import Layout from "../components/Layout";
//
import { Provider } from "react-redux";
import { wrapper } from "store";
//
import { Cookie } from "next-cookie";
import { IncomingMessage } from "node:http";

type User = {
  userId?: number;
  nickname?: string;
  avatar?: string;
};
type ICustomAppProps = AppProps & {
  user: User;
};
type IRequest = IncomingMessage & {
  cookies: Cookie;
};

const MyCustomApp = ({ Component, ...rest }: ICustomAppProps) => {
  const { store, props } = wrapper.useWrappedStore(rest);
  const { pageProps, user } = props;

  console.log("hit !!!!!!!!: ", user);
  useEffect(() => {}, []);

  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
};

MyCustomApp.getInitialProps = async (context: AppContext) => {
  const ctx = await App.getInitialProps(context);
  const req = context?.ctx?.req as IRequest;
  let userId = "",
    nickname = "",
    avatar = "";
  if (req) {
    const cookies: Record<string, any> = req.cookies;
    console.log("!!!!!!!!! in _app getInitialProps");
    console.log("!!!!!!!!! in _app getInitialProps");
    console.log("!!!!!!!!! in _app getInitialProps");
    console.log("!!!!!!!!! in _app getInitialProps");
    console.log("!!!!!!!!! in _app getInitialProps");
    console.log("!!!!!!!!! in _app getInitialProps");
    userId = cookies.userId;
    nickname = cookies.nickname;
    avatar = cookies.avatar;
  }
  return {
    ...ctx,
    user: {
      userId,
      nickname,
      avatar,
    },
  };
};

export default MyCustomApp;

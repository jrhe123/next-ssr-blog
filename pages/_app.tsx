import "../styles/globals.css";
//
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
import { NextComponentType, NextPageContext } from "next";

type User = {
  userId?: number;
  nickname?: string;
  avatar?: string;
};
type ICustomAppProps = Omit<AppProps, "Component"> & {
  user: User;
  Component: NextComponentType<NextPageContext<any>, any, any> & {
    hideLayout: boolean;
  };
};
type IRequest = IncomingMessage & {
  cookies: Cookie;
};

const MyCustomApp = ({ Component, ...rest }: ICustomAppProps) => {
  const { store, props } = wrapper.useWrappedStore({
    ...rest,
    // pass it to hydrate slice & assign to redux reducer
    pageProps: {
      initialState: {
        // if you want to hydrate slices
        user: {
          user: rest.user,
        },
        article: {
          articles: rest.pageProps.articles,
        },
      },
    },
  });
  // props in page props directly
  const combinedProps = {
    ...props.pageProps, // getInitialProps
    ...rest.pageProps, // getServerSideProps from page
  };
  const renderLayer = () => {
    if (Component.hideLayout) {
      return <Component {...combinedProps} />;
    } else {
      return (
        <Layout>
          <Component {...combinedProps} />
        </Layout>
      );
    }
  };

  return <Provider store={store}>{renderLayer()}</Provider>;
};

MyCustomApp.getInitialProps = async (context: AppContext) => {
  const appProps = await App.getInitialProps(context);
  const req = context?.ctx?.req as IRequest;
  let userId = "",
    nickname = "",
    avatar = "";
  // fetch user info from request cookies
  if (req) {
    const cookies: Record<string, any> = req.cookies;
    userId = cookies.userId;
    nickname = cookies.nickname;
    avatar = cookies.avatar;
  }
  // return to MyCustomApp props
  return {
    ...appProps,
    user: {
      userId,
      nickname,
      avatar,
    },
  };
};

export default MyCustomApp;

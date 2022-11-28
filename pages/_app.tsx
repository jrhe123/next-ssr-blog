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
// error boundary handles
import ErrorBoundary from "components/ErrorBoundary";

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

export function reportWebVitals(mertic: any) {
  // logging performance
  switch (mertic.name) {
    case "FCP":
      console.log("FCP", mertic);
      break;
    case "LCP":
      console.log("LCP", mertic);
      break;
    case "CLS":
      console.log("CLS", mertic);
      break;
    case "FID":
      console.log("FID", mertic);
      break;
    case "TTFB":
      console.log("TTFB", mertic);
      break;
    default:
      break;
  }
  // google plugin - lighthouse
  // navigator.sendBeacon
  // async send data, won't delay page unload
  // https://www.educative.io/answers/what-is-sendbeacon-in-javascript
  // const url = "xxxx";
  // const data = JSON.stringify(mertic);
  // if (navigator.sendBeacon) {
  //   navigator.sendBeacon(url, data);
  // } else {
  //   fetch(url, {
  //     body: data,
  //     method: "POST",
  //     keepalive: true,
  //   });
  // }
}

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
          article: rest.pageProps.article,
        },
        tag: {
          allTags: rest.pageProps.allTags,
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

  return (
    <ErrorBoundary>
      <Provider store={store}>{renderLayer()}</Provider>
    </ErrorBoundary>
  );
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

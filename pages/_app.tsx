import "../styles/globals.css";
import { FC } from "react";
import { Provider } from "react-redux";
import type { AppProps } from "next/app";
import Layout from "../components/Layout";
import { wrapper } from "store";

const App: FC<AppProps> = ({ Component, ...rest }) => {
  const { store, props } = wrapper.useWrappedStore(rest);
  const { pageProps } = props;
  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
};

export default App;

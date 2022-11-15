import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/Layout";
// font
import localFont from "@next/font/local";

const myfont = localFont({
  src: "../fonts/Pacifico-Regular.woff2",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={myfont.className}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </main>
  );
}

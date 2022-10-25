import "../styles/globals.css";
import { useRef } from "react";
import { SessionProvider } from "next-auth/react";
import { Provider } from "react-redux";
import { createStore } from "../app/store";
import Head from "next/head";

function MyApp({ Component, pageProps: { session, cart, ...pageProps } }: any) {
  const { current: store } = useRef(
    createStore({
      basket: {
        items: cart,
      },
    })
  );

  return (
    <SessionProvider session={session}>
      <Provider store={store}>
        <Head>
          <title>Amazon Clone</title>
          <link rel="icon" href="/Amazon_icon.jpg" />
        </Head>
        <Component {...pageProps} />
      </Provider>
    </SessionProvider>
  );
}

export default MyApp;

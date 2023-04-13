import "../styles/globals.css";
import Layout from "../components/Layout";
import React from "react";
import Script from "next/script";
import { createGlobalState } from "react-hooks-global-state";


export const { useGlobalState } = createGlobalState({ fbSDKLoaded: false });

function MyApp({ Component, pageProps }) {
  const [_, setFbSDKLoaded] = useGlobalState('fbSDKLoaded');

  return (
    <>
      <div id="fb-root"></div>
      <Script
        async
        defer
        crossOrigin="anonymous"
        src="https://connect.facebook.net/pl_PL/sdk.js#xfbml=1&version=v15.0"
        nonce="jY8mMkvQ"
        onLoad={() => {
          setFbSDKLoaded(true);
        }}
      />

      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

export default MyApp;

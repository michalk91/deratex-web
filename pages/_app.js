import "../styles/globals.css";
import Layout from "../components/Layout";
import React, { useEffect } from "react";
import Script from "next/script";
import { createGlobalState } from "react-hooks-global-state";
import { useState } from "react";
import { roboto } from "../fonts/fonts";

export const { useGlobalState } = createGlobalState({ fbSDKLoaded: false });

function MyApp({ Component, pageProps }) {
  const [_, setFbSDKLoaded] = useGlobalState("fbSDKLoaded");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []); //added to fix react hydration error

  return (
    <>
      {mounted && (
        <div className={roboto.className}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </div>
      )}
      <Script
        strategy="lazyOnload"
        crossOrigin="anonymous"
        src="https://connect.facebook.net/pl_PL/sdk.js#xfbml=1&version=v15.0"
        nonce="jY8mMkvQ"
        onReady={() => {
          setFbSDKLoaded(true);
        }}
      />
    </>
  );
}

export default MyApp;

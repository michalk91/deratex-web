import "../styles/globals.css";
import Layout from "../components/Layout";
import React, { useEffect, useCallback } from "react";
import Script from "next/script";
import { createGlobalState } from "react-hooks-global-state";
import { useState } from "react";
import { roboto } from "../fonts/fonts";
import Head from "next/head";
import useDisableRightClickMenu from "../hooks/useDisableRightClickMenu";

export const { useGlobalState } = createGlobalState({ fbSDKLoaded: false });

function MyApp({ Component, pageProps }) {
  const [_, setFbSDKLoaded] = useGlobalState("fbSDKLoaded");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []); //added to fix react hydration error

  const handleDisableRightClickMenu = useDisableRightClickMenu({
    tagName: "IMG",
  });

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
      </Head>
      {mounted && (
        <div
          className={roboto.className}
          onContextMenu={handleDisableRightClickMenu}
        >
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

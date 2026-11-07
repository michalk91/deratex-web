import "../styles/globals.css";
import "../styles/iubenda.css";
import Layout from "../components/Layout";
import React from "react";
import Script from "next/script";
import { useGlobalState } from "../lib/globalState";
import { roboto, robotoBolder, outfitBolder } from "../fonts/fonts";
import Head from "next/head";
import useDisableRightClickMenu from "../hooks/useDisableRightClickMenu";
import useConsent from "../hooks/useConsent";
import { IUBENDA_SCRIPT_URL, SERVICE_CONSENT } from "../lib/iubenda";

function MyApp({ Component, pageProps }) {
  const [, setFbSDKLoaded] = useGlobalState("fbSDKLoaded");
  const [, setFbSDKFailed] = useGlobalState("fbSDKFailed");
  const hasFacebookConsent = useConsent(SERVICE_CONSENT.facebook);

  const handleDisableRightClickMenu = useDisableRightClickMenu({
    tagName: "IMG",
  });

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />
      </Head>
      <style jsx global>{`
        :root {
          --font-roboto: ${roboto.style.fontFamily};
          --font-roboto-medium: ${robotoBolder.style.fontFamily};
          --font-outfit-medium: ${outfitBolder.style.fontFamily};
        }
      `}</style>
      <div
        className={roboto.className}
        onContextMenu={handleDisableRightClickMenu}
      >
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </div>
      <Script strategy="lazyOnload" src={IUBENDA_SCRIPT_URL} />
      {hasFacebookConsent && (
        <Script
          strategy="lazyOnload"
          crossOrigin="anonymous"
          src="https://connect.facebook.net/pl_PL/sdk.js#version=v26.0"
          nonce="jY8mMkvQ"
          onReady={() => {
            setFbSDKLoaded(true);
          }}
          onError={() => {
            setFbSDKFailed(true);
          }}
        />
      )}
    </>
  );
}

export default MyApp;

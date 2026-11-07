import "../styles/globals.css";
import "../styles/iubenda.css";
import Layout from "../components/Layout";
import React, { useSyncExternalStore } from "react";
import Script from "next/script";
import { createGlobalState } from "react-hooks-global-state";
import { roboto, robotoBolder, outfitBolder } from "../fonts/fonts";
import Head from "next/head";
import useDisableRightClickMenu from "../hooks/useDisableRightClickMenu";
import useConsent from "../hooks/useConsent";
import { SERVICE_CONSENT } from "../lib/iubenda";

const subscribeToNothing = () => () => {};
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

export const { useGlobalState } = createGlobalState({
  fbSDKLoaded: false,
});

function MyApp({ Component, pageProps }) {
  const [_, setFbSDKLoaded] = useGlobalState("fbSDKLoaded");
  const mounted = useSyncExternalStore(
    subscribeToNothing,
    getClientSnapshot,
    getServerSnapshot
  );
  const hasFacebookConsent = useConsent(SERVICE_CONSENT.facebook);

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
      <style jsx global>{`
        :root {
          --font-roboto: ${roboto.style.fontFamily};
          --font-roboto-medium: ${robotoBolder.style.fontFamily};
          --font-outfit-medium: ${outfitBolder.style.fontFamily};
        }
      `}</style>
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
      {hasFacebookConsent && (
        <Script
          strategy="lazyOnload"
          crossOrigin="anonymous"
          src="https://connect.facebook.net/pl_PL/sdk.js#version=v26.0"
          nonce="jY8mMkvQ"
          onReady={() => {
            setFbSDKLoaded(true);
          }}
        />
      )}
    </>
  );
}

export default MyApp;

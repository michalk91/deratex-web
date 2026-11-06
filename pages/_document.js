import Document, { Html, Head, Main, NextScript } from "next/document";
import { IUBENDA_CONFIG_SCRIPT, IUBENDA_SCRIPT_URL } from "../lib/iubenda";

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="pl">
        <Head>
          <script
            id="iubenda-cs-config"
            dangerouslySetInnerHTML={{ __html: IUBENDA_CONFIG_SCRIPT }}
          />
          <script src={IUBENDA_SCRIPT_URL} charSet="UTF-8" async />
        </Head>
        <body>
          <div id="fb-root"></div>
          <Main />

          <div id="modal" />
          <NextScript />
        </body>
      </Html>
    );
  }
}

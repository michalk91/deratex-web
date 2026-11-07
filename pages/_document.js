import Document, { Html, Head, Main, NextScript } from "next/document";
import { IUBENDA_CONFIG_SCRIPT } from "../lib/iubenda";

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="pl">
        <Head>
          <script
            id="iubenda-cs-config"
            dangerouslySetInnerHTML={{ __html: IUBENDA_CONFIG_SCRIPT }}
          />
          <link rel="icon" href="/images/logo.svg" type="image/svg+xml" />
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

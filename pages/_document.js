import Document, { Html, Head, Main, NextScript } from "next/document";
import { IUBENDA_CONFIG, IUBENDA_SCRIPT_URL } from "../lib/iubenda";

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="pl">
        <Head>
          <script
            id="iubenda-cs-config"
            dangerouslySetInnerHTML={{
              __html: `var _iub = _iub || []; _iub.csConfiguration = ${JSON.stringify(
                IUBENDA_CONFIG
              )};`,
            }}
          />
          <script src={IUBENDA_SCRIPT_URL} charSet="UTF-8" async />
        </Head>
        <body>
          <Main />

          <div id="modal" />
          <NextScript />
        </body>
      </Html>
    );
  }
}

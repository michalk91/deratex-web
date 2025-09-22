import Document, { Html, Head, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="pl">
        <Head>
          <script
            id="Cookiebot"
            src="https://consent.cookiebot.com/uc.js"
            data-cbid="22bb3d9e-666f-4b85-8a76-27cf0219503f"
            data-blockingmode="auto"
            type="text/javascript"
            async
          ></script>
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

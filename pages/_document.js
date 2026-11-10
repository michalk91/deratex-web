import Document, { Html, Head, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="pl">
        <Head>
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

import Document, { Html, Head, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="pl">
        <Head>
          {/* === IUBENDA COOKIE BANNER (zgoda na ciasteczka) === */}
          <script
            id="iubenda-cs-config"
            type="text/javascript"
            dangerouslySetInnerHTML={{
              __html: `
                var _iub = _iub || [];
                _iub.csConfiguration = {
                  cookiePolicyId: 59954157, // <-- ID Twojej Cookie Policy
                  siteId: 12345678,        // <-- ID Twojej witryny (z panelu iubenda)
                  lang: "pl",
                  banner: {
                    position: "bottom",
                    acceptButtonDisplay: true,
                    customizeButtonDisplay: true,
                    rejectButtonDisplay: true
                  }
                };
              `,
            }}
          />

          <script
            type="text/javascript"
            src="https://cdn.iubenda.com/cookie_solution/iubenda_cs.js"
            async
          ></script>

          {/* === IUBENDA LINK SCRIPT (dla polityk w stopce) === */}
          <script
            type="text/javascript"
            dangerouslySetInnerHTML={{
              __html: `
                (function (w,d) {
                  var loader = function () {
                    var s = d.createElement("script"),
                        tag = d.getElementsByTagName("script")[0];
                    s.src="https://cdn.iubenda.com/iubenda.js";
                    tag.parentNode.insertBefore(s,tag);
                  };
                  if (w.addEventListener) {
                    w.addEventListener("load", loader, false);
                  } else if (w.attachEvent) {
                    w.attachEvent("onload", loader);
                  } else {
                    w.onload = loader;
                  }
                })(window, document);
              `,
            }}
          />
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

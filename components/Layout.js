import Header from "./Header";
import Footer from "./Footer";
import { memo } from "react";

function Layout({ children }) {
  return (
    <>
      <a className="focus-only" href="#main-content">
        Przejdź do treści
      </a>
      <Header />
      <div className="page-wrapper">
        <main id="main-content" tabIndex={-1}>
          {children}
        </main>
        <Footer />
      </div>
    </>
  );
}

export default memo(Layout);

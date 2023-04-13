import Header from "./Header";
import Footer from "./Footer";
import { memo } from "react";

function Layout({ children }) {
  return (
    <>
      <Header />
      <div className="page-wrapper">
        {children}
        <Footer />
      </div>
    </>
  );
}

export default memo(Layout);

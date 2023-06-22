import Link from "next/link";
import { useState, useCallback } from "react";
import styles from "./Header.module.css";
import { useRouter } from "next/router";
import classNames from "classnames/bind";
import Image from "next/image";
import { memo } from "react";
import { FaPhoneAlt } from "react-icons/fa";
import { GrFacebook } from "react-icons/gr";
import { useMediaPredicate } from "react-media-hook";
import { useScrolledOverMargin } from "../hooks/useScrolledOverMargin";
import { useScrollDirection } from "../hooks/useScrollDirection";
import { isMobile } from "react-device-detect";

function Header() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const scrolledOverMargin = useScrolledOverMargin({
    scrollMargin: 0,
  });

  const scrollDirection = useScrollDirection({ threshold: 30 });

  const toggleMenu = useCallback(() => setIsOpen(!isOpen), [isOpen]);
  const closeMenu = useCallback(() => setIsOpen(false), []);

  const smallerThan550px = useMediaPredicate("(max-width: 550px)");

  return (
    <>
      <header
        className={classNames(styles.header, {
          [styles.hideHeader]: isMobile && scrollDirection === "scrolling down",
        })}
      >
        <nav className={styles.navbar}>
          <Link legacyBehavior href="/">
            <a
              className={classNames(styles.navlogo, {
                [styles.scrolledOverMargin]: scrolledOverMargin,
              })}
              onClick={isOpen && closeMenu}
            >
              <Image
                src="/images/logo.svg"
                alt="logo"
                height={0}
                width={0}
                sizes="100vw"
                priority={true}
              />
            </a>
          </Link>

          <div className={styles.telContainer}>
            <p>Zadzwoń do Nas!</p>
            <a href="tel:660826121">
              <h1 className={styles.tel}>
                <FaPhoneAlt size={19} className={styles.telLogo} /> 660 826 121
              </h1>
            </a>
          </div>

          <div className={styles.navMenuContainer}>
            <ul
              className={classNames(styles.navmenu, {
                [styles.active]: isOpen,
              })}
            >
              <li className={styles.navitem}>
                <Link legacyBehavior href="/">
                  <a
                    className={classNames(styles.navlink, {
                      [styles.active]: router.pathname === "/",
                    })}
                    onClick={closeMenu}
                  >
                    Strona główna
                  </a>
                </Link>
              </li>
              <li className={styles.navitem}>
                <Link legacyBehavior href="/services">
                  <a
                    className={classNames(styles.navlink, {
                      [styles.active]: router.pathname === "/services",
                    })}
                    onClick={closeMenu}
                  >
                    Usługi
                  </a>
                </Link>
              </li>
              <li className={styles.navitem}>
                <Link legacyBehavior href="/contact">
                  <a
                    className={classNames(styles.navlink, {
                      [styles.active]: router.pathname === "/contact",
                    })}
                    onClick={closeMenu}
                  >
                    Kontakt
                  </a>
                </Link>
              </li>
              <div className={styles.contactContainer}>
                <a
                  className={styles.fbLogo}
                  href="https://www.facebook.com/deratexdddtuchola"
                >
                  <GrFacebook />
                </a>

                {smallerThan550px && (
                  <a href="tel:660826121">
                    <h1 className={styles.tel}>
                      <FaPhoneAlt size={25} className={styles.telLogo} /> 660
                      826 121
                    </h1>
                  </a>
                )}
              </div>
            </ul>
          </div>
          <button
            className={classNames(styles.hamburger, {
              [styles.active]: isOpen,
            })}
            onClick={toggleMenu}
          >
            <span className={styles.bar}> </span>
            <span className={styles.bar}> </span>
            <span className={styles.bar}> </span>
          </button>
        </nav>
      </header>

      {isOpen && (
        <div className={styles.backdrop} onTouchStart={closeMenu}></div>
      )}
    </>
  );
}

export default memo(Header);

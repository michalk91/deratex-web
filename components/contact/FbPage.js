import classNames from "classnames";
import styles from "./fbPage.module.css";
import { memo, useEffect, useState, useCallback, useRef } from "react";
import useFbPagePluginResize from "../../hooks/useFbPagePluginResize";
import { MobileView } from "react-device-detect";
import useScrollLock from "../../hooks/useScrollLock";

function FbPage() {
  const [touched, setTouched] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [loading, setLoading] = useState(true);

  const containerRef = useRef();

  const { lockScroll, unlockScroll } = useScrollLock();

  const { fbPageWidth, fbPageHeight } = useFbPagePluginResize({
    minFbPageHeight: 70,
    minFbPageWidth: 180,
    maxFbPageWidth: 500,
    containerRef,
  });

  const handleTouchStart = useCallback(() => {
    setTouched(true);
  }, []);

  const handleTouchEnd = useCallback(() => {
    setTouched(false);
  }, []);

  const handleBackdropClick = useCallback(() => {
    setClicked(true);
    lockScroll();
  }, [lockScroll]);

  const handleButtonClick = useCallback(() => {
    setClicked(false);
    unlockScroll();
  }, [unlockScroll]);

  useEffect(() => {
    if (!clicked) return;

    setTimeout(() => {
      containerRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }, 30); // HACK: Fixes horizontal scrolling using scrollIntoView
  }, [clicked]);

useEffect(() => {
  const fbContainer = containerRef.current.querySelector(".fb-page");
  if (!fbContainer) return;

  const observer = new MutationObserver(() => {
    const iframe = fbContainer.querySelector("iframe");
    if (iframe) {
      iframe.addEventListener("load", () => setLoading(false));
      observer.disconnect();
    }
  });

  observer.observe(fbContainer, { childList: true, subtree: true });

  return () => observer.disconnect();
}, []);

  return (
    <div className={styles.fbPageContainer}>
      <h2 className={classNames("title", styles.title)}>
        Obserwuj Nas na facebooku
      </h2>
      <div ref={containerRef} className={styles.innerContainer}>
        {loading && (
          <div
            className={styles.fbSkeleton}
            style={{ width: fbPageWidth, height: fbPageHeight }}
          ></div>
        )}
        <div
          className="fb-page"
          data-href="https://www.facebook.com/deratexdddtuchola"
          data-show-posts="true"
          data-height={fbPageHeight}
          data-width={fbPageWidth}
          data-small-header="false"
          data-adapt-container-width="false"
          data-hide-cover="false"
          data-show-facepile="true"
        >
          <blockquote
            cite="https://www.facebook.com/deratexdddtuchola"
            className="fb-xfbml-parse-ignore"
          >
            <a
              aria-label="Our facebook page"
              href="https://www.facebook.com/deratexdddtuchola"
            >
              Deratex Zakład DDD
            </a>
          </blockquote>
        </div>

        <MobileView>
          <div
            onClick={handleBackdropClick}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            className={classNames(styles.invisibleBackdrop, {
              [styles.visibleBackdrop]: !clicked && touched,
              [styles.allowScroll]: clicked,
            })}
          >
            <p
              className={classNames(styles.backdropText, {
                [styles.visibleBackdropText]: !clicked && touched,
              })}
            >
              Stuknij palcem aby włączyć przewijanie
            </p>
          </div>
          {clicked && (
            <button
              aria-label="Disable Scrolling"
              onClick={handleButtonClick}
              className={styles.btn}
            >
              Nacisnij aby wyłączyć przewijanie
            </button>
          )}
        </MobileView>
      </div>
    </div>
  );
}
export default memo(FbPage);

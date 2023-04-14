import styles from "../../styles/indexStyles/reviews.module.css";
import React from "react";
import RichCarousel from "../carouselSlider/RichCarousel";
import { CarouselItem } from "../carouselSlider/Carousel";
import { memo, useEffect } from "react";
import classNames from "classnames";
import { useState, useRef } from "react";
import { useGlobalState } from "../../pages/_app";

const Reviews = () => {
  const [iframeError, setIframeError] = useState(false);
  const [height, setHeight] = useState(0);

  const ref = useRef();

  const fbSDKLoaded = useGlobalState(`fbSDKLoaded`)[0];

  useEffect(() => {
    if (window.FB) {
      FB.XFBML.parse(ref?.current); //Reload iframe after page changed
    }
  });

  useEffect(() => {
    setHeight(ref?.current?.clientHeight);
  });

  useEffect(() => {
    if (!fbSDKLoaded) return;

    FB.XFBML.parse(ref?.current, function () {
      //FB.XFBML.parse callback function invoked when elements are rendered
      if (height < 150) {
        setIframeError(true);
      }
      //When the iframe is rendered we check if its height is greater than 150px. if so, we are sure that the iframe has been rendered correctly
    });
  }, [fbSDKLoaded, height]); // When the error "'<URL>' was refused to be displayed in the frame because 'X-Frame-Options' is set to 'deny'" the iframe will not load and the height will not increase

  return (
    <>
      {/* Show "reviews" only when facebook iframe correctly loaded */}
      {!iframeError && (
        <section className={styles.reviews} ref={ref}>
          <span className={classNames("title")}>Opinie o Nas</span>
          <div className="graySection">
            <div className={classNames(styles.innerContent)}>
              <RichCarousel
                translateX="100%"
                sliderRectanglesVisible={false}
                // autoPlay
                slideTime={5000}
                // width="35vw"
                // height="25vh"
                navigationOutside
              >
                <CarouselItem>
                  <div className={classNames(styles.reviewContainer)}>
                    <div
                      className="fb-post"
                      data-href="https://www.facebook.com/tomasz.parchimowicz.5/posts/pfbid0Gv6iiEun3v6PE8CmLyNroYfzd86UKJtgxac8ooEsvKZbjyRjEdhmG8wBjKEX7nsAl"
                    ></div>
                  </div>
                </CarouselItem>
                <CarouselItem>
                  <div className={classNames(styles.reviewContainer)}>
                    <div
                      className="fb-post"
                      data-href="https://www.facebook.com/januszfakir/posts/pfbid02T7gvTdmfkvmvgFsg7cDNKapsrEsVnhFgoPCYdEtfCg8UqDkAo2gipdRpKQ63EbrTl"
                    ></div>
                  </div>
                </CarouselItem>
              </RichCarousel>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default memo(Reviews);

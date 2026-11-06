import { memo, useRef } from "react";
import classNames from "classnames";
import styles from "./reviews.module.css";
import RichCarousel from "../carouselSlider/RichCarousel";
import { CarouselItem } from "../carouselSlider/Carousel";
import ConsentGate from "../consent/ConsentGate";
import ConsentPlaceholder from "../consent/ConsentPlaceholder";
import useFbPostsStatus, { FB_POSTS_STATUS } from "../../hooks/useFbPostsStatus";
import { SERVICE_CONSENT } from "../../lib/iubenda";

const FACEBOOK_POST_URLS = [
  "https://www.facebook.com/tomasz.parchimowicz.5/posts/pfbid0Gv6iiEun3v6PE8CmLyNroYfzd86UKJtgxac8ooEsvKZbjyRjEdhmG8wBjKEX7nsAl",
  "https://www.facebook.com/AleksEdwinson/posts/pfbid02SwZeeaZniqcGCDrZkkTjMmxQcPGjfCFGQvmjnHWeY8UJnNhzxk2yX1sBn2JtyduJl",
];

function ReviewsSection({ children }) {
  return (
    <section className={styles.reviews}>
      <h2 className="title">Opinie o Nas</h2>
      <div className="graySection">
        <div className={styles.innerContent}>{children}</div>
      </div>
    </section>
  );
}

function FacebookReviews() {
  const stageRef = useRef();
  const status = useFbPostsStatus(stageRef);
  const isLoading = status === FB_POSTS_STATUS.LOADING;

  if (status === FB_POSTS_STATUS.ERROR) return null;

  return (
    <ReviewsSection>
      <div
        ref={stageRef}
        aria-busy={isLoading}
        className={classNames(styles.stage, {
          [styles.stageLoading]: isLoading,
        })}
      >
        <RichCarousel
          translateX="100%"
          sliderRectanglesVisible={false}
          autoPlay
          slideTime={5000}
          navigationOutside
        >
          {FACEBOOK_POST_URLS.map((url) => (
            <CarouselItem key={url}>
              <div className={styles.reviewContainer}>
                <div className="fb-post" data-href={url}></div>
              </div>
            </CarouselItem>
          ))}
        </RichCarousel>
      </div>
    </ReviewsSection>
  );
}

function Reviews() {
  return (
    <ConsentGate
      purposes={SERVICE_CONSENT.facebook}
      fallback={
        <ReviewsSection>
          <ConsentPlaceholder serviceName="Facebook" />
        </ReviewsSection>
      }
    >
      <FacebookReviews />
    </ConsentGate>
  );
}

export default memo(Reviews);

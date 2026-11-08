import { memo } from "react";
import styles from "./reviews.module.css";
import RichCarousel from "../carouselSlider/RichCarousel";
import { CarouselItem } from "../carouselSlider/Carousel";
import { GoogleReviewCard, GoogleReviewsSummary } from "./GoogleReviews";

function Reviews({ googleReviews }) {
  if (!googleReviews.reviews.length) return null;

  return (
    <section className={styles.reviews}>
      <h2 className="title">Opinie o Nas</h2>
      <div className="graySection">
        <div className={styles.innerContent}>
          <div className={styles.carousel}>
            <RichCarousel
              translateX="100%"
              sliderRectanglesVisible={false}
              stretchItems
              autoPlay
              slideTime={5000}
              navigationOutside
            >
              {googleReviews.reviews.map((review) => (
                <CarouselItem key={review.author}>
                  <div className={styles.reviewContainer}>
                    <GoogleReviewCard review={review} />
                  </div>
                </CarouselItem>
              ))}
            </RichCarousel>
          </div>
        </div>
        <GoogleReviewsSummary {...googleReviews} />
      </div>
    </section>
  );
}

export default memo(Reviews);

import { memo } from "react";
import { FaGoogle, FaStar } from "react-icons/fa";
import styles from "./googleReviews.module.css";

const STARS = [1, 2, 3, 4, 5];

const getInitials = (name) =>
  name
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");

const formatRating = (rating) =>
  rating.toLocaleString("pl-PL", { minimumFractionDigits: 1 });

function Stars({ rating }) {
  return (
    <span
      className={styles.stars}
      role="img"
      aria-label={`Ocena ${formatRating(rating)} na 5`}
    >
      {STARS.map((star) => (
        <FaStar
          key={star}
          aria-hidden
          className={star <= Math.round(rating) ? styles.starFilled : undefined}
        />
      ))}
    </span>
  );
}

export const GoogleReviewCard = memo(function GoogleReviewCard({ review }) {
  return (
    <article className={styles.card}>
      <div className={styles.cardHeader}>
        <span className={styles.avatar} aria-hidden>
          {getInitials(review.author)}
        </span>
        <div className={styles.authorInfo}>
          <p className={styles.author}>{review.author}</p>
          <p className={styles.meta}>
            <Stars rating={review.rating} /> {review.relativeTime}
          </p>
        </div>
        <FaGoogle className={styles.sourceIcon} aria-label="Opinia z Google" />
      </div>
      {review.text && <p className={styles.text}>{review.text}</p>}
    </article>
  );
});

export const GoogleReviewsSummary = memo(function GoogleReviewsSummary({
  rating,
  mapsUrl,
}) {
  return (
    <p className={styles.summary}>
      <FaGoogle aria-hidden className={styles.googleIcon} />
      <span className={styles.summaryLabel}>Google</span>
      <span className={styles.rating}>{formatRating(rating)}</span>
      <Stars rating={rating} />
      <a
        className={styles.allReviews}
        href={mapsUrl}
        target="_blank"
        rel="noopener noreferrer"
      >
        Zobacz wszystkie opinie
      </a>
    </p>
  );
});

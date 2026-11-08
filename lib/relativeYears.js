const relativeTimeFormat = new Intl.RelativeTimeFormat("pl", {
  numeric: "auto",
});

export const formatYearsAgo = (year, now = new Date()) =>
  relativeTimeFormat.format(year - now.getFullYear(), "year");

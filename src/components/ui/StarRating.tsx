import { Star } from "lucide-react";

interface StarRatingProps {
  rating: number;
  size?: "sm" | "md" | "lg";
  showValue?: boolean;
  count?: number;
  linkTo?: string;
}

const sizeMap = { sm: "w-3 h-3", md: "w-4 h-4", lg: "w-5 h-5" };

export function StarRating({ rating, size = "md", showValue, count, linkTo }: StarRatingProps) {
  const iconSize = sizeMap[size];
  const value = Math.round(rating * 10) / 10;

  const stars = [1, 2, 3, 4, 5].map((star) => (
    <Star
      key={star}
      className={`${iconSize} ${
        star <= Math.round(rating)
          ? "text-amber-500 fill-amber-500"
          : "text-stone-300 fill-stone-300"
      }`}
      aria-hidden="true"
    />
  ));

  if (showValue) {
    return (
      <div className="flex items-center gap-2">
        <span className={`${size === "lg" ? "text-5xl" : "text-3xl"} font-bold text-stone-900`}>
          {value.toFixed(1)}
        </span>
        <div>
          <div className="flex gap-0.5 mb-1">{stars}</div>
          {count !== undefined && (
            <span className="text-sm text-stone-500">
              Based on {count} review{count !== 1 ? "s" : ""}
            </span>
          )}
        </div>
      </div>
    );
  }

  const starsEl = (
    <div className="flex gap-0.5" role="img" aria-label={`${rating} out of 5 stars`}>
      {stars}
    </div>
  );

  if (linkTo) {
    return (
      <a href={linkTo} className="inline-flex items-center gap-2 hover:underline">
        {starsEl}
        {count !== undefined && (
          <span className="text-sm text-stone-500">{count} Reviews</span>
        )}
      </a>
    );
  }

  return starsEl;
}

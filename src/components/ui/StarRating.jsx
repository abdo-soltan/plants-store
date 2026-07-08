import { Star, StarHalf } from 'lucide-react'

export default function StarRating({ rating = 0, size = 14, showValue = true }) {
  const full = Math.floor(rating)
  const half = rating - full >= 0.5
  return (
    <div className="flex items-center gap-1">
      <div className="flex items-center text-gold-500">
        {Array.from({ length: 5 }).map((_, i) => {
          if (i < full) return <Star key={i} size={size} fill="currentColor" strokeWidth={0} />
          if (i === full && half) return <StarHalf key={i} size={size} fill="currentColor" strokeWidth={0} />
          return <Star key={i} size={size} className="text-forest-900/15 dark:text-cream/15" />
        })}
      </div>
      {showValue && <span className="text-xs text-forest-900/60 dark:text-cream/60">{rating.toFixed(1)}</span>}
    </div>
  )
}

export function ProductCardSkeleton() {
  return (
    <div className="card-surface overflow-hidden animate-pulse">
      <div className="aspect-[4/5] bg-forest-900/10 dark:bg-cream/10" />
      <div className="p-4 space-y-3">
        <div className="h-3 w-1/3 bg-forest-900/10 dark:bg-cream/10 rounded-full" />
        <div className="h-4 w-3/4 bg-forest-900/10 dark:bg-cream/10 rounded-full" />
        <div className="h-4 w-1/2 bg-forest-900/10 dark:bg-cream/10 rounded-full" />
      </div>
    </div>
  )
}

export function GridSkeleton({ count = 8 }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  )
}

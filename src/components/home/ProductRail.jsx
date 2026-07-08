import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import ProductCard from '../product/ProductCard.jsx'
import SectionHeading from '../ui/SectionHeading.jsx'

export default function ProductRail({ eyebrow, title, subtitle, products, viewAllHref }) {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
        <SectionHeading eyebrow={eyebrow} title={title} subtitle={subtitle} />
        {viewAllHref && (
          <Link to={viewAllHref} className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold text-forest-900 dark:text-gold-400 hover:gap-2.5 transition-all shrink-0">
            View all <ArrowRight size={15} />
          </Link>
        )}
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {products.map((p, i) => (
          <ProductCard key={p.id} product={p} index={i} />
        ))}
      </div>
      {viewAllHref && (
        <div className="mt-8 text-center sm:hidden">
          <Link to={viewAllHref} className="btn-secondary inline-flex">View all <ArrowRight size={15} /></Link>
        </div>
      )}
    </section>
  )
}

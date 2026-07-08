import { Link } from 'react-router-dom'
import { ChevronRight, Home } from 'lucide-react'

export default function Breadcrumbs({ items }) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center flex-wrap gap-1.5 text-sm text-forest-900/50 dark:text-cream/50">
      <Link to="/" className="hover:text-forest-700 dark:hover:text-gold-400 flex items-center gap-1">
        <Home size={14} />
      </Link>
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-1.5">
          <ChevronRight size={14} className="opacity-50" />
          {item.to ? (
            <Link to={item.to} className="hover:text-forest-700 dark:hover:text-gold-400">{item.label}</Link>
          ) : (
            <span className="text-forest-900 dark:text-cream font-medium">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  )
}

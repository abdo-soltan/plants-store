import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { SlidersHorizontal, X, Search } from 'lucide-react'
import ProductCard from '../components/product/ProductCard.jsx'
import { GridSkeleton } from '../components/ui/Skeleton.jsx'
import Breadcrumbs from '../components/ui/Breadcrumbs.jsx'
import { categories } from '../data/products.js'
import { useProducts } from '../context/ProductContext.jsx'

const SORT_OPTIONS = [
  { value: 'featured', label: 'Featured' },
  { value: 'bestseller', label: 'Best Selling' },
  { value: 'new', label: 'Newest' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
]

export default function Shop() {
  const { products } = useProducts()
  const [params, setParams] = useSearchParams()
  const [loading, setLoading] = useState(true)
  const [filtersOpen, setFiltersOpen] = useState(false)

  const category = params.get('category') || ''
  const sort = params.get('sort') || 'featured'
  const query = params.get('q') || ''
  const maxPrice = Number(params.get('max')) || 100
  const difficulty = params.get('difficulty') || ''

  useEffect(() => {
    setLoading(true)
    const t = setTimeout(() => setLoading(false), 500)
    return () => clearTimeout(t)
  }, [category, sort, query, maxPrice, difficulty])

  const update = (key, value) => {
    const next = new URLSearchParams(params)
    if (value) next.set(key, value)
    else next.delete(key)
    setParams(next)
  }

  const filtered = useMemo(() => {
    let list = [...products]
    if (category) list = list.filter((p) => p.category === category)
    if (query) list = list.filter((p) => p.name.toLowerCase().includes(query.toLowerCase()))
    if (difficulty) list = list.filter((p) => p.care.difficulty === difficulty)
    list = list.filter((p) => p.price <= maxPrice)

    switch (sort) {
      case 'bestseller':
        list = list.filter((p) => p.tags.includes('bestseller')).concat(list.filter((p) => !p.tags.includes('bestseller')))
        break
      case 'new':
        list = list.filter((p) => p.tags.includes('new')).concat(list.filter((p) => !p.tags.includes('new')))
        break
      case 'price-asc':
        list.sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        list.sort((a, b) => b.price - a.price)
        break
      default:
        break
    }
    return list
  }, [category, sort, query, maxPrice, difficulty])

  const difficulties = [...new Set(products.map((p) => p.care.difficulty))]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Breadcrumbs items={[{ label: 'Shop' }]} />
      <div className="mt-4 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl sm:text-4xl font-display">Shop all plants</h1>
          <p className="text-forest-900/50 dark:text-cream/50 mt-2 text-sm">{filtered.length} plants found</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 opacity-40" />
            <input
              value={query}
              onChange={(e) => update('q', e.target.value)}
              placeholder="Search plants..."
              className="input-field pl-9 py-2.5 w-40 sm:w-56"
            />
          </div>
          <select
            value={sort}
            onChange={(e) => update('sort', e.target.value)}
            className="input-field py-2.5 w-auto"
          >
            {SORT_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
          <button onClick={() => setFiltersOpen(true)} className="lg:hidden btn-secondary py-2.5 px-4">
            <SlidersHorizontal size={16} />
          </button>
        </div>
      </div>

      <div className="mt-8 grid lg:grid-cols-[240px_1fr] gap-8">
        <aside className="hidden lg:block">
          <FilterPanel {...{ category, update, maxPrice, difficulty, difficulties }} />
        </aside>

        {filtersOpen && (
          <div className="fixed inset-0 z-[95] lg:hidden">
            <div className="absolute inset-0 bg-forest-950/50" onClick={() => setFiltersOpen(false)} />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              className="absolute left-0 top-0 h-full w-[85%] max-w-xs bg-cream dark:bg-forest-950 p-6 overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-display text-lg">Filters</h3>
                <button onClick={() => setFiltersOpen(false)}><X size={20} /></button>
              </div>
              <FilterPanel {...{ category, update, maxPrice, difficulty, difficulties }} />
            </motion.div>
          </div>
        )}

        <div>
          {loading ? (
            <GridSkeleton count={9} />
          ) : filtered.length === 0 ? (
            <div className="text-center py-24">
              <p className="text-5xl mb-4">🥀</p>
              <p className="text-lg font-medium">No plants match your filters</p>
              <p className="text-forest-900/50 dark:text-cream/50 mt-1 text-sm">Try adjusting your search or filters.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
              {filtered.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function FilterPanel({ category, update, maxPrice, difficulty, difficulties }) {
  return (
    <div className="space-y-8">
      <div>
        <h4 className="font-semibold text-sm mb-3">Category</h4>
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm cursor-pointer">
            <input type="radio" name="cat" checked={!category} onChange={() => update('category', '')} className="accent-forest-700" />
            All categories
          </label>
          {categories.map((c) => (
            <label key={c.id} className="flex items-center gap-2 text-sm cursor-pointer">
              <input type="radio" name="cat" checked={category === c.id} onChange={() => update('category', c.id)} className="accent-forest-700" />
              {c.icon} {c.name}
            </label>
          ))}
        </div>
      </div>
      <div>
        <h4 className="font-semibold text-sm mb-3">Max price: ${maxPrice}</h4>
        <input
          type="range"
          min="10"
          max="100"
          value={maxPrice}
          onChange={(e) => update('max', e.target.value)}
          className="w-full accent-forest-700"
        />
      </div>
      <div>
        <h4 className="font-semibold text-sm mb-3">Care difficulty</h4>
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm cursor-pointer">
            <input type="radio" name="diff" checked={!difficulty} onChange={() => update('difficulty', '')} className="accent-forest-700" />
            Any
          </label>
          {difficulties.map((d) => (
            <label key={d} className="flex items-center gap-2 text-sm cursor-pointer">
              <input type="radio" name="diff" checked={difficulty === d} onChange={() => update('difficulty', d)} className="accent-forest-700" />
              {d}
            </label>
          ))}
        </div>
      </div>
    </div>
  )
}

import { useState } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Heart, ShoppingBag, Truck, ShieldCheck, Sun, Droplets, Gauge } from 'lucide-react'
import Breadcrumbs from '../components/ui/Breadcrumbs.jsx'
import Badge from '../components/ui/Badge.jsx'
import QuantitySelector from '../components/ui/QuantitySelector.jsx'
import ProductCard from '../components/product/ProductCard.jsx'
import { useProducts } from '../context/ProductContext.jsx'
import { useCart } from '../context/CartContext.jsx'
import { useWishlist } from '../context/WishlistContext.jsx'

export default function ProductDetails() {
  const { slug } = useParams()
  const { getProductBySlug, getRelated } = useProducts()
  const product = getProductBySlug(slug)
  const [activeImg, setActiveImg] = useState(0)
  const [qty, setQty] = useState(1)
  const [tab, setTab] = useState('description')
  const { addToCart } = useCart()
  const { isWishlisted, toggleWishlist } = useWishlist()

  if (!product) return <Navigate to="/404" replace />

  const related = getRelated(product)
  const wished = isWishlisted(product.id)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Breadcrumbs items={[{ label: 'Shop', to: '/shop' }, { label: product.name }]} />

      <div className="mt-6 grid lg:grid-cols-2 gap-10 lg:gap-16">
        <div>
          <motion.div
            key={activeImg}
            initial={{ opacity: 0.4 }}
            animate={{ opacity: 1 }}
            className="rounded-4xl overflow-hidden aspect-square bg-forest-100 dark:bg-forest-900"
          >
            <img src={product.images[activeImg]} alt={product.name} className="w-full h-full object-cover" />
          </motion.div>
          {product.images.length > 1 && (
            <div className="flex gap-3 mt-4">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImg(i)}
                  className={`w-20 h-20 rounded-2xl overflow-hidden border-2 transition-colors ${
                    activeImg === i ? 'border-forest-700 dark:border-gold-400' : 'border-transparent'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div>
          <div className="flex items-center gap-2 mb-3">
            {product.tags.includes('bestseller') && <Badge tone="gold">Bestseller</Badge>}
            {product.oldPrice && <Badge tone="red">Sale</Badge>}
            <Badge tone="outline">{product.category.replace('-', ' ')}</Badge>
          </div>
          <h1 className="text-3xl sm:text-4xl font-display">{product.name}</h1>
          <div className="mt-5 flex items-baseline gap-3">
            <span className="text-3xl font-semibold text-forest-900 dark:text-gold-400">${product.price.toFixed(2)}</span>
            {product.oldPrice && <span className="text-lg text-forest-900/40 dark:text-cream/40 line-through">${product.oldPrice.toFixed(2)}</span>}
          </div>
          <p className="mt-5 text-forest-900/70 dark:text-cream/70 leading-relaxed">{product.description}</p>

          <div className="mt-6 grid grid-cols-3 gap-3">
            <div className="card-surface p-3 text-center">
              <Sun size={18} className="mx-auto text-gold-500 mb-1.5" />
              <p className="text-[11px] text-forest-900/50 dark:text-cream/50">Light</p>
              <p className="text-xs font-semibold mt-0.5">{product.care.light}</p>
            </div>
            <div className="card-surface p-3 text-center">
              <Droplets size={18} className="mx-auto text-sage-500 mb-1.5" />
              <p className="text-[11px] text-forest-900/50 dark:text-cream/50">Water</p>
              <p className="text-xs font-semibold mt-0.5">{product.care.water}</p>
            </div>
            <div className="card-surface p-3 text-center">
              <Gauge size={18} className="mx-auto text-forest-600 dark:text-gold-400 mb-1.5" />
              <p className="text-[11px] text-forest-900/50 dark:text-cream/50">Difficulty</p>
              <p className="text-xs font-semibold mt-0.5">{product.care.difficulty}</p>
            </div>
          </div>

          <p className="mt-6 text-sm">
            <span className={product.stock > 10 ? 'text-forest-600 dark:text-gold-400' : 'text-red-500'}>
              {product.stock > 10 ? 'In stock' : `Only ${product.stock} left`}
            </span>
          </p>

          <div className="mt-6 flex items-center gap-4">
            <QuantitySelector qty={qty} setQty={setQty} max={product.stock} />
            <button onClick={() => addToCart(product, qty)} className="btn-primary flex-1">
              <ShoppingBag size={17} /> Add to Cart
            </button>
            <button
              onClick={() => toggleWishlist(product)}
              className="w-12 h-12 rounded-full border border-forest-900/15 dark:border-cream/15 flex items-center justify-center hover:border-red-400 shrink-0"
              aria-label="Toggle wishlist"
            >
              <Heart size={18} className={wished ? 'fill-red-500 text-red-500' : ''} />
            </button>
          </div>

          <div className="mt-8 flex flex-col gap-3 text-sm text-forest-900/60 dark:text-cream/60">
            <p className="flex items-center gap-2"><Truck size={16} /> Free shipping on orders over $75</p>
            <p className="flex items-center gap-2"><ShieldCheck size={16} /> 30-day thriving guarantee</p>
          </div>

          <div className="mt-10 border-t border-forest-900/10 dark:border-cream/10 pt-6">
            <div className="flex gap-6 border-b border-forest-900/10 dark:border-cream/10">
              {['description', 'care'].map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`pb-3 text-sm font-medium capitalize border-b-2 -mb-px transition-colors ${
                    tab === t ? 'border-forest-700 dark:border-gold-400 text-forest-900 dark:text-cream' : 'border-transparent text-forest-900/40 dark:text-cream/40'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
            <div className="py-5 text-sm text-forest-900/70 dark:text-cream/70 leading-relaxed">
              {tab === 'description' && <p>{product.description} Each plant is inspected for pests and healthy root structure before it ever leaves our greenhouse.</p>}
              {tab === 'care' && (
                <ul className="space-y-2">
                  <li><strong>Light:</strong> {product.care.light}</li>
                  <li><strong>Water:</strong> {product.care.water}</li>
                  <li><strong>Difficulty:</strong> {product.care.difficulty}</li>
                  <li><strong>Pet safety:</strong> {product.tags.includes('pet-friendly') ? 'Safe around pets' : 'Keep away from curious pets'}</li>
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <div className="mt-20">
          <h2 className="text-2xl font-display mb-8">You may also like</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {related.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
          </div>
        </div>
      )}
    </div>
  )
}

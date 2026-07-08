import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Heart, ShoppingBag } from 'lucide-react'
import StarRating from '../ui/StarRating.jsx'
import Badge from '../ui/Badge.jsx'
import { useCart } from '../../context/CartContext.jsx'
import { useWishlist } from '../../context/WishlistContext.jsx'

export default function ProductCard({ product, index = 0 }) {
  const { addToCart } = useCart()
  const { isWishlisted, toggleWishlist } = useWishlist()
  const wished = isWishlisted(product.id)

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: (index % 4) * 0.06 }}
      className="group card-surface overflow-hidden flex flex-col hover:shadow-card transition-shadow duration-300"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-forest-100 dark:bg-forest-800">
        <Link to={`/product/${product.slug}`}>
          <img
            src={product.images[0]}
            alt={product.name}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
          />
        </Link>
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.tags.includes('bestseller') && <Badge tone="gold">Bestseller</Badge>}
          {product.oldPrice && <Badge tone="red">Sale</Badge>}
          {product.stock < 10 && <Badge tone="outline">Low stock</Badge>}
        </div>
        <button
          onClick={(e) => { e.preventDefault(); toggleWishlist(product) }}
          aria-label={wished ? 'Remove from wishlist' : 'Add to wishlist'}
          className="absolute top-3 right-3 w-9 h-9 rounded-full glass flex items-center justify-center hover:scale-110 transition-transform"
        >
          <Heart size={16} className={wished ? 'fill-red-500 text-red-500' : 'text-forest-900 dark:text-cream'} />
        </button>
        <button
          onClick={(e) => { e.preventDefault(); addToCart(product, 1) }}
          className="absolute inset-x-3 bottom-3 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 btn-primary py-2.5 text-sm"
        >
          <ShoppingBag size={15} /> Quick Add
        </button>
      </div>
      <Link to={`/product/${product.slug}`} className="p-4 flex flex-col gap-1.5 flex-1">
        <span className="text-[11px] uppercase tracking-wider text-forest-900/40 dark:text-cream/40">
          {product.category.replace('-', ' ')}
        </span>
        <h3 className="font-display text-lg text-forest-950 dark:text-cream leading-snug">{product.name}</h3>
        <StarRating rating={product.rating} />
        <div className="mt-1 flex items-center gap-2">
          <span className="font-semibold text-forest-900 dark:text-gold-400">${product.price.toFixed(2)}</span>
          {product.oldPrice && (
            <span className="text-sm text-forest-900/40 dark:text-cream/40 line-through">${product.oldPrice.toFixed(2)}</span>
          )}
        </div>
      </Link>
    </motion.div>
  )
}

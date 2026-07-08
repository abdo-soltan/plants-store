import { Link } from 'react-router-dom'
import { Heart } from 'lucide-react'
import Breadcrumbs from '../components/ui/Breadcrumbs.jsx'
import ProductCard from '../components/product/ProductCard.jsx'
import { useWishlist } from '../context/WishlistContext.jsx'

export default function Wishlist() {
  const { items } = useWishlist()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Breadcrumbs items={[{ label: 'Wishlist' }]} />
      <h1 className="text-3xl sm:text-4xl font-display mt-4 flex items-center gap-3">
        <Heart size={28} /> Your Wishlist
      </h1>

      {items.length === 0 ? (
        <div className="text-center py-24">
          <p className="text-6xl mb-6">🤍</p>
          <p className="text-lg font-medium">Your wishlist is empty</p>
          <p className="text-forest-900/50 dark:text-cream/50 mt-1 mb-8">Save plants you love and come back to them anytime.</p>
          <Link to="/shop" className="btn-primary">Browse the Shop</Link>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {items.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
        </div>
      )}
    </div>
  )
}

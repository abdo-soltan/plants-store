import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Trash2, ShoppingBag, ArrowRight } from 'lucide-react'
import Breadcrumbs from '../components/ui/Breadcrumbs.jsx'
import QuantitySelector from '../components/ui/QuantitySelector.jsx'
import { useCart } from '../context/CartContext.jsx'

export default function Cart() {
  const { items, updateQty, removeFromCart, subtotal } = useCart()
  const shipping = subtotal > 75 || subtotal === 0 ? 0 : 8.5
  const tax = subtotal * 0.08
  const total = subtotal + shipping + tax

  if (items.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-24 text-center">
        <p className="text-6xl mb-6">🌱</p>
        <h1 className="text-2xl font-display mb-2">Your cart is empty</h1>
        <p className="text-forest-900/50 dark:text-cream/50 mb-8">Looks like you haven't found your plant match yet.</p>
        <Link to="/shop" className="btn-primary">Browse the Shop</Link>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Breadcrumbs items={[{ label: 'Cart' }]} />
      <h1 className="text-3xl sm:text-4xl font-display mt-4 flex items-center gap-3">
        <ShoppingBag size={30} /> Your Cart
      </h1>

      <div className="mt-8 grid lg:grid-cols-[1fr_360px] gap-10">
        <div className="space-y-4">
          {items.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="card-surface p-4 flex gap-4 items-center"
            >
              <img src={item.images[0]} alt={item.name} className="w-24 h-24 rounded-2xl object-cover shrink-0" />
              <div className="flex-1 min-w-0">
                <Link to={`/product/${item.slug}`} className="font-medium hover:text-forest-600 dark:hover:text-gold-400">{item.name}</Link>
                <p className="text-xs text-forest-900/40 dark:text-cream/40 capitalize mt-0.5">{item.category.replace('-', ' ')}</p>
                <p className="font-semibold text-forest-900 dark:text-gold-400 mt-2">${item.price.toFixed(2)}</p>
              </div>
              <div className="flex flex-col items-end gap-3">
                <button onClick={() => removeFromCart(item.id)} className="text-forest-900/30 hover:text-red-500 dark:text-cream/30" aria-label="Remove">
                  <Trash2 size={17} />
                </button>
                <QuantitySelector qty={item.qty} setQty={(q) => updateQty(item.id, q)} max={item.stock} size="sm" />
              </div>
            </motion.div>
          ))}
        </div>

        <div className="card-surface p-6 h-fit sticky top-24">
          <h3 className="font-display text-xl mb-5">Order Summary</h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between"><span className="text-forest-900/60 dark:text-cream/60">Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
            <div className="flex justify-between"><span className="text-forest-900/60 dark:text-cream/60">Shipping</span><span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span></div>
            <div className="flex justify-between"><span className="text-forest-900/60 dark:text-cream/60">Estimated tax</span><span>${tax.toFixed(2)}</span></div>
            <div className="border-t border-forest-900/10 dark:border-cream/10 pt-3 flex justify-between font-semibold text-base">
              <span>Total</span><span>${total.toFixed(2)}</span>
            </div>
          </div>
          <Link to="/checkout" className="btn-primary w-full mt-6">
            Checkout <ArrowRight size={16} />
          </Link>
          <Link to="/shop" className="block text-center text-sm text-forest-900/50 dark:text-cream/50 mt-4 hover:text-forest-700 dark:hover:text-gold-400">
            Continue shopping
          </Link>
        </div>
      </div>
    </div>
  )
}

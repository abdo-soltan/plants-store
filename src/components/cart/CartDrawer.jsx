import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { X, Trash2, ShoppingBag } from 'lucide-react'
import { useCart } from '../../context/CartContext.jsx'
import QuantitySelector from '../ui/QuantitySelector.jsx'

export default function CartDrawer() {
  const { items, isCartOpen, setIsCartOpen, updateQty, removeFromCart, subtotal } = useCart()

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-forest-950/50 z-[80]"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.32 }}
            className="fixed top-0 right-0 h-full w-full sm:w-[420px] bg-cream dark:bg-forest-950 z-[90] flex flex-col shadow-2xl"
          >
            <div className="flex items-center justify-between p-5 border-b border-forest-900/10 dark:border-cream/10">
              <h3 className="font-display text-xl flex items-center gap-2">
                <ShoppingBag size={20} /> Your Cart
              </h3>
              <button onClick={() => setIsCartOpen(false)} aria-label="Close cart" className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-forest-900/5 dark:hover:bg-cream/10">
                <X size={18} />
              </button>
            </div>

            {items.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center gap-4 p-8 text-center">
                <span className="text-5xl">🌱</span>
                <p className="text-forest-900/60 dark:text-cream/60">Your cart is empty. Let's find your next plant.</p>
                <Link to="/shop" onClick={() => setIsCartOpen(false)} className="btn-primary">Browse the Shop</Link>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-5">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-3">
                      <img src={item.images[0]} alt={item.name} className="w-20 h-20 rounded-2xl object-cover shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <Link to={`/product/${item.slug}`} onClick={() => setIsCartOpen(false)} className="font-medium text-sm leading-snug hover:text-forest-600 dark:hover:text-gold-400">
                            {item.name}
                          </Link>
                          <button onClick={() => removeFromCart(item.id)} aria-label="Remove item" className="text-forest-900/30 hover:text-red-500 dark:text-cream/30 shrink-0">
                            <Trash2 size={15} />
                          </button>
                        </div>
                        <p className="text-sm font-semibold text-forest-900 dark:text-gold-400 mt-1">${item.price.toFixed(2)}</p>
                        <div className="mt-2">
                          <QuantitySelector qty={item.qty} setQty={(q) => updateQty(item.id, q)} max={item.stock} size="sm" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-5 border-t border-forest-900/10 dark:border-cream/10 space-y-4">
                  <div className="flex items-center justify-between text-base font-semibold">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <p className="text-xs text-forest-900/50 dark:text-cream/50">Shipping and taxes calculated at checkout.</p>
                  <Link to="/checkout" onClick={() => setIsCartOpen(false)} className="btn-primary w-full">
                    Checkout
                  </Link>
                  <Link to="/cart" onClick={() => setIsCartOpen(false)} className="btn-secondary w-full">
                    View Cart
                  </Link>
                </div>
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

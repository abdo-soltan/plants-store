import { createContext, useContext, useEffect, useState } from 'react'
import { useToast } from './ToastContext.jsx'

const WishlistContext = createContext()

export function WishlistProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      const saved = localStorage.getItem('verdant_wishlist')
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })
  const { showToast } = useToast()

  useEffect(() => {
    localStorage.setItem('verdant_wishlist', JSON.stringify(items))
  }, [items])

  const isWishlisted = (id) => items.some((i) => i.id === id)

  const toggleWishlist = (product) => {
    setItems((prev) => {
      const exists = prev.some((i) => i.id === product.id)
      if (exists) {
        showToast(`${product.name} removed from wishlist`, 'info')
        return prev.filter((i) => i.id !== product.id)
      }
      showToast(`${product.name} added to wishlist`, 'success')
      return [...prev, product]
    })
  }

  const removeFromWishlist = (id) => setItems((prev) => prev.filter((i) => i.id !== id))

  return (
    <WishlistContext.Provider value={{ items, isWishlisted, toggleWishlist, removeFromWishlist }}>
      {children}
    </WishlistContext.Provider>
  )
}

export const useWishlist = () => useContext(WishlistContext)

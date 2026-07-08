import { useState, useEffect } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Search, Heart, ShoppingBag, Menu, Sun, Moon, User, Leaf } from 'lucide-react'
import { useCart } from '../../context/CartContext.jsx'
import { useWishlist } from '../../context/WishlistContext.jsx'
import { useTheme } from '../../context/ThemeContext.jsx'
import MobileMenu from './MobileMenu.jsx'
import { products } from '../../data/products.js'

const links = [
  { to: '/', label: 'Home' },
  { to: '/shop', label: 'Shop' },
  { to: '/categories', label: 'Categories' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [query, setQuery] = useState('')
  const { itemCount, setIsCartOpen } = useCart()
  const { items: wishItems } = useWishlist()
  const { theme, toggleTheme } = useTheme()
  const navigate = useNavigate()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const suggestions = query.length > 1
    ? products.filter((p) => p.name.toLowerCase().includes(query.toLowerCase())).slice(0, 5)
    : []

  const submitSearch = (e) => {
    e.preventDefault()
    if (query.trim()) {
      navigate(`/shop?q=${encodeURIComponent(query.trim())}`)
      setSearchOpen(false)
      setQuery('')
    }
  }

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled ? 'glass shadow-soft' : 'bg-cream/0 dark:bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            <Link to="/" className="flex items-center gap-2 shrink-0">
              <span className="w-9 h-9 rounded-full bg-forest-900 dark:bg-gold-500 flex items-center justify-center">
                <Leaf size={18} className="text-cream dark:text-forest-950" />
              </span>
              <span className="font-display text-xl tracking-wide text-forest-950 dark:text-cream">Verdant</span>
            </Link>

            <nav className="hidden lg:flex items-center gap-8">
              {links.map((l) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  end={l.to === '/'}
                  className={({ isActive }) =>
                    `text-sm font-medium tracking-wide transition-colors relative py-1 ${
                      isActive
                        ? 'text-forest-900 dark:text-gold-400'
                        : 'text-forest-900/60 dark:text-cream/60 hover:text-forest-900 dark:hover:text-cream'
                    }`
                  }
                >
                  {l.label}
                </NavLink>
              ))}
            </nav>

            <div className="flex items-center gap-1 sm:gap-2">
              <button
                onClick={() => setSearchOpen((v) => !v)}
                className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-forest-900/5 dark:hover:bg-cream/10 transition-colors"
                aria-label="Search"
              >
                <Search size={18} />
              </button>
              <button
                onClick={toggleTheme}
                className="hidden sm:flex w-10 h-10 rounded-full items-center justify-center hover:bg-forest-900/5 dark:hover:bg-cream/10 transition-colors"
                aria-label="Toggle dark mode"
              >
                {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
              </button>
              <Link
                to="/login"
                className="hidden sm:flex w-10 h-10 rounded-full items-center justify-center hover:bg-forest-900/5 dark:hover:bg-cream/10 transition-colors"
                aria-label="Account"
              >
                <User size={18} />
              </Link>
              <Link
                to="/wishlist"
                className="relative w-10 h-10 rounded-full flex items-center justify-center hover:bg-forest-900/5 dark:hover:bg-cream/10 transition-colors"
                aria-label="Wishlist"
              >
                <Heart size={18} />
                {wishItems.length > 0 && (
                  <span className="absolute top-0 right-0 w-4 h-4 rounded-full bg-gold-500 text-forest-950 text-[10px] font-bold flex items-center justify-center">
                    {wishItems.length}
                  </span>
                )}
              </Link>
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative w-10 h-10 rounded-full flex items-center justify-center hover:bg-forest-900/5 dark:hover:bg-cream/10 transition-colors"
                aria-label="Cart"
              >
                <ShoppingBag size={18} />
                {itemCount > 0 && (
                  <span className="absolute top-0 right-0 w-4 h-4 rounded-full bg-forest-900 dark:bg-gold-500 text-cream dark:text-forest-950 text-[10px] font-bold flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </button>
              <button
                onClick={() => setMobileOpen(true)}
                className="lg:hidden w-10 h-10 rounded-full flex items-center justify-center hover:bg-forest-900/5 dark:hover:bg-cream/10 transition-colors"
                aria-label="Open menu"
              >
                <Menu size={20} />
              </button>
            </div>
          </div>

          {searchOpen && (
            <div className="pb-4 relative">
              <form onSubmit={submitSearch} className="relative">
                <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 opacity-50" />
                <input
                  autoFocus
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search for plants, e.g. Monstera..."
                  className="input-field pl-11"
                />
              </form>
              {suggestions.length > 0 && (
                <div className="absolute mt-2 w-full card-surface p-2 z-10">
                  {suggestions.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => { navigate(`/product/${p.slug}`); setSearchOpen(false); setQuery('') }}
                      className="w-full flex items-center gap-3 p-2 rounded-xl hover:bg-forest-900/5 dark:hover:bg-cream/10 text-left"
                    >
                      <img src={p.images[0]} alt="" className="w-10 h-10 rounded-lg object-cover" />
                      <span className="text-sm">{p.name}</span>
                      <span className="ml-auto text-sm font-semibold">${p.price.toFixed(2)}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </header>
      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} links={links} />
    </>
  )
}

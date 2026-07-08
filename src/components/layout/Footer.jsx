import { Link } from 'react-router-dom'
import { Leaf, Instagram, Facebook, Twitter, Mail, MapPin, Phone } from 'lucide-react'
import { useState } from 'react'
import { useToast } from '../../context/ToastContext.jsx'

export default function Footer() {
  const [email, setEmail] = useState('')
  const { showToast } = useToast()

  const subscribe = (e) => {
    e.preventDefault()
    if (!email.includes('@')) {
      showToast('Please enter a valid email address', 'error')
      return
    }
    showToast('You are subscribed! Welcome to the greenhouse.', 'success')
    setEmail('')
  }

  return (
    <footer className="bg-forest-950 text-cream mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <span className="w-9 h-9 rounded-full bg-gold-500 flex items-center justify-center">
                <Leaf size={18} className="text-forest-950" />
              </span>
              <span className="font-display text-xl">Verdant</span>
            </Link>
            <p className="text-cream/60 text-sm leading-relaxed max-w-sm">
              Hand-selected ornamental plants, delivered with care to bring quiet, living luxury into every room.
            </p>
            <div className="flex items-center gap-3 mt-5">
              {[Instagram, Facebook, Twitter].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 rounded-full border border-cream/15 flex items-center justify-center hover:bg-gold-500 hover:text-forest-950 hover:border-gold-500 transition-colors">
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-sm tracking-wide uppercase mb-4 text-cream/80">Shop</h4>
            <ul className="space-y-2.5 text-sm text-cream/60">
              <li><Link to="/shop" className="hover:text-gold-400">All Plants</Link></li>
              <li><Link to="/categories" className="hover:text-gold-400">Categories</Link></li>
              <li><Link to="/shop?sort=bestseller" className="hover:text-gold-400">Best Sellers</Link></li>
              <li><Link to="/shop?sort=new" className="hover:text-gold-400">New Arrivals</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-sm tracking-wide uppercase mb-4 text-cream/80">Company</h4>
            <ul className="space-y-2.5 text-sm text-cream/60">
              <li><Link to="/about" className="hover:text-gold-400">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-gold-400">Contact</Link></li>
              <li><Link to="/contact" className="hover:text-gold-400">Care Guides</Link></li>
              <li><Link to="/contact" className="hover:text-gold-400">Shipping &amp; Returns</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-sm tracking-wide uppercase mb-4 text-cream/80">Newsletter</h4>
            <p className="text-sm text-cream/60 mb-3">Plant care tips and new arrivals, twice a month.</p>
            <form onSubmit={subscribe} className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@email.com"
                className="flex-1 min-w-0 rounded-full bg-cream/10 border border-cream/15 px-4 py-2.5 text-sm placeholder:text-cream/40 focus:outline-none focus:border-gold-400"
              />
              <button className="rounded-full bg-gold-500 text-forest-950 px-4 py-2.5 text-sm font-semibold hover:bg-gold-400 transition-colors shrink-0">
                Join
              </button>
            </form>
            <div className="mt-5 space-y-2 text-sm text-cream/50">
              <p className="flex items-center gap-2"><MapPin size={14} /> Portland, Oregon</p>
              <p className="flex items-center gap-2"><Phone size={14} /> (503) 555-0192</p>
              <p className="flex items-center gap-2"><Mail size={14} /> hello@verdant.shop</p>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-cream/10 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-cream/40">
          <p>&copy; {new Date().getFullYear()} Verdant Plant Co. All rights reserved.</p>
          <div className="flex items-center gap-5">
            <Link to="/" className="hover:text-gold-400">Privacy Policy</Link>
            <Link to="/" className="hover:text-gold-400">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

import { NavLink } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { X, Sun, Moon, User, Shield, Send, LogOut } from 'lucide-react'
import { useTheme } from '../../context/ThemeContext.jsx'
import { useAuth } from '../../context/AuthContext.jsx'

export default function MobileMenu({ open, onClose, links }) {
  const { theme, toggleTheme } = useTheme()
  const { user, logout } = useAuth()
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-forest-950/50 z-[60] lg:hidden"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed top-0 right-0 h-full w-[80%] max-w-sm bg-cream dark:bg-forest-950 z-[70] lg:hidden p-6 flex flex-col"
          >
            <div className="flex items-center justify-between mb-8">
              <span className="font-display text-xl">Menu</span>
              <button onClick={onClose} aria-label="Close menu" className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-forest-900/5 dark:hover:bg-cream/10">
                <X size={20} />
              </button>
            </div>
            <nav className="flex flex-col gap-1">
              {links.map((l) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  end={l.to === '/'}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `py-3.5 px-3 rounded-xl text-base font-medium border-b border-forest-900/5 dark:border-cream/5 ${
                      isActive ? 'text-forest-900 dark:text-gold-400' : 'text-forest-900/70 dark:text-cream/70'
                    }`
                  }
                >
                  {l.label}
                </NavLink>
              ))}
              {user ? <>
                <NavLink to={user.role === 'admin' ? '/admin' : '/request'} onClick={onClose} className="py-3.5 px-3 rounded-xl text-base font-medium flex items-center gap-2 text-forest-900/70 dark:text-cream/70">
                  {user.role === 'admin' ? <Shield size={18} /> : <Send size={18} />} {user.role === 'admin' ? 'Admin dashboard' : 'Send a request'}
                </NavLink>
                <button onClick={() => { logout(); onClose() }} className="py-3.5 px-3 rounded-xl text-base font-medium flex items-center gap-2 text-forest-900/70 dark:text-cream/70"><LogOut size={18} /> Sign out</button>
              </> : <NavLink to="/login" onClick={onClose} className="py-3.5 px-3 rounded-xl text-base font-medium flex items-center gap-2 text-forest-900/70 dark:text-cream/70"><User size={18} /> Account</NavLink>}
            </nav>
            <button
              onClick={toggleTheme}
              className="mt-auto flex items-center justify-center gap-2 btn-secondary"
            >
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
              {theme === 'dark' ? 'Light mode' : 'Dark mode'}
            </button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

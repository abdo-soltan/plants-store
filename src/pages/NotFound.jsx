import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Home, Leaf } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-[75vh] flex flex-col items-center justify-center text-center px-4">
      <motion.div
        animate={{ rotate: [0, -8, 8, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        className="text-7xl mb-6"
      >
        🥀
      </motion.div>
      <h1 className="text-6xl font-display text-forest-900 dark:text-cream">404</h1>
      <p className="text-lg text-forest-900/60 dark:text-cream/60 mt-3 max-w-sm">
        This page has wilted away. Let's get you back to something greener.
      </p>
      <Link to="/" className="btn-primary mt-8">
        <Home size={16} /> Back to Home
      </Link>
    </div>
  )
}

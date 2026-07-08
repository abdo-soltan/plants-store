import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send } from 'lucide-react'
import { useToast } from '../../context/ToastContext.jsx'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const { showToast } = useToast()

  const submit = (e) => {
    e.preventDefault()
    if (!email.includes('@')) {
      showToast('Please enter a valid email address', 'error')
      return
    }
    showToast('Welcome to the greenhouse — check your inbox!', 'success')
    setEmail('')
  }

  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative rounded-4xl overflow-hidden bg-forest-900 dark:bg-forest-800 px-6 sm:px-14 py-14 text-center"
      >
        <div className="absolute -top-10 -right-10 w-56 h-56 bg-gold-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-10 -left-10 w-56 h-56 bg-forest-400/10 rounded-full blur-3xl" />
        <h2 className="relative font-display text-3xl sm:text-4xl text-cream">Grow with us</h2>
        <p className="relative mt-3 text-cream/60 max-w-md mx-auto">
          Seasonal care guides, first access to rare plants, and 10% off your first order.
        </p>
        <form onSubmit={submit} className="relative mt-8 flex flex-col sm:flex-row items-center gap-3 max-w-md mx-auto">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full rounded-full bg-cream/10 border border-cream/20 px-5 py-3.5 text-sm text-cream placeholder:text-cream/40 focus:outline-none focus:border-gold-400"
          />
          <button className="w-full sm:w-auto shrink-0 rounded-full bg-gold-500 text-forest-950 px-6 py-3.5 text-sm font-semibold hover:bg-gold-400 transition-colors flex items-center justify-center gap-2">
            Subscribe <Send size={14} />
          </button>
        </form>
      </motion.div>
    </section>
  )
}

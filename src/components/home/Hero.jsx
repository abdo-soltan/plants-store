import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Truck, ShieldCheck, Leaf } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-leaf-pattern">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 sm:pt-20 pb-16 sm:pb-24 grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <span className="section-eyebrow inline-flex items-center gap-2 mb-6">
            <Leaf size={13} /> The 2026 Living Collection
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-[3.4rem] font-display leading-[1.08] text-forest-950 dark:text-cream">
            Bring quiet luxury
            <br />
            into <span className="italic text-forest-600 dark:text-gold-400">every room.</span>
          </h1>
          <p className="mt-6 text-lg text-forest-900/60 dark:text-cream/60 max-w-md leading-relaxed">
            Rare and beautiful ornamental plants, hand-selected by growers and delivered to your door with a
            30-day thriving guarantee.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Link to="/shop" className="btn-primary">
              Shop the Collection <ArrowRight size={16} />
            </Link>
            <Link to="/categories" className="btn-secondary">
              Explore Categories
            </Link>
          </div>
          <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 gap-6 max-w-lg">
            <div className="flex items-center gap-2.5">
              <Truck size={20} className="text-forest-600 dark:text-gold-400 shrink-0" />
              <span className="text-sm text-forest-900/70 dark:text-cream/70">Free shipping $75+</span>
            </div>
            <div className="flex items-center gap-2.5">
              <ShieldCheck size={20} className="text-forest-600 dark:text-gold-400 shrink-0" />
              <span className="text-sm text-forest-900/70 dark:text-cream/70">30-day guarantee</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="relative"
        >
          <div className="absolute -inset-6 bg-gradient-to-tr from-forest-200/40 to-gold-200/30 dark:from-forest-700/30 dark:to-gold-700/10 rounded-[3rem] blur-2xl" />
          <div className="relative rounded-[2.5rem] overflow-hidden shadow-card aspect-[4/5]">
            <img
              src="https://images.unsplash.com/photo-1545165375-1b744b9ed384?auto=format&fit=crop&w=1000&q=80"
              alt="Curated ornamental plants arranged in a bright living room"
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}

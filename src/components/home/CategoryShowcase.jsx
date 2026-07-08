import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import SectionHeading from '../ui/SectionHeading.jsx'
import { categories } from '../../data/products.js'

const images = {
  indoor: 'photo-1593482892290-f54927ae1bb6',
  succulents: 'photo-1459156212016-c812468e2115',
  flowering: 'photo-1593691509543-c55fb32d8de5',
  foliage: 'photo-1614594975525-e45190c55d0b',
  hanging: 'photo-1622673172312-9be6c3160bea',
  bonsai: 'photo-1622557850710-a6a9a5b3daf1',
}

export default function CategoryShowcase() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <SectionHeading eyebrow="Shop by Category" title="Find the right green companion" align="center" />
      <div className="mt-12 grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
        {categories.map((c, i) => (
          <motion.div
            key={c.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: i * 0.06 }}
          >
            <Link
              to={`/shop?category=${c.id}`}
              className="group relative block rounded-3xl overflow-hidden aspect-[4/3] shadow-soft"
            >
              <img
                src={`https://images.unsplash.com/${images[c.id]}?auto=format&fit=crop&w=600&q=80`}
                alt={c.name}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest-950/80 via-forest-950/10 to-transparent" />
              <div className="absolute bottom-0 left-0 p-4 sm:p-5">
                <span className="text-2xl">{c.icon}</span>
                <p className="text-cream font-display text-lg mt-1">{c.name}</p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

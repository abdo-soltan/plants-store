import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Breadcrumbs from '../components/ui/Breadcrumbs.jsx'
import { categories, products } from '../data/products.js'

const images = {
  indoor: 'photo-1593482892290-f54927ae1bb6',
  succulents: 'photo-1459156212016-c812468e2115',
  flowering: 'photo-1593691509543-c55fb32d8de5',
  foliage: 'photo-1614594975525-e45190c55d0b',
  hanging: 'photo-1622673172312-9be6c3160bea',
  bonsai: 'photo-1622557850710-a6a9a5b3daf1',
}

export default function Categories() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Breadcrumbs items={[{ label: 'Categories' }]} />
      <h1 className="text-3xl sm:text-4xl font-display mt-4">Browse by category</h1>
      <p className="text-forest-900/50 dark:text-cream/50 mt-2 max-w-lg">
        From low-maintenance succulents to statement foliage, find the collection that matches your space and lifestyle.
      </p>

      <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((c, i) => {
          const count = products.filter((p) => p.category === c.id).length
          return (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
            >
              <Link to={`/shop?category=${c.id}`} className="group relative block rounded-4xl overflow-hidden aspect-[5/4] shadow-soft">
                <img
                  src={`https://images.unsplash.com/${images[c.id]}?auto=format&fit=crop&w=700&q=80`}
                  alt={c.name}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest-950/85 via-forest-950/20 to-transparent" />
                <div className="absolute bottom-0 left-0 p-6">
                  <span className="text-3xl">{c.icon}</span>
                  <p className="text-cream font-display text-2xl mt-2">{c.name}</p>
                  <p className="text-cream/60 text-sm mt-1">{count} plants</p>
                </div>
              </Link>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

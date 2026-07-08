import { motion } from 'framer-motion'
import { Leaf, Users, Award, Sprout } from 'lucide-react'
import Breadcrumbs from '../components/ui/Breadcrumbs.jsx'
import SectionHeading from '../components/ui/SectionHeading.jsx'
import Testimonials from '../components/home/Testimonials.jsx'

const stats = [
  { icon: Leaf, value: '120k+', label: 'Plants delivered' },
  { icon: Users, value: '38k+', label: 'Happy growers' },
  { icon: Award, value: '4.8/5', label: 'Average rating' },
  { icon: Sprout, value: '30-day', label: 'Thriving guarantee' },
]

export default function About() {
  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <Breadcrumbs items={[{ label: 'About' }]} />
      </div>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-20 grid lg:grid-cols-2 gap-12 items-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <p className="section-eyebrow mb-4">Our story</p>
          <h1 className="text-4xl sm:text-5xl font-display leading-tight">
            Grown with intention, <span className="italic text-forest-600 dark:text-gold-400">shipped with care.</span>
          </h1>
          <p className="mt-6 text-forest-900/70 dark:text-cream/70 leading-relaxed">
            Verdant started in 2019 as a single greenhouse in Portland, born from a simple frustration: plants
            sold in big box stores rarely survived the trip home. We set out to build a nursery-to-doorstep
            experience that treats every plant like a living thing worth protecting.
          </p>
          <p className="mt-4 text-forest-900/70 dark:text-cream/70 leading-relaxed">
            Today we work with a network of specialty growers across the country, hand-inspecting every plant
            before it ships and packaging each order to survive the journey — not just arrive, but thrive.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="rounded-4xl overflow-hidden shadow-card aspect-[4/5]"
        >
          <img
            src="https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=900&q=80"
            alt="A greenhouse worker tending to rows of ornamental plants"
            className="w-full h-full object-cover"
          />
        </motion.div>
      </section>

      <section className="bg-forest-50 dark:bg-forest-900/30 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="text-center"
            >
              <s.icon className="mx-auto text-forest-600 dark:text-gold-400 mb-3" size={26} />
              <p className="text-2xl sm:text-3xl font-display">{s.value}</p>
              <p className="text-sm text-forest-900/50 dark:text-cream/50 mt-1">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <SectionHeading eyebrow="Our values" title="What guides every shipment" align="center" />
        <div className="mt-12 grid sm:grid-cols-3 gap-6">
          {[
            { title: 'Sourced responsibly', body: 'We partner only with growers who use sustainable, pesticide-light practices.' },
            { title: 'Packaged to survive', body: 'Every box is engineered in-house and stress-tested before it ever ships a plant.' },
            { title: 'Guided, not just sold', body: 'Every order includes a care card written specifically for that plant, that season.' },
          ].map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="card-surface p-7"
            >
              <h3 className="font-display text-xl mb-2">{v.title}</h3>
              <p className="text-sm text-forest-900/60 dark:text-cream/60 leading-relaxed">{v.body}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <Testimonials />
    </div>
  )
}

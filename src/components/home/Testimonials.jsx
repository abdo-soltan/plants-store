import { motion } from 'framer-motion'
import SectionHeading from '../ui/SectionHeading.jsx'
import StarRating from '../ui/StarRating.jsx'
import { testimonials } from '../../data/content.js'

export default function Testimonials() {
  return (
    <section className="bg-forest-900 dark:bg-forest-950 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Loved by plant people"
          title="Stories from our community"
          align="center"
        />
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="glass rounded-3xl p-6 flex flex-col gap-4 text-cream"
            >
              <StarRating rating={t.rating} showValue={false} size={13} />
              <p className="text-sm leading-relaxed text-cream/80">&ldquo;{t.quote}&rdquo;</p>
              <div className="flex items-center gap-3 mt-auto pt-2">
                <img src={t.avatar} alt={t.name} className="w-9 h-9 rounded-full object-cover" />
                <div>
                  <p className="text-sm font-semibold">{t.name}</p>
                  <p className="text-xs text-cream/50">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

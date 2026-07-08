import { motion } from 'framer-motion'

export default function SectionHeading({ eyebrow, title, subtitle, align = 'left' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6 }}
      className={align === 'center' ? 'text-center max-w-2xl mx-auto' : ''}
    >
      {eyebrow && <p className="section-eyebrow mb-3">{eyebrow}</p>}
      <h2 className="text-3xl sm:text-4xl font-display font-medium text-forest-950 dark:text-cream leading-tight">
        {title}
      </h2>
      {subtitle && <p className="mt-4 text-forest-900/60 dark:text-cream/60 text-base leading-relaxed">{subtitle}</p>}
    </motion.div>
  )
}

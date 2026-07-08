import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Send } from 'lucide-react'
import Breadcrumbs from '../components/ui/Breadcrumbs.jsx'
import { useToast } from '../context/ToastContext.jsx'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [submitting, setSubmitting] = useState(false)
  const { showToast } = useToast()

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const submit = (e) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) {
      showToast('Please fill out every field', 'error')
      return
    }
    setSubmitting(true)
    setTimeout(() => {
      setSubmitting(false)
      showToast('Message sent — we will reply within one business day.', 'success')
      setForm({ name: '', email: '', message: '' })
    }, 900)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Breadcrumbs items={[{ label: 'Contact' }]} />
      <h1 className="text-3xl sm:text-4xl font-display mt-4">Get in touch</h1>
      <p className="text-forest-900/50 dark:text-cream/50 mt-2 max-w-lg">
        Questions about a plant, an order, or just want a recommendation? Our plant stylists are here to help.
      </p>

      <div className="mt-10 grid lg:grid-cols-[1fr_1.3fr] gap-10">
        <motion.div initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-5">
          {[
            { icon: Mail, label: 'Email', value: 'hello@verdant.shop' },
            { icon: Phone, label: 'Phone', value: '(503) 555-0192' },
            { icon: MapPin, label: 'Greenhouse', value: '128 Fernwood Ave, Portland, OR' },
          ].map((c) => (
            <div key={c.label} className="card-surface p-5 flex items-center gap-4">
              <span className="w-11 h-11 rounded-full bg-forest-900/5 dark:bg-cream/10 flex items-center justify-center shrink-0">
                <c.icon size={18} className="text-forest-700 dark:text-gold-400" />
              </span>
              <div>
                <p className="text-xs text-forest-900/50 dark:text-cream/50">{c.label}</p>
                <p className="font-medium">{c.value}</p>
              </div>
            </div>
          ))}
          <div className="rounded-3xl overflow-hidden aspect-video shadow-soft">
            <img src="https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=700&q=80" alt="Greenhouse exterior" className="w-full h-full object-cover" />
          </div>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, x: 16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          onSubmit={submit}
          className="card-surface p-7 space-y-5"
        >
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="text-sm font-medium block mb-2">Name</label>
              <input name="name" value={form.name} onChange={onChange} className="input-field" placeholder="Jane Doe" />
            </div>
            <div>
              <label className="text-sm font-medium block mb-2">Email</label>
              <input name="email" type="email" value={form.email} onChange={onChange} className="input-field" placeholder="jane@email.com" />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium block mb-2">Message</label>
            <textarea name="message" value={form.message} onChange={onChange} rows={6} className="input-field resize-none" placeholder="How can we help?" />
          </div>
          <button disabled={submitting} className="btn-primary w-full disabled:opacity-60">
            {submitting ? 'Sending...' : <>Send Message <Send size={15} /></>}
          </button>
        </motion.form>
      </div>
    </div>
  )
}

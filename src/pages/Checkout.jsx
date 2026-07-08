import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { CheckCircle2, Lock, Truck, CreditCard } from 'lucide-react'
import Breadcrumbs from '../components/ui/Breadcrumbs.jsx'
import { useCart } from '../context/CartContext.jsx'
import { useToast } from '../context/ToastContext.jsx'

const steps = ['Shipping', 'Payment', 'Review']

export default function Checkout() {
  const { items, subtotal, clearCart } = useCart()
  const { showToast } = useToast()
  const navigate = useNavigate()
  const [step, setStep] = useState(0)
  const [placed, setPlaced] = useState(false)
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', address: '', city: '', state: '', zip: '',
    cardName: '', cardNumber: '', expiry: '', cvc: '',
  })

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })
  const shipping = subtotal > 75 || subtotal === 0 ? 0 : 8.5
  const tax = subtotal * 0.08
  const total = subtotal + shipping + tax

  if (items.length === 0 && !placed) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-24 text-center">
        <p className="text-6xl mb-6">🛒</p>
        <h1 className="text-2xl font-display mb-2">Nothing to check out</h1>
        <p className="text-forest-900/50 dark:text-cream/50 mb-8">Add a few plants to your cart first.</p>
        <Link to="/shop" className="btn-primary">Browse the Shop</Link>
      </div>
    )
  }

  const next = (e) => {
    e.preventDefault()
    if (step < 2) setStep(step + 1)
    else {
      clearCart()
      setPlaced(true)
      showToast('Order placed successfully!', 'success')
    }
  }

  if (placed) {
    return (
      <div className="max-w-lg mx-auto px-4 py-28 text-center">
        <motion.div initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
          <CheckCircle2 size={64} className="mx-auto text-forest-600 dark:text-gold-400 mb-6" />
        </motion.div>
        <h1 className="text-3xl font-display mb-3">Order confirmed</h1>
        <p className="text-forest-900/60 dark:text-cream/60 mb-8">
          Thank you, {form.firstName || 'friend'}! A confirmation has been sent to {form.email || 'your email'}.
          Your plants will begin their journey within 1-2 business days.
        </p>
        <Link to="/shop" className="btn-primary">Continue Shopping</Link>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Breadcrumbs items={[{ label: 'Cart', to: '/cart' }, { label: 'Checkout' }]} />
      <h1 className="text-3xl sm:text-4xl font-display mt-4">Checkout</h1>

      <div className="mt-6 flex items-center gap-3">
        {steps.map((s, i) => (
          <div key={s} className="flex items-center gap-3">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
              i <= step ? 'bg-forest-900 text-cream dark:bg-gold-500 dark:text-forest-950' : 'bg-forest-900/10 dark:bg-cream/10'
            }`}>{i + 1}</div>
            <span className={`text-sm font-medium hidden sm:inline ${i <= step ? '' : 'text-forest-900/40 dark:text-cream/40'}`}>{s}</span>
            {i < steps.length - 1 && <div className="w-8 sm:w-16 h-px bg-forest-900/15 dark:bg-cream/15" />}
          </div>
        ))}
      </div>

      <div className="mt-8 grid lg:grid-cols-[1fr_360px] gap-10">
        <form onSubmit={next} className="card-surface p-7 space-y-5">
          {step === 0 && (
            <>
              <h3 className="font-display text-xl flex items-center gap-2"><Truck size={18} /> Shipping Address</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <input required name="firstName" value={form.firstName} onChange={onChange} placeholder="First name" className="input-field" />
                <input required name="lastName" value={form.lastName} onChange={onChange} placeholder="Last name" className="input-field" />
              </div>
              <input required name="email" type="email" value={form.email} onChange={onChange} placeholder="Email address" className="input-field" />
              <input required name="address" value={form.address} onChange={onChange} placeholder="Street address" className="input-field" />
              <div className="grid sm:grid-cols-3 gap-4">
                <input required name="city" value={form.city} onChange={onChange} placeholder="City" className="input-field" />
                <input required name="state" value={form.state} onChange={onChange} placeholder="State" className="input-field" />
                <input required name="zip" value={form.zip} onChange={onChange} placeholder="ZIP code" className="input-field" />
              </div>
            </>
          )}
          {step === 1 && (
            <>
              <h3 className="font-display text-xl flex items-center gap-2"><CreditCard size={18} /> Payment Details</h3>
              <input required name="cardName" value={form.cardName} onChange={onChange} placeholder="Name on card" className="input-field" />
              <input required name="cardNumber" value={form.cardNumber} onChange={onChange} placeholder="Card number" maxLength={19} className="input-field" />
              <div className="grid grid-cols-2 gap-4">
                <input required name="expiry" value={form.expiry} onChange={onChange} placeholder="MM/YY" className="input-field" />
                <input required name="cvc" value={form.cvc} onChange={onChange} placeholder="CVC" maxLength={4} className="input-field" />
              </div>
              <p className="flex items-center gap-2 text-xs text-forest-900/40 dark:text-cream/40"><Lock size={12} /> Payments are encrypted and secure.</p>
            </>
          )}
          {step === 2 && (
            <>
              <h3 className="font-display text-xl">Review Your Order</h3>
              <div className="space-y-3">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center gap-3 text-sm">
                    <img src={item.images[0]} alt="" className="w-12 h-12 rounded-xl object-cover" />
                    <span className="flex-1">{item.name} &times; {item.qty}</span>
                    <span className="font-semibold">${(item.price * item.qty).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="text-sm text-forest-900/60 dark:text-cream/60 border-t border-forest-900/10 dark:border-cream/10 pt-4">
                <p>Shipping to: {form.address}, {form.city}, {form.state} {form.zip}</p>
                <p className="mt-1">Card ending in {form.cardNumber.slice(-4) || '••••'}</p>
              </div>
            </>
          )}
          <div className="flex gap-3 pt-2">
            {step > 0 && <button type="button" onClick={() => setStep(step - 1)} className="btn-secondary flex-1">Back</button>}
            <button type="submit" className="btn-primary flex-1">{step === 2 ? 'Place Order' : 'Continue'}</button>
          </div>
        </form>

        <div className="card-surface p-6 h-fit sticky top-24">
          <h3 className="font-display text-xl mb-5">Order Summary</h3>
          <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
            {items.map((item) => (
              <div key={item.id} className="flex items-center gap-3 text-sm">
                <img src={item.images[0]} alt="" className="w-10 h-10 rounded-lg object-cover" />
                <span className="flex-1 truncate">{item.name} &times;{item.qty}</span>
                <span className="font-medium">${(item.price * item.qty).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="border-t border-forest-900/10 dark:border-cream/10 mt-4 pt-4 space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-forest-900/60 dark:text-cream/60">Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
            <div className="flex justify-between"><span className="text-forest-900/60 dark:text-cream/60">Shipping</span><span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span></div>
            <div className="flex justify-between"><span className="text-forest-900/60 dark:text-cream/60">Tax</span><span>${tax.toFixed(2)}</span></div>
            <div className="flex justify-between font-semibold text-base border-t border-forest-900/10 dark:border-cream/10 pt-2"><span>Total</span><span>${total.toFixed(2)}</span></div>
          </div>
        </div>
      </div>
    </div>
  )
}

import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Leaf, Mail, Lock, User } from 'lucide-react'
import { useToast } from '../context/ToastContext.jsx'
import { useAuth } from '../context/AuthContext.jsx'

export default function Register() {
  const [form, setForm] = useState({ name: '', username: '', password: '' })
  const { showToast } = useToast()
  const { register } = useAuth()
  const navigate = useNavigate()

  const submit = (e) => {
    e.preventDefault()
    if (!form.name || !form.username || !form.password) {
      showToast('Please fill out every field', 'error')
      return
    }
    if (form.password.length < 6) {
      showToast('Password must be at least 6 characters', 'error')
      return
    }
    const result = register(form)
    if (!result.ok) return showToast(result.message, 'error')
    showToast('Account created — welcome to Verdant!', 'success')
    navigate('/')
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-16 bg-leaf-pattern">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md card-surface p-8"
      >
        <div className="flex flex-col items-center mb-6">
          <span className="w-11 h-11 rounded-full bg-forest-900 dark:bg-gold-500 flex items-center justify-center mb-3">
            <Leaf size={20} className="text-cream dark:text-forest-950" />
          </span>
          <h1 className="text-2xl font-display">Create your account</h1>
          <p className="text-sm text-forest-900/50 dark:text-cream/50 mt-1">Join thousands of happy plant parents</p>
        </div>
        <form onSubmit={submit} className="space-y-4">
          <div className="relative">
            <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 opacity-40" />
            <input placeholder="Full name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="input-field pl-11" />
          </div>
          <div className="relative">
            <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 opacity-40" />
            <input placeholder="Username" autoComplete="username" value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} className="input-field pl-11" />
          </div>
          <div className="relative">
            <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 opacity-40" />
            <input type="password" placeholder="Password" autoComplete="new-password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} className="input-field pl-11" />
          </div>
          <p className="text-xs text-forest-900/40 dark:text-cream/40">By signing up, you agree to our Terms of Service and Privacy Policy.</p>
          <button className="btn-primary w-full">Create Account</button>
        </form>
        <p className="text-center text-sm text-forest-900/50 dark:text-cream/50 mt-6">
          Already have an account? <Link to="/login" className="text-forest-700 dark:text-gold-400 font-medium">Sign in</Link>
        </p>
      </motion.div>
    </div>
  )
}

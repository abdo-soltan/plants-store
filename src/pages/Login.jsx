import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Leaf, Mail, Lock } from 'lucide-react'
import { useToast } from '../context/ToastContext.jsx'
import { useAuth } from '../context/AuthContext.jsx'

export default function Login() {
  const [form, setForm] = useState({ username: '', password: '' })
  const { showToast } = useToast()
  const { login } = useAuth()
  const navigate = useNavigate()

  const submit = (e) => {
    e.preventDefault()
    if (!form.username || !form.password) {
      showToast('Please enter your username and password', 'error')
      return
    }
    const result = login(form)
    if (!result.ok) return showToast(result.message, 'error')
    showToast(`Welcome back, ${result.user.name}!`, 'success')
    navigate(result.user.role === 'admin' ? '/admin' : '/')
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
          <h1 className="text-2xl font-display">Welcome back</h1>
          <p className="text-sm text-forest-900/50 dark:text-cream/50 mt-1">Sign in to your Verdant account</p>
        </div>
        <form onSubmit={submit} className="space-y-4">
          <div className="relative">
            <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 opacity-40" />
            <input placeholder="Username" autoComplete="username" value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} className="input-field pl-11" />
          </div>
          <div className="relative">
            <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 opacity-40" />
            <input type="password" placeholder="Password" autoComplete="current-password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} className="input-field pl-11" />
          </div>
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2"><input type="checkbox" className="accent-forest-700" /> Remember me</label>
            <a href="#" className="text-forest-700 dark:text-gold-400 font-medium">Forgot password?</a>
          </div>
          <button className="btn-primary w-full">Sign In</button>
        </form>
        <p className="text-center text-sm text-forest-900/50 dark:text-cream/50 mt-6">
          New to Verdant? <Link to="/register" className="text-forest-700 dark:text-gold-400 font-medium">Create an account</Link>
        </p>
      </motion.div>
    </div>
  )
}

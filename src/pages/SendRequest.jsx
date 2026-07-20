import { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { Send } from 'lucide-react'
import { useAuth } from '../context/AuthContext.jsx'
import { useRequests } from '../context/RequestContext.jsx'
import { useToast } from '../context/ToastContext.jsx'

export default function SendRequest() {
  const { user } = useAuth()
  const { sendRequest } = useRequests()
  const { showToast } = useToast()
  const [form, setForm] = useState({ subject: '', message: '' })

  if (!user) return <Navigate to="/login" replace />
  if (user.role === 'admin') return <Navigate to="/admin" replace />

  const submit = (event) => {
    event.preventDefault()
    if (!form.subject.trim() || !form.message.trim()) return showToast('Please write a subject and message.', 'error')
    sendRequest({ ...form, user })
    setForm({ subject: '', message: '' })
    showToast('Your request was sent to the administrator.', 'success')
  }

  return <main className="max-w-xl mx-auto px-4 py-16"><section className="card-surface p-7 sm:p-9"><div className="w-11 h-11 rounded-full bg-forest-900 text-cream flex items-center justify-center mb-4"><Send size={19} /></div><h1 className="text-3xl font-display">Send a request</h1><p className="mt-2 text-sm text-forest-900/55 dark:text-cream/55">Your message will appear in the administrator dashboard.</p><form onSubmit={submit} className="space-y-4 mt-7"><input className="input-field" placeholder="Subject" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} /><textarea className="input-field min-h-36" placeholder="How can the administrator help?" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} /><button className="btn-primary w-full"><Send size={16} /> Send request</button></form></section></main>
}

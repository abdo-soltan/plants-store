import { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { PackagePlus, Trash2, Inbox, Check } from 'lucide-react'
import { categories } from '../data/products.js'
import { useAuth } from '../context/AuthContext.jsx'
import { useProducts } from '../context/ProductContext.jsx'
import { useRequests } from '../context/RequestContext.jsx'
import { useToast } from '../context/ToastContext.jsx'

const initialForm = {
  name: '', category: 'indoor', price: '', stock: '', description: '', image: '', light: '', water: '', difficulty: 'Easy',
}

export default function Admin() {
  const { user } = useAuth()
  const { products, addProduct, deleteProduct } = useProducts()
  const { requests, setRequestStatus, deleteRequest } = useRequests()
  const { showToast } = useToast()
  const [form, setForm] = useState(initialForm)

  if (!user || user.role !== 'admin') return <Navigate to="/login" replace />

  const submit = (event) => {
    event.preventDefault()
    if (!form.name || !form.price || !form.stock || !form.description) {
      showToast('Please complete the required product fields.', 'error')
      return
    }
    if (Number(form.price) < 0 || Number(form.stock) < 0) {
      showToast('Price and stock cannot be negative.', 'error')
      return
    }
    addProduct(form)
    setForm(initialForm)
    showToast('Product added to the store.', 'success')
  }

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex items-center gap-3 mb-10">
        <span className="w-11 h-11 rounded-2xl bg-forest-900 text-cream flex items-center justify-center"><PackagePlus size={21} /></span>
        <div><p className="text-sm text-forest-900/50 dark:text-cream/50">Administrator</p><h1 className="text-3xl font-display">Store dashboard</h1></div>
      </div>

      <div className="grid xl:grid-cols-[420px_1fr] gap-8 items-start">
        <section className="card-surface p-6 sm:p-7">
          <h2 className="font-display text-xl">Add a product</h2>
          <p className="text-sm text-forest-900/55 dark:text-cream/55 mt-1">Only admins can publish products.</p>
          <form onSubmit={submit} className="space-y-4 mt-6">
            <input className="input-field" placeholder="Product name *" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            <select className="input-field" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
              {categories.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}
            </select>
            <div className="grid grid-cols-2 gap-3">
              <input className="input-field" type="number" min="0" step="0.01" placeholder="Price *" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
              <input className="input-field" type="number" min="0" step="1" placeholder="Stock *" value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })} />
            </div>
            <input className="input-field" type="url" placeholder="Image URL (optional)" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} />
            <textarea className="input-field min-h-28" placeholder="Description *" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
            <div className="grid grid-cols-2 gap-3">
              <input className="input-field" placeholder="Light needs" value={form.light} onChange={(e) => setForm({ ...form, light: e.target.value })} />
              <input className="input-field" placeholder="Watering" value={form.water} onChange={(e) => setForm({ ...form, water: e.target.value })} />
            </div>
            <select className="input-field" value={form.difficulty} onChange={(e) => setForm({ ...form, difficulty: e.target.value })}>
              {['Very Easy', 'Easy', 'Moderate', 'Advanced'].map((difficulty) => <option key={difficulty}>{difficulty}</option>)}
            </select>
            <button className="btn-primary w-full"><PackagePlus size={17} /> Publish product</button>
          </form>
        </section>

        <div className="space-y-8">
          <section className="card-surface p-6 sm:p-7">
            <div className="flex items-center justify-between gap-3 mb-5"><h2 className="font-display text-xl">Products</h2><span className="text-sm text-forest-900/50 dark:text-cream/50">{products.length} total</span></div>
            {products.length === 0 ? <p className="text-sm text-forest-900/55 dark:text-cream/55 py-5">There are no published products yet.</p> : (
              <div className="divide-y divide-forest-900/10 dark:divide-cream/10">
                {products.map((product) => <div key={product.id} className="flex items-center gap-4 py-3">
                  <img src={product.images[0]} alt="" className="w-12 h-12 rounded-xl object-cover bg-forest-100" />
                  <div className="min-w-0 flex-1"><p className="font-medium truncate">{product.name}</p><p className="text-sm text-forest-900/50 dark:text-cream/50">${product.price.toFixed(2)} · {product.stock} in stock</p></div>
                  <button onClick={() => { deleteProduct(product.id); showToast('Product removed.', 'success') }} className="w-10 h-10 rounded-full text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 flex items-center justify-center" aria-label={`Delete ${product.name}`}><Trash2 size={17} /></button>
                </div>)}
              </div>
            )}
          </section>

          <section className="card-surface p-6 sm:p-7">
            <div className="flex items-center gap-3 mb-5"><Inbox size={19} /><div><h2 className="font-display text-xl">User requests</h2><p className="text-sm text-forest-900/55 dark:text-cream/55">Messages sent by regular accounts.</p></div></div>
            {requests.length === 0 ? <p className="text-sm text-forest-900/55 dark:text-cream/55 py-5">No user requests yet.</p> : <div className="space-y-4">
              {requests.map((request) => <article key={request.id} className="rounded-2xl bg-forest-50 dark:bg-forest-900/50 p-4">
                <div className="flex justify-between gap-4"><div><p className="font-medium">{request.subject}</p><p className="text-xs text-forest-900/55 dark:text-cream/55 mt-0.5">From {request.name} (@{request.username}) · {new Date(request.createdAt).toLocaleString()}</p></div><span className="text-xs font-semibold shrink-0">{request.status}</span></div>
                <p className="text-sm mt-3 text-forest-900/70 dark:text-cream/70 whitespace-pre-wrap">{request.message}</p>
                <div className="flex gap-2 mt-4"><button onClick={() => setRequestStatus(request.id, 'Resolved')} className="btn-secondary py-2 px-3 text-xs"><Check size={14} /> Mark resolved</button><button onClick={() => deleteRequest(request.id)} className="btn-secondary py-2 px-3 text-xs text-red-600">Delete</button></div>
              </article>)}
            </div>}
          </section>
        </div>
      </div>
    </main>
  )
}

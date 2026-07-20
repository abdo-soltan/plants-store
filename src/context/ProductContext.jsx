import { createContext, useContext, useEffect, useState } from 'react'

const ProductContext = createContext()
const PRODUCTS_KEY = 'plants_store_products_v2'

function loadProducts() {
  try {
    const saved = JSON.parse(localStorage.getItem(PRODUCTS_KEY))
    return Array.isArray(saved) ? saved : []
  } catch {
    return []
  }
}

export function ProductProvider({ children }) {
  const [products, setProducts] = useState(loadProducts)

  useEffect(() => localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products)), [products])

  const addProduct = (form) => {
    const slug = `${form.name.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}-${Date.now().toString().slice(-6)}`
    const product = {
      id: crypto.randomUUID(),
      name: form.name.trim(),
      slug,
      category: form.category,
      price: Number(form.price),
      stock: Number(form.stock),
      description: form.description.trim(),
      images: [form.image.trim() || 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=800&q=80'],
      care: { light: form.light.trim() || 'Not specified', water: form.water.trim() || 'Not specified', difficulty: form.difficulty },
      tags: [],
      createdAt: new Date().toISOString(),
    }
    setProducts((current) => [product, ...current])
    return product
  }

  const deleteProduct = (id) => setProducts((current) => current.filter((product) => product.id !== id))
  const getProductBySlug = (slug) => products.find((product) => product.slug === slug)
  const getRelated = (product, count = 4) => products.filter((item) => item.category === product.category && item.id !== product.id).slice(0, count)

  return <ProductContext.Provider value={{ products, addProduct, deleteProduct, getProductBySlug, getRelated }}>{children}</ProductContext.Provider>
}

export const useProducts = () => useContext(ProductContext)

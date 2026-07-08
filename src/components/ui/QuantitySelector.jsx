import { Minus, Plus } from 'lucide-react'

export default function QuantitySelector({ qty, setQty, max = 99, size = 'md' }) {
  const pad = size === 'sm' ? 'px-3 py-1.5' : 'px-4 py-2.5'
  return (
    <div className="inline-flex items-center rounded-full border border-forest-900/15 dark:border-cream/15 overflow-hidden">
      <button
        type="button"
        onClick={() => setQty(Math.max(1, qty - 1))}
        className={`${pad} hover:bg-forest-900/5 dark:hover:bg-cream/10 transition-colors`}
        aria-label="Decrease quantity"
      >
        <Minus size={14} />
      </button>
      <span className="px-3 min-w-[2.5rem] text-center text-sm font-semibold tabular-nums">{qty}</span>
      <button
        type="button"
        onClick={() => setQty(Math.min(max, qty + 1))}
        className={`${pad} hover:bg-forest-900/5 dark:hover:bg-cream/10 transition-colors`}
        aria-label="Increase quantity"
      >
        <Plus size={14} />
      </button>
    </div>
  )
}

export default function Badge({ children, tone = 'forest' }) {
  const tones = {
    forest: 'bg-forest-900 text-cream',
    gold: 'bg-gold-500 text-forest-950',
    sage: 'bg-sage-100 text-sage-800 dark:bg-sage-800 dark:text-sage-100',
    outline: 'border border-forest-900/20 text-forest-900 dark:border-cream/20 dark:text-cream',
    red: 'bg-red-500 text-white',
  }
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-semibold tracking-wide uppercase ${tones[tone]}`}>
      {children}
    </span>
  )
}

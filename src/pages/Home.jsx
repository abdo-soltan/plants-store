import Hero from '../components/home/Hero.jsx'
import CategoryShowcase from '../components/home/CategoryShowcase.jsx'
import ProductRail from '../components/home/ProductRail.jsx'
import FAQ from '../components/home/FAQ.jsx'
import Newsletter from '../components/home/Newsletter.jsx'
import { useProducts } from '../context/ProductContext.jsx'

export default function Home() {
  const { products } = useProducts()
  const featured = products.slice(0, 8)
  const bestSellers = products.filter((product) => product.tags.includes('bestseller'))
  const newArrivals = products.slice(0, 8)
  return (
    <div>
      <Hero />
      <CategoryShowcase />
      <ProductRail
        eyebrow="Handpicked"
        title="Featured plants"
        subtitle="A rotating edit of the healthiest, most photogenic plants in our greenhouse right now."
        products={featured}
        viewAllHref="/shop"
      />
      <div className="bg-forest-50 dark:bg-forest-900/30">
        <ProductRail
          eyebrow="Customer favorites"
          title="Best sellers"
          subtitle="The plants our community keeps coming back for, season after season."
          products={bestSellers.length ? bestSellers.concat(newArrivals).slice(0, 8) : newArrivals}
          viewAllHref="/shop?sort=bestseller"
        />
      </div>
      <ProductRail
        eyebrow="Just landed"
        title="New arrivals"
        subtitle="Fresh from the growers — the newest additions to the Verdant collection."
        products={newArrivals}
        viewAllHref="/shop?sort=new"
      />
      <FAQ />
      <Newsletter />
    </div>
  )
}

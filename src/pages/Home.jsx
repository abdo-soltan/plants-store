import Hero from '../components/home/Hero.jsx'
import CategoryShowcase from '../components/home/CategoryShowcase.jsx'
import ProductRail from '../components/home/ProductRail.jsx'
import Testimonials from '../components/home/Testimonials.jsx'
import FAQ from '../components/home/FAQ.jsx'
import Newsletter from '../components/home/Newsletter.jsx'
import { featured, bestSellers, newArrivals } from '../data/products.js'

export default function Home() {
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
      <Testimonials />
      <FAQ />
      <Newsletter />
    </div>
  )
}

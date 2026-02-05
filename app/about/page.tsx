import { Navigation } from '@/components/Navigation';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-sand-light pt-20">
      <Navigation />

      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="text-center mb-16 animate-fade-in-up">
          <p className="text-terracotta text-sm tracking-[0.2em] uppercase mb-4">
            About
          </p>
          <h1 className="font-editorial text-4xl md:text-6xl font-semibold text-charcoal mb-4">
            Our Story
          </h1>
          <p className="font-editorial text-xl md:text-2xl text-charcoal/60" dir="rtl">
            قصتنا
          </p>
        </div>

        <div className="prose prose-lg max-w-none animate-fade-in-up">
          <div className="relative mb-12">
            <img
              src="https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?w=1200&q=80"
              alt="Moroccan spices"
              className="w-full h-64 md:h-96 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-sand-light via-transparent to-transparent" />
          </div>

          <p className="drop-cap text-lg text-charcoal/80 leading-relaxed mb-6">
            Welcome to Chaimae's Moroccan Recipes, a culinary journey through the rich 
            and diverse flavors of Morocco. Here, we celebrate the authentic traditions 
            of Moroccan cooking, passed down through generations of home cooks and chefs 
            who understand that food is not just sustenance—it's an expression of love, 
            hospitality, and cultural identity.
          </p>

          <h2 className="font-editorial text-2xl font-semibold text-charcoal mt-12 mb-4 editorial-underline">
            The Heart of Moroccan Cuisine
          </h2>

          <p className="text-charcoal/80 leading-relaxed mb-6">
            Moroccan cuisine is a beautiful tapestry woven from Berber, Arab, Mediterranean, 
            and African influences. It's characterized by the delicate balance of sweet and 
            savory, the generous use of aromatic spices like saffron, cumin, and cinnamon, 
            and the slow-cooking techniques that allow flavors to meld and deepen.
          </p>

          <p className="text-charcoal/80 leading-relaxed mb-6">
            From the iconic tagine—a conical clay pot that creates the most tender, 
            flavorful stews—to the elaborate pastilla that graces special occasions, 
            each dish tells a story of place and time. The Friday couscous, prepared 
            with love and shared with family, represents the soul of Moroccan hospitality.
          </p>

          <h2 className="font-editorial text-2xl font-semibold text-charcoal mt-12 mb-4 editorial-underline">
            A Personal Journey
          </h2>

          <p className="text-charcoal/80 leading-relaxed mb-6">
            This collection of recipes is deeply personal. Each recipe has been tested 
            in home kitchens, adjusted for modern cooks while honoring traditional techniques. 
            Whether you're making your first tagine or perfecting your couscous steaming 
            technique, these recipes will guide you with clear instructions and helpful tips.
          </p>

          <div className="bg-white p-8 shadow-lg my-12">
            <blockquote className="font-editorial text-xl italic text-charcoal text-center">
              "The first glass is as soft as life,<br />
              The second as strong as love,<br />
              The third as gentle as death."
            </blockquote>
            <cite className="block text-center text-charcoal/60 mt-4 text-sm">
              — Moroccan proverb about tea
            </cite>
          </div>

          <h2 className="font-editorial text-2xl font-semibold text-charcoal mt-12 mb-4 editorial-underline">
            Join the Journey
          </h2>

          <p className="text-charcoal/80 leading-relaxed mb-8">
            Whether you're a curious beginner or an experienced cook looking to expand 
            your culinary horizons, these recipes invite you to explore the warmth and 
            richness of Moroccan cuisine. Gather your ingredients, invite your loved ones, 
            and create memories around the table.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
            <Link
              href="/recipes"
              className="btn-primary inline-flex items-center justify-center gap-2"
            >
              Explore Recipes
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      <footer className="bg-charcoal text-white/60 py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p>© 2026 Chaimae's Moroccan Recipes</p>
        </div>
      </footer>
    </main>
  );
}
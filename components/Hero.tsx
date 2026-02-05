'use client';

import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import Link from 'next/link';

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1541518763669-27fef04b14ea?w=1920&q=80')`,
        }}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal/40 via-charcoal/50 to-charcoal/80" />

      {/* Decorative Elements */}
      <div className="absolute top-1/4 left-10 w-32 h-32 border border-white/20 rotate-45 hidden lg:block" />
      <div className="absolute bottom-1/3 right-16 w-24 h-24 border border-terracotta/40 rotate-12 hidden lg:block" />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center text-white">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-saffron text-sm md:text-base tracking-[0.3em] uppercase mb-6"
        >
          Authentic Moroccan Cuisine
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-editorial text-5xl md:text-7xl lg:text-8xl font-semibold mb-4 leading-tight"
        >
          Chaimae's
          <br />
          <span className="italic text-saffron">Recipes</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="font-editorial text-2xl md:text-4xl mb-4"
          dir="rtl"
        >
          وصفات شيماء
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto mb-10 font-light"
        >
          Discover the rich flavors of Morocco through authentic recipes 
          passed down through generations. From fragrant tagines to sweet pastilla.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            href="/recipes"
            className="btn-primary inline-block"
          >
            Explore Recipes
          </Link>
          
          <Link
            href="/about"
            className="inline-block px-8 py-4 border border-white/30 text-white hover:bg-white/10 transition-colors"
          >
            Our Story
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center text-white/60"
          >
            <span className="text-xs uppercase tracking-widest mb-2">Scroll</span>
            <ChevronDown size={20} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
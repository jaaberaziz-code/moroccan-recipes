'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { href: '/', label: 'Home', labelAr: 'الرئيسية' },
    { href: '/recipes', label: 'Recipes', labelAr: 'الوصفات' },
    { href: '/about', label: 'About', labelAr: 'عن شيماء' },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-charcoal/5"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-terracotta flex items-center justify-center">
              <span className="text-white font-editorial text-xl">C</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="font-editorial text-xl font-semibold text-charcoal">
                Chaimae's
              </h1>
              <p className="text-xs text-charcoal/60 -mt-1">وصفات شيماء</p>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="nav-link text-sm font-medium text-charcoal/70 hover:text-charcoal transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-charcoal"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-charcoal/10"
          >
            <nav className="flex flex-col py-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-3 text-charcoal hover:bg-sand/50 transition-colors"
                >
                  <span className="block font-medium">{link.label}</span>
                  <span className="block text-sm text-charcoal/50">{link.labelAr}</span>
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </div>
    </motion.header>
  );
}
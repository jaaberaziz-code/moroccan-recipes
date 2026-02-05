'use client';

import Link from 'next/link';
import { Menu, X, Search } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Logo } from './Logo';

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/', label: 'Home', labelAr: 'الرئيسية' },
    { href: '/recipes', label: 'Recipes', labelAr: 'الوصفات' },
    { href: '/about', label: 'About', labelAr: 'عن شيماء' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-lg shadow-lg' 
          : 'bg-white/80 backdrop-blur-md'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link href="/" className="flex items-center">
            <Logo size="sm" />
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 rounded-full text-sm font-medium text-charcoal/70 hover:text-charcoal hover:bg-sand/50 transition-all"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/recipes"
              className="ml-2 p-2 rounded-full bg-terracotta/10 text-terracotta hover:bg-terracotta hover:text-white transition-all"
              aria-label="Search recipes"
            >
              <Search size={20} />
            </Link>
          </nav>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-full text-charcoal hover:bg-sand/50 transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ${
            isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <nav className="py-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-between px-4 py-3 rounded-xl text-charcoal hover:bg-sand/50 transition-colors"
              >
                <span className="font-medium">{link.label}</span>
                <span className="text-sm text-charcoal/50" dir="rtl">{link.labelAr}</span>
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}

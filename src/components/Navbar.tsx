import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from './Logo';
import { useCart } from '../context/CartContext';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Shop', href: '/#shop' },
  { label: 'About', href: '/#about' },
];

export default function Navbar() {
  const { totalItems, openCart } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-brand-black/95 backdrop-blur-sm shadow-lg shadow-black/30' : 'bg-transparent'
      }`}
    >
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-12 h-16 flex items-center justify-between">
        <Link to="/">
          <Logo size="sm" white />
        </Link>

        <nav className="hidden md:flex items-center gap-10">
          {navLinks.map(link => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-body font-medium tracking-widest text-white/70 hover:text-white transition-colors duration-200 uppercase"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          {location.pathname === '/' && (
            <button
              onClick={openCart}
              className="relative p-2 text-white/70 hover:text-white transition-colors"
              aria-label="Open cart"
            >
              <ShoppingCart size={22} />
              {totalItems > 0 && (
                <motion.span
                  key={totalItems}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-white text-brand-black text-xs font-bold rounded-full flex items-center justify-center font-body"
                >
                  {totalItems}
                </motion.span>
              )}
            </button>
          )}
          <button
            className="md:hidden p-2 text-white/70 hover:text-white transition-colors"
            onClick={() => setMobileOpen(v => !v)}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-brand-black border-t border-white/10"
          >
            <div className="px-6 py-4 flex flex-col gap-4">
              {navLinks.map(link => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-sm font-body font-medium tracking-widest text-white/70 hover:text-white transition-colors uppercase"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

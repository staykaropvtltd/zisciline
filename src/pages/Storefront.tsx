import { useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { mockProducts } from '../data/products';
import ProductCard from '../components/ProductCard';
import CartSidebar from '../components/CartSidebar';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-brand-black">
      {/* Diagonal line texture */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `repeating-linear-gradient(
            -45deg,
            #ffffff,
            #ffffff 1px,
            transparent 1px,
            transparent 60px
          )`,
        }}
      />
      {/* Radial gradient overlay */}
      <div className="absolute inset-0 bg-radial-dark" />
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 60%, rgba(46,46,46,0.5) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-6"
        >
          <span className="font-body text-white/40 text-xs tracking-[0.4em] uppercase border border-white/15 px-5 py-2 rounded-full">
            New Collection 2026
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="font-heading text-white leading-none mb-6"
          style={{
            fontSize: 'clamp(4rem, 12vw, 10rem)',
            fontFamily: '"Bebas Neue", cursive',
            letterSpacing: '0.05em',
          }}
        >
          TRAIN WITHOUT
          <br />
          <span className="text-white/20">LIMITS</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="font-body text-white/50 text-lg max-w-xl mx-auto leading-relaxed mb-10"
        >
          Performance sportswear engineered for those who push beyond the ordinary.
          Built to move. Made to last.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href="#shop"
            className="inline-flex items-center gap-3 bg-white text-brand-black font-body font-bold text-sm tracking-[0.2em] uppercase px-10 py-4 rounded-full hover:bg-white/90 transition-all duration-200 shadow-lg shadow-white/10"
          >
            Shop Now
            <ArrowDown size={15} />
          </a>
          <a
            href="#about"
            className="inline-flex items-center gap-3 border border-white/20 text-white font-body font-medium text-sm tracking-[0.2em] uppercase px-10 py-4 rounded-full hover:bg-white/5 transition-all duration-200"
          >
            Our Story
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
          className="w-px h-12 bg-gradient-to-b from-white/40 to-transparent"
        />
      </motion.div>
    </section>
  );
}

function ProductsSection() {
  return (
    <section id="shop" className="bg-brand-black py-24 lg:py-32">
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <p className="font-body text-white/30 text-xs tracking-[0.4em] uppercase mb-3">
            The Collection
          </p>
          <h2
            className="font-heading text-white"
            style={{
              fontSize: 'clamp(2.5rem, 6vw, 5rem)',
              fontFamily: '"Bebas Neue", cursive',
              letterSpacing: '0.05em',
              lineHeight: 1,
            }}
          >
            NEW DROPS
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-5">
          {mockProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section id="about" className="bg-brand-charcoal py-24 lg:py-32 relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `repeating-linear-gradient(
            45deg,
            #ffffff,
            #ffffff 1px,
            transparent 1px,
            transparent 80px
          )`,
        }}
      />
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="font-body text-white/30 text-xs tracking-[0.4em] uppercase mb-4">
              About Us
            </p>
            <h2
              className="font-heading text-white mb-6"
              style={{
                fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
                fontFamily: '"Bebas Neue", cursive',
                letterSpacing: '0.05em',
                lineHeight: 1,
              }}
            >
              BUILT FOR
              <br />
              ATHLETES
            </h2>
            <p className="font-body text-white/50 leading-relaxed text-base mb-6">
              Zisciline was founded on one principle — performance should never be compromised for style.
              Every piece in our collection is engineered with athletes in mind, tested in real conditions,
              and designed to move exactly the way you do.
            </p>
            <p className="font-body text-white/40 leading-relaxed text-sm">
              From marathon training to daily gym sessions, our sportswear delivers the confidence
              to push past your limits — every single day.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="grid grid-cols-2 gap-4"
          >
            {[
              { number: '50K+', label: 'Athletes' },
              { number: '12', label: 'Collections' },
              { number: '4.9', label: 'Avg Rating' },
              { number: '100%', label: 'Performance Tested' },
            ].map(stat => (
              <div key={stat.label} className="bg-brand-accent rounded-xl p-6 border border-white/5">
                <div
                  className="font-heading text-white"
                  style={{
                    fontSize: '2.5rem',
                    fontFamily: '"Bebas Neue", cursive',
                    letterSpacing: '0.05em',
                  }}
                >
                  {stat.number}
                </div>
                <div className="font-body text-white/40 text-xs tracking-widest uppercase mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default function Storefront() {
  return (
    <div className="bg-brand-black min-h-screen font-body">
      <Navbar />
      <CartSidebar />
      <HeroSection />
      <ProductsSection />
      <AboutSection />
      <Footer />
    </div>
  );
}

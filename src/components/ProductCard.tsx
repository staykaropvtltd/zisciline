import { motion } from 'framer-motion';
import { ShoppingCart } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
  index: number;
}

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: 'easeOut' },
  }),
};

export default function ProductCard({ product, index }: ProductCardProps) {
  const { addItem } = useCart();

  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      className="group bg-brand-charcoal rounded-xl overflow-hidden flex flex-col cursor-pointer"
    >
      <div className="relative overflow-hidden aspect-[3/4] bg-brand-accent">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <span className="absolute top-3 left-3 bg-white/10 backdrop-blur-sm text-white/80 text-xs font-body tracking-widest uppercase px-2.5 py-1 rounded-full border border-white/10">
          {product.category}
        </span>
      </div>

      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-body font-semibold text-white text-base leading-snug">
          {product.name}
        </h3>
        <p className="font-body text-white/40 text-xs mt-1.5 leading-relaxed flex-1">
          {product.description}
        </p>

        <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/10">
          <span className="font-body font-bold text-white text-lg">
            ₹{product.price.toLocaleString('en-IN')}
          </span>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => addItem(product)}
            className="flex items-center gap-2 bg-white text-brand-black text-xs font-body font-bold tracking-widest uppercase px-4 py-2.5 rounded-lg hover:bg-white/90 transition-colors"
          >
            <ShoppingCart size={14} />
            Add
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

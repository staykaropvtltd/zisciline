import { useState } from 'react';
import { X, Plus, Minus, ShoppingBag, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';

export default function CartSidebar() {
  const { items, isOpen, closeCart, updateQuantity, removeItem, totalPrice } = useCart();
  const [ordered, setOrdered] = useState(false);

  const handleOrder = () => {
    setOrdered(true);
    setTimeout(() => setOrdered(false), 3000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-black/70 z-40 backdrop-blur-sm"
          />
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 260 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-brand-charcoal z-50 flex flex-col shadow-2xl"
          >
            <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
              <div className="flex items-center gap-3">
                <ShoppingBag size={20} className="text-white" />
                <span className="font-heading text-xl tracking-widest text-white">YOUR CART</span>
              </div>
              <button
                onClick={closeCart}
                className="p-2 text-white/50 hover:text-white transition-colors rounded-full hover:bg-white/5"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-4 text-white/30">
                  <ShoppingBag size={48} strokeWidth={1} />
                  <p className="font-body text-sm tracking-widest uppercase">Cart is empty</p>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  {items.map(item => (
                    <motion.div
                      key={item.product.id}
                      layout
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="flex gap-4 bg-brand-accent rounded-lg p-4"
                    >
                      <img
                        src={item.product.imageUrl}
                        alt={item.product.name}
                        className="w-20 h-20 object-cover rounded-md flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-body font-semibold text-white text-sm leading-tight truncate">
                          {item.product.name}
                        </p>
                        <p className="font-body text-xs text-white/40 mt-0.5 tracking-wide">
                          {item.product.category}
                        </p>
                        <p className="font-body font-bold text-white mt-2 text-sm">
                          ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                        </p>
                        <div className="flex items-center gap-3 mt-3">
                          <div className="flex items-center gap-2 bg-brand-black rounded-full px-2 py-1">
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                              className="w-6 h-6 flex items-center justify-center text-white/70 hover:text-white transition-colors"
                            >
                              <Minus size={12} />
                            </button>
                            <span className="font-body text-sm text-white w-4 text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                              className="w-6 h-6 flex items-center justify-center text-white/70 hover:text-white transition-colors"
                            >
                              <Plus size={12} />
                            </button>
                          </div>
                          <button
                            onClick={() => removeItem(item.product.id)}
                            className="text-xs text-white/30 hover:text-red-400 transition-colors font-body tracking-wide"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {items.length > 0 && (
              <div className="px-6 py-5 border-t border-white/10 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="font-body text-white/60 text-sm tracking-wide">Total</span>
                  <span className="font-body font-bold text-white text-lg">
                    ₹{totalPrice.toLocaleString('en-IN')}
                  </span>
                </div>

                <AnimatePresence mode="wait">
                  {ordered ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex items-center justify-center gap-2 bg-green-500/20 border border-green-500/30 rounded-lg py-3"
                    >
                      <CheckCircle size={18} className="text-green-400" />
                      <span className="font-body text-green-400 text-sm font-medium">
                        Order placed successfully!
                      </span>
                    </motion.div>
                  ) : (
                    <motion.button
                      key="button"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      onClick={handleOrder}
                      className="w-full bg-white text-brand-black font-body font-bold text-sm tracking-widest uppercase py-4 rounded-lg hover:bg-white/90 active:scale-98 transition-all duration-200"
                    >
                      Place Order
                    </motion.button>
                  )}
                </AnimatePresence>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

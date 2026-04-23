import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, LayoutDashboard, Package, ShoppingBag, ChevronRight, CheckCircle } from 'lucide-react';
import { Product, Order, OrderStatus } from '../types';
import { mockProducts } from '../data/products';
import { mockOrders } from '../data/orders';
import Logo from '../components/Logo';

const statusConfig: Record<OrderStatus, { label: string; bg: string; text: string; dot: string }> = {
  Pending: {
    label: 'Pending',
    bg: 'bg-yellow-500/10',
    text: 'text-yellow-400',
    dot: 'bg-yellow-400',
  },
  Processing: {
    label: 'Processing',
    bg: 'bg-blue-500/10',
    text: 'text-blue-400',
    dot: 'bg-blue-400',
  },
  Shipped: {
    label: 'Shipped',
    bg: 'bg-green-500/10',
    text: 'text-green-400',
    dot: 'bg-green-400',
  },
};

const categories = ['T-Shirts', 'Tracks', 'Shorts', 'Jackets'] as const;
type Category = typeof categories[number];

function Sidebar({ active }: { active: 'products' | 'orders' }) {
  return (
    <aside className="w-60 xl:w-72 bg-brand-charcoal border-r border-white/5 flex flex-col min-h-screen sticky top-0">
      <div className="px-6 py-7 border-b border-white/5">
        <Link to="/">
          <Logo size="sm" white />
        </Link>
        <p className="font-body text-white/20 text-xs tracking-widest uppercase mt-3">
          Admin Dashboard
        </p>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-1">
        {[
          { id: 'products', label: 'Products', icon: Package, href: '#products' },
          { id: 'orders', label: 'Orders', icon: ShoppingBag, href: '#orders' },
        ].map(item => (
          <a
            key={item.id}
            href={item.href}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all font-body text-sm font-medium tracking-wide ${
              active === item.id
                ? 'bg-white text-brand-black'
                : 'text-white/50 hover:text-white hover:bg-white/5'
            }`}
          >
            <item.icon size={16} />
            {item.label}
          </a>
        ))}
      </nav>

      <div className="px-6 py-6 border-t border-white/5">
        <Link
          to="/"
          className="flex items-center gap-2 font-body text-xs text-white/30 hover:text-white/60 transition-colors tracking-widest uppercase"
        >
          <ChevronRight size={12} />
          View Store
        </Link>
      </div>
    </aside>
  );
}

function AddProductForm({ onAdd }: { onAdd: (p: Product) => void }) {
  const [form, setForm] = useState({
    name: '',
    category: 'T-Shirts' as Category,
    price: '',
    description: '',
    imageUrl: '',
  });
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.price) return;
    const newProduct: Product = {
      id: `p-${Date.now()}`,
      name: form.name,
      category: form.category,
      price: parseInt(form.price, 10),
      description: form.description,
      imageUrl: form.imageUrl || 'https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?auto=compress&cs=tinysrgb&w=600',
    };
    onAdd(newProduct);
    setForm({ name: '', category: 'T-Shirts', price: '', description: '', imageUrl: '' });
    setSuccess(true);
    setTimeout(() => setSuccess(false), 2500);
  };

  const inputClass =
    'w-full bg-brand-charcoal border border-white/10 rounded-lg px-4 py-3 text-white text-sm font-body placeholder-white/20 focus:outline-none focus:border-white/30 transition-colors';

  return (
    <div id="products" className="bg-white rounded-2xl p-8 shadow-sm">
      <div className="flex items-center gap-3 mb-7">
        <div className="w-8 h-8 bg-brand-black rounded-lg flex items-center justify-center">
          <Plus size={16} className="text-white" />
        </div>
        <div>
          <h2 className="font-heading text-brand-black text-2xl tracking-widest" style={{ fontFamily: '"Bebas Neue", cursive' }}>
            ADD PRODUCT
          </h2>
          <p className="font-body text-gray-400 text-xs tracking-wide">
            Fill in the details to list a new item
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="block font-body text-xs font-semibold text-gray-500 tracking-widest uppercase mb-2">
            Product Name *
          </label>
          <input
            type="text"
            required
            placeholder="e.g. Apex Performance Tee"
            value={form.name}
            onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
            className={inputClass}
          />
        </div>

        <div>
          <label className="block font-body text-xs font-semibold text-gray-500 tracking-widest uppercase mb-2">
            Category *
          </label>
          <select
            value={form.category}
            onChange={e => setForm(f => ({ ...f, category: e.target.value as Category }))}
            className={inputClass}
          >
            {categories.map(c => (
              <option key={c} value={c} className="bg-brand-black">
                {c}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-body text-xs font-semibold text-gray-500 tracking-widest uppercase mb-2">
            Price (₹) *
          </label>
          <input
            type="number"
            required
            placeholder="e.g. 1499"
            value={form.price}
            onChange={e => setForm(f => ({ ...f, price: e.target.value }))}
            className={inputClass}
          />
        </div>

        <div>
          <label className="block font-body text-xs font-semibold text-gray-500 tracking-widest uppercase mb-2">
            Image URL
          </label>
          <input
            type="url"
            placeholder="https://..."
            value={form.imageUrl}
            onChange={e => setForm(f => ({ ...f, imageUrl: e.target.value }))}
            className={inputClass}
          />
        </div>

        <div className="md:col-span-2">
          <label className="block font-body text-xs font-semibold text-gray-500 tracking-widest uppercase mb-2">
            Description
          </label>
          <textarea
            rows={3}
            placeholder="Short product description..."
            value={form.description}
            onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
            className={`${inputClass} resize-none`}
          />
        </div>

        <div className="md:col-span-2">
          <AnimatePresence mode="wait">
            {success ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 px-5 py-3 rounded-lg font-body text-sm"
              >
                <CheckCircle size={16} />
                Product added successfully!
              </motion.div>
            ) : (
              <motion.button
                key="btn"
                type="submit"
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-2 bg-brand-black text-white font-body font-bold text-sm tracking-widest uppercase px-8 py-4 rounded-lg hover:bg-brand-charcoal transition-colors"
              >
                <Plus size={15} />
                Add Product
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </form>
    </div>
  );
}

function ProductsList({ products }: { products: Product[] }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
      <div className="px-8 py-6 border-b border-gray-100">
        <h3
          className="font-heading text-brand-black text-2xl tracking-widest"
          style={{ fontFamily: '"Bebas Neue", cursive' }}
        >
          PRODUCT LIST
        </h3>
        <p className="font-body text-gray-400 text-xs mt-0.5">{products.length} items</p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50">
              {['Product', 'Category', 'Price', 'Image URL'].map(h => (
                <th
                  key={h}
                  className="text-left px-6 py-3.5 font-body text-xs font-semibold text-gray-400 tracking-widest uppercase"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {products.map((product, i) => (
              <motion.tr
                key={product.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.05 }}
                className="border-t border-gray-50 hover:bg-gray-50/50 transition-colors"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-10 h-10 object-cover rounded-lg"
                    />
                    <span className="font-body font-semibold text-brand-black text-sm">
                      {product.name}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="font-body text-xs text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full tracking-wide">
                    {product.category}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="font-body font-semibold text-brand-black text-sm">
                    ₹{product.price.toLocaleString('en-IN')}
                  </span>
                </td>
                <td className="px-6 py-4 max-w-[200px]">
                  <span className="font-body text-xs text-gray-400 truncate block">
                    {product.imageUrl}
                  </span>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function OrdersTable() {
  const [orders, setOrders] = useState<Order[]>(mockOrders);

  const updateStatus = (id: string, status: OrderStatus) => {
    setOrders(prev => prev.map(o => (o.id === id ? { ...o, status } : o)));
  };

  return (
    <div id="orders" className="bg-white rounded-2xl shadow-sm overflow-hidden">
      <div className="px-8 py-6 border-b border-gray-100 flex items-center justify-between">
        <div>
          <h2
            className="font-heading text-brand-black text-2xl tracking-widest"
            style={{ fontFamily: '"Bebas Neue", cursive' }}
          >
            ORDERS
          </h2>
          <p className="font-body text-gray-400 text-xs mt-0.5">{orders.length} orders</p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50">
              {['Order ID', 'Customer', 'Items', 'Qty', 'Total', 'Date', 'Status'].map(h => (
                <th
                  key={h}
                  className="text-left px-6 py-3.5 font-body text-xs font-semibold text-gray-400 tracking-widest uppercase whitespace-nowrap"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {orders.map((order, i) => {
              const cfg = statusConfig[order.status];
              return (
                <motion.tr
                  key={order.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06 }}
                  className="border-t border-gray-50 hover:bg-gray-50/50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <span className="font-body font-mono text-xs font-semibold text-brand-black bg-gray-100 px-2.5 py-1 rounded">
                      {order.id}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-body font-semibold text-brand-black text-sm whitespace-nowrap">
                      {order.customerName}
                    </span>
                  </td>
                  <td className="px-6 py-4 max-w-[220px]">
                    <span className="font-body text-sm text-gray-500 leading-snug">
                      {order.items}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-body text-sm text-gray-600 font-medium">
                      {order.quantity}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="font-body font-bold text-brand-black text-sm">
                      ₹{order.total.toLocaleString('en-IN')}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="font-body text-xs text-gray-400">{order.date}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="relative">
                      <div
                        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-body font-semibold ${cfg.bg} ${cfg.text}`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
                        <select
                          value={order.status}
                          onChange={e => updateStatus(order.id, e.target.value as OrderStatus)}
                          className={`bg-transparent border-none outline-none cursor-pointer font-body text-xs font-semibold ${cfg.text} pr-1`}
                        >
                          {(['Pending', 'Processing', 'Shipped'] as OrderStatus[]).map(s => (
                            <option key={s} value={s} className="text-brand-black bg-white">
                              {s}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </td>
                </motion.tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function Admin() {
  const [products, setProducts] = useState<Product[]>(mockProducts);

  return (
    <div className="flex min-h-screen bg-gray-50 font-body">
      <Sidebar active="products" />

      <main className="flex-1 overflow-auto">
        <div className="max-w-7xl mx-auto px-6 xl:px-10 py-10 space-y-8">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1
                className="font-heading text-brand-black"
                style={{
                  fontSize: '2.5rem',
                  fontFamily: '"Bebas Neue", cursive',
                  letterSpacing: '0.1em',
                }}
              >
                DASHBOARD
              </h1>
              <p className="font-body text-gray-400 text-sm mt-0.5">
                Manage products and orders
              </p>
            </div>
            <div className="flex gap-4">
              {[
                { label: 'Products', value: products.length, icon: Package },
                { label: 'Orders', value: mockOrders.length, icon: ShoppingBag },
              ].map(stat => (
                <div
                  key={stat.label}
                  className="bg-white rounded-xl px-5 py-4 flex items-center gap-4 shadow-sm border border-gray-100"
                >
                  <div className="w-9 h-9 bg-brand-black rounded-lg flex items-center justify-center">
                    <stat.icon size={15} className="text-white" />
                  </div>
                  <div>
                    <div className="font-heading text-2xl text-brand-black" style={{ fontFamily: '"Bebas Neue", cursive', letterSpacing: '0.05em' }}>
                      {stat.value}
                    </div>
                    <div className="font-body text-xs text-gray-400 tracking-widest uppercase">
                      {stat.label}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <AddProductForm onAdd={p => setProducts(prev => [p, ...prev])} />
          <ProductsList products={products} />
          <OrdersTable />
        </div>
      </main>
    </div>
  );
}

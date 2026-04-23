import { Instagram, Twitter } from 'lucide-react';
import Logo from './Logo';

export default function Footer() {
  return (
    <footer className="bg-brand-black border-t border-white/5 py-14">
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex flex-col items-center md:items-start gap-2">
          <Logo size="sm" white />
          <p className="font-body text-white/30 text-sm tracking-widest uppercase mt-2">
            Train Without Limits
          </p>
        </div>

        <div className="flex flex-col items-center gap-2">
          <p className="font-body text-white/20 text-xs tracking-widest uppercase">
            © 2026 Zisciline. All rights reserved.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <a
            href="#"
            className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center text-white/50 hover:text-white transition-all duration-200"
            aria-label="Instagram"
          >
            <Instagram size={16} />
          </a>
          <a
            href="#"
            className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center text-white/50 hover:text-white transition-all duration-200"
            aria-label="Twitter"
          >
            <Twitter size={16} />
          </a>
        </div>
      </div>
    </footer>
  );
}

import { Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-pure-white border-t border-trust-blue/10 py-12 mt-12">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <p className="text-dark-gray/60 flex items-center justify-center gap-2">
          用 <Heart size={16} className="text-trust-blue fill-trust-blue" /> 为深圳家长搭建
        </p>
        <p className="text-xs text-dark-gray/40 mt-4">
          © {new Date().getFullYear()} 探园地图 (Tanyuan Map) · 深圳幼儿园口碑社区
        </p>
      </div>
    </footer>
  );
}

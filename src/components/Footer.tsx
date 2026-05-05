import { Heart, Link as LinkIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-pure-white border-t border-trust-blue/10 py-12 mt-12">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <p className="text-dark-gray/60 flex items-center justify-center gap-2">
          用 <Heart size={16} className="text-trust-blue fill-trust-blue" /> 为深圳家长搭建
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-dark-gray/40 mt-4">
          <Link to="/about" className="hover:text-trust-blue transition-colors">关于我们</Link>
          <span>·</span>
          <Link to="/encyclopedia" className="hover:text-trust-blue transition-colors">探校百科</Link>
          <span>·</span>
          <Link to="/notes" className="hover:text-trust-blue transition-colors">探园笔记</Link>
        </div>
        <p className="text-xs text-dark-gray/40 mt-3">
          © {new Date().getFullYear()} 探园地图 (Tanyuan Map) · 深圳幼儿园口碑社区
        </p>
      </div>
    </footer>
  );
}

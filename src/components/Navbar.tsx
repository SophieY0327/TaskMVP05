import { Link } from 'react-router-dom';
import { MapPin } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-pure-white/80 backdrop-blur-md border-b border-trust-blue/10 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="bg-trust-blue p-2 rounded-xl text-white shadow-lg transition-transform group-hover:scale-110">
              <MapPin size={24} />
            </div>
            <div>
              <span className="text-xl font-heading font-black text-trust-blue tracking-tighter">鹏城探园</span>
              <span className="ml-2 px-2 py-0.5 bg-sun-yellow text-trust-blue text-[8px] font-black rounded uppercase tracking-tighter hidden sm:inline-block">Beta</span>
            </div>
          </Link>
          
          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-dark-gray hover:text-trust-blue font-medium transition-colors">首页</Link>
            <Link to="/notes" className="text-dark-gray hover:text-trust-blue font-medium transition-colors">探园笔记</Link>
            <a href="#" className="text-dark-gray hover:text-trust-blue font-medium transition-colors">关于我们</a>
          </div>

          <div className="flex items-center gap-4">
            <button className="bg-trust-blue text-white px-5 py-2 rounded-full font-medium shadow-md shadow-trust-blue/20 hover:bg-trust-blue/90 transition-all hover:shadow-lg active:scale-95">
              发布口碑
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

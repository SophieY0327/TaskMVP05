import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Heart, BookOpen, Search, Filter, Loader2, ArrowLeft } from 'lucide-react';

interface Note {
  id: string;
  title: string;
  author: string;
  avatar: string;
  schoolName: string;
  schoolId: string;
  image: string;
  likes: number;
  tags: string[];
}

export default function Notes() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetch('/api/notes')
      .then(res => res.json())
      .then(data => {
        setNotes(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch notes:", err);
        setLoading(false);
      });
  }, []);

  const filteredNotes = notes.filter(note => 
    note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.schoolName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  if (loading) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center gap-4">
        <Loader2 className="animate-spin text-trust-blue" size={48} />
        <p className="text-trust-blue font-medium">正在加载精彩笔记...</p>
      </div>
    );
  }

  return (
    <div className="bg-warm-white min-h-screen pt-12 pb-24">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-12">
          <Link to="/" className="inline-flex items-center gap-2 text-trust-blue mb-8 font-bold hover:gap-3 transition-all group">
            <ArrowLeft size={20} /> 返回首页
          </Link>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h1 className="text-4xl font-heading font-black text-trust-blue mb-2">探园笔记广场</h1>
              <p className="text-dark-gray/40 font-medium text-lg">汇集深圳家长的真知灼见，助您深度了解每一所园所</p>
            </div>
            <div className="relative group w-full md:w-96">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-dark-gray/30 group-focus-within:text-trust-blue transition-colors" size={20} />
              <input 
                type="text" 
                placeholder="搜索感兴趣的笔记或园所..." 
                className="w-full pl-12 pr-4 py-4 bg-white rounded-2xl border border-trust-blue/5 focus:border-trust-blue/20 outline-none transition-all shadow-sm placeholder:text-dark-gray/30 text-sm font-medium"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>

        {filteredNotes.length === 0 ? (
          <div className="text-center py-24 bg-white rounded-[40px] border border-trust-blue/5 shadow-sm">
            <div className="w-16 h-16 bg-warm-white rounded-2xl flex items-center justify-center text-trust-blue/20 mx-auto mb-4">
              <Search size={32} />
            </div>
            <h3 className="text-xl font-bold text-trust-blue">未找到相关笔记</h3>
            <p className="text-dark-gray/40 mt-2">试着搜索其他关键字吧</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredNotes.map((note) => (
              <Link to={`/school/${note.schoolId}`} key={note.id} className="block group">
                <motion.div 
                  whileHover={{ y: -10 }}
                  className="bg-white rounded-[32px] overflow-hidden shadow-sm hover:shadow-xl border border-trust-blue/5 transition-all duration-300 h-full"
                >
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <img 
                      src={note.image} 
                      alt={note.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                    />
                    <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                       {note.tags.map((tag, i) => (
                         <span key={i} className="bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black text-trust-blue shadow-sm">
                           {tag}
                         </span>
                       ))}
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 via-black/20 to-transparent">
                       <h3 className="text-white font-bold text-lg leading-snug mb-3 line-clamp-2 group-hover:text-sun-yellow transition-colors">{note.title}</h3>
                       <div className="flex items-center gap-2">
                          <img src={note.avatar} className="w-6 h-6 rounded-full border border-white/20" alt={note.author} />
                          <span className="text-white/80 text-xs font-medium">{note.author}</span>
                       </div>
                    </div>
                  </div>
                  <div className="p-6 flex items-center justify-between bg-white">
                    <div className="text-[10px] font-bold text-trust-blue/40 flex items-center gap-1 group-hover:text-trust-blue transition-colors">
                      <BookOpen size={12} />
                      {note.schoolName}
                    </div>
                    <div className="flex items-center gap-1 text-trust-blue/40 text-xs font-bold">
                      <Heart size={14} className="group-hover:text-pink-500 group-hover:fill-pink-500 transition-all" />
                      {note.likes}
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

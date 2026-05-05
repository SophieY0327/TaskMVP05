import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Search, ArrowLeft, ChevronDown, Lightbulb, Clipboard, Wallet, Compass } from 'lucide-react';
import { qaCategories, QACategory, QAItem } from '../data/qa';

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  basics: <Lightbulb size={20} />,
  process: <Clipboard size={20} />,
  fees: <Wallet size={20} />,
  evaluation: <Compass size={20} />,
};

const CATEGORY_COLORS: Record<string, { bg: string; text: string; border: string; activeBg: string; activeText: string; icon: string }> = {
  basics: {
    bg: 'bg-blue-50',
    text: 'text-blue-700',
    border: 'border-blue-200',
    activeBg: 'bg-blue-600',
    activeText: 'text-white',
    icon: 'text-blue-500',
  },
  process: {
    bg: 'bg-amber-50',
    text: 'text-amber-700',
    border: 'border-amber-200',
    activeBg: 'bg-amber-500',
    activeText: 'text-white',
    icon: 'text-amber-500',
  },
  fees: {
    bg: 'bg-orange-50',
    text: 'text-orange-700',
    border: 'border-orange-200',
    activeBg: 'bg-orange-500',
    activeText: 'text-white',
    icon: 'text-orange-500',
  },
  evaluation: {
    bg: 'bg-emerald-50',
    text: 'text-emerald-700',
    border: 'border-emerald-200',
    activeBg: 'bg-emerald-500',
    activeText: 'text-white',
    icon: 'text-emerald-500',
  },
};

interface AccordionItemProps {
  item: QAItem;
  isOpen: boolean;
  onToggle: () => void;
  categoryId: string;
}

function AccordionItem({ item, isOpen, onToggle, categoryId }: AccordionItemProps) {
  const colors = CATEGORY_COLORS[categoryId] ?? CATEGORY_COLORS.basics;

  return (
    <div
      className={`bg-white rounded-2xl border transition-all duration-200 overflow-hidden ${
        isOpen
          ? `border-${colors.text.replace('text-', '')}/20 shadow-md shadow-${colors.text.replace('text-', '')}/10`
          : 'border-gray-100 hover:border-gray-200'
      }`}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 p-6 text-left group"
      >
        <div className="flex items-start gap-4 flex-grow">
          <div className={`flex-shrink-0 w-2 h-2 rounded-full mt-2 ${colors.bg.replace('bg-', 'bg-').replace('-50', '-500')}`} />
          <h3 className="font-heading font-bold text-dark-gray text-base leading-relaxed group-hover:text-trust-blue transition-colors">
            {item.question}
          </h3>
        </div>
        <ChevronDown
          size={20}
          className={`flex-shrink-0 text-dark-gray/30 group-hover:text-trust-blue transition-all duration-300 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 pl-14">
              <p className="text-dark-gray/70 leading-relaxed text-sm font-medium mb-4">{item.answer}</p>
              <div className="flex flex-wrap gap-2">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className={`px-3 py-1 rounded-full text-[11px] font-bold border ${colors.bg} ${colors.text} ${colors.border}`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

interface CategorySectionProps {
  category: QACategory;
  activeQuestionId: string | null;
  onToggle: (id: string) => void;
}

function CategorySection({ category, activeQuestionId, onToggle }: CategorySectionProps) {
  const colors = CATEGORY_COLORS[category.id] ?? CATEGORY_COLORS.basics;
  const totalQuestions = category.questions.length;

  return (
    <div className="mb-16">
      <div className="flex items-center gap-4 mb-6">
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${colors.bg} ${colors.icon} border ${colors.border}`}>
          {CATEGORY_ICONS[category.id]}
        </div>
        <div>
          <h2 className="text-2xl font-heading font-black text-trust-blue">{category.title}</h2>
          <p className="text-dark-gray/40 text-sm font-medium">{category.description} · {totalQuestions} 个问题</p>
        </div>
      </div>

      <div className="space-y-3">
        {category.questions.map((item) => (
          <AccordionItem
            key={item.id}
            item={item}
            isOpen={activeQuestionId === item.id}
            onToggle={() => onToggle(activeQuestionId === item.id ? null : item.id)}
            categoryId={category.id}
          />
        ))}
      </div>
    </div>
  );
}

export default function Encyclopedia() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeQuestionId, setActiveQuestionId] = useState<string | null>(null);

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return null;
    const query = searchQuery.toLowerCase().trim();
    const results: { category: QACategory; item: QAItem }[] = [];

    qaCategories.forEach((cat) => {
      cat.questions.forEach((item) => {
        if (
          item.question.toLowerCase().includes(query) ||
          item.answer.toLowerCase().includes(query) ||
          item.tags.some((tag) => tag.toLowerCase().includes(query))
        ) {
          results.push({ category: cat, item });
        }
      });
    });

    return results;
  }, [searchQuery]);

  const totalQuestions = qaCategories.reduce((sum, cat) => sum + cat.questions.length, 0);

  return (
    <div className="bg-warm-white min-h-screen">
      {/* Hero Banner */}
      <section className="relative bg-gradient-to-b from-trust-blue to-trust-blue/90 pt-20 pb-24 overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-10 left-10 w-64 h-64 bg-white rounded-full blur-[100px]"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-sun-yellow rounded-full blur-[120px]"></div>
        </div>
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-white/60 hover:text-white mb-10 font-medium transition-colors"
          >
            <ArrowLeft size={18} /> 返回首页
          </Link>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1 rounded-full bg-white/10 text-white/80 text-xs font-bold uppercase tracking-widest mb-6 border border-white/10 backdrop-blur-md">
              探校百科
            </span>
            <h1 className="text-4xl md:text-5xl font-heading font-black text-white mb-6 leading-tight">
              关于探校择校，<br />
              <span className="text-sun-yellow">你想问的，这里都有答案</span>
            </h1>
            <p className="text-white/60 text-base font-medium max-w-xl mx-auto">
              22 个核心问题，覆盖入门扫盲、流程材料、费用财务、理念匹配四大类
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search Bar */}
      <div className="max-w-4xl mx-auto px-4 -mt-8 relative z-10">
        <div className="bg-white rounded-2xl shadow-xl shadow-trust-blue/10 border border-trust-blue/5 p-2">
          <div className="relative">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-dark-gray/30" size={22} />
            <input
              type="text"
              placeholder="输入关键词搜索问题，例如：面试、学费、蒙氏..."
              className="w-full pl-14 pr-5 py-5 bg-warm-white rounded-xl outline-none text-dark-gray placeholder:text-dark-gray/30 text-base font-medium"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-5 top-1/2 -translate-y-1/2 text-dark-gray/30 hover:text-dark-gray/60 transition-colors text-sm font-bold"
              >
                清除
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="max-w-4xl mx-auto px-4 py-16">
        {searchQuery.trim() ? (
          /* Search Results Mode */
          searchResults !== null && searchResults.length > 0 ? (
            <div>
              <div className="mb-8">
                <h2 className="text-xl font-heading font-black text-trust-blue mb-1">
                  搜索结果
                </h2>
                <p className="text-dark-gray/40 text-sm font-medium">
                  找到 {searchResults.length} 个相关问题
                </p>
              </div>
              <div className="space-y-3">
                {searchResults.map(({ category, item }) => (
                  <AccordionItem
                    key={item.id}
                    item={item}
                    isOpen={activeQuestionId === item.id}
                    onToggle={() => setActiveQuestionId(activeQuestionId === item.id ? null : item.id)}
                    categoryId={category.id}
                  />
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-24">
              <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center text-trust-blue/10 mx-auto mb-6 shadow-sm">
                <Search size={40} />
              </div>
              <h3 className="text-xl font-bold text-trust-blue mb-2">未找到相关问题</h3>
              <p className="text-dark-gray/40 font-medium">试试换个关键词，或者浏览下方分类</p>
            </div>
          )
        ) : (
          /* Browse Mode — All Categories */
          <>
            {/* Stats Bar */}
            <div className="flex flex-wrap gap-3 mb-12">
              {qaCategories.map((cat) => {
                const colors = CATEGORY_COLORS[cat.id] ?? CATEGORY_COLORS.basics;
                return (
                  <div
                    key={cat.id}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold ${colors.bg} ${colors.text} border ${colors.border}`}
                  >
                    {CATEGORY_ICONS[cat.id]}
                    <span>{cat.title}</span>
                    <span className="opacity-60">×{cat.questions.length}</span>
                  </div>
                );
              })}
              <div className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold bg-trust-blue/5 text-trust-blue border border-trust-blue/10">
                共 {totalQuestions} 个核心问题
              </div>
            </div>

            {/* Categories */}
            {qaCategories.map((category) => (
              <CategorySection
                key={category.id}
                category={category}
                activeQuestionId={activeQuestionId}
                onToggle={setActiveQuestionId}
              />
            ))}
          </>
        )}
      </div>

      {/* Bottom CTA */}
      <div className="max-w-4xl mx-auto px-4 pb-24">
        <div className="bg-gradient-to-br from-sun-yellow/10 to-sun-yellow/5 rounded-[40px] p-10 md:p-14 border border-sun-yellow/20 text-center">
          <h3 className="text-2xl font-heading font-black text-trust-blue mb-3">
            你的问题还没有被解答？
          </h3>
          <p className="text-dark-gray/50 font-medium mb-8">
            欢迎浏览真实家长的探园笔记，或直接联系目标园所
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/notes"
              className="px-8 py-4 bg-trust-blue text-white font-bold rounded-2xl shadow-lg shadow-trust-blue/20 hover:scale-105 transition-all"
            >
              浏览探园笔记
            </Link>
            <Link
              to="/"
              className="px-8 py-4 bg-white text-trust-blue font-bold rounded-2xl border border-trust-blue/10 hover:border-trust-blue/20 transition-all"
            >
              查看幼儿园地图
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

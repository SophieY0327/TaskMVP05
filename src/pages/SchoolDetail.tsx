import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';
import { 
  ArrowLeft, Star, MapPin, Info, 
  MessageCircle, ShieldCheck, Heart, 
  Award, Wallet, Users, Calendar, CheckCircle2,
  Share2, Bookmark, ExternalLink, Loader2
} from 'lucide-react';
import { Kindergarten } from '../data';

export default function SchoolDetail() {
  const { id } = useParams();
  const [school, setSchool] = useState<Kindergarten | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/schools/${id}`)
      .then(res => res.json())
      .then(data => {
        setSchool(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch school detail:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center gap-4">
        <Loader2 className="animate-spin text-trust-blue" size={48} />
        <p className="text-trust-blue font-medium">精心筹备园所资料中...</p>
      </div>
    );
  }

  if (!school) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center bg-white p-12 rounded-3xl shadow-diffuse">
          <h2 className="text-2xl font-bold text-trust-blue">学校未找到</h2>
          <p className="text-dark-gray/40 mt-2 mb-6">资料可能已被移除或正在更新中</p>
          <Link to="/" className="bg-trust-blue text-white px-8 py-3 rounded-full font-bold shadow-lg hover:shadow-trust-blue/20 transition-all">
            返回首页探索
          </Link>
        </div>
      </div>
    );
  }

  const timeline = [
    { date: '5月10日 - 5月20日', event: '网上预报名', status: 'upcoming' },
    { date: '5月25日', event: '资格初审', status: 'pending' },
    { date: '6月5日', event: '入园面谈', status: 'pending' },
    { date: '7月上旬', event: '录取结果公布', status: 'pending' },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-6xl mx-auto px-4 py-12"
    >
      <div className="flex items-center justify-between mb-8">
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-trust-blue hover:text-trust-blue/70 font-bold transition-all group"
        >
          <div className="p-2 rounded-xl bg-trust-blue/5 group-hover:bg-trust-blue/10 transition-colors">
            <ArrowLeft size={20} />
          </div>
          返回首页探索
        </Link>
        <div className="flex gap-2">
          <button className="p-2 rounded-xl bg-white border border-trust-blue/10 text-trust-blue hover:bg-trust-blue/5 transition-all">
            <Share2 size={20} />
          </button>
          <button className="p-2 rounded-xl bg-white border border-trust-blue/10 text-trust-blue hover:bg-trust-blue/5 transition-all">
            <Bookmark size={20} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Column - Main Info */}
        <div className="lg:col-span-8 space-y-12">
          <section>
            <div className="relative h-[480px] rounded-[40px] overflow-hidden shadow-2xl group mb-8">
              <img src={school.image} alt={school.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              <div className="absolute bottom-8 left-8 right-8 flex items-end justify-between">
                <div>
                   <div className="flex gap-2 mb-3">
                      <span className="bg-trust-blue text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-lg">
                        {school.district}
                      </span>
                      <span className="bg-white text-trust-blue px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-lg">
                        {school.type}幼儿园
                      </span>
                   </div>
                   <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-2">{school.name}</h1>
                   <p className="text-white/80 flex items-center gap-2 font-medium">
                      <MapPin size={18} className="text-white/60" />
                      {school.address}
                   </p>
                </div>
                <div className="hidden md:flex flex-col items-center bg-white/10 backdrop-blur-xl border border-white/20 p-4 rounded-3xl text-white">
                  <span className="text-3xl font-bold">{school.rating}</span>
                  <div className="flex text-sun-yellow">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={12} fill={i < Math.floor(school.rating) ? "currentColor" : "none"} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Core Details Grid - Enhanced Philosophy */}
          <section className="grid grid-cols-1 md:grid-cols-12 gap-6">
             <div className="md:col-span-8 bg-gradient-to-br from-trust-blue to-trust-blue/90 rounded-[40px] p-10 text-white shadow-xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-8 opacity-10 transform scale-150 group-hover:rotate-12 transition-transform duration-700">
                   <Award size={120} />
                </div>
                <div className="relative z-10">
                   <div className="flex items-center gap-3 mb-6">
                      <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-md">
                         <Heart size={28} className="text-sun-yellow" />
                      </div>
                      <h3 className="text-2xl font-heading font-black m-0">核心教育理念</h3>
                   </div>
                   <p className="text-xl md:text-2xl font-bold leading-snug mb-8 max-w-lg">
                      “{school.philosophy}”
                   </p>
                   <div className="flex flex-wrap gap-2">
                      {school.philosophyTags?.map((tag, i) => (
                        <span key={i} className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-xl text-xs font-bold border border-white/10">
                          {tag}
                        </span>
                      ))}
                      {!school.philosophyTags && (
                        <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-xl text-xs font-bold border border-white/10">
                          全面发展
                        </span>
                      )}
                   </div>
                </div>
             </div>
             <div className="md:col-span-4 bg-white rounded-[40px] p-10 border border-trust-blue/5 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-6">
                   <div className="p-3 rounded-2xl bg-orange-50 text-orange-600">
                      <Wallet size={24} />
                   </div>
                   <h3 className="text-xl font-bold text-trust-blue m-0">收费参考</h3>
                </div>
                <div>
                   <p className="text-3xl font-black text-orange-600 tracking-tight">{school.feeRange}</p>
                   <p className="text-xs text-dark-gray/40 mt-2 leading-relaxed">基于教育局备案价格及近期家长反馈。不含校车及兴趣班费用。</p>
                </div>
             </div>
          </section>

          {/* About Section */}
          <section className="bg-white rounded-[32px] p-10 border border-trust-blue/5 shadow-sm">
            <h2 className="text-2xl font-bold mb-8 flex items-center justify-between">
              <span className="flex items-center gap-3">
                <Info className="text-trust-blue" size={26} />
                园所概况
              </span>
              {(school as any).status && (
                <span className="text-xs font-bold bg-trust-blue/5 text-trust-blue px-3 py-1 rounded-full">
                  当前状态：{(school as any).status}
                </span>
              )}
            </h2>
            
            <div className="space-y-8">
               <div className="text-dark-gray/70 leading-relaxed text-lg">
                  {school.description}
               </div>

               <div className="grid grid-cols-3 gap-4">
                  <div className="p-4 bg-warm-white rounded-2xl border border-trust-blue/5">
                     <Users className="text-trust-blue mb-2" size={20} />
                     <div className="text-xs text-dark-gray/40">师生比</div>
                     <div className="font-bold text-trust-blue">1:6</div>
                  </div>
                  <div className="p-4 bg-warm-white rounded-2xl border border-trust-blue/5">
                     <CheckCircle2 className="text-green-500 mb-2" size={20} />
                     <div className="text-xs text-dark-gray/40">资质认证</div>
                     <div className="font-bold text-green-600">已核对</div>
                  </div>
                  <div className="p-4 bg-warm-white rounded-2xl border border-trust-blue/5">
                     <Award className="text-sun-yellow mb-2" size={20} />
                     <div className="text-xs text-dark-gray/40">园所荣誉</div>
                     <div className="font-bold text-trust-blue font-heading tracking-tight text-sm">省级园</div>
                  </div>
               </div>

               <div className="pt-8 border-t border-trust-blue/5">
                <h4 className="font-bold text-trust-blue mb-4 uppercase text-xs tracking-widest">特色标签</h4>
                <div className="flex flex-wrap gap-2">
                  {school.features.map((feature, i) => (
                    <span key={i} className="bg-warm-white text-trust-blue/70 px-4 py-2 rounded-xl text-sm font-medium border border-trust-blue/5 hover:border-trust-blue/20 transition-all cursor-default">
                      # {feature}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Registration Timeline */}
          <section className="bg-white rounded-[32px] p-10 border border-trust-blue/5 shadow-sm">
            <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
              <Calendar className="text-trust-blue" size={26} />
              24/25 秋季招生时间线
            </h2>
            <div className="relative space-y-8 before:absolute before:inset-0 before:ml-5 before:-translate-x-px before:h-full before:w-0.5 before:bg-gradient-to-b before:from-trust-blue/20 before:via-trust-blue/20 before:to-transparent">
              {timeline.map((step, index) => (
                <div key={index} className="relative flex items-center justify-between md:justify-start md:space-x-8 group">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full border-4 border-white shadow-md z-10 transition-transform group-hover:scale-110 ${
                    step.status === 'upcoming' ? 'bg-trust-blue text-white ring-4 ring-trust-blue/10' : 'bg-gray-200 text-gray-400'
                  }`}>
                    {index + 1}
                  </div>
                  <div className="flex-grow p-4 md:p-6 bg-warm-white rounded-[24px] border border-trust-blue/5 hover:border-trust-blue/20 transition-all shadow-sm">
                     <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                        <h4 className="font-bold text-trust-blue">{step.event}</h4>
                        <span className="text-sm font-medium text-dark-gray/40">{step.date}</span>
                     </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Reviews Section */}
          <section className="bg-white rounded-[32px] p-10 border border-trust-blue/5 shadow-sm overflow-hidden">
            <div className="flex items-center justify-between mb-10">
              <div>
                <h2 className="text-2xl font-bold flex items-center gap-3">
                  <MessageCircle className="text-trust-blue" size={26} />
                  家长口碑
                </h2>
                <p className="text-sm text-dark-gray/40 mt-1">来自 128 位家长的真实心声</p>
              </div>
              <button className="bg-trust-blue text-white px-6 py-2.5 rounded-full font-bold shadow-lg shadow-trust-blue/10 hover:shadow-trust-blue/30 transition-all active:scale-95">
                我也要评园
              </button>
            </div>

            <div className="grid gap-6">
              {school.reviews?.map((review) => (
                <motion.div 
                  whileHover={{ x: 5 }}
                  key={review.id} 
                  className="p-8 bg-warm-white rounded-3xl border border-trust-blue/5 space-y-4 hover:shadow-md transition-all"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full border-2 border-white shadow-sm overflow-hidden bg-trust-blue/5">
                        <img src={review.avatar} alt={review.author} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <div className="font-bold text-trust-blue">{review.author}</div>
                        <div className="text-[10px] font-bold text-dark-gray/30 uppercase tracking-tighter">{review.date}</div>
                      </div>
                    </div>
                    <div className="flex gap-0.5 text-sun-yellow">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={14} fill={i < review.rating ? "currentColor" : "none"} />
                      ))}
                    </div>
                  </div>
                  <p className="text-dark-gray/70 leading-relaxed italic text-lg line-clamp-3">"{review.content}"</p>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {review.tags.map(tag => (
                      <span key={tag} className="text-[10px] font-bold bg-white text-trust-blue/50 px-2.5 py-1 rounded-lg border border-trust-blue/5 uppercase">
                        # {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}

              <button className="w-full py-4 border-2 border-dashed border-trust-blue/10 rounded-3xl text-trust-blue/40 font-bold hover:bg-trust-blue/5 hover:border-trust-blue/20 transition-all">
                点击加载更多评价 (126+)
              </button>
            </div>
          </section>
        </div>

        {/* Right Column - Side Panels */}
        <aside className="lg:col-span-4 space-y-8">
          <div className="sticky top-24 space-y-8">
            <div className="bg-trust-blue text-white rounded-[40px] p-10 shadow-2xl shadow-trust-blue/30 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-10 transform translate-x-4 -translate-y-4">
                 <ShieldCheck size={160} />
              </div>
              <h3 className="text-white text-2xl font-bold mb-6 relative z-10">入园意向锁定</h3>
              <ul className="space-y-6 relative z-10">
                <li className="flex items-start gap-4">
                  <div className="p-2 rounded-xl bg-white/20">
                    <ShieldCheck size={20} />
                  </div>
                  <div>
                    <div className="font-bold">资质已认证</div>
                    <div className="text-xs text-white/70">本园已通过教研院资质核验</div>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="p-2 rounded-xl bg-white/20">
                    <Award size={20} />
                  </div>
                  <div>
                    <div className="font-bold">名师计划</div>
                    <div className="text-xs text-white/70">50% 以上教师持有高级职称</div>
                  </div>
                </li>
              </ul>
              <div className="space-y-4 mt-12">
                 <button className="w-full py-4 bg-white text-trust-blue font-bold rounded-[22px] hover:bg-white/90 active:scale-95 transition-all shadow-xl">
                   咨询入园名额
                 </button>
                 <button className="w-full py-4 bg-white/10 backdrop-blur-md text-white border border-white/20 font-bold rounded-[22px] hover:bg-white/20 transition-all flex items-center justify-center gap-2">
                   <ExternalLink size={18} />
                   访问官方网站
                 </button>
              </div>
            </div>

            <div className="bg-white rounded-[32px] p-10 border border-trust-blue/5 shadow-sm">
              <h3 className="text-trust-blue text-xl font-bold mb-8">互动问答</h3>
              <div className="space-y-6">
                 {[
                   { q: '报名需要社保吗？', a: '需要南山区连续缴纳12个月社保...' },
                   { q: '有校车吗？', a: '园所有专线校车覆盖半径3公里...' }
                 ].map((qa, i) => (
                   <div key={i} className="space-y-2 group cursor-help">
                      <div className="flex items-center gap-2 font-bold text-trust-blue">
                         <span className="text-xs bg-trust-blue/10 w-5 h-5 flex items-center justify-center rounded-lg">Q</span>
                         <span className="group-hover:underline">{qa.q}</span>
                      </div>
                      <p className="text-xs text-dark-gray/40 pl-7">{qa.a}</p>
                   </div>
                 ))}
              </div>
              <button className="w-full mt-8 py-3 text-sm font-bold text-trust-blue/40 hover:text-trust-blue hover:underline transition-all">
                查看更多问答 &rarr;
              </button>
            </div>

            <div className="group relative rounded-[40px] overflow-hidden aspect-[4/5] shadow-2xl border-4 border-white">
               <img src="https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?q=80&w=400&auto=format&fit=crop" alt="Campus View" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
               <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
               <div className="absolute bottom-6 left-6 right-6">
                  <div className="text-white font-bold text-lg mb-1">全景看园</div>
                  <div className="text-white/60 text-xs">通过VR技术在线参观园区</div>
                  <button className="mt-4 w-full py-3 bg-white text-trust-blue text-xs font-bold rounded-xl shadow-lg">
                    立即开启 360° 全景
                  </button>
               </div>
            </div>
          </div>
        </aside>
      </div>
    </motion.div>
  );
}

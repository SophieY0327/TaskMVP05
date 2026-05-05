import { Link } from 'react-router-dom';
import { ArrowLeft, Heart, Users, BookOpen, MapPin, Sparkles } from 'lucide-react';

export default function About() {
  return (
    <div className="bg-warm-white min-h-screen">
      {/* Hero */}
      <section className="relative bg-gradient-to-b from-trust-blue to-trust-blue/90 pt-20 pb-28 overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-10 left-10 w-64 h-64 bg-white rounded-full blur-[100px]" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-sun-yellow rounded-full blur-[120px]" />
        </div>
        <div className="max-w-3xl mx-auto px-4 text-center relative z-10">
          <Link to="/" className="inline-flex items-center gap-2 text-white/60 hover:text-white mb-10 font-medium transition-colors">
            <ArrowLeft size={18} /> 返回首页
          </Link>
          <div>
            <span className="inline-block px-4 py-1 rounded-full bg-white/10 text-white/80 text-xs font-bold uppercase tracking-widest mb-6 border border-white/10 backdrop-blur-md">
              关于我们
            </span>
            <h1 className="text-4xl md:text-5xl font-heading font-black text-white mb-6 leading-tight">
              这里，始于一位家长的<br />
              <span className="text-sun-yellow">真实弯路</span>
            </h1>
          </div>
        </div>
      </section>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 py-16 space-y-20">

        {/* 缘起 */}
        <section>
          <div className="flex items-start gap-5">
            <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-trust-blue/10 flex items-center justify-center text-trust-blue border border-trust-blue/10">
              <Sparkles size={24} />
            </div>
            <div>
              <h2 className="text-2xl font-heading font-black text-trust-blue mb-4">缘起</h2>
              <div className="space-y-4 text-dark-gray/70 leading-relaxed text-base font-medium">
                <p>
                  探园地图的诞生，源于创始人作为一名深圳家长，在给孩子选幼儿园时亲历的无力与断档。
                </p>
                <p>
                  那时，为了找全南山区所有幼儿园的名单，我们甚至要靠滴滴打车一个个搜。办学资质要在政务网查，真实口碑要跳转到小红书、妈妈群一篇篇翻。
                </p>
                <p>
                  我们发现，没有一个地方，能一次性解决"有哪些学校、它们怎么样"这个最基础的问题。
                </p>
                <p className="text-trust-blue font-bold">
                  于是，我们决定自己动手。
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="flex items-center gap-4">
          <div className="flex-grow h-px bg-trust-blue/10" />
          <div className="w-2 h-2 rounded-full bg-trust-blue/20" />
          <div className="flex-grow h-px bg-trust-blue/10" />
        </div>

        {/* 我们在做什么 */}
        <section>
          <div className="flex items-start gap-5">
            <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-sun-yellow/20 flex items-center justify-center text-sun-yellow border border-sun-yellow/20">
              <BookOpen size={24} />
            </div>
            <div>
              <h2 className="text-2xl font-heading font-black text-trust-blue mb-6">我们在做什么</h2>
              <div className="space-y-8">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-trust-blue/10 flex items-center justify-center text-trust-blue text-sm font-black mt-1">1</div>
                  <div>
                    <h3 className="font-heading font-black text-dark-gray mb-1 text-lg">信息黄页</h3>
                    <p className="text-dark-gray/70 leading-relaxed text-base font-medium">
                      我们汇聚深圳全境千余所幼儿园，让你能按行政区、按国籍体系、按教育理念，在地图上一目了然地找到所有选项。
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-trust-blue/10 flex items-center justify-center text-trust-blue text-sm font-black mt-1">2</div>
                  <div>
                    <h3 className="font-heading font-black text-dark-gray mb-1 text-lg">真实口碑</h3>
                    <p className="text-dark-gray/70 leading-relaxed text-base font-medium">
                      我们集结上千名家长的真实探园笔记与评分，用社区的力量对抗信息不透明。这里没有广告，只有亲历者的一手体验。
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-trust-blue/10 flex items-center justify-center text-trust-blue text-sm font-black mt-1">3</div>
                  <div>
                    <h3 className="font-heading font-black text-dark-gray mb-1 text-lg">避坑指南</h3>
                    <p className="text-dark-gray/70 leading-relaxed text-base font-medium">
                      我们系统梳理探园必问、办学资质、隐性费用等硬核知识，帮你从"什么都不懂"快速进阶为"懂行的家长"。
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="flex items-center gap-4">
          <div className="flex-grow h-px bg-trust-blue/10" />
          <div className="w-2 h-2 rounded-full bg-trust-blue/20" />
          <div className="flex-grow h-px bg-trust-blue/10" />
        </div>

        {/* 我们的信条 */}
        <section>
          <div className="flex items-start gap-5">
            <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600 border border-emerald-100">
              <Heart size={24} />
            </div>
            <div>
              <h2 className="text-2xl font-heading font-black text-trust-blue mb-4">我们的信条</h2>
              <div className="bg-gradient-to-br from-emerald-50/50 to-transparent rounded-2xl p-6 border border-emerald-100/50">
                <p className="text-dark-gray/70 leading-relaxed text-base font-medium">
                  我们坚信，<span className="text-emerald-700 font-bold">真实的家长经验，是帮另一个家庭少走弯路的唯一捷径。</span>
                </p>
                <p className="text-dark-gray/70 leading-relaxed text-base font-medium mt-3">
                  你的每一次探园记录、每一条客观评价，都可能决定了另一个孩子幸福童年的起点。
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="flex items-center gap-4">
          <div className="flex-grow h-px bg-trust-blue/10" />
          <div className="w-2 h-2 rounded-full bg-trust-blue/20" />
          <div className="flex-grow h-px bg-trust-blue/10" />
        </div>

        {/* 现状与邀约 */}
        <section>
          <div className="flex items-start gap-5">
            <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-violet-50 flex items-center justify-center text-violet-600 border border-violet-100">
              <Users size={24} />
            </div>
            <div>
              <h2 className="text-2xl font-heading font-black text-trust-blue mb-4">现状与邀约</h2>
              <div className="space-y-4 text-dark-gray/70 leading-relaxed text-base font-medium">
                <p>
                  目前，我们正深度覆盖深圳南山区、福田区，并持续向全城扩展。
                  这个平台还很年轻，信息难免有不全之处。但我们每天都会根据家长的反馈进行更新和修正。
                </p>
                <p className="font-bold text-trust-blue">独木难支，诚挚邀请你：</p>
              </div>

              <div className="mt-6 space-y-4">
                <div className="bg-gradient-to-r from-blue-50 to-blue-100/30 rounded-2xl p-5 border border-blue-100">
                  <p className="text-lg font-heading font-black text-dark-gray mb-1">
                    <span className="mr-2">✍️</span>写过探园笔记的你
                  </p>
                  <p className="text-dark-gray/70 text-sm font-medium leading-relaxed">
                    欢迎匿名或实名分享你的经历，帮更多家长避雷、优选。
                  </p>
                </div>
                <div className="bg-gradient-to-r from-sun-yellow/10 to-sun-yellow/5 rounded-2xl p-5 border border-sun-yellow/20">
                  <p className="text-lg font-heading font-black text-dark-gray mb-1">
                    <span className="mr-2">🗺️</span>正在择校的你
                  </p>
                  <p className="text-dark-gray/70 text-sm font-medium leading-relaxed">
                    可以先用我们的地图和百科，解决90%的基础信息搜集。如果你最终通过这里找到了理想的学校，也请回来留下你的经验，点亮后来者的路。
                  </p>
                </div>
                <div className="bg-gradient-to-r from-violet-50 to-violet-100/30 rounded-2xl p-5 border border-violet-100">
                  <p className="text-lg font-heading font-black text-dark-gray mb-1">
                    <span className="mr-2">🌟</span>对择校有更高阶需求的你
                  </p>
                  <p className="text-dark-gray/70 text-sm font-medium leading-relaxed">
                    我们正在组建专属的家长情报社群，提供更深度的择校咨询。这部分的收益，将直接支持网站持续免费运营。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="flex items-center gap-4">
          <div className="flex-grow h-px bg-trust-blue/10" />
          <div className="w-2 h-2 rounded-full bg-trust-blue/20" />
          <div className="flex-grow h-px bg-trust-blue/10" />
        </div>

        {/* 结语 */}
        <section>
          <div className="text-center">
            <div className="bg-gradient-to-br from-trust-blue/5 to-sun-yellow/5 rounded-[32px] p-10 md:p-14 border border-trust-blue/10">
              <h2 className="text-2xl md:text-3xl font-heading font-black text-trust-blue mb-4 leading-tight">
                探园地图想做的，从来不是一个冷冰冰的工具。
              </h2>
              <p className="text-dark-gray/70 text-base font-medium mb-6 leading-relaxed max-w-lg mx-auto">
                我们想成为你帮孩子做出第一个重大教育决定时，<br className="hidden md:inline" />
                最值得信赖的那份"内部情报"。
              </p>
              <div className="mt-8 pt-8 border-t border-trust-blue/10">
                <p className="text-dark-gray/50 text-sm font-medium mb-2">如有任何想法、建议或合作意向，欢迎随时联系我们</p>
                <p className="font-heading font-black text-trust-blue text-lg">探园地图团队</p>
                <p className="text-dark-gray/40 text-sm mt-1">用心为深圳家长搭建</p>
              </div>
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/"
            className="px-8 py-4 bg-trust-blue text-white font-bold rounded-2xl shadow-lg shadow-trust-blue/20 hover:scale-105 transition-all"
          >
            <span className="flex items-center gap-2">
              <MapPin size={18} />
              打开幼儿园地图
            </span>
          </Link>
          <Link
            to="/notes"
            className="px-8 py-4 bg-white text-trust-blue font-bold rounded-2xl border border-trust-blue/10 hover:border-trust-blue/20 transition-all"
          >
            浏览探园笔记
          </Link>
        </div>

      </div>
    </div>
  );
}

import { useState, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import {
  Search, Filter, Star, MapPin as MapPinIcon,
  Heart, MessageSquare, ArrowRight, BookOpen, Users,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { schools, notes, Kindergarten, SchoolType } from '../data';

const createCustomIcon = (isActive: boolean) => {
  return L.divIcon({
    className: 'custom-marker',
    html: `<div class="marker-inner ${isActive ? 'scale-125 !bg-orange-500' : ''}"></div>`,
    iconSize: [24, 24],
    iconAnchor: [12, 24],
  });
};

const MapUpdater = ({ coords, zoom = 14 }: { coords: [number, number]; zoom?: number }) => {
  const map = useMap();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useMemo(() => {
    map.flyTo(coords, zoom, { duration: 1.5, easeLinearity: 0.25 });
  }, [coords, map, zoom]);
  return null;
};

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeType, setActiveType] = useState<SchoolType | '全部'>('全部');
  const [activeDistrict, setActiveDistrict] = useState<string | '全部'>('全部');
  const [activePhilosophy, setActivePhilosophy] = useState<string | '全部'>('全部');
  const [selectedSchool, setSelectedSchool] = useState<Kindergarten | null>(null);

  const PHILOSOPHY_TAGS = ['全部', '蒙特梭利', 'IB课程', '双语教学', '自然教育', 'PBL项目制', '艺术启蒙', '幼小衔接'];

  const filteredSchools = useMemo(() => {
    return schools.filter((school) => {
      const matchesSearch =
        school.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        school.address.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesType = activeType === '全部' || school.type === activeType;
      const matchesDistrict = activeDistrict === '全部' || school.district === activeDistrict;
      const matchesPhilosophy =
        activePhilosophy === '全部' ||
        (school.philosophyTags && school.philosophyTags.includes(activePhilosophy));
      return matchesSearch && matchesType && matchesDistrict && matchesPhilosophy;
    });
  }, [searchQuery, activeType, activeDistrict, activePhilosophy]);

  const mapCenter: [number, number] = [22.5333, 113.9305];

  return (
    <div className="flex flex-col bg-warm-white min-h-screen">
      {/* Banner 1: Hero Section */}
      <section className="relative w-full bg-trust-blue pt-20 pb-24 overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-10 left-10 w-64 h-64 bg-white rounded-full blur-[100px]" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-sun-yellow rounded-full blur-[120px]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <div>
            <span className="inline-block px-4 py-1 rounded-full bg-white/10 text-white/80 text-xs font-bold uppercase tracking-widest mb-6 border border-white/10 backdrop-blur-md">
              深圳家长园所决策必备
            </span>
            <h1 className="text-5xl md:text-7xl font-heading font-black text-white mb-6 leading-tight">
              探园地图，<br />
              <span className="text-sun-yellow">帮家长选对</span>第一所学校
            </h1>
            <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto mb-10 leading-relaxed font-medium">
              深圳全境 1000+ 幼儿园深度收录，集结上万名真实家长的实探笔记与口碑评价，一站式消除择校焦虑。
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="#map-section" className="px-8 py-4 bg-sun-yellow text-trust-blue font-bold rounded-2xl shadow-xl shadow-sun-yellow/20 hover:scale-105 transition-all">
                立即查找周边幼儿园
              </a>
              <a href="#notes-section" className="px-8 py-4 bg-white/10 text-white border border-white/20 backdrop-blur-sm font-bold rounded-2xl hover:bg-white/20 transition-all">
                浏览最新探园笔记
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Banner 2: Map Yellow Pages */}
      <section id="map-section" className="max-w-7xl mx-auto w-full px-4 -mt-12 mb-20 relative z-20">
        <div className="bg-white rounded-[40px] shadow-2xl flex flex-col lg:flex-row h-[700px] overflow-hidden border border-trust-blue/5">
          {/* Sidebar */}
          <div className="w-full lg:w-[420px] flex flex-col bg-white border-r border-trust-blue/5">
            <div className="p-8 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-heading font-bold text-trust-blue mb-0">发现学校</h2>
                <span className="text-xs font-bold bg-trust-blue/5 text-trust-blue px-3 py-1 rounded-full border border-trust-blue/10">
                  {filteredSchools.length} 所结果
                </span>
              </div>

              <div className="relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-dark-gray/30 group-focus-within:text-trust-blue transition-colors" size={20} />
                <input
                  type="text"
                  placeholder="按园名或地标搜索..."
                  className="w-full pl-12 pr-4 py-4 bg-warm-white rounded-2xl border border-transparent focus:border-trust-blue/20 focus:bg-white outline-none transition-all shadow-inner placeholder:text-dark-gray/30 text-sm font-medium"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="space-y-3">
                <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
                  {(['全部', '公立', '私立', '国际'] as const).map((type) => (
                    <button
                      key={type}
                      onClick={() => setActiveType(type)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                        activeType === type
                          ? 'bg-trust-blue text-white shadow-lg shadow-trust-blue/20 transform scale-105'
                          : 'bg-warm-white text-dark-gray/60 hover:bg-trust-blue/5 hover:text-trust-blue'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 text-[10px] font-black text-trust-blue/40 uppercase tracking-widest whitespace-nowrap">
                    <Filter size={12} />
                    行政区
                  </div>
                  <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar flex-grow">
                    {(['全部', '南山区', '福田区', '宝安区', '龙岗区'] as const).map((dist) => (
                      <button
                        key={dist}
                        onClick={() => setActiveDistrict(dist)}
                        className={`px-3 py-1.5 rounded-lg text-[10px] font-bold whitespace-nowrap transition-all ${
                          activeDistrict === dist
                            ? 'bg-sun-yellow text-trust-blue shadow-md'
                            : 'bg-warm-white text-dark-gray/60 hover:bg-sun-yellow/10 hover:text-trust-blue'
                        }`}
                      >
                        {dist.replace('区', '')}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 text-[10px] font-black text-trust-blue/40 uppercase tracking-widest whitespace-nowrap">
                    <BookOpen size={12} />
                    教育理念
                  </div>
                  <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar flex-grow">
                    {PHILOSOPHY_TAGS.map((tag) => (
                      <button
                        key={tag}
                        onClick={() => setActivePhilosophy(tag)}
                        className={`px-3 py-1.5 rounded-lg text-[10px] font-bold whitespace-nowrap transition-all ${
                          activePhilosophy === tag
                            ? 'bg-trust-blue text-white shadow-md'
                            : 'bg-warm-white text-dark-gray/60 hover:bg-trust-blue/10 hover:text-trust-blue'
                        }`}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex-grow overflow-y-auto px-6 pb-6 space-y-4 no-scrollbar">
              {filteredSchools.map((school) => (
                <Link
                  to={`/school/${school.id}`}
                  key={school.id}
                  onMouseEnter={() => setSelectedSchool(school)}
                  className={`block p-4 rounded-3xl border transition-all active:scale-[0.98] ${
                    selectedSchool?.id === school.id
                      ? 'bg-trust-blue/5 border-trust-blue/20 shadow-md scale-[1.02]'
                      : 'bg-white border-trust-blue/5 hover:border-trust-blue/10 hover:bg-warm-white/50'
                  }`}
                >
                  <div className="flex gap-4">
                    <div className="w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0 bg-warm-white ring-4 ring-white shadow-sm">
                      <img src={school.image} alt={school.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex flex-col justify-center flex-grow min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full ${
                          school.type === '公立'
                            ? 'bg-green-100 text-green-700'
                            : school.type === '国际'
                            ? 'bg-purple-100 text-purple-700'
                            : 'bg-orange-100 text-orange-700'
                        }`}>
                          {school.type}
                        </span>
                        <div className="flex items-center gap-0.5 text-sun-yellow font-black text-[10px]">
                          <Star size={12} fill="currentColor" />
                          {school.rating}
                        </div>
                      </div>
                      <h3 className="font-heading font-black text-trust-blue text-base leading-tight truncate pr-8">
                        {school.name}
                      </h3>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {school.philosophyTags?.slice(0, 1).map((tag, i) => (
                          <span key={i} className="text-[9px] font-bold text-trust-blue bg-trust-blue/5 px-1.5 py-0.5 rounded leading-none border border-trust-blue/10">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <p className="text-[10px] text-dark-gray/40 mt-1 truncate">{school.address}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Map */}
          <div className="flex-grow relative bg-warm-white overflow-hidden">
            <MapContainer center={mapCenter} zoom={13} className="h-full w-full" zoomControl={false}>
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
              />
              {filteredSchools.map((school) => (
                <Marker
                  key={school.id}
                  position={school.coords}
                  icon={createCustomIcon(selectedSchool?.id === school.id)}
                  eventHandlers={{ click: () => setSelectedSchool(school) }}
                >
                  <Popup className="custom-popup">
                    <div className="p-3">
                      <h4 className="font-heading font-black text-trust-blue text-sm mb-1">{school.name}</h4>
                      <p className="text-[10px] text-dark-gray/40 mb-3">{school.address}</p>
                      <Link
                        to={`/school/${school.id}`}
                        className="block text-center py-2 bg-trust-blue text-white text-[10px] font-bold rounded-lg shadow-lg hover:scale-105 transition-all"
                      >
                        查看口碑详情
                      </Link>
                    </div>
                  </Popup>
                </Marker>
              ))}
              {selectedSchool && <MapUpdater coords={selectedSchool.coords} />}
            </MapContainer>

            <div className="absolute top-6 right-6 z-[1000] space-y-2">
              <button className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-trust-blue shadow-xl border border-trust-blue/5 hover:bg-trust-blue hover:text-white transition-all active:scale-95">
                <MapPinIcon size={20} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Banner 3: Notes Square */}
      <section id="notes-section" className="max-w-7xl mx-auto w-full px-4 mb-32">
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className="text-3xl font-heading font-black text-trust-blue mb-2">探园笔记广场</h2>
            <p className="text-dark-gray/40 font-medium">真实发声，避雷优选，听听家长的真实体验</p>
          </div>
          <Link to="/notes" className="flex items-center gap-2 text-trust-blue font-bold hover:gap-3 transition-all group">
            查看更多笔记 <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {notes.map((note) => (
            <Link to={`/school/${note.schoolId}`} key={note.id} className="block group">
              <div className="bg-white rounded-[32px] overflow-hidden shadow-sm hover:shadow-xl border border-trust-blue/5 group h-full">
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img
                    src={note.image}
                    alt={note.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black text-trust-blue shadow-sm">
                      {note.tags[0]}
                    </span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 via-black/20 to-transparent">
                    <h3 className="text-white font-bold text-lg leading-snug mb-2 line-clamp-2">{note.title}</h3>
                    <div className="flex items-center gap-2">
                      <img src={note.avatar} className="w-6 h-6 rounded-full border border-white/20" alt={note.author} />
                      <span className="text-white/80 text-xs font-medium">{note.author}</span>
                    </div>
                  </div>
                </div>
                <div className="p-6 flex items-center justify-between bg-white">
                  <div className="text-[10px] font-bold text-trust-blue/40 flex items-center gap-1">
                    <BookOpen size={12} />
                    {note.schoolName}
                  </div>
                  <div className="flex items-center gap-1 text-trust-blue/40 text-xs font-bold">
                    <Heart size={14} className="group-hover:text-pink-500 group-hover:fill-pink-500 transition-colors" />
                    {note.likes}
                  </div>
                </div>
              </div>
              </Link>
            ))}
        </div>
      </section>

      {/* Banner 4: CTA */}
      <section className="max-w-7xl mx-auto w-full px-4 mb-24">
        <div className="bg-gradient-to-br from-trust-blue to-trust-blue/80 rounded-[48px] p-12 md:p-24 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 p-12 opacity-5 scale-150 transform translate-x-1/4 -translate-y-1/4">
            <MessageSquare size={300} strokeWidth={1} />
          </div>

          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-heading font-black text-white mb-8">
              独木难支，<br />
              欢迎加入我们的探园大家庭
            </h2>
            <p className="text-lg md:text-xl text-white/60 mb-12 font-medium">
              每一条真实的评价，都在帮更多的家长少走弯路。你的探园记录，可能就是另一个孩子幸福童年的开始。
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <button className="px-10 py-5 bg-white text-trust-blue font-black rounded-3xl shadow-2xl hover:scale-105 active:scale-95 transition-all text-lg">
                立即发布我的口碑
              </button>
              <div className="flex items-center gap-3 text-white/40 font-bold">
                <Users size={24} />
                已经有 3,420+ 位南山家长加入
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

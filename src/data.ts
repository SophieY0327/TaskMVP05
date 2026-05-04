export type SchoolType = '公立' | '私立' | '国际';

export interface Review {
  id: string;
  author: string;
  avatar: string;
  rating: number;
  date: string;
  content: string;
  tags: string[];
}

export interface Kindergarten {
  id: string;
  name: string;
  type: SchoolType;
  address: string;
  district: string;
  rating: number;
  reviewCount: number;
  coords: [number, number];
  image: string;
  description: string;
  features: string[];
  philosophy: string;
  philosophyTags: string[];
  feeRange: string;
  subDistrict?: string;
  distance?: string;
  status: string;
  reviews?: Review[];
}

export const NANSHAN_SCHOOLS: Kindergarten[] = [
  {
    id: 'ns-01',
    name: '深圳市南山区机关幼儿园',
    type: '公立',
    address: '深圳市南山区南山大道1001号',
    district: '南山区',
    rating: 4.8,
    reviewCount: 128,
    coords: [22.5332, 113.9314],
    image: 'https://images.unsplash.com/photo-1595206133361-b1fe343e5e23?q=80&w=800&auto=format&fit=crop',
    description: '历史悠久的优质公办园，师资力量雄厚，环境优美。',
    features: ['公办园', '示范园', '大操场'],
    philosophy: '以孩子为本，全面发展。',
    feeRange: 'RMB 1,000 - 1,500/月',
    status: '招生中',
    reviews: [
      {
        id: 'r1',
        author: '张女士',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Zhang',
        rating: 5,
        date: '2024-03-20',
        content: '老师非常专业且有耐心，孩子每天都很开心，伙食也很好。',
        tags: ['伙食好', '老师负责']
      }
    ]
  },
  {
    id: 'ns-02',
    name: '南山中英文学校幼儿园',
    type: '国际',
    address: '深圳市南山区白石路5号',
    district: '南山区',
    rating: 4.6,
    reviewCount: 85,
    coords: [22.5283, 113.9532],
    image: 'https://images.unsplash.com/photo-1588072432836-e10032774350?q=80&w=800&auto=format&fit=crop',
    description: '注重双语培养，接轨国际课程体系。',
    features: ['双语教学', '国际氛围', '小班制'],
    philosophy: '博采众长，培养具有全球视野的孩子。',
    feeRange: 'RMB 15,000 - 20,000/月',
    status: '有名额',
    reviews: [
      {
        id: 'r2',
        author: 'Lee',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lee',
        rating: 4,
        date: '2024-02-15',
        content: '双语氛围很好，外教很有意思，但学费确实相对较高。',
        tags: ['双语好', '环境佳']
      }
    ]
  },
  {
    id: 'ns-03',
    name: '蒙世学堂 (南山分园)',
    type: '私立',
    address: '深圳市南山区蛇口赤湾五路1号',
    district: '南山区',
    rating: 4.7,
    reviewCount: 42,
    coords: [22.4795, 113.9056],
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=800&auto=format&fit=crop',
    description: '纯正蒙特梭利教育理念，尊重孩子的独特性。',
    features: ['蒙氏教育', '纯净环境', '混龄编班'],
    philosophy: '跟随孩子，让他们在自由中学会自律。',
    feeRange: 'RMB 8,000 - 12,000/月',
    status: '滚动招生',
    reviews: [
      {
        id: 'r3',
        author: '陈爸爸',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Chen',
        rating: 5,
        date: '2024-04-01',
        content: '非常看重这里的教学氛围，孩子学会了自理，专注力有提升。',
        tags: ['专注力', '蒙派']
      }
    ]
  }
];

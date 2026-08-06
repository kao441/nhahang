import { Category, Product, Branch, Coupon, BlogPost, Review, AnalyticsSummary } from '../types';

export const INITIAL_CATEGORIES: Category[] = [
  {
    id: 'cat-1',
    name: 'Món Chính Luxury',
    slug: 'mon-chinh-luxury',
    description: 'Các món ăn chính đặc sắc chế biến từ bò Wagyu, hải sản cao cấp và cừu Úc',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=800',
    itemCount: 12
  },
  {
    id: 'cat-2',
    name: 'Khai Vị Tinh Tế',
    slug: 'khai-vi',
    description: 'Bắt đầu vị giác với các món Starter nhẹ nhàng phong cách Âu-Á',
    image: 'https://images.unsplash.com/photo-1541529086526-db283c563270?auto=format&fit=crop&q=80&w=800',
    itemCount: 8
  },
  {
    id: 'cat-3',
    name: 'Súp & Salad Hữu Cơ',
    slug: 'sup-salad',
    description: 'Thanh lịch và dinh dưỡng với nguyên liệu rau củ hữu cơ chuẩn 5 sao',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=800',
    itemCount: 6
  },
  {
    id: 'cat-4',
    name: 'Món Nướng Robata',
    slug: 'mon-nuong',
    description: 'Nướng than củi truyền thống đậm đà chuẩn vị thượng hạng',
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80&w=800',
    itemCount: 10
  },
  {
    id: 'cat-5',
    name: 'Tráng Miệng Thượng Hạng',
    slug: 'trang-mieng',
    description: 'Bánh ngọt thủ công, Soufflé, Mousse socola béo ngậy thanh mát',
    image: 'https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&q=80&w=800',
    itemCount: 7
  },
  {
    id: 'cat-6',
    name: 'Rượu Vang & Đồ Uống',
    slug: 'do-uong',
    description: 'Rượu vang nhập khẩu Pháp/Ý, Cocktail pha chế đặc biệt và nước ép tươi',
    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&q=80&w=800',
    itemCount: 15
  }
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'p-1',
    name: 'Bít Tết Bò Wagyu A5 dát vàng 24K',
    slug: 'bit-tet-bo-wagyu-a5',
    description: 'Thịt bò Wagyu nhập khẩu từ Kagoshima Nhật Bản, áp chảo xốt nấm Truffle đen và dát lá vàng 24k.',
    longDescription: 'Món ăn biểu tượng của LuxeBistro. Bò Wagyu A5 tuyển chọn từ trang trại Miyazaki, sở hữu vân mỡ cẩm thạch hoàn hảo. Được áp chảo vừa chín tới trên chảo gang đúc, phục vụ cùng khoai tây tỏi nghiền bơ Pháp, măng tây áp chảo và xốt nấm Nấm Truffle Perigord đen ngạt ngào hương thơm.',
    price: 1850000,
    originalPrice: 2100000,
    categoryId: 'cat-1',
    categoryName: 'Món Chính Luxury',
    images: [
      'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&q=80&w=800'
    ],
    rating: 4.9,
    reviewCount: 128,
    isFeatured: true,
    isNew: true,
    isSale: true,
    isAvailable: true,
    preparationTime: '20-25 phút',
    calories: 780,
    ingredients: ['Thịt bò Wagyu A5', 'Nấm Truffle đen', 'Lá vàng 24K', 'Bơ Anchor', 'Măng tây', 'Khoai tây'],
    allergens: ['Lactose (Bơ)'],
    spicinessLevel: 0
  },
  {
    id: 'p-2',
    name: 'Tôm Hùm Alaska Đút Lò Bơ Thảo Mộc',
    slug: 'tom-hum-alaska-dut-lo',
    description: 'Tôm hùm Alaska sống nướng phô mai Gruyère & xốt bơ tỏi thảo mộc thơm lừng.',
    longDescription: 'Tôm hùm nhập khẩu trực tiếp từ vùng biển phía Bắc Đại Tây Dương. Thịt tôm săn chắc, ngọt đậm đà được đút lò với phô mai Gruyère Thụy Sĩ tan chảy, bơ thơm phết lá mùi tây tươi và tỏi phi cay nhẹ.',
    price: 1450000,
    originalPrice: 1600000,
    categoryId: 'cat-1',
    categoryName: 'Món Chính Luxury',
    images: [
      'https://images.unsplash.com/photo-1559742811-8228636d253b?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?auto=format&fit=crop&q=80&w=800'
    ],
    rating: 4.8,
    reviewCount: 94,
    isFeatured: true,
    isNew: false,
    isSale: true,
    isAvailable: true,
    preparationTime: '25-30 phút',
    calories: 620,
    ingredients: ['Tôm hùm Alaska 800g', 'Phô mai Gruyère', 'Bơ tỏi thảo mộc', 'Rượu vang trắng'],
    allergens: ['Hải sản', 'Lactose'],
    spicinessLevel: 0
  },
  {
    id: 'p-3',
    name: 'Cá Hồi Na Uy Áp Chảo Xốt Chanh Dây',
    slug: 'ca-hoi-na-uy-ap-chao',
    description: 'Cá hồi Na Uy tươi giòn da, bên trong mềm mọng đi kèm xốt chanh dây chua ngọt tinh tế.',
    longDescription: 'Phi lê cá hồi đại dương Na Uy chọn lọc áp chảo vàng giòn phần da, mọng nước bên trong. Phủ lên trên là lớp xốt chanh dây tươi mịn màng, kèm măng tây, cà chua anh đào đút lò và bông cải xanh.',
    price: 450000,
    originalPrice: 520000,
    categoryId: 'cat-1',
    categoryName: 'Món Chính Luxury',
    images: [
      'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&q=80&w=800'
    ],
    rating: 4.7,
    reviewCount: 86,
    isFeatured: true,
    isNew: false,
    isSale: false,
    isAvailable: true,
    preparationTime: '15-20 phút',
    calories: 490,
    ingredients: ['Cá hồi Na Uy', 'Chanh dây', 'Măng tây', 'Cà chua baby', 'Dầu ô liu Extra Virgin'],
    allergens: ['Hải sản (Cá)'],
    spicinessLevel: 0
  },
  {
    id: 'p-4',
    name: 'Gan Ngỗng Pháp Pan-Seared Foie Gras',
    slug: 'gan-ngong-phap-pan-seared',
    description: 'Gan ngỗng áp chảo kèm mứt quả mọng rừng và bánh mì Brioche nướng bơ.',
    longDescription: 'Gan ngỗng béo ngậy hảo hạng nhập khẩu từ Rougié Pháp, áp chảo xém cạnh ngạt ngào hương thơm. Phục vụ kèm xốt giảm bớt việt quất chua nhẹ và lót lớp bánh mì Brioche nướng thơm phức.',
    price: 680000,
    originalPrice: 750000,
    categoryId: 'cat-2',
    categoryName: 'Khai Vị Tinh Tế',
    images: [
      'https://images.unsplash.com/photo-1541529086526-db283c563270?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=800'
    ],
    rating: 4.9,
    reviewCount: 65,
    isFeatured: true,
    isNew: true,
    isSale: false,
    isAvailable: true,
    preparationTime: '12-15 phút',
    calories: 510,
    ingredients: ['Gan ngỗng béo Rougié', 'Mứt quả mọng', 'Bánh mì Brioche', 'Xốt Balsamic reduction'],
    allergens: ['Gluten', 'Lactose'],
    spicinessLevel: 0
  },
  {
    id: 'p-5',
    name: 'Súp Nấm Truffle Đen Hoàng Gia',
    slug: 'sup-nam-truffle-den',
    description: 'Súp nấm rừng sánh mịn quyện hương nấm Truffle Perigord và kem tươi Pháp.',
    longDescription: 'Món súp kem béo ngậy được hầm từ các loại nấm tự nhiên như Nấm Porcini, Nấm Đùi Gà và măng tây trắng, hòa quyện tinh dầu nấm Truffle Perigord hảo hạng. Phục vụ cùng bánh mì bơ tỏi giòn rụm.',
    price: 280000,
    originalPrice: 320000,
    categoryId: 'cat-3',
    categoryName: 'Súp & Salad Hữu Cơ',
    images: [
      'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&q=80&w=800'
    ],
    rating: 4.8,
    reviewCount: 72,
    isFeatured: false,
    isNew: false,
    isSale: true,
    isAvailable: true,
    preparationTime: '10-15 phút',
    calories: 280,
    ingredients: ['Nấm Porcini', 'Dầu Truffle đen', 'Kem tươi Anchor', 'Hành tây', 'Tỏi tây'],
    allergens: ['Lactose', 'Gluten'],
    spicinessLevel: 0
  },
  {
    id: 'p-6',
    name: 'Salad Bò Úc Nướng Xốt Mù Tạt Dijon',
    slug: 'salad-bo-uc-nuong',
    description: 'Xà lách thủy canh, bò Úc Tenderloin nướng vừa, phô mai Parmesan và xốt mù tạt hạt.',
    longDescription: 'Rau xà lách thủy canh hữu cơ tươi rói trộn cùng cà chua cherry, ớt chuông, ô liu đen và dưa leo. Bò Úc tenderloin nướng xém cắt lát mềm mượt đượm xốt mù tạt Dijon và giấm Balsamic.',
    price: 320000,
    originalPrice: 350000,
    categoryId: 'cat-3',
    categoryName: 'Súp & Salad Hữu Cơ',
    images: [
      'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=800'
    ],
    rating: 4.6,
    reviewCount: 48,
    isFeatured: false,
    isNew: false,
    isSale: false,
    isAvailable: true,
    preparationTime: '10-12 phút',
    calories: 340,
    ingredients: ['Bò Tenderloin Úc', 'Rau xanh thủy canh', 'Mù tạt Dijon', 'Phô mai Parmesan', 'Ô liu'],
    allergens: ['Lactose'],
    spicinessLevel: 1
  },
  {
    id: 'p-7',
    name: 'Sườn Cừu New Zealand Nướng Thảo Mộc',
    slug: 'suon-cuu-new-zealand',
    description: 'Sườn cừu non nướng lá hương thảo Rosemary, tỏi tươi và xốt mint mật ong.',
    longDescription: 'Cặp sườn cừu tơ nhập khẩu từ New Zealand mềm ngọt không hề hôi, tẩm ướp tiêu đen, lá hương thảo tươi và tỏi nướng đút lò. Phục vụ cùng khoai tây múi cau chiên bơ và xốt bạc hà mật ong thanh dịu.',
    price: 890000,
    originalPrice: 980000,
    categoryId: 'cat-4',
    categoryName: 'Món Nướng Robata',
    images: [
      'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80&w=800'
    ],
    rating: 4.9,
    reviewCount: 110,
    isFeatured: true,
    isNew: false,
    isSale: true,
    isAvailable: true,
    preparationTime: '20-25 phút',
    calories: 720,
    ingredients: ['Sườn cừu NZ 400g', 'Lá Hương thảo (Rosemary)', 'Thì là', 'Mật ong', 'Xốt mint'],
    allergens: [],
    spicinessLevel: 1
  },
  {
    id: 'p-8',
    name: 'Bánh Mousse Socola Dark Valrhona & Dâu Rừng',
    slug: 'mousse-socola-valrhona',
    description: 'Bánh Mousse socola đen 70% Pháp Valrhona kết hợp mứt dâu tây Đà Lạt mát lạnh.',
    longDescription: 'Tráng miệng đỉnh cao với socola Valrhona thượng hạng nhập Pháp. Lớp vỏ socola bóng bẩy ôm trọn phần kem mousse mềm mịn như mây, xen kẽ nhân mứt dâu rừng chua nhẹ thanh dịu tuyệt vời.',
    price: 190000,
    originalPrice: 220000,
    categoryId: 'cat-5',
    categoryName: 'Tráng Miệng Thượng Hạng',
    images: [
      'https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&q=80&w=800'
    ],
    rating: 4.9,
    reviewCount: 54,
    isFeatured: false,
    isNew: true,
    isSale: true,
    isAvailable: true,
    preparationTime: '10 phút',
    calories: 410,
    ingredients: ['Socola Valrhona 70%', 'Kem whipping', 'Dâu tây tươi', 'Lá bạc hà'],
    allergens: ['Lactose', 'Trứng', 'Gluten'],
    spicinessLevel: 0
  }
];

export const INITIAL_BRANCHES: Branch[] = [
  {
    id: 'branch-1',
    name: 'LuxeBistro Nam Từ Liêm (Trụ sở chính)',
    address: 'Số 2, Trịnh Văn Bô, Phường Phương Canh, Quận Nam Từ Liêm',
    district: 'Nam Từ Liêm',
    city: 'Hà Nội',
    phone: '0988 123 456',
    email: 'hanoi.namtuliem@luxebistro.vn',
    openingHours: '10:00 - 23:00 hàng ngày',
    latitude: 21.036,
    longitude: 105.748,
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=800',
    isMainBranch: true
  },
  {
    id: 'branch-2',
    name: 'LuxeBistro Hoàn Kiếm (Phố Cổ)',
    address: 'Số 15, Phố Lý Thường Kiệt, Phường Phan Chu Trinh, Quận Hoàn Kiếm',
    district: 'Hoàn Kiếm',
    city: 'Hà Nội',
    phone: '0988 654 321',
    email: 'hanoi.hoankiem@luxebistro.vn',
    openingHours: '10:00 - 23:30 hàng ngày',
    latitude: 21.025,
    longitude: 105.852,
    image: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&q=80&w=800',
    isMainBranch: false
  },
  {
    id: 'branch-3',
    name: 'LuxeBistro Quận 1 (TP. Hồ Chí Minh)',
    address: 'Số 88, Đường Đồng Khởi, Phường Bến Nghé, Quận 1',
    district: 'Quận 1',
    city: 'TP. Hồ Chí Minh',
    phone: '0909 888 999',
    email: 'hcm.quan1@luxebistro.vn',
    openingHours: '10:30 - 23:30 hàng ngày',
    latitude: 10.776,
    longitude: 106.701,
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=800',
    isMainBranch: false
  }
];

export const INITIAL_COUPONS: Coupon[] = [
  {
    id: 'c-1',
    code: 'LUXE2026',
    title: 'Giảm 15% Đơn Hàng Đầu Tiên',
    description: 'Áp dụng cho tất cả khách hàng mới trải nghiệm dịch vụ tại LuxeBistro',
    discountType: 'PERCENTAGE',
    discountValue: 15,
    minOrderValue: 500000,
    maxDiscountAmount: 300000,
    validUntil: '2026-12-31',
    usageLimit: 1000,
    usedCount: 240,
    isActive: true
  },
  {
    id: 'c-2',
    code: 'WAGYU200K',
    title: 'Voucher 200.000₫ Món Bò Wagyu',
    description: 'Giảm ngay 200k khi gọi món Bít Tết Bò Wagyu A5',
    discountType: 'FIXED',
    discountValue: 200000,
    minOrderValue: 1500000,
    validUntil: '2026-10-15',
    usageLimit: 500,
    usedCount: 112,
    isActive: true
  },
  {
    id: 'c-3',
    code: 'FREESHIP',
    title: 'Miễn Phí Giao Hàng Tận Nơi',
    description: 'Miễn phí giao hàng cho đơn từ 600.000₫ trong bán kính 10km',
    discountType: 'FIXED',
    discountValue: 50000,
    minOrderValue: 600000,
    validUntil: '2026-11-30',
    usageLimit: 2000,
    usedCount: 890,
    isActive: true
  }
];

export const INITIAL_BLOGS: BlogPost[] = [
  {
    id: 'b-1',
    title: 'Bí Mật Đằng Sau Hương Vị Bò Wagyu A5 Chuẩn Thượng Hạng',
    slug: 'bi-mat-bo-wagyu-a5',
    summary: 'Khám phá quy trình nuôi dưỡng khắt khe và nghệ thuật chế biến Bò Wagyu A5 tại bếp LuxeBistro.',
    content: 'Bò Wagyu A5 Nhật Bản được ví như kiệt tác nghệ thuật trong thế giới ẩm thực cao cấp. Tại LuxeBistro, chúng tôi nhập khẩu trực tiếp từ tỉnh Kagoshima...',
    coverImage: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=800',
    author: {
      name: 'Thùy Chan',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
      role: 'Head Culinary Editor'
    },
    category: 'Nghệ Thuật Ẩm Thực',
    tags: ['Wagyu A5', 'Bít Tết', 'Ẩm Thực Âu'],
    publishedAt: '2026-05-17',
    readTime: '5 phút',
    likesCount: 342,
    commentsCount: 28,
    isFeatured: true
  },
  {
    id: 'b-2',
    title: 'Nghệ Thuật Kết Hợp Rượu Vang Đỏ Cùng Các Món Nướng Robata',
    slug: 'nghe-thuat-ket-hop-ruou-vang-do',
    summary: 'Lựa chọn dòng rượu vang Merlot hay Cabernet Sauvignon nâng tầm vị giác cho bữa tối lãng mạn.',
    content: 'Sự cân bằng giữa vị chát tannin của rượu vang Pháp và độ béo ngậy của món thịt cừu nướng tạo nên sự bùng nổ hương vị không thể quên...',
    coverImage: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&q=80&w=800',
    author: {
      name: 'Chef Michael Vance',
      avatar: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&q=80&w=200',
      role: 'Executive Sommelier'
    },
    category: 'Rượu Vang & Thưởng Thức',
    tags: ['Rượu Vang', 'Sommelier', 'Pairing'],
    publishedAt: '2026-05-12',
    readTime: '4 phút',
    likesCount: 215,
    commentsCount: 14,
    isFeatured: false
  },
  {
    id: 'b-3',
    title: 'Hành Trình Tìm Kiếm Nguyên Liệu Organic Chuẩn 5 Sao',
    slug: 'hanh-trinh-nguyen-lieu-organic',
    summary: 'Tất cả rau củ quả tại nhà hàng đều được thu hoạch trong ngày từ trang trại thủy canh Đà Lạt.',
    content: 'Chất lượng món ăn khởi nguồn từ nguyên liệu tươi sạch nhất. LuxeBistro hợp tác cùng các trang trại đạt chuẩn GlobalGAP tại Đà Lạt...',
    coverImage: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=800',
    author: {
      name: 'Thùy Chan',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
      role: 'Head Culinary Editor'
    },
    category: 'Câu Chuyện Nguyên Liệu',
    tags: ['Organic', 'Sức Khỏe', 'LuxeBistro'],
    publishedAt: '2026-04-28',
    readTime: '6 phút',
    likesCount: 189,
    commentsCount: 9,
    isFeatured: false
  }
];
export const INITIAL_BLOGS: BlogPost[] = [
  {
    id: 'prod-010',
    name: 'Súp Bào Ngư Sốt Dầu Hào',
    price: 280000,
    originalPrice: 320000,
    rating: 4.9,
    reviewsCount: 38,
    category: 'appetizers',
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&q=80&w=800',
    description: 'Bào ngư thượng hạng hầm cùng nấm đông cô và nước sốt dầu hào đậm đà.',
    isFeatured: true,
    tags: ['Khai vị', 'Bổ dưỡng']
  },
  {
    id: 'prod-011',
    name: 'Thịt Cừu Nướng Thảo Mộc',
    price: 310000,
    originalPrice: 350000,
    rating: 4.8,
    reviewsCount: 24,
    category: 'main-courses',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=800',
    description: 'Sườn cừu ướp lá hương thảo nướng xém cạnh, ăn kèm sốt rượu vang đỏ.',
    isFeatured: true,
    tags: ['Món chính', 'Đặc sản']
  },
  {
    id: 'prod-012',
    name: 'Cơm Chiên Hải Sản Hoàng Kim',
    price: 150000,
    rating: 4.7,
    reviewsCount: 52,
    category: 'main-courses',
    image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&q=80&w=800',
    description: 'Cơm chiên hạt vàng óng bọc trứng muối, tôm sú, mực và hạt sen thơm bùi.',
    isFeatured: false,
    tags: ['Món chính', 'Bán chạy']
  },
  {
    id: 'prod-013',
    name: 'Cocktail Dâu Tây Bạc Hà',
    price: 65000,
    rating: 4.6,
    reviewsCount: 19,
    category: 'beverages',
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&q=80&w=800',
    description: 'Sự kết hợp giữa dâu tây tươi mọng, lá bạc hà thanh mát và một chút soda sảng khoái.',
    isFeatured: false,
    tags: ['Đồ uống']
  },
  {
    id: 'prod-014',
    name: 'Bánh Creme Brulee Vani',
    price: 60000,
    rating: 4.9,
    reviewsCount: 45,
    category: 'desserts',
    image: 'https://images.unsplash.com/photo-1470124182917-cc6e71b22ecc?auto=format&fit=crop&q=80&w=800',
    description: 'Lớp kem béo mịn bên dưới lớp đường đốt giòn tan thơm mùi vani Pháp.',
    isFeatured: true,
    tags: ['Tráng miệng']
  }
];
export const INITIAL_ANALYTICS: AnalyticsSummary = {
  totalRevenue: 285400000,
  totalOrders: 412,
  totalCustomers: 310,
  totalReservations: 184,
  monthlyRevenue: [
    { month: 'T1', revenue: 180000000, orders: 260 },
    { month: 'T2', revenue: 210000000, orders: 310 },
    { month: 'T3', revenue: 195000000, orders: 290 },
    { month: 'T4', revenue: 240000000, orders: 350 },
    { month: 'T5', revenue: 265000000, orders: 380 },
    { month: 'T6', revenue: 285400000, orders: 412 }
  ],
  categorySales: [
    { category: 'Món Chính Luxury', sales: 142000000 },
    { category: 'Món Nướng Robata', sales: 65000000 },
    { category: 'Rượu Vang & Đồ Uống', sales: 48000000 },
    { category: 'Khai Vị & Tráng Miệng', sales: 30400000 }
  ],
  recentOrders: [],
  topProducts: [
    { name: 'Bít Tết Bò Wagyu A5', salesCount: 128, revenue: 236800000 },
    { name: 'Tôm Hùm Alaska Đút Lò', salesCount: 94, revenue: 136300000 },
    { name: 'Sườn Cừu New Zealand', salesCount: 110, revenue: 97900000 }
  ]
};

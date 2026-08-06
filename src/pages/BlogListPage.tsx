import React, { useState } from 'react';
import { Calendar, User, Search, Sparkles, ChevronRight, Tag } from 'lucide-react';
import { INITIAL_BLOGS } from '../data/mockData';
import { formatDate } from '../lib/utils';

interface BlogListPageProps {
  onNavigateDetail: (blogId: string) => void;
}

export const BlogListPage: React.FC<BlogListPageProps> = ({ onNavigateDetail }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string>('all');

  const filtered = INITIAL_BLOGS.filter(b => {
    const matchSearch = !searchQuery || b.title.toLowerCase().includes(searchQuery.toLowerCase()) || b.summary.toLowerCase().includes(searchQuery.toLowerCase());
    const matchTag = selectedTag === 'all' || b.tags.includes(selectedTag);
    return matchSearch && matchTag;
  });

  return (
    <div className="w-full bg-[#0a0a0a] text-zinc-100 min-h-screen py-10 font-sans animate-fadeIn">
      <div className="max-w-7xl mx-auto px-4 space-y-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-rose-400 font-bold text-xs uppercase tracking-widest bg-rose-950/60 px-3 py-1 rounded-full border border-rose-800/60">
            Góc Tin Tức & Ẩm Thực
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-zinc-100">
            Cẩm Nang Fine Dining LuxeBistro
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400">
            Khám phá tinh hoa văn hóa ẩm thực, câu chuyện nguyên liệu hữu cơ và những bí quyết thưởng thức rượu vang
          </p>
        </div>

        {/* Filter bar */}
        <div className="bg-[#121212] p-4 rounded-2xl border border-zinc-800 shadow-xl flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="relative flex-1 max-w-xs">
            <input 
              type="text" 
              placeholder="Tìm bài viết..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-700 rounded-lg p-2 pl-8 text-zinc-100 outline-none focus:ring-2 focus:ring-rose-500 placeholder-zinc-500"
            />
            <Search className="w-4 h-4 text-zinc-500 absolute left-2.5 top-2.5" />
          </div>

          <div className="flex items-center space-x-2">
            <Tag className="w-4 h-4 text-zinc-500" />
            <span className="font-bold text-zinc-400">Thẻ:</span>
            {['all', 'Wagyu A5', 'Rượu Vang', 'Organic'].map(t => (
              <button
                key={t}
                onClick={() => setSelectedTag(t)}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-colors ${
                  selectedTag === t ? 'bg-[#e11d48] text-white shadow-md shadow-rose-950/50' : 'bg-zinc-900 text-zinc-300 hover:bg-zinc-800 border border-zinc-800'
                }`}
              >
                {t === 'all' ? 'Tất cả' : t}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filtered.map(blog => (
            <article 
              key={blog.id} 
              onClick={() => onNavigateDetail(blog.id)}
              className="bg-[#121212] rounded-2xl border border-zinc-800 overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col group cursor-pointer"
            >
              <div className="aspect-[16/10] overflow-hidden relative">
                <img src={blog.coverImage} alt={blog.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <span className="absolute top-3 left-3 bg-[#e11d48] text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-lg shadow-rose-950/60">
                  {blog.category}
                </span>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <h3 className="font-serif text-base font-bold text-zinc-100 group-hover:text-[#e11d48] transition-colors line-clamp-2">
                    {blog.title}
                  </h3>
                  <p className="text-xs text-zinc-400 line-clamp-3 mt-2 leading-relaxed">
                    {blog.summary}
                  </p>
                </div>

                <div className="pt-3 border-t border-zinc-800 text-[11px] text-zinc-400 flex items-center justify-between">
                  <span className="flex items-center space-x-1">
                    <Calendar className="w-3.5 h-3.5 text-[#e11d48]" />
                    <span>{formatDate(blog.publishedAt)}</span>
                  </span>
                  <span className="font-bold text-[#e11d48]">Đọc tiếp &rarr;</span>
                </div>
              </div>
            </article>
          ))}
        </div>

      </div>
    </div>
  );
};

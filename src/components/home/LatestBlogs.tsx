import React from 'react';
import { Calendar, User, ArrowRight, Sparkles } from 'lucide-react';
import { INITIAL_BLOGS } from '../../data/mockData';
import { formatDate } from '../../lib/utils';

interface LatestBlogsProps {
  onNavigateBlog: (blogId?: string) => void;
}

export const LatestBlogs: React.FC<LatestBlogsProps> = ({ onNavigateBlog }) => {
  return (
    <section className="py-16 bg-[#0a0a0a] border-b border-zinc-800 text-zinc-100">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <div className="inline-flex items-center space-x-1.5 text-rose-400 font-bold text-xs uppercase tracking-widest bg-rose-950/60 px-3 py-1 rounded-full border border-rose-800/60">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Góc Ẩm Thực & Tin Tức</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-zinc-100">
            Cẩm Nang & Câu Chuyện LuxeBistro
          </h2>

          <p className="text-xs sm:text-sm text-zinc-400">
            Cập nhật nghệ thuật ẩm thực, bí quyết chọn rượu vang và các sự kiện nổi bật
          </p>
        </div>

        {/* Blog Grid matching wireframe cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {INITIAL_BLOGS.map(blog => (
            <article 
              key={blog.id} 
              className="bg-[#121212] rounded-2xl border border-zinc-800 overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col group cursor-pointer"
              onClick={() => onNavigateBlog(blog.id)}
            >
              {/* Cover Image */}
              <div className="aspect-[16/10] overflow-hidden relative">
                <img 
                  src={blog.coverImage} 
                  alt={blog.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
                <span className="absolute top-3 left-3 bg-[#e11d48] text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-lg shadow-rose-950/60">
                  {blog.category}
                </span>
              </div>

              {/* Content */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <h3 className="font-serif text-base font-bold text-zinc-100 group-hover:text-[#e11d48] transition-colors line-clamp-2 leading-snug">
                    {blog.title}
                  </h3>

                  <p className="text-xs text-zinc-400 line-clamp-2 mt-2 leading-relaxed">
                    {blog.summary}
                  </p>
                </div>

                {/* Footer Metadata matching wireframe format */}
                <div className="pt-3 border-t border-zinc-800/80 text-[11px] text-zinc-400 flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center space-x-2">
                    <span className="flex items-center space-x-1">
                      <Calendar className="w-3 h-3 text-[#e11d48]" />
                      <span>{formatDate(blog.publishedAt)}</span>
                    </span>
                    <span className="text-zinc-700">|</span>
                    <span className="flex items-center space-x-1">
                      <User className="w-3 h-3 text-[#e11d48]" />
                      <span>Tạo bởi: <strong className="text-zinc-200">{blog.author.name}</strong></span>
                    </span>
                  </div>

                  <span className="text-[#e11d48] font-bold group-hover:translate-x-1 transition-transform inline-flex items-center space-x-0.5">
                    <span>Xem thêm</span>
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>

              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
};

import React, { useState } from 'react';
import { Calendar, User, Heart, Share2, MessageSquare, ChevronRight, ArrowLeft } from 'lucide-react';
import { INITIAL_BLOGS } from '../data/mockData';
import { formatDate } from '../lib/utils';
import { useCart } from '../context/CartContext';

interface BlogDetailPageProps {
  blogId?: string;
  onNavigateBlogList: () => void;
  onNavigateDetail: (id: string) => void;
}

export const BlogDetailPage: React.FC<BlogDetailPageProps> = ({ blogId, onNavigateBlogList, onNavigateDetail }) => {
  const { showToast } = useCart();
  const blog = INITIAL_BLOGS.find(b => b.id === blogId) || INITIAL_BLOGS[0];

  const [likes, setLikes] = useState(blog.likesCount);
  const [hasLiked, setHasLiked] = useState(false);
  
  const [comments, setComments] = useState([
    { id: 'c-1', name: 'Trần Mỹ Linh', text: 'Bài viết rất hay! Minh vừa thử Bò Wagyu tuần trước tại chi nhánh Hoàn Kiếm, thực sự tuyệt vời.', date: '2026-05-18' },
    { id: 'c-2', name: 'Hoàng Quốc Bảo', text: 'Nhà hàng có phục vụ phòng riêng cho gia đình tầm 10 người không ạ?', date: '2026-05-19' }
  ]);
  const [commentName, setCommentName] = useState('');
  const [commentText, setCommentText] = useState('');

  const handleLike = () => {
    if (hasLiked) {
      setLikes(likes - 1);
      setHasLiked(false);
    } else {
      setLikes(likes + 1);
      setHasLiked(true);
      showToast('Cảm ơn bạn đã yêu thích bài viết!');
    }
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentName || !commentText) {
      showToast('Vui lòng nhập tên và bình luận');
      return;
    }
    const newC = {
      id: `c-${Date.now()}`,
      name: commentName,
      text: commentText,
      date: new Date().toISOString().split('T')[0]
    };
    setComments([newC, ...comments]);
    setCommentName('');
    setCommentText('');
    showToast('Đã gửi bình luận!');
  };

  return (
    <div className="w-full bg-[#0a0a0a] text-zinc-100 min-h-screen py-10 font-sans animate-fadeIn">
      <div className="max-w-4xl mx-auto px-4 space-y-8">
        
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-xs text-zinc-400">
          <button onClick={onNavigateBlogList} className="hover:text-[#e11d48]">Blog Tin Tức</button>
          <ChevronRight className="w-3 h-3 text-zinc-600" />
          <span className="font-bold text-zinc-100 line-clamp-1">{blog.title}</span>
        </div>

        <button 
          onClick={onNavigateBlogList}
          className="text-xs font-bold text-zinc-400 hover:text-[#e11d48] flex items-center space-x-1 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Trở về danh sách bài viết</span>
        </button>

        {/* Main Article Container */}
        <article className="bg-[#121212] rounded-2xl border border-zinc-800 overflow-hidden shadow-xl p-6 sm:p-10 space-y-6">
          
          <div className="space-y-3">
            <span className="bg-[#e11d48] text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-lg shadow-rose-950/60">
              {blog.category}
            </span>

            <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-zinc-100 leading-tight">
              {blog.title}
            </h1>

            <div className="flex items-center space-x-4 text-xs text-zinc-400 pt-2 border-b border-zinc-800 pb-4">
              <span className="flex items-center space-x-1.5">
                <User className="w-4 h-4 text-[#e11d48]" />
                <span>Tác giả: <strong className="text-zinc-100">{blog.author.name}</strong> ({blog.author.role})</span>
              </span>
              <span>|</span>
              <span className="flex items-center space-x-1.5">
                <Calendar className="w-4 h-4 text-[#e11d48]" />
                <span>{formatDate(blog.publishedAt)}</span>
              </span>
            </div>
          </div>

          <div className="aspect-[16/9] rounded-2xl overflow-hidden shadow-2xl border border-zinc-800">
            <img src={blog.coverImage} alt={blog.title} className="w-full h-full object-cover" />
          </div>

          <div className="prose max-w-none text-zinc-300 text-sm leading-relaxed space-y-4">
            <p className="font-semibold text-base text-zinc-100 italic bg-zinc-900/80 p-4 rounded-xl border-l-4 border-[#e11d48]">
              "{blog.summary}"
            </p>

            <p>
              {blog.content}
            </p>

            <p>
              Bên cạnh nguyên liệu tuyển chọn khắt khe, triết lý phục vụ tại LuxeBistro luôn coi trải nghiệm cảm xúc của khách hàng là kim chỉ nam hàng đầu. Chúng tôi không chỉ mang tới món ăn thơm ngon, mà còn kiến tạo bầu không khí ấm cúng cho mỗi khoảnh khắc đoàn tụ gia đình hay gặp gỡ đối tác.
            </p>
          </div>

          {/* Social Share & Likes */}
          <div className="pt-6 border-t border-zinc-800 flex items-center justify-between">
            <button 
              onClick={handleLike}
              className={`flex items-center space-x-2 px-4 py-2 rounded-full border text-xs font-bold transition-all ${
                hasLiked ? 'bg-rose-950/80 border-rose-800 text-[#e11d48]' : 'border-zinc-700 text-zinc-300 hover:bg-zinc-900'
              }`}
            >
              <Heart className={`w-4 h-4 ${hasLiked ? 'fill-current' : ''}`} />
              <span>Yêu Thích ({likes})</span>
            </button>

            <div className="flex items-center space-x-2 text-xs text-zinc-400">
              <Share2 className="w-4 h-4" />
              <span>Chia sẻ bài viết</span>
            </div>
          </div>

        </article>

        {/* Comments Section */}
        <div className="bg-[#121212] rounded-2xl border border-zinc-800 p-6 shadow-xl space-y-6">
          <h3 className="font-serif text-xl font-bold text-zinc-100 flex items-center space-x-2">
            <MessageSquare className="w-5 h-5 text-[#e11d48]" />
            <span>Bình Luận ({comments.length})</span>
          </h3>

          <form onSubmit={handleAddComment} className="space-y-3 text-xs">
            <input 
              type="text" 
              placeholder="Tên của bạn *"
              value={commentName}
              onChange={e => setCommentName(e.target.value)}
              required
              className="w-full bg-zinc-900 border border-zinc-700 rounded-lg p-2.5 text-zinc-100 outline-none focus:ring-2 focus:ring-rose-500 placeholder-zinc-500"
            />
            <textarea 
              rows={3}
              placeholder="Ý kiến hoặc câu hỏi của bạn..."
              value={commentText}
              onChange={e => setCommentText(e.target.value)}
              required
              className="w-full bg-zinc-900 border border-zinc-700 rounded-lg p-2.5 text-zinc-100 outline-none focus:ring-2 focus:ring-rose-500 placeholder-zinc-500"
            />
            <button type="submit" className="bg-[#e11d48] text-white text-xs font-bold px-4 py-2 rounded-lg hover:bg-rose-700 shadow-md shadow-rose-950/50 transition-colors">
              Gửi Bình Luận
            </button>
          </form>

          <div className="divide-y divide-zinc-800/80 pt-2">
            {comments.map(c => (
              <div key={c.id} className="py-3 text-xs space-y-1">
                <div className="flex justify-between items-center">
                  <strong className="text-zinc-100">{c.name}</strong>
                  <span className="text-zinc-500">{c.date}</span>
                </div>
                <p className="text-zinc-300">{c.text}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

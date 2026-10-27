import React, { useState } from 'react';
import { BLOG_POSTS } from '../data/mockData';
import { BlogPost } from '../types';
import { ArrowLeft, Clock, Calendar, Share2, Bookmark } from 'lucide-react';

interface BlogViewProps {
  onBackToHome: () => void;
  onShopClick: () => void;
}

export const BlogView: React.FC<BlogViewProps> = ({ onBackToHome, onShopClick }) => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  return (
    <div className="py-12 bg-white min-h-[70vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-100">
          <button
            onClick={() => {
              if (selectedPost) setSelectedPost(null);
              else onBackToHome();
            }}
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-slate-900 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{selectedPost ? 'Back to Blog List' : 'Back to Home'}</span>
          </button>

          <button
            onClick={onShopClick}
            className="text-xs font-bold text-sky-600 hover:text-sky-800 uppercase tracking-wider cursor-pointer"
          >
            Explore Shop →
          </button>
        </div>

        {selectedPost ? (
          /* Article Detail View */
          <article className="max-w-3xl mx-auto py-6 space-y-8 animate-in fade-in duration-200">
            <div className="space-y-4 text-center sm:text-left">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-sky-100 text-sky-800 uppercase tracking-wider">
                {selectedPost.category}
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                {selectedPost.title}
              </h1>
              <div className="flex items-center justify-center sm:justify-start gap-4 text-xs text-slate-500">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{selectedPost.date}</span>
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{selectedPost.readTime}</span>
                </span>
              </div>
            </div>

            <div className="aspect-[16/9] w-full rounded-2xl overflow-hidden bg-slate-100 shadow-md">
              <img
                src={selectedPost.image}
                alt={selectedPost.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.currentTarget;
                  target.src = '/images/range_recovery.jpg';
                }}
              />
            </div>

            <div className="prose prose-slate lg:prose-lg max-w-none text-slate-700 leading-relaxed space-y-4">
              <p className="text-lg font-medium text-slate-900 border-l-4 border-sky-500 pl-4 py-1 bg-sky-50/50 rounded-r-lg">
                {selectedPost.summary}
              </p>
              {selectedPost.content.split('\n\n').map((paragraph, idx) => (
                <p key={idx} className="text-base text-slate-700 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="pt-8 border-t border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => alert('Article saved to your reading list!')}
                  className="p-2 border border-slate-200 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-50 cursor-pointer flex items-center gap-1.5 text-xs font-semibold"
                >
                  <Bookmark className="w-4 h-4" />
                  <span>Save</span>
                </button>
                <button
                  onClick={() => {
                    navigator.clipboard?.writeText(window.location.href);
                    alert('Link copied to clipboard!');
                  }}
                  className="p-2 border border-slate-200 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-50 cursor-pointer flex items-center gap-1.5 text-xs font-semibold"
                >
                  <Share2 className="w-4 h-4" />
                  <span>Share</span>
                </button>
              </div>

              <button
                onClick={onShopClick}
                className="px-6 py-2.5 bg-slate-900 hover:bg-sky-600 text-white font-bold rounded-xl text-xs transition-colors cursor-pointer"
              >
                Shop Aqua Bliss Now
              </button>
            </div>
          </article>
        ) : (
          /* Blog Grid List */
          <div className="space-y-12">
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-sky-600">
                Hydration Science & Performance
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                The Aqua Bliss Journal
              </h1>
              <p className="text-base text-slate-600">
                Explore our deep dives into electrolyte osmolarity, peptide kinetics, and modern athletic recovery.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {BLOG_POSTS.map((post) => (
                <div
                  key={post.id}
                  onClick={() => setSelectedPost(post)}
                  className="group bg-white rounded-2xl border border-slate-200/80 hover:border-sky-300 hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer flex flex-col"
                >
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                      onError={(e) => {
                        const target = e.currentTarget;
                        target.src = '/images/range_recovery.jpg';
                      }}
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-2.5 py-1 text-[11px] font-bold rounded-md bg-white/90 backdrop-blur-xs text-slate-900 shadow-xs">
                        {post.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-xs text-slate-400">
                        <span>{post.date}</span>
                        <span>•</span>
                        <span>{post.readTime}</span>
                      </div>
                      <h3 className="text-lg font-bold text-slate-900 group-hover:text-sky-600 transition-colors leading-snug">
                        {post.title}
                      </h3>
                      <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                        {post.summary}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-slate-100 text-xs font-bold text-sky-600 flex items-center justify-between">
                      <span>Read Full Article</span>
                      <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

import React from 'react';
import { Post } from '@/types';
import Card from '@/components/common/Card';
import { HeartIcon, MessageIcon, ShareIcon, MoreIcon } from '@/components/common/Icons';

/**
 * 📱 현대적인 게시물 카드 컴포넌트
 * 토스, 배민 스타일의 깔끔하고 따뜻한 디자인
 */

interface PostCardProps {
  /** 표시할 게시물 데이터 */
  post: Post;
  /** 좋아요 버튼 클릭 핸들러 */
  onLike?: (postId: string) => void;
  /** 댓글 버튼 클릭 핸들러 */
  onComment?: (postId: string) => void;
  /** 공유 버튼 클릭 핸들러 */
  onShare?: (postId: string) => void;
}

export default function PostCard({
  post,
  onLike,
  onComment,
  onShare,
}: PostCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60 * 60)
    );

    if (diffInHours < 1) return "방금 전";
    if (diffInHours < 24) return `${diffInHours}시간 전`;
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}일 전`;
    return date.toLocaleDateString("ko-KR");
  };

  return (
    <Card className="mb-4" hover>
      {/* 게시물 헤더 */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-[var(--primary)] to-[var(--primary-light)] rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-semibold">
              {post.author.username.charAt(0)}
            </span>
          </div>
          <div>
            <p className="font-medium text-[var(--text-primary)]">
              {post.author.username}
            </p>
            <p className="text-xs text-[var(--text-muted)]">
              {formatDate(post.createdAt)}
            </p>
          </div>
        </div>
        <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <MoreIcon size={18} />
        </button>
      </div>

      {/* 카테고리 태그 */}
      <div className="mb-3">
        <span
          className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium"
          style={{
            backgroundColor: `${post.category.color}15`,
            color: post.category.color,
          }}
        >
          <span className="mr-1">{post.category.icon}</span>
          {post.category.name}
        </span>
      </div>

      {/* 게시물 내용 */}
      <div className="mb-4">
        <h3 className="font-semibold text-[var(--text-primary)] mb-2 leading-relaxed">
          {post.title}
        </h3>
        <p className="text-[var(--text-secondary)] leading-relaxed line-clamp-3">
          {post.content}
        </p>
      </div>

      {/* 태그 */}
      {post.tags.length > 0 && (
        <div className="mb-4 flex flex-wrap gap-2">
          {post.tags.map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-gray-100 text-[var(--text-muted)] text-xs rounded-md"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* 액션 버튼 */}
      <div className="flex items-center justify-between pt-3 border-t border-[var(--border-light)]">
        <div className="flex items-center space-x-4">
          <button
            className="flex items-center space-x-2 text-[var(--text-muted)] hover:text-[var(--primary)] transition-colors"
            onClick={() => onLike?.(post.id)}
          >
            <HeartIcon size={18} />
            <span className="text-sm">{post.likes}</span>
          </button>
          <button
            className="flex items-center space-x-2 text-[var(--text-muted)] hover:text-[var(--primary)] transition-colors"
            onClick={() => onComment?.(post.id)}
          >
            <MessageIcon size={18} />
            <span className="text-sm">{post.comments.length}</span>
          </button>
        </div>
        <button
          className="p-2 text-[var(--text-muted)] hover:text-[var(--primary)] transition-colors"
          onClick={() => onShare?.(post.id)}
        >
          <ShareIcon size={18} />
        </button>
      </div>
    </Card>
  );
}

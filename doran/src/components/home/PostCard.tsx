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

export default function PostCard({ post, onLike, onComment, onShare }: PostCardProps) {
  /**
   * ⏰ 날짜 포매팅 함수
   * 상대적 시간 표시 (방금 전, N시간 전, N일 전)
   */
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return '방금 전';
    if (diffInHours < 24) return `${diffInHours}시간 전`;
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}일 전`;
    return date.toLocaleDateString('ko-KR');
  };

  /**
   * 🎨 카테고리 배경색 생성 함수
   * 브랜드 컬러를 기반으로 투명도가 있는 배경색 생성
   */
  const getCategoryStyle = () => ({
    backgroundColor: `${post.category.color}20`,
    color: post.category.color,
  });

  return (
    <Card 
      className="animate-scale-in hover:shadow-md transition-all duration-300" 
      padding="lg" 
      hover
    >
      {/* 👤 게시물 헤더 - 작성자 정보 */}
      <div className="flex items-center justify-between mb-lg">
        <div className="flex items-center space-lg">
          {/* 프로필 아바타 */}
          <div className="relative">
            <div 
              className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg"
              style={{
                background: `linear-gradient(135deg, var(--primary) 0%, var(--primary-600) 100%)`
              }}
            >
              {post.author.username.charAt(0)}
            </div>
            {/* 온라인 상태 표시 (선택사항) */}
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white"></div>
          </div>
          
          {/* 사용자 정보 */}
          <div>
            <h4 className="font-semibold text-gray-900 text-base">
              {post.author.username}
            </h4>
            <p className="text-sm text-secondary">
              {formatDate(post.createdAt)}
            </p>
          </div>
        </div>

        {/* 더보기 메뉴 버튼 */}
        <button 
          className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
          aria-label="게시물 옵션"
        >
          <MoreIcon size={20} color="var(--gray-400)" />
        </button>
      </div>

      {/* 🏷️ 카테고리 태그 */}
      <div className="mb-lg">
        <span 
          className="inline-flex items-center px-md py-xs rounded-full text-xs font-semibold"
          style={getCategoryStyle()}
        >
          <span className="mr-xs text-base">{post.category.icon}</span>
          {post.category.name}
        </span>
      </div>

      {/* 📄 게시물 콘텐츠 */}
      <div className="mb-lg">
        <h2 className="font-bold text-gray-900 text-lg mb-sm leading-relaxed">
          {post.title}
        </h2>
        <p className="text-secondary leading-relaxed line-clamp-3">
          {post.content}
        </p>
      </div>

      {/* 🏷️ 해시태그 */}
      {post.tags.length > 0 && (
        <div className="mb-lg">
          <div className="flex flex-wrap gap-xs">
            {post.tags.map((tag, index) => (
              <span
                key={index}
                className="tag text-xs px-sm py-xs"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* 🎯 액션 버튼 영역 */}
      <div className="flex items-center justify-between pt-lg border-t border-gray-100">
        {/* 좌측: 좋아요, 댓글 버튼 */}
        <div className="flex items-center space-xl">
          {/* 좋아요 버튼 */}
          <button 
            className="flex items-center space-sm text-secondary hover:text-red-500 transition-colors duration-200 group"
            onClick={() => onLike?.(post.id)}
            aria-label={`좋아요 ${post.likes}개`}
          >
            <HeartIcon 
              size={20} 
              className="group-hover:scale-110 transition-transform duration-200"
            />
            <span className="text-sm font-medium">{post.likes}</span>
          </button>
          
          {/* 댓글 버튼 */}
          <button 
            className="flex items-center space-sm text-secondary hover:text-blue-500 transition-colors duration-200 group"
            onClick={() => onComment?.(post.id)}
            aria-label={`댓글 ${post.comments.length}개`}
          >
            <MessageIcon 
              size={20} 
              className="group-hover:scale-110 transition-transform duration-200"
            />
            <span className="text-sm font-medium">{post.comments.length}</span>
          </button>
        </div>

        {/* 우측: 공유 버튼 */}
        <button 
          className="p-2 text-secondary hover:text-primary hover:bg-primary-50 rounded-full transition-all duration-200"
          onClick={() => onShare?.(post.id)}
          aria-label="게시물 공유"
        >
          <ShareIcon size={20} />
        </button>
      </div>
    </Card>
  );
}

/**
 * 📱 컴포넌트 특징:
 * 
 * ✨ 현대적 디자인 요소
 * - 깔끔한 카드 레이아웃
 * - 부드러운 그라데이션과 그림자
 * - 일관된 간격과 타이포그래피
 * 
 * 🎯 인터랙티브 요소
 * - 호버 애니메이션
 * - 버튼 상태 변화
 * - 접근성을 고려한 ARIA 라벨
 * 
 * 📐 반응형 디자인
 * - 모바일 최적화
 * - 적절한 터치 타겟 크기
 * - 읽기 편한 타이포그래피
 */
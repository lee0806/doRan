'use client';

import { useState } from 'react';
import Header from '@/components/home/Header';
import CategoryFilter from '@/components/home/CategoryFilter';
import PostCard from '@/components/home/PostCard';
import { dummyPosts, postCategories } from '@/data/dummyData';
import { Post } from '@/types';

/**
 * 🏠 메인 홈 페이지 컴포넌트
 * 현대적이고 따뜻한 커뮤니티 피드 화면
 * 토스, 배민, 당근마켓 스타일의 깔끔한 디자인
 */

export default function Home() {
  // 📱 상태 관리 - 현재 선택된 카테고리
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  
  // 📝 상태 관리 - 게시물 데이터
  const [posts, setPosts] = useState<Post[]>(dummyPosts);
  
  // 🔍 상태 관리 - 검색 쿼리
  const [searchQuery, setSearchQuery] = useState('');

  /**
   * 🎯 게시물 필터링 로직
   * 카테고리와 검색어를 기반으로 게시물을 필터링합니다
   */
  const filteredPosts = posts.filter(post => {
    // 카테고리 필터링
    const matchesCategory = !activeCategory || post.category.id === activeCategory;
    
    // 검색어 필터링 (제목, 내용, 태그에서 검색)
    const matchesSearch = !searchQuery || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesCategory && matchesSearch;
  });

  /**
   * 💖 좋아요 버튼 핸들러
   * 해당 게시물의 좋아요 수를 증가시킵니다
   */
  const handleLike = (postId: string) => {
    setPosts(prev => prev.map(post => 
      post.id === postId 
        ? { ...post, likes: post.likes + 1 }
        : post
    ));
  };

  /**
   * 💬 댓글 버튼 핸들러
   * 댓글 작성/보기 페이지로 이동합니다
   */
  const handleComment = (postId: string) => {
    // TODO: 댓글 페이지로 라우팅 구현
    console.log('Navigate to comments for post:', postId);
  };

  /**
   * 📤 공유 버튼 핸들러
   * 게시물을 공유합니다
   */
  const handleShare = (postId: string) => {
    // TODO: 공유 기능 구현 (카카오톡, 링크 복사 등)
    console.log('Share post:', postId);
  };

  /**
   * 🔍 검색 핸들러
   * 검색어를 업데이트합니다
   */
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <div className="min-h-screen bg-secondary">
      {/* 🔝 상단 헤더 영역 */}
      <Header onSearch={handleSearch} />
      
      {/* 📱 메인 콘텐츠 영역 - 여유로운 패딩 적용 */}
      <div className="px-lg">
        {/* 🏷️ 카테고리 필터 */}
        <CategoryFilter
          categories={postCategories}
          activeCategory={activeCategory}
          onCategorySelect={setActiveCategory}
        />
        
        {/* 📝 게시물 피드 영역 */}
        <div className="pb-2xl">
          {filteredPosts.length === 0 ? (
            /* 🤔 빈 상태 화면 - 현대적이고 친근한 디자인 */
            <div className="text-center py-3xl animate-fade-in">
              <div className="mb-xl">
                <div className="text-6xl mb-lg">🤔</div>
                <h3 className="text-xl font-bold text-gray-900 mb-md">
                  게시물을 찾을 수 없어요
                </h3>
                <p className="text-secondary leading-relaxed">
                  {searchQuery 
                    ? `'${searchQuery}'에 대한 검색 결과가 없습니다`
                    : '다른 카테고리를 선택하거나 검색어를 입력해보세요'
                  }
                </p>
              </div>
            </div>
          ) : (
            /* 📱 게시물 목록 - 카드 형태로 표시 */
            <div className="space-y-lg animate-slide-up">
              {filteredPosts.map((post, index) => (
                <div 
                  key={post.id}
                  className="animate-slide-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <PostCard
                    post={post}
                    onLike={handleLike}
                    onComment={handleComment}
                    onShare={handleShare}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 🔄 로딩 인디케이터 (추후 무한 스크롤용) */}
        {filteredPosts.length > 0 && (
          <div className="text-center py-xl animate-fade-in">
            <div className="inline-flex items-center space-sm text-secondary">
              <div className="w-1 h-1 bg-primary rounded-full animate-pulse"></div>
              <div className="w-1 h-1 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-1 h-1 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
              <span className="ml-sm text-sm">더 많은 따뜻한 이야기들을 불러오는 중</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * 📱 페이지 특징:
 * 
 * ✨ 현대적 디자인
 * - 깔끔한 카드 레이아웃
 * - 부드러운 애니메이션
 * - 일관된 색상 시스템
 * 
 * 🎯 사용성
 * - 직관적인 카테고리 필터
 * - 실시간 검색 기능
 * - 반응형 디자인
 * 
 * 💖 감성적 요소
 * - 따뜻한 색감과 이모지
 * - 친근한 메시지
 * - 부드러운 인터랙션
 */
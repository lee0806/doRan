"use client";

import { useState } from "react";
import Header from "@/components/home/Header";
import CategoryFilter from "@/components/home/CategoryFilter";
import PostCard from "@/components/home/PostCard";
import { dummyPosts, postCategories } from "@/data/dummyData";
import { Post } from "@/types";

export default function Home() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [posts, setPosts] = useState<Post[]>(dummyPosts);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = posts.filter((post) => {
    const matchesCategory =
      !activeCategory || post.category.id === activeCategory;
    const matchesSearch =
      !searchQuery ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      );

    return matchesCategory && matchesSearch;
  });

  const handleLike = (postId: string) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === postId ? { ...post, likes: post.likes + 1 } : post
      )
    );
  };

  const handleComment = (postId: string) => {
    // 댓글 페이지로 이동하는 로직
    console.log("Comment on post:", postId);
  };

  const handleShare = (postId: string) => {
    // 공유 기능 로직
    console.log("Share post:", postId);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <Header onSearch={handleSearch} />

      <div className="px-4">
        <CategoryFilter
          categories={postCategories}
          activeCategory={activeCategory}
          onCategorySelect={setActiveCategory}
        />

        {/* 게시물 목록 */}
        <div className="pb-6">
          {filteredPosts.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🤔</div>
              <h3 className="text-lg font-medium text-[var(--text-primary)] mb-2">
                게시물을 찾을 수 없어요
              </h3>
              <p className="text-[var(--text-muted)]">
                다른 카테고리나 검색어를 시도해보세요
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredPosts.map((post) => (
                <PostCard
                  key={post.id}
                  post={post}
                  onLike={handleLike}
                  onComment={handleComment}
                  onShare={handleShare}
                />
              ))}
            </div>
          )}
        </div>

        {/* 로딩 상태 (추후 무한 스크롤용) */}
        {filteredPosts.length > 0 && (
          <div className="text-center py-8">
            <div className="text-[var(--text-muted)]">
              더 많은 따뜻한 이야기들을 불러오는 중...
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

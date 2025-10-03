"use client";

// 메인 페이지
import { useState } from "react";
import Header from "@/components/home/Header";
import CategoryFilter from "@/components/home/CategoryFilter";

export default function Home() {
  // 🔍 상태 관리 - 검색 쿼리
  const [searchQuery, setSearchQuery] = useState("");

  /**
   * 🎯 게시물 필터링 로직
   * 검색어를 기반으로 게시물을 필터링합니다
   */

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <div className="min-h-screen bg-secondary">
      {/* 🔝 상단 헤더 영역 */}
      <Header onSearch={handleSearch} />

      {/* 🗂 카테고리 필터 영역 */}
      <CategoryFilter />
    </div>
  );
}

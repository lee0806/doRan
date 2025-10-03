"use client";

import React, { useState } from "react";

interface HeaderProps {
  /** 검색어 입력 시 호출되는 콜백 함수 */
  onSearch?: (query: string) => void;
  /** 필터 버튼 클릭 시 호출되는 콜백 함수 */
  onFilterOpen?: () => void;
}

export default function Header({ onSearch, onFilterOpen }: HeaderProps) {
  // 🔍 검색어 상태 관리
  const [searchQuery, setSearchQuery] = useState("");
  // 🎯 검색 모드 상태 (검색창 확장/축소)
  const [isSearchMode, setIsSearchMode] = useState(false);

  // 검색 제출
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(searchQuery);
    setIsSearchMode(false);
  };

  // 입력 변경
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    onSearch?.(value);
  };

  // 검색 모드 토글
  const toggleSearchMode = () => {
    setIsSearchMode((v) => !v);
    if (isSearchMode) {
      setSearchQuery("");
      onSearch?.("");
    }
  };

  return (
    <header className="bg-white border-b border-gray-200 z-50">
      <div className="px-4 py-4">
        {!isSearchMode ? (
          /* 🏠 일반 헤더 모드 */
          <div className="flex items-center justify-between">
            {/* 브랜드 영역 */}
            <div className="flex-1">
              <h1 className="text-2xl font-bold">doRan</h1>
              <p className="text-gray-500 text-sm mt-1 leading-tight">
                따뜻한 소통이 시작되는 곳
              </p>
            </div>

            {/* 우측 액션 버튼들 */}
            <div className="flex items-center gap-2">
              {/* 검색 버튼 */}
              <button
                type="button"
                onClick={toggleSearchMode}
                aria-label="검색하기"
                className="inline-flex items-center justify-center h-9 w-9 rounded-xl text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-gray-400"
              >
                {/* search icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.3-4.3" />
                </svg>
              </button>

              {/* 필터 버튼 */}
              <button
                type="button"
                onClick={onFilterOpen}
                aria-label="필터 설정"
                className="inline-flex items-center justify-center h-9 w-9 rounded-xl text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-gray-400"
              >
                {/* filter icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M3 6h18" />
                  <path d="M7 12h10" />
                  <path d="M10 18h4" />
                </svg>
              </button>

              {/* 알림 버튼 + 배지 */}
              <button
                type="button"
                aria-label="알림 확인"
                className="relative inline-flex items-center justify-center h-9 w-9 rounded-xl text-gray-700 hover:bg-gray-100 focus:outline-none  focus:ring-gray-400"
              >
                {/* bell icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M6 8a6 6 0 0 1 12 0c0 7 3 5 3 9H3c0-4 3-2 3-9" />
                  <path d="M10.3 21a1.7 1.7 0 0 0 3.4 0" />
                </svg>
                <span className="absolute -top-1 -right-1 z-10 pointer-events-none w-5 h-5 bg-red-500 text-white text-[10px] leading-none rounded-full flex items-center justify-center font-bold">
                  3
                </span>
              </button>
            </div>
          </div>
        ) : (
          /* 🔍 검색 모드 */
          <div className="flex items-center gap-3">
            {/* 뒤로가기 버튼 */}
            <button
              type="button"
              onClick={toggleSearchMode}
              aria-label="검색 취소"
              className="inline-flex items-center justify-center h-9 w-9 rounded-xl text-gray-700 hover:bg-gray-100 focus:outline-none  focus:ring-gray-400 flex-shrink-0"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <path d="M19 12H5" />
                <path d="m12 19-7-7 7-7" />
              </svg>
            </button>

            {/* 검색 입력 필드 */}
            <form onSubmit={handleSearchSubmit} className="flex-1">
              <input
                type="text"
                placeholder="게시물, 사용자를 검색해보세요"
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-full h-10 px-4 rounded-2xl border border-gray-300 bg-white placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400"
                autoFocus
              />
            </form>
          </div>
        )}
      </div>

      {/* 검색어 미리보기 바 */}
      {searchQuery && (
        <div className="px-4 pb-3 border-t border-gray-50 bg-gray-50">
          <div className="flex items-center gap-2 text-sm">
            <span className="text-gray-500">검색 중:</span>
            <span className="font-medium text-purple-600 bg-purple-50 px-2 py-1 rounded-md">
              &quot;{searchQuery}&quot;
            </span>
          </div>
        </div>
      )}
    </header>
  );
}

'use client';

import React, { useState } from 'react';
import { SearchIcon, FilterIcon, NotificationIcon } from '@/components/common/Icons';
import Input from '@/components/common/Input';
import Button from '@/components/common/Button';

/**
 * 🔝 현대적인 헤더 컴포넌트
 * 토스, 배민 스타일의 깔끔하고 직관적인 상단 네비게이션
 */

interface HeaderProps {
  /** 검색어 입력 시 호출되는 콜백 함수 */
  onSearch?: (query: string) => void;
  /** 필터 버튼 클릭 시 호출되는 콜백 함수 */
  onFilterOpen?: () => void;
}

export default function Header({ onSearch, onFilterOpen }: HeaderProps) {
  // 🔍 검색어 상태 관리
  const [searchQuery, setSearchQuery] = useState('');
  
  // 🎯 검색 모드 상태 (검색창 확장/축소)
  const [isSearchMode, setIsSearchMode] = useState(false);

  /**
   * 📝 검색 폼 제출 핸들러
   * Enter 키를 누르거나 검색 버튼을 클릭할 때 실행
   */
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(searchQuery);
    setIsSearchMode(false); // 검색 후 일반 모드로 복귀
  };

  /**
   * 🔍 검색 입력 변경 핸들러
   * 실시간 검색을 위한 입력값 감지
   */
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    
    // 실시간 검색 (디바운싱 추가 권장)
    onSearch?.(value);
  };

  /**
   * 🎯 검색 모드 토글 함수
   * 모바일에서 검색창을 확장/축소
   */
  const toggleSearchMode = () => {
    setIsSearchMode(!isSearchMode);
    if (isSearchMode) {
      setSearchQuery('');
      onSearch?.('');
    }
  };

  return (
    <header className="bg-surface border-b border-gray-100 sticky top-0 z-50 animate-slide-down">
      <div className="px-lg py-lg">
        {!isSearchMode ? (
          /* 🏠 일반 헤더 모드 */
          <div className="flex items-center justify-between">
            {/* 브랜드 로고 및 타이틀 */}
            <div className="flex-1">
              <h1 className="text-gradient text-2xl font-black tracking-tight">
                도란
              </h1>
              <p className="text-secondary text-sm mt-xs leading-tight">
                따뜻한 소통이 시작되는 곳 💜
              </p>
            </div>

            {/* 우측 액션 버튼들 */}
            <div className="flex items-center space-md">
              {/* 검색 버튼 */}
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleSearchMode}
                aria-label="검색하기"
                className="!p-2"
              >
                <SearchIcon size={20} />
              </Button>

              {/* 필터 버튼 */}
              <Button
                variant="ghost"
                size="sm"
                onClick={onFilterOpen}
                aria-label="필터 설정"
                className="!p-2"
              >
                <FilterIcon size={20} />
              </Button>

              {/* 알림 버튼 (뱃지 포함) */}
              <div className="relative">
                <Button
                  variant="ghost"
                  size="sm"
                  aria-label="알림 확인"
                  className="!p-2"
                >
                  <NotificationIcon size={20} />
                </Button>
                {/* 알림 뱃지 */}
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold animate-pulse">
                  3
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* 🔍 검색 모드 */
          <div className="flex items-center space-md animate-fade-in">
            {/* 뒤로가기 버튼 */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleSearchMode}
              aria-label="검색 취소"
              className="!p-2 flex-shrink-0"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path 
                  d="M19 12H5M12 19l-7-7 7-7" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
            </Button>

            {/* 검색 입력 필드 */}
            <form onSubmit={handleSearchSubmit} className="flex-1">
              <Input
                placeholder="게시물, 사용자를 검색해보세요"
                value={searchQuery}
                onChange={handleSearchChange}
                leftIcon={<SearchIcon size={18} />}
                size="md"
                className="!border-none !bg-gray-50 !focus:bg-white"
                autoFocus
              />
            </form>
          </div>
        )}
      </div>

      {/* 검색 결과 빠른 액세스 (검색어가 있을 때만 표시) */}
      {searchQuery && (
        <div className="px-lg pb-md border-t border-gray-50 bg-gray-25 animate-slide-down">
          <div className="flex items-center space-sm text-sm">
            <span className="text-secondary">검색 중:</span>
            <span className="font-medium text-primary bg-primary-50 px-sm py-xs rounded-md">
              &quot;{searchQuery}&quot;
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setSearchQuery('');
                onSearch?.('');
              }}
              className="!text-xs !p-1 ml-auto"
            >
              지우기
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}

/**
 * 📱 헤더 컴포넌트 특징:
 * 
 * ✨ 현대적 디자인
 * - 그라데이션 브랜드 로고
 * - 부드러운 애니메이션
 * - 일관된 간격과 그림자
 * 
 * 🔍 스마트한 검색 UX
 * - 검색 모드 토글
 * - 실시간 검색 지원
 * - 검색어 표시 및 지우기
 * 
 * 📱 모바일 최적화
 * - 터치 친화적 버튼 크기
 * - 반응형 레이아웃
 * - 접근성 고려한 라벨링
 */
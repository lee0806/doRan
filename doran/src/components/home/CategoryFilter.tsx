import React from "react";
import { PostCategory } from "@/types";

/**
 * 카테고리 필터 컴포넌트의 Props 타입 정의
 */
interface CategoryFilterProps {
  /** 카테고리 목록 */
  categories: PostCategory[];
  /** 현재 활성화된 카테고리 ID */
  activeCategory: string | null;
  /** 카테고리 선택 시 호출되는 콜백 함수 */
  onCategorySelect: (categoryId: string | null) => void;
}

/**
 * 현대적인 카테고리 필터 컴포넌트
 * 토스, 배민 스타일의 세련된 탭 디자인을 구현
 */
export default function CategoryFilter({
  categories,
  activeCategory,
  onCategorySelect,
}: CategoryFilterProps) {
  /**
   * 카테고리 버튼의 스타일을 동적으로 생성하는 함수
   * @param category 카테고리 객체
   * @param isActive 현재 활성화 상태 여부
   */
  const getCategoryButtonStyle = (
    category: PostCategory,
    isActive: boolean
  ) => {
    if (isActive) {
      return {
        backgroundColor: category.color,
        color: "white",
        boxShadow: `0 4px 12px ${category.color}40`,
      };
    }
    return {
      backgroundColor: "white",
      color: "var(--gray-600)",
      border: "1px solid var(--gray-200)",
    };
  };

  /**
   * 전체 버튼의 스타일을 생성하는 함수
   * @param isActive 현재 활성화 상태 여부
   */
  const getAllButtonStyle = (isActive: boolean) => {
    if (isActive) {
      return {
        background:
          "linear-gradient(135deg, var(--primary) 0%, var(--primary-600) 100%)",
        color: "white",
        boxShadow: "0 4px 12px var(--primary-200)",
      };
    }
    return {
      backgroundColor: "white",
      color: "var(--gray-600)",
      border: "1px solid var(--gray-200)",
    };
  };

  return (
    <div className="py-xl">
      {/* 카테고리 필터 제목 섹션 */}
      <div className="mb-lg">
        <h2 className="text-lg font-bold text-gray-900 mb-xs">
          카테고리별 이야기
        </h2>
        <p className="text-sm text-secondary">
          관심있는 주제의 따뜻한 이야기를 찾아보세요
        </p>
      </div>

      {/* 스크롤 가능한 카테고리 버튼 목록 */}
      <div className="flex space-md overflow-x-auto scrollbar-hide pb-sm">
        {/* 전체 보기 버튼 */}
        <button
          onClick={() => onCategorySelect(null)}
          className="flex-shrink-0 flex items-center px-lg py-md rounded-full font-semibold text-sm transition-all duration-300 hover:scale-105 animate-scale-in"
          style={getAllButtonStyle(activeCategory === null)}
          aria-label="모든 카테고리 보기"
        >
          <span className="mr-xs">🌟</span>
          전체
        </button>

        {/* 개별 카테고리 버튼들 */}
        {categories.map((category, index) => {
          const isActive = activeCategory === category.id;

          return (
            <button
              key={category.id}
              onClick={() => onCategorySelect(category.id)}
              className={`
                flex-shrink-0 flex items-center px-lg py-md rounded-full 
                font-semibold text-sm transition-all duration-300 
                hover:scale-105 animate-scale-in
                ${isActive ? "shadow-lg" : "hover:shadow-md"}
              `}
              style={{
                ...getCategoryButtonStyle(category, isActive),
                animationDelay: `${index * 0.1}s`,
              }}
              aria-label={`${category.name} 카테고리 보기`}
            >
              <span
                className="mr-xs text-base"
                role="img"
                aria-label={category.name}
              >
                {category.icon}
              </span>
              {category.name}

              {/* 활성화된 카테고리에 체크 아이콘 표시 */}
              {isActive && (
                <span className="ml-xs animate-scale-in">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M9 12l2 2 4-4"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* 선택된 카테고리 정보 표시 영역 */}
      {activeCategory && (
        <div className="mt-lg animate-slide-up">
          {(() => {
            const selectedCategory = categories.find(
              (cat) => cat.id === activeCategory
            );
            if (!selectedCategory) return null;

            return (
              <div
                className="p-lg rounded-xl border-l-4"
                style={{
                  backgroundColor: `${selectedCategory.color}10`,
                  borderLeftColor: selectedCategory.color,
                }}
              >
                <div className="flex items-center mb-sm">
                  <span className="text-2xl mr-sm">
                    {selectedCategory.icon}
                  </span>
                  <h3 className="font-bold text-gray-900">
                    {selectedCategory.name} 이야기
                  </h3>
                </div>
                <p className="text-sm text-secondary leading-relaxed">
                  {selectedCategory.description}
                </p>
              </div>
            );
          })()}
        </div>
      )}
    </div>
  );
}

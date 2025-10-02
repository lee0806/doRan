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
  return (
    <div className="p-4">
      <nav aria-label="카테고리 필터">
        <ul className="flex gap-6">
          {/* 전체 탭 */}
          <li>
            <button
              onClick={() => onCategorySelect(null)}
              className={`pb-2 text-base font-medium transition-colors ${
                activeCategory === null
                  ? "text-gray-900 border-b-2 border-gray-900"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              전체
            </button>
          </li>
          {categories.map((category) => {
            const isActive = activeCategory === category.id;
            return (
              <li key={category.id}>
                <button
                  onClick={() => onCategorySelect(category.id)}
                  className={`pb-2 text-base font-medium transition-colors ${
                    isActive
                      ? "text-gray-900 border-b-2 border-gray-900"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {category.name}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {activeCategory && (
        <div className="mt-6">
          {(() => {
            const selectedCategory = categories.find(
              (cat) => cat.id === activeCategory
            );
            if (!selectedCategory) return null;

            return (
              <div
                className="p-4 rounded-xl border-l-4"
                style={{
                  backgroundColor: `${selectedCategory.color}10`,
                  borderLeftColor: selectedCategory.color,
                }}
              >
                <div className="flex items-center mb-2">
                  <span className="text-2xl mr-2">{selectedCategory.icon}</span>
                  <h3 className="font-bold text-gray-900">
                    {selectedCategory.name} 이야기
                  </h3>
                </div>
                <p className="text-sm text-gray-500 leading-relaxed">
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

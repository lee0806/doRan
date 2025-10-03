"use client";

import React from "react";

// zustand 스토어
import { useCategoryStore } from "@/store/categoryStore";

// 타입 및 상수
import { CategoryKey, CATEGORY_LABELS } from "@/types";

export default function CategoryFilter() {
  // 📱 Zustand를 사용한 카테고리 상태 관리
  const selected = useCategoryStore((s) => s.selected); // 선택된 카테고러
  const set = useCategoryStore((s) => s.set); // 카테고리 선택 함수

  // 카테고리 목록
  const categories: CategoryKey[] = [
    "all",
    "general",
    "school",
    "career",
    "worry",
  ];

  // 카테고리 라벨 매핑
  const LABELS = CATEGORY_LABELS;

  return (
    <div className="p-4">
      <nav aria-label="카테고리 필터">
        <ul className="flex gap-6">
          {/* 카테고리 버튼들 생성 */}
          {categories.map((category) => {
            const isActive = selected === category; // 활성화 상태는 선택된 카테고리가 현재 카테고리가 같은지 확인 후 맞을 때 활성화
            return (
              <li key={category}>
                {" "}
                {/* 카테고리 리스트 생성 */}
                <button
                  onClick={() => set(category)} // 클릭하면 카테고리 선택 함수 호출
                  className={`pb-2 text-base font-medium transition-colors ${
                    isActive
                      ? "text-gray-900 border-b-2 border-gray-900"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {LABELS[category]}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {selected !== "all" && (
        <div className="mt-6">
          {(() => {
            const selectedCategory = categories.find((cat) => cat === selected);
            if (!selectedCategory) return null;
            return (
              <div className="p-4 rounded-xl border border-gray-200 bg-gray-50">
                <h3 className="font-bold text-gray-900 mb-1">
                  {LABELS[selectedCategory]} 이야기
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  선택한 카테고리에 해당하는 글을 보여줍니다.
                </p>
              </div>
            );
          })()}
        </div>
      )}
    </div>
  );
}

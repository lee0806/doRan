"use client";

import React from "react";
import { useState } from "react";

// zustand 스토어
import { useCategoryStore } from "@/store/categoryStore";

// 타입 및 상수
import { CategoryKey, CATEGORY_LABELS } from "@/types";

export default function CategoryFilter() {
  // 📱 Zustand를 사용한 카테고리 상태 관리
  const selected = useCategoryStore((s) => s.selected); // 선택된 카테고러
  const set = useCategoryStore((s) => s.set); // 카테고리 선택 함수

  // 로컬 상태: 날짜 필터 드롭다운 열림 여부
  const [open, setOpen] = useState(false);

  const filterOptions: string[] = ["최신순", "인기순", "답변순"];
  const [selectedFilter, setSelectedFilter] = useState(filterOptions[0]);

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
    <div className="p-4 w-full mx-auto max-w-5xl">
      <nav aria-label="카테고리 필터" className="flex justify-between">
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
                      ? "text-purple-700 border-b-2 border-purple-700"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {LABELS[category]}
                </button>
              </li>
            );
          })}
        </ul>

        <div className="relative">
          {/* 토글 버튼 */}
          <button
            type="button"
            className="px-3 text-sm font-medium text-gray-700 "
            onClick={() => setOpen((prev) => !prev)}
          >
            {selectedFilter}
          </button>

          {/* 펼쳐지는 옵션 박스 */}
          {open && (
            <div className="absolute right-0 mt-2 w-36 rounded-md shadow-lg bg-white border border-gray-200 z-10">
              <ul className="py-1">
                {filterOptions.map((label) => (
                  <li key={label}>
                    <button
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => {
                        // 선택 로직은 필요 시 zustand store에 연결 가능
                        console.log("정렬 선택:", label);
                        setOpen(false);
                        setSelectedFilter(label);
                      }}
                    >
                      {label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
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

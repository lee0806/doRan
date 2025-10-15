"use client";

import { create } from "zustand";

import { CategoryKey } from "@/types";

// 카테고리 순서
export const CATEGORY_ORDER: CategoryKey[] = [
  "all",
  "general",
  "school",
  "career",
  "worry",
];

// 카테고리 상태 관리 스토어
type CategoryState = {
  selected: CategoryKey; // 현재 선택된 카테고리
  set: (key: CategoryKey) => void; // 카테고리 선택 함수
  reset: () => void; // 카테고리 초기화 함수
  isActive: (key: CategoryKey) => boolean; // 특정 카테고리 활성화 여부 확인 함수
};

// Zustand를 사용한 카테고리 상태 관리 스토어 생성
export const useCategoryStore = create<CategoryState>((set, get) => ({
  selected: "all", // 초기 선택 카테고리
  set: (key) => set({ selected: key }), // 카테고리 선택 함수 구현
  reset: () => set({ selected: "all" }), // 카테고리 초기화 함수 구현
  isActive: (key) => get().selected === key, // 특정 카테고리 활성화 여부 확인 함수 구현
}));

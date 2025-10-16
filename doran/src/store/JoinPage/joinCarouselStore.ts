"use client";

import { create } from "zustand";

// 보여줄 슬라이드 이미지 타입
type image = {
  src: string;
  title?: string;
};

// store에서 관리할 상태 타입
type CarouselState = {
  images: image[]; // 이미지 목록
  index: number; // 현재 보여주는 이미지 인덱스

  init: (images: image[]) => void; // 이미지 목록 초기화
  next: () => void; // 다음 이미지로 이동
  prev: () => void; // 이전 이미지로 이동
};

export const useJoinCarousel = create<CarouselState>((set, get) => ({
  images: [],
  index: 0,

  // 이미지 목록 초기화
  init: (images: image[]) => set({ images, index: 0 }),

  next: () => {
    const { images, index } = get();
    if (images.length === 0) return;

    // 마지막 이미지면 처음으로 돌아감
    const nextIndex = (index + 1) % images.length;
    set({ index: nextIndex });
  },

  prev: () => {
    const { images, index } = get();
    if (images.length === 0) return;

    // 첫 이미지면 마지막으로 이동
    const prevIndex = (index - 1 + images.length) % images.length;
    set({ index: prevIndex });
  },
}));

"use client";

import Image from "next/image";
import { useEffect } from "react";
import { useJoinCarousel } from "@/store/JoinPage/joinCarouselStore";
import React from "react";

const TITLE_IMAGE = [
  {
    src: "/JoinPage/write.png",
    title: "따뜻한 경험을 서로에게 공유할 수 있어요",
  },
  { src: "/JoinPage/questionWoman.png", title: "궁금한 점을 물어볼 수 있어요" },
  { src: "/JoinPage/whatIsRead.png", title: "AI가 나쁜글을 찾아줘요" },
  { src: "/JoinPage/heart.png", title: "따뜻한 글 남기러 가볼까요?" },
];

export default function JoinPage() {
  const { images, index, init, next, prev } = useJoinCarousel();

  // 컴포넌트가 마운트될 때 이미지 초기화
  useEffect(() => {
    if (!images.length) {
      init(TITLE_IMAGE);
    }
  }, [images.length, init]);

  if (!images.length) {
    return null; // 이미지가 없으면 아무것도 렌더링하지 않음
  }

  return (
    <div className="p-4 mt-40">
      <div className="gap-10 flex items-center justify-center flex-col">
        {/* 현재 이미지 */}
        <div className="w-48 h-48 relative">
          {/* next/image를 쓰면 자동 최적화 */}
          <Image
            src={images[index].src}
            alt={images[index].title ?? "onboarding image"}
            fill
            className="object-contain"
            sizes="280px"
            priority
          />
        </div>
        <p className="mt-6 text-xl font-bold text-gray-900">
          {images[index].title}
        </p>
      </div>
    </div>
  );
}

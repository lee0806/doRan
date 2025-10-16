"use client";

import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { useJoinCarousel } from "@/store/JoinPage/joinCarouselStore";

// 이미지 목록(경로, 제목)
const TITLE_IMAGE = [
  {
    src: "/JoinPage/write.png",
    title: "따뜻한 경험을 서로에게 공유할 수 있어요",
  },
  { src: "/JoinPage/questionWoman.png", title: "궁금한 점을 물어볼 수 있어요" },
  { src: "/JoinPage/whatIsRead.png", title: "AI가 나쁜글을 찾아줘요" },
  { src: "/JoinPage/heart.png", title: "따뜻한 글 남기러 가볼까요?" },
];

export default function JoinMainSection() {
  // 🔗 전역 스토어에서 현재 이미지 목록/인덱스와 이동 함수들을 가져옵니다.
  const { images, index, init, next, prev } = useJoinCarousel();

  // 🧠 드래그(스와이프) 동작에 필요한 "화면 전용" 상태
  const containerRef = useRef<HTMLDivElement | null>(null); // 컨테이너 DOM 참조(폭 측정용)
  const [isDragging, setIsDragging] = useState(false); // 드래그 중인지
  const [startX, setStartX] = useState<number | null>(null); // 드래그 시작 X좌표
  const [dragX, setDragX] = useState(0); // 현재까지 끌린 거리(px)
  const [transitionOn, setTransitionOn] = useState(true); // 손가락 뗀 후 스냅 애니메이션 on/off

  // 컴포넌트 마운트 시, 이미지 목록 초기화
  useEffect(() => {
    if (!images.length) init(TITLE_IMAGE);
  }, [images.length, init]);

  // 이미지가 없으면 아무것도 렌더링하지 않음
  if (!images.length) return null;

  /** 공통: 이벤트에서 X좌표만 뽑아오기 (터치/마우스 겸용) */
  const getClientX = (e: React.TouchEvent | React.MouseEvent) => {
    if ("touches" in e && e.touches[0]) return e.touches[0].clientX;
    if ("clientX" in e) return (e as React.MouseEvent).clientX;
    return 0;
  };

  /** 시작: 손가락/마우스를 눌렀을 때 */
  const onStart = (e: React.TouchEvent | React.MouseEvent) => {
    setIsDragging(true);
    setTransitionOn(false); // 드래그 중에는 애니메이션을 끈다(즉시 따라오도록)
    setStartX(getClientX(e));
  };

  /** 이동: 누른 채로 좌우로 움직일 때 */
  const onMove = (e: React.TouchEvent | React.MouseEvent) => {
    if (!isDragging || startX === null) return;

    const x = getClientX(e);
    const delta = x - startX; // 시작점 대비 현재 이동 거리(px)
    setDragX(delta);

    // 모바일에서 수평 이동 시, 문서 스크롤과 충돌을 줄여줌
    if ("preventDefault" in e) e.preventDefault?.();
  };

  /** 종료: 손을 뗐을 때 → 임계값 기준으로 이전/다음 이동 결정 */
  const onEnd = () => {
    const W = containerRef.current?.clientWidth ?? 0; // 컨테이너 가로폭
    const threshold = W * 0.25; // 전체 폭의 1/4 이상 끌면 페이지 전환

    // 드래그 방향에 따라: 나간 방향과 "반대 방향"에서 새 이미지가 들어오도록 처리
    if (dragX <= threshold) {
      // 👉 오른쪽으로 충분히 끌었음 → 다음 이미지로 이동
      // 새 이미지는 왼쪽(반대편)에서 들어와야 하므로, 먼저 왼쪽 바깥(-W)에 배치한 뒤 0으로 스냅
      setTransitionOn(false); // 위치 점프 시 애니메이션 끔
      next(); // index를 다음으로 변경(이미지 교체)
      setDragX(W); // 새 이미지 시작 위치: 왼쪽 바깥
      requestAnimationFrame(() => {
        setTransitionOn(true); // 이제 애니메이션 켜고
        setDragX(0); // 중앙으로 부드럽게 들어오게 함
      });
    } else if (dragX >= -threshold) {
      // 👈 왼쪽으로 충분히 끌었음 → 이전 이미지로 이동
      // 새 이미지는 오른쪽(반대편)에서 들어와야 하므로, 먼저 오른쪽 바깥(+W)에 배치
      setTransitionOn(false);
      prev(); // index를 이전으로 변경
      setDragX(-W); // 새 이미지 시작 위치: 오른쪽 바깥
      requestAnimationFrame(() => {
        setTransitionOn(true);
        setDragX(0);
      });
    } else {
      // 임계값 미만 → 제자리로 되돌리기
      setTransitionOn(true);
      setDragX(0);
    }

    // 공통 정리
    setIsDragging(false);
    setStartX(null);
  };

  // 🎨 transform 스타일: 드래그 중엔 dragX만큼 따라오고, 아닐 땐 제자리
  //    transitionOn이 true일 때만 부드럽게 스냅됩니다.
  const transformStyle: React.CSSProperties = {
    transform: `translateX(${dragX}px)`,
    transition: transitionOn ? "transform 300ms ease-out" : "none",
  };

  return (
    <div className="p-4 mt-40 overflow-hidden">
      {/*
        overflow-hidden: 바깥으로 삐져나온 부분 가리기
        select-none: 드래그 중 텍스트 선택 방지
        touch-action: pan-y → 세로 스크롤은 허용, 가로는 우리가 처리
      */}
      <div
        ref={containerRef}
        className="mx-auto flex max-w-sm select-none overflow-hidden touch-pan-y"
        // 터치 이벤트(모바일)
        onTouchStart={onStart}
        onTouchMove={onMove}
        onTouchEnd={onEnd}
        // 마우스 이벤트(데스크톱)
        onMouseDown={onStart}
        onMouseMove={onMove}
        onMouseUp={onEnd}
        onMouseLeave={() => isDragging && onEnd()}
        // 마우스 커서 모양(드래그 느낌)
        style={{ cursor: isDragging ? "grabbing" : "grab" }}
        aria-label="온보딩 이미지 슬라이드"
        role="region"
      >
        {/*
          실제로 화면에 보이는 건 현재 이미지 한 장뿐입니다.
          드래그 중에는 이 요소에 translateX를 적용해 살짝 흔들어주고,
          손을 떼면 next/prev로 index가 바뀌며 다음 이미지가 나타납니다.
        */}
        <div
          className="flex w-full items-center justify-center"
          style={transformStyle}
        >
          <div className="relative h-48 w-48">
            <Image
              src={images[index].src}
              alt={images[index].title ?? "onboarding image"}
              fill
              className="object-contain"
              sizes="12rem"
              priority
            />
          </div>
        </div>
      </div>

      {/* 현재 이미지 제목(한 줄 텍스트) */}
      <p className="mt-6 text-center text-xl font-bold text-gray-900">
        {images[index].title}
      </p>
    </div>
  );
}

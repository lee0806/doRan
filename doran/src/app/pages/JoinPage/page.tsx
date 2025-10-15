"use client";

import React from "react";
import SocialLogin from "@/app/components/JoinPage/SocialLogin";

/**
 * JoinPage — 소셜 전용 진입 페이지
 * - 중앙: 서비스 소개 문구
 * - 하단 고정: 카카오/네이버 로그인 버튼
 * - 실제 로그인 연동은 `/api/auth/kakao`, `/api/auth/naver` 엔드포인트에 연결(미구현 시 404 → 나중에 교체)
 */
export default function JoinPage() {
  return (
    <div className="relative min-h-screen bg-gray-50">
      <SocialLogin />
    </div>
  );
}

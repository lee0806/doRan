"use client";

import React, { useState } from "react";
import Link from "next/link";

/**
 * MyPage (Modern, Tailwind-only)
 * ---------------------------------------------------------------------------
 * 목표: 카카오/토스/네이버 스타일의 모던하고 담백한 마이페이지
 * - 상단 프로필 헤더(아바타, 이름/핸들, 액션 버튼)
 * - 핵심 지표(좋아요/작성글/스크랩)
 * - 탭 네비게이션(활동, 스크랩, 설정)
 * - 접근성/반응형 고려
 */

export default function MyService() {
  const [tab, setTab] = useState<"activity" | "bookmarks" | "settings">(
    "activity"
  );

  // 데모용 데이터 (API 연결 전까지 임시)
  const stats = [
    { label: "좋아요", value: 23 },
    { label: "작성글", value: 12 },
    { label: "스크랩", value: 8 },
  ];

  const activities = [
    {
      id: "p1",
      title: "오늘 직장에서 겪은 따뜻한 순간",
      excerpt:
        "동료가 제 실수를 함께 해결해줬어요. 작은 배려가 큰 힘이 되더라고요…",
      date: "2025-10-03",
      likes: 13,
      comments: 4,
    },
    {
      id: "p2",
      title: "학교에서 있었던 감동적인 일",
      excerpt: "친구가 발표를 도와줬는데, 덕분에 자신감을 되찾을 수 있었어요…",
      date: "2025-10-01",
      likes: 9,
      comments: 2,
    },
  ];

  const bookmarks = [
    {
      id: "b1",
      title: "연인 사이 오해를 풀었던 대화법",
      source: "상담 게시판",
      date: "2025-09-28",
    },
    {
      id: "b2",
      title: "직장 동료와 갈등 줄이는 팁 5가지",
      source: "경험 공유",
      date: "2025-09-24",
    },
  ];

  return (
    <main className="min-h-screen">
      {/* 컨테이너 */}
      <div className="mx-auto w-full max-w-5xl px-4 py-8">
        {/* 상단 헤더 카드 */}
        <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          {/* 프로필 영역 */}
          <div className="gap-4 w-full mx-auto">
            <div className="flex-col items-center gap-4">
              {/* 아바타 (이니셜) */}
              <div className="flex flex-col gap-4 items-left">
                <div className="flex m-1 h-16 w-16 items-center justify-center rounded-full bg-gray-100 text-xl font-bold text-gray-700">
                  DR
                </div>
                {/* 아이디(사용자 이름) */}
                <p className="m-1 text-sm text-gray-500">@doran_user</p>

                <p className="m-1 text-sm text-gray-500 mb-1">
                  자기소개란입니다. 자기소개란입니다. 자기소개란입니다.
                  자기소개란입니다.
                </p>
              </div>
              <div className="flex mt-4 justify-end gap-2 text-sm text-gray-500">
                <p className="font-bold text-gray-900">1</p>
                <p>팔로잉</p>
                <p className="font-bold text-gray-900">2</p>
                <p>팔로워</p>
              </div>
            </div>
          </div>

          {/* 핵심 지표 */}
          <div className="mt-4 grid grid-cols-3 ">
            {stats.map((s) => (
              <div key={s.label} className="bg-white p-4 text-center">
                <div className="text-xs text-gray-500 items-center justify-start flex">
                  {s.label}
                </div>
                <div className="flex justify-start mt-1 text-m font-bold text-gray-900">
                  {s.value}개
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 탭 네비게이션 */}
        <nav className="mt-8 mx-1">
          <ul className="-mb-px flex gap-6" role="tablist">
            {[
              { key: "activity", label: "활동" },
              { key: "bookmarks", label: "스크랩" },
              { key: "settings", label: "설정" },
            ].map((t) => {
              const isActive = tab === (t.key as typeof tab);
              return (
                <li key={t.key} role="presentation">
                  <button
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setTab(t.key as typeof tab)}
                    className={`pb-3 text-sm font-medium transition-colors ${
                      isActive
                        ? "text-gray-900"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    {t.label}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* 탭 컨텐츠 */}
        <section className="mt-6">
          {tab === "activity" && (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {activities.map((a) => (
                <article
                  key={a.id}
                  className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm"
                >
                  <header className="flex items-center justify-between">
                    <h3 className="line-clamp-1 text-base font-bold text-gray-900">
                      {a.title}
                    </h3>
                    <span className="text-xs text-gray-500">{a.date}</span>
                  </header>
                  <p className="mt-2 line-clamp-2 text-sm text-gray-600">
                    {a.excerpt}
                  </p>
                  <footer className="mt-3 flex items-center gap-3 text-sm text-gray-500">
                    <span className="inline-flex items-center gap-1">
                      {/* heart */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-4 w-4"
                      >
                        <path d="M20.8 4.6c-1.5-1.5-4-1.5-5.5 0L12 7.9 8.7 4.6c-1.5-1.5-4-1.5-5.5 0-1.5 1.5-1.5 4 0 5.5l3.3 3.3 5.5 5.5 5.5-5.5 3.3-3.3c1.5-1.5 1.5-4 0-5.5z" />
                      </svg>
                      {a.likes}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      {/* comment */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-4 w-4"
                      >
                        <path d="M21 15a4 4 0 0 1-4 4H7l-4 4V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z" />
                      </svg>
                      {a.comments}
                    </span>
                  </footer>
                </article>
              ))}
            </div>
          )}

          {tab === "bookmarks" && (
            <div className="space-y-3">
              {bookmarks.map((b) => (
                <article
                  key={b.id}
                  className="flex items-center justify-between rounded-xl border border-gray-200 bg-white p-4 shadow-sm"
                >
                  <div className="min-w-0">
                    <h4 className="truncate text-sm font-semibold text-gray-900">
                      {b.title}
                    </h4>
                    <p className="mt-1 text-xs text-gray-500">
                      {b.source} · {b.date}
                    </p>
                  </div>
                  <button
                    type="button"
                    className="inline-flex h-9 items-center justify-center rounded-md border border-gray-300 bg-white px-3 text-xs font-medium text-gray-700 hover:bg-gray-50"
                  >
                    열기
                  </button>
                </article>
              ))}
            </div>
          )}

          {tab === "settings" && (
            <div className="space-y-4">
              <section className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
                <h3 className="text-sm font-semibold text-gray-900">
                  알림 설정
                </h3>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-sm text-gray-600">푸시 알림</span>
                  <Toggle />
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-sm text-gray-600">댓글 알림</span>
                  <Toggle />
                </div>
              </section>

              <section className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
                <h3 className="text-sm font-semibold text-gray-900">계정</h3>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-sm text-gray-600">비밀번호 변경</span>
                  <Link
                    href="/settings/password"
                    className="text-sm font-medium text-gray-900 hover:underline"
                  >
                    이동
                  </Link>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-sm text-gray-600">로그아웃</span>
                  <button
                    type="button"
                    className="text-sm font-medium text-red-600 hover:underline"
                  >
                    로그아웃
                  </button>
                </div>
              </section>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

/**
 * 토글 스위치 (순수 Tailwind)
 */
function Toggle() {
  const [on, setOn] = useState(false);
  return (
    <button
      type="button"
      onClick={() => setOn((v) => !v)}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
        on ? "bg-gray-900" : "bg-gray-300"
      }`}
      aria-pressed={on}
      aria-label={on ? "켜짐" : "꺼짐"}
    >
      <span
        className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
          on ? "translate-x-5" : "translate-x-1"
        }`}
      />
    </button>
  );
}

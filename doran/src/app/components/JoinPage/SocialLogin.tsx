import React from "react";
import Link from "next/link";

export default function JoinPage() {
  return (
    <>
      {/* 하단 소셜 로그인 영역 (화면 하단 고정 + 안전 영역 고려) */}
      <footer className="fixed inset-x-0 bottom-4  z-50">
        <div className="mx-auto w-full max-w-md px-6 py-4 space-y-3">
          {/* Kakao */}
          <Link
            href="/api/auth/kakao"
            className="flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-[#FEE500] font-semibold text-gray-900 shadow-sm transition-transform hover:scale-[1.01] active:scale-[0.99]"
          >
            {/* Kakao Icon (말풍선) */}
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden
            >
              <path d="M12 3C6.477 3 2 6.477 2 10.775c0 2.63 1.772 4.927 4.427 6.252l-.9 3.266a.6.6 0 0 0 .9.663l3.564-2.236c.667.092 1.355.141 2.01.141 5.523 0 10-3.477 10-7.861C22 6.477 17.523 3 12 3z" />
            </svg>
            카카오로 계속하기
          </Link>

          {/* Naver */}
          <Link
            href="/api/auth/naver"
            className="flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-[#03C75A] font-semibold text-white shadow-sm transition-transform hover:scale-[1.01] active:scale-[0.99]"
          >
            {/* Naver N */}
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden
            >
              <path d="M4 4h6.9l3.9 6.1V4H20v16h-6.9l-3.9-6.1V20H4V4z" />
            </svg>
            네이버로 계속하기
          </Link>
        </div>
      </footer>
    </>
  );
}

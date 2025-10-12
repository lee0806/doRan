"use client";

import React from "react";
import { useState } from "react";

export default function PostBanner() {
  const [inputTag, setInputTag] = useState<string>(""); // 사용자가 입력한 태그 값

  const [saveTag, setSaveTag] = useState<string[]>([]); // 입력 받은 태그 저장

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // 조합 중일 땐 무시 (한글 입력 시)
    const composing =
      (e.nativeEvent as any).isComposing || (e as any).isComposing;
    if (composing) return;

    // 구분자 감지: Enter 키 또는 콤마(일반/풀와이드). 일부 브라우저/IME는 e.code가 'Comma'로 들어오기도 함
    const isSeparator =
      e.key === "Enter" ||
      e.key === "," ||
      e.code === "Comma" ||
      e.preventDefault();

    // 입력값 정제: 앞의 # 제거, 끝의 구분자(, · ，) 및 공백 제거, 양끝 공백 제거
    const raw = inputTag
      .replace(/^#/, "")
      .replace(/[\s,，]+$/, "")
      .trim();

    if (!raw) return;

    // 너무 짧은 한 글자 태그는 무시 (원치 않으면 이 줄 제거)
    if (raw.length < 2) {
      setInputTag("");
      return;
    }

    // 중복 방지 (대소문자/한글 동일 취급)
    const exists = saveTag.some((t) => t.toLowerCase() === raw.toLowerCase());
    if (exists) {
      setInputTag("");
      return;
    }

    setSaveTag([...saveTag, raw]);
    setInputTag("");
  };

  return (
    <>
      <div className="p-4 ">
        <input
          type="text"
          placeholder="제목을 입력하세요"
          className="text-2xl font-bold w-full mb-4 p-2 border-b border-gray-300 focus:outline-none"
        />

        <div className="flex flex-wrap items-center gap-2">
          {saveTag.map((tag) => (
            <div
              key={tag}
              className="inline-flex items-center gap-2 whitespace-nowrap bg-gray-100 text-gray-700 text-xs rounded-full px-4 py-2"
            >
              #{tag}
              <button
                type="button"
                onClick={() => setSaveTag(saveTag.filter((t) => t !== tag))}
              >
                &times;
              </button>
            </div>
          ))}
          <input
            type="text"
            placeholder="태그를 입력하세요 (예: #일상, #질문, #정보공유)"
            className="text-sm text-gray-500 w-full focus:outline-none"
            onChange={(e) => setInputTag(e.target.value)}
            onKeyDown={handleKeyDown}
            value={inputTag}
          ></input>
        </div>
      </div>
    </>
  );
}

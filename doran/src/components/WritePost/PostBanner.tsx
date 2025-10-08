"use client";

import React from "react";
import { useState } from "react";

export default function PostBanner() {
  const [inputTag, setInputTag] = useState<string>(""); // 사용자가 입력한 태그 값

  const [saveTag, setSaveTag] = useState<string[]>([]); // 입력 받은 태그 저장

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();

      const tag = inputTag.trim();
      if (inputTag && !saveTag.includes(inputTag)) {
        setSaveTag([...saveTag, tag]); // 입력받은 태그를 저장
        setInputTag(""); // 그리고 입력 받은 태그를 초기화
      }
    }
  };

  return (
    <>
      <div className="p-4 ">
        <input
          type="text"
          placeholder="제목을 입력하세요"
          className="text-2xl font-bold w-full mb-4 p-2 border-b border-gray-300 focus:outline-none"
        />

        <div className="flex">
          {saveTag.map((tag) => (
            <div
              key={tag}
              className="flex items-center gap-2 bg-gray-100 text-gray-700 text-xs rounded-full px-4 py-2 whitespace-nowrap"
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

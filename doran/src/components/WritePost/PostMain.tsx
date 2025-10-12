"use client";

import React, { useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

/**
 * Minimal Markdown Editor + Toolbar
 * - 좌: 원문 입력(Textarea) + 상단 툴바(간단 토글/삽입)
 * - 우: Markdown 렌더(ReactMarkdown + remarkGfm)
 */
export default function PostMain() {
  const [markdown, setMarkdown] = useState<string>(
    `**당신의 따뜻한 마음이 세상을 밝힙니다. 🌟**`
  );

  // 선택/커서 제어를 위해 textarea ref 사용
  const taRef = useRef<HTMLTextAreaElement | null>(null);

  /** 공통 적용 유틸: 현재 selection 기준으로 문자열 변환 후 상태/커서 갱신 */
  const apply = (
    transform: (
      value: string,
      start: number,
      end: number
    ) => { next: string; nextPos?: number | [number, number] }
  ) => {
    const el = taRef.current;
    if (!el) return;
    const value = markdown;
    const start = el.selectionStart ?? 0;
    const end = el.selectionEnd ?? 0;
    const { next, nextPos } = transform(value, start, end);
    setMarkdown(next);
    requestAnimationFrame(() => {
      el.focus();
      if (typeof nextPos === "number") el.setSelectionRange(nextPos, nextPos);
      else if (Array.isArray(nextPos))
        el.setSelectionRange(nextPos[0], nextPos[1]);
    });
  };

  /** 선택 감싸기: **bold**, *italic* 등 */
  const wrap = (pre: string, post: string = pre, placeholder = "텍스트") =>
    apply((v, s, e) => {
      const before = v.slice(0, s),
        selected = v.slice(s, e) || placeholder,
        after = v.slice(e);
      const next = `${before}${pre}${selected}${post}${after}`;
      const cursor = before.length + pre.length + selected.length + post.length;
      return { next, nextPos: cursor };
    });

  /** 줄 앞에 토큰 추가/제거(간단 토글): > , - , 1.  */
  const toggleLinePrefix = (token: string) =>
    apply((v, s, e) => {
      const startLine = v.lastIndexOf("\n", s - 1) + 1;
      const endLine = v.indexOf("\n", e) === -1 ? v.length : v.indexOf("\n", e);
      const block = v.slice(startLine, endLine);
      const lines = block.split("\n");
      const allPrefixed = lines.every((ln) => ln.startsWith(token));
      const updated = lines
        .map((ln) =>
          allPrefixed
            ? ln.replace(new RegExp(`^${token}`), "")
            : `${token}${ln}`
        )
        .join("\n");
      const next = v.slice(0, startLine) + updated + v.slice(endLine);
      const delta = updated.length - block.length;
      return {
        next,
        nextPos: [s + (allPrefixed ? -token.length : token.length), e + delta],
      };
    });

  /** 해당 줄을 H1~H3로 설정(기존 # 제거 후 레벨 적용) */
  const setHeading = (level: 1 | 2 | 3) =>
    apply((v, s) => {
      const lineStart = v.lastIndexOf("\n", s - 1) + 1;
      const lineEnd = v.indexOf("\n", s) === -1 ? v.length : v.indexOf("\n", s);
      const line = v.slice(lineStart, lineEnd);
      const stripped = line.replace(/^\s*#{1,6}\s+/, "");
      const token = "#".repeat(level) + " ";
      const replaced = token + stripped;
      const next = v.slice(0, lineStart) + replaced + v.slice(lineEnd);
      const pos = lineStart + token.length;
      return { next, nextPos: pos };
    });

  return (
    <div className="p-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {/* 입력 영역 */}
        <section className="rounded-xl border border-gray-200 bg-white p-3">
          {/* Toolbar */}
          <div className="mb-2 flex flex-wrap items-center gap-1">
            <button
              onClick={() => wrap("**", "**")}
              className="rounded px-2 py-1 text-sm hover:bg-gray-100"
              aria-label="Bold"
            >
              <strong>B</strong>
            </button>
            <button
              onClick={() => wrap("*", "*")}
              className="rounded px-2 py-1 text-sm hover:bg-gray-100"
              aria-label="Italic"
            >
              <em>I</em>
            </button>
            <div className="mx-1 h-4 w-px bg-gray-200" />
            <button
              onClick={() => setHeading(1)}
              className="rounded px-2 py-1 text-xs hover:bg-gray-100"
              aria-label="H1"
            >
              H1
            </button>
            <button
              onClick={() => setHeading(2)}
              className="rounded px-2 py-1 text-xs hover:bg-gray-100"
              aria-label="H2"
            >
              H2
            </button>
            <button
              onClick={() => setHeading(3)}
              className="rounded px-2 py-1 text-xs hover:bg-gray-100"
              aria-label="H3"
            >
              H3
            </button>
            <div className="mx-1 h-4 w-px bg-gray-200" />
            <button
              onClick={() => toggleLinePrefix("> ")}
              className="rounded px-2 py-1 text-xs hover:bg-gray-100"
              aria-label="> Quote"
            >
              &gt;
            </button>
            <button
              onClick={() => toggleLinePrefix("- ")}
              className="rounded px-2 py-1 text-xs hover:bg-gray-100"
              aria-label="- List"
            >
              •
            </button>
            <button
              onClick={() => toggleLinePrefix("1. ")}
              className="rounded px-2 py-1 text-xs hover:bg-gray-100"
              aria-label="1. List"
            >
              1.
            </button>
          </div>

          <textarea
            ref={taRef}
            value={markdown}
            onChange={(e) => setMarkdown(e.target.value)}
            placeholder="당신의 따뜻한 마음이 세상을 밝힙니다. 🌟"
            className="h-full min-h-80 w-full overflow-auto resize-none whitespace-pre-wrap rounded-md  p-3 font-mono text-sm leading-6 focus:outline-none"
          />
        </section>

        {/* 미리보기 */}
        <section className="min-h-90 rounded-xl border border-gray-200 bg-gray-50 p-4">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              h1: (p) => <h1 className="mt-4 mb-2 text-2xl font-bold" {...p} />,
              h2: (p) => <h2 className="mt-4 mb-2 text-xl font-bold" {...p} />,
              h3: (p) => (
                <h3 className="mt-4 mb-2 text-lg font-semibold" {...p} />
              ),
              p: (p) => <p className="mb-3 leading-7" {...p} />,
              ul: (p) => <ul className="mb-3 list-disc pl-6" {...p} />,
              ol: (p) => <ol className="mb-3 list-decimal pl-6" {...p} />,
              blockquote: (p) => (
                <blockquote
                  className="my-3 border-l-4 border-gray-300 bg-gray-100/70 px-4 pt-2 pb-1 text-gray-700"
                  {...p}
                />
              ),
            }}
          >
            {markdown}
          </ReactMarkdown>
        </section>
      </div>
    </div>
  );
}

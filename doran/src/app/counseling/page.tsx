"use client";

import { useState } from "react";
import Card from "@/components/common/Card";
import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import {
  ArrowBackIcon,
  MessageIcon,
  HeartIcon,
} from "@/components/common/Icons";
import { dummyCounselingSessions, postCategories } from "@/data/dummyData";
import { CounselingSession } from "@/types";

export default function CounselingPage() {
  const [activeTab, setActiveTab] = useState<"browse" | "create">("browse");
  const [sessions, setSessions] = useState<CounselingSession[]>(
    dummyCounselingSessions
  );
  const [selectedCategory, setSelectedCategory] = useState("");

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ko-KR", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "#10B981";
      case "resolved":
        return "#6B7280";
      case "closed":
        return "#EF4444";
      default:
        return "#6B7280";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "active":
        return "진행중";
      case "resolved":
        return "해결됨";
      case "closed":
        return "종료됨";
      default:
        return "알 수 없음";
    }
  };

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* 헤더 */}
      <header className="bg-white border-b border-[var(--border-light)] px-4 py-4 sticky top-0 z-40">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-[var(--text-primary)]">
              상담 게시판
            </h1>
            <p className="text-sm text-[var(--text-muted)]">
              익명으로 고민을 나누고 따뜻한 조언을 받아보세요
            </p>
          </div>
        </div>
      </header>

      {/* 탭 네비게이션 */}
      <div className="bg-white border-b border-[var(--border-light)] px-4">
        <div className="flex">
          <button
            onClick={() => setActiveTab("browse")}
            className={`flex-1 py-3 text-center font-medium transition-all duration-200 ${
              activeTab === "browse"
                ? "text-[var(--primary)] border-b-2 border-[var(--primary)]"
                : "text-[var(--text-muted)]"
            }`}
          >
            고민 둘러보기
          </button>
          <button
            onClick={() => setActiveTab("create")}
            className={`flex-1 py-3 text-center font-medium transition-all duration-200 ${
              activeTab === "create"
                ? "text-[var(--primary)] border-b-2 border-[var(--primary)]"
                : "text-[var(--text-muted)]"
            }`}
          >
            고민 상담하기
          </button>
        </div>
      </div>

      <div className="px-4 py-4">
        {activeTab === "browse" ? (
          <div>
            {/* 카테고리 필터 */}
            <div className="mb-6">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-3 border border-[var(--border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
              >
                <option value="">모든 카테고리</option>
                {postCategories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.icon} {category.name}
                  </option>
                ))}
              </select>
            </div>

            {/* 상담 세션 목록 */}
            <div className="space-y-4">
              {sessions.map((session) => (
                <Card
                  key={session.id}
                  className="hover:shadow-md transition-shadow cursor-pointer"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center space-x-2">
                      <span
                        className="px-2 py-1 rounded-full text-xs font-medium"
                        style={{
                          backgroundColor: `${getStatusColor(
                            session.status
                          )}15`,
                          color: getStatusColor(session.status),
                        }}
                      >
                        {getStatusText(session.status)}
                      </span>
                      {session.anonymous && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">
                          익명
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-[var(--text-muted)]">
                      {formatDate(session.createdAt)}
                    </span>
                  </div>

                  <h3 className="font-semibold text-[var(--text-primary)] mb-2 line-clamp-2">
                    {session.title}
                  </h3>
                  <p className="text-[var(--text-secondary)] text-sm mb-4 line-clamp-3">
                    {session.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-[var(--text-muted)]">
                      <span className="flex items-center space-x-1">
                        <MessageIcon size={16} />
                        <span>{session.responses.length}개 답변</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <HeartIcon size={16} />
                        <span>
                          {session.responses.reduce(
                            (sum, r) => sum + r.helpful,
                            0
                          )}
                          명 도움됨
                        </span>
                      </span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        ) : (
          <div>
            {/* 상담 작성 폼 */}
            <Card>
              <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-4">
                새로운 고민 상담하기
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                    카테고리 선택
                  </label>
                  <select className="w-full px-4 py-3 border border-[var(--border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent">
                    <option value="">카테고리를 선택해주세요</option>
                    {postCategories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.icon} {category.name}
                      </option>
                    ))}
                  </select>
                </div>

                <Input label="제목" placeholder="고민의 제목을 입력해주세요" />

                <div>
                  <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                    상세 내용
                  </label>
                  <textarea
                    className="w-full px-4 py-3 border border-[var(--border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent resize-none h-32"
                    placeholder="고민의 상세 내용을 자세히 적어주세요. 더 많은 정보를 제공할수록 더 좋은 조언을 받을 수 있어요."
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="anonymous"
                    className="rounded border-gray-300 text-[var(--primary)] focus:ring-[var(--primary)]"
                  />
                  <label
                    htmlFor="anonymous"
                    className="text-sm text-[var(--text-secondary)]"
                  >
                    익명으로 게시하기
                  </label>
                </div>

                <div className="pt-4">
                  <Button variant="primary" fullWidth>
                    상담 요청하기
                  </Button>
                </div>
              </div>
            </Card>

            {/* 안내 메시지 */}
            <Card className="mt-4 bg-gradient-to-r from-purple-50 to-blue-50 border-none">
              <div className="text-center">
                <div className="text-2xl mb-2">💜</div>
                <h3 className="font-medium text-[var(--text-primary)] mb-2">
                  따뜻한 마음으로 함께해요
                </h3>
                <p className="text-sm text-[var(--text-secondary)]">
                  여러분의 고민에 진심어린 조언과 위로를 전해드립니다. 혼자가
                  아니에요!
                </p>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}

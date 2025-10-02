"use client";

// 글 작성 페이지
import { useState } from "react";
import { useRouter } from "next/navigation";
import Card from "@/components/common/Card";
import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import { ArrowBackIcon, PlusIcon } from "@/components/common/Icons";
import { postCategories } from "@/data/dummyData";

export default function CreatePage() {
  const router = useRouter();
  const [postType, setPostType] = useState<"story" | "poll" | "counseling">(
    "story"
  );
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "",
    tags: "",
    anonymous: false,
  });
  const [pollOptions, setPollOptions] = useState(["", ""]);

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const addPollOption = () => {
    setPollOptions((prev) => [...prev, ""]);
  };

  const updatePollOption = (index: number, value: string) => {
    setPollOptions((prev) =>
      prev.map((option, i) => (i === index ? value : option))
    );
  };

  const removePollOption = (index: number) => {
    if (pollOptions.length > 2) {
      setPollOptions((prev) => prev.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = () => {
    // 여기서 실제 게시물 생성 로직 구현
    console.log("Creating post:", { ...formData, postType, pollOptions });
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* 헤더 */}
      <header className="bg-white border-b border-[var(--border-light)] px-4 py-4 sticky top-0 z-40">
        <div className="flex items-center justify-between">
          <button
            onClick={() => router.back()}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowBackIcon size={20} />
          </button>
          <h1 className="text-lg font-semibold text-[var(--text-primary)]">
            새 글 작성
          </h1>
          <Button
            size="sm"
            onClick={handleSubmit}
            disabled={!formData.title || !formData.content}
          >
            게시
          </Button>
        </div>
      </header>

      <div className="px-4 py-4">
        {/* 게시물 타입 선택 */}
        <Card className="mb-6">
          <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-4">
            어떤 글을 작성하시나요?
          </h2>
          <div className="grid grid-cols-1 gap-3">
            <button
              onClick={() => setPostType("story")}
              className={`p-4 rounded-lg border-2 transition-all duration-200 text-left ${
                postType === "story"
                  ? "border-[var(--primary)] bg-purple-50"
                  : "border-[var(--border-light)] hover:bg-gray-50"
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className="text-2xl">✨</div>
                <div>
                  <h3 className="font-semibold text-[var(--text-primary)]">
                    감동 이야기 공유
                  </h3>
                  <p className="text-sm text-[var(--text-secondary)]">
                    일상에서 경험한 따뜻하고 감동적인 이야기를 나눠주세요
                  </p>
                </div>
              </div>
            </button>

            <button
              onClick={() => setPostType("poll")}
              className={`p-4 rounded-lg border-2 transition-all duration-200 text-left ${
                postType === "poll"
                  ? "border-[var(--primary)] bg-purple-50"
                  : "border-[var(--border-light)] hover:bg-gray-50"
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className="text-2xl">📊</div>
                <div>
                  <h3 className="font-semibold text-[var(--text-primary)]">
                    투표로 의견 묻기
                  </h3>
                  <p className="text-sm text-[var(--text-secondary)]">
                    고민이나 궁금한 점을 투표로 물어보세요
                  </p>
                </div>
              </div>
            </button>
          </div>
        </Card>

        {/* 글 작성 폼 */}
        <Card>
          <div className="space-y-6">
            {/* 카테고리 선택 */}
            <div>
              <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                카테고리
              </label>
              <select
                value={formData.category}
                onChange={(e) => handleInputChange("category", e.target.value)}
                className="w-full px-4 py-3 border border-[var(--border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
              >
                <option value="">카테고리를 선택해주세요</option>
                {postCategories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.icon} {category.name}
                  </option>
                ))}
              </select>
            </div>

            {/* 제목 입력 */}
            <Input
              label="제목"
              placeholder="게시물의 제목을 입력해주세요"
              value={formData.title}
              onChange={(e) => handleInputChange("title", e.target.value)}
            />

            {/* 내용 입력 */}
            <div>
              <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                {postType === "poll" ? "질문 내용" : "내용"}
              </label>
              <textarea
                value={formData.content}
                onChange={(e) => handleInputChange("content", e.target.value)}
                className="w-full px-4 py-3 border border-[var(--border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent resize-none h-32"
                placeholder={
                  postType === "poll"
                    ? "어떤 것에 대해 의견을 묻고 싶나요?"
                    : "여러분의 이야기를 자세히 들려주세요. 따뜻한 경험이나 감동적인 순간들을 나눠주세요."
                }
              />
            </div>

            {/* 투표 옵션 (투표 타입일 때만) */}
            {postType === "poll" && (
              <div>
                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                  투표 옵션
                </label>
                <div className="space-y-3">
                  {pollOptions.map((option, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className="flex-1">
                        <Input
                          placeholder={`옵션 ${index + 1}`}
                          value={option}
                          onChange={(e) =>
                            updatePollOption(index, e.target.value)
                          }
                        />
                      </div>
                      {pollOptions.length > 2 && (
                        <button
                          onClick={() => removePollOption(index)}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <span className="text-lg">×</span>
                        </button>
                      )}
                    </div>
                  ))}
                  {pollOptions.length < 5 && (
                    <button
                      onClick={addPollOption}
                      className="flex items-center space-x-2 text-[var(--primary)] hover:bg-purple-50 px-3 py-2 rounded-lg transition-colors"
                    >
                      <PlusIcon size={16} />
                      <span className="text-sm font-medium">옵션 추가</span>
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* 태그 입력 */}
            <Input
              label="태그"
              placeholder="관련 태그를 쉼표로 구분해서 입력해주세요 (예: 친절, 감동, 일상)"
              value={formData.tags}
              onChange={(e) => handleInputChange("tags", e.target.value)}
            />

            {/* 익명 설정 */}
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="anonymous"
                checked={formData.anonymous}
                onChange={(e) =>
                  handleInputChange("anonymous", e.target.checked)
                }
                className="rounded border-gray-300 text-[var(--primary)] focus:ring-[var(--primary)]"
              />
              <label
                htmlFor="anonymous"
                className="text-sm text-[var(--text-secondary)]"
              >
                익명으로 게시하기
              </label>
            </div>

            {/* 제출 버튼 */}
            <div className="pt-4">
              <Button
                variant="primary"
                fullWidth
                onClick={handleSubmit}
                disabled={
                  !formData.title || !formData.content || !formData.category
                }
              >
                {postType === "story"
                  ? "이야기 공유하기"
                  : postType === "poll"
                  ? "투표 만들기"
                  : "상담 요청하기"}
              </Button>
            </div>
          </div>
        </Card>

        {/* 작성 가이드 */}
        <Card className="mt-6 bg-gradient-to-r from-blue-50 to-purple-50 border-none">
          <div className="text-center">
            <div className="text-2xl mb-2">💡</div>
            <h3 className="font-medium text-[var(--text-primary)] mb-2">
              더 좋은 글을 위한 팁
            </h3>
            <ul className="text-sm text-[var(--text-secondary)] text-left space-y-1">
              <li>• 구체적이고 생생한 경험을 공유해주세요</li>
              <li>• 다른 사람들이 공감할 수 있는 감정을 표현해보세요</li>
              <li>• 존중하는 마음으로 따뜻한 언어를 사용해주세요</li>
            </ul>
          </div>
        </Card>
      </div>
    </div>
  );
}

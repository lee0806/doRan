"use client";

// 프로필 페이지
import { useState } from "react";
import Card from "@/components/common/Card";
import Button from "@/components/common/Button";
import {
  EditIcon,
  HeartIcon,
  MessageIcon,
  ShareIcon,
  MoreIcon,
} from "@/components/common/Icons";
import { dummyUsers, dummyPosts } from "@/data/dummyData";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<"posts" | "likes" | "comments">(
    "posts"
  );

  // 현재 사용자 (더미 데이터에서 첫 번째 사용자)
  const currentUser = dummyUsers[0];

  // 사용자의 게시물
  const userPosts = dummyPosts.filter(
    (post) => post.author.id === currentUser.id
  );

  // 통계 데이터
  const stats = {
    posts: userPosts.length,
    likes: userPosts.reduce((sum, post) => sum + post.likes, 0),
    comments: userPosts.reduce((sum, post) => sum + post.comments.length, 0),
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* 헤더 */}
      <header className="bg-white border-b border-[var(--border-light)] px-4 py-4 sticky top-0 z-40">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-[var(--text-primary)]">
            내 프로필
          </h1>
          <Button variant="outline" size="sm">
            <EditIcon size={16} className="mr-2" />
            편집
          </Button>
        </div>
      </header>

      <div className="px-4 py-4">
        {/* 프로필 카드 */}
        <Card className="mb-6">
          <div className="text-center">
            {/* 프로필 이미지 */}
            <div className="w-20 h-20 bg-gradient-to-br from-[var(--primary)] to-[var(--primary-light)] rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-2xl font-bold">
                {currentUser.username.charAt(0)}
              </span>
            </div>

            {/* 사용자 정보 */}
            <h2 className="text-xl font-bold text-[var(--text-primary)] mb-1">
              {currentUser.username}
            </h2>
            <p className="text-[var(--text-secondary)] mb-3">
              {currentUser.bio || "아직 소개글이 없어요"}
            </p>
            <p className="text-sm text-[var(--text-muted)]">
              {formatDate(currentUser.joinDate)} 가입
            </p>
          </div>
        </Card>

        {/* 통계 카드 */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <Card className="text-center">
            <div className="text-2xl font-bold text-[var(--primary)] mb-1">
              {stats.posts}
            </div>
            <div className="text-sm text-[var(--text-muted)]">게시물</div>
          </Card>

          <Card className="text-center">
            <div className="text-2xl font-bold text-[var(--primary)] mb-1">
              {stats.likes}
            </div>
            <div className="text-sm text-[var(--text-muted)]">받은 좋아요</div>
          </Card>

          <Card className="text-center">
            <div className="text-2xl font-bold text-[var(--primary)] mb-1">
              {stats.comments}
            </div>
            <div className="text-sm text-[var(--text-muted)]">받은 댓글</div>
          </Card>
        </div>

        {/* 탭 네비게이션 */}
        <div className="bg-white rounded-lg border border-[var(--border-light)] p-1 mb-6">
          <div className="grid grid-cols-3">
            <button
              onClick={() => setActiveTab("posts")}
              className={`py-2 px-4 text-sm font-medium rounded-md transition-all duration-200 ${
                activeTab === "posts"
                  ? "bg-[var(--primary)] text-white"
                  : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
              }`}
            >
              내 게시물
            </button>
            <button
              onClick={() => setActiveTab("likes")}
              className={`py-2 px-4 text-sm font-medium rounded-md transition-all duration-200 ${
                activeTab === "likes"
                  ? "bg-[var(--primary)] text-white"
                  : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
              }`}
            >
              좋아요한 글
            </button>
            <button
              onClick={() => setActiveTab("comments")}
              className={`py-2 px-4 text-sm font-medium rounded-md transition-all duration-200 ${
                activeTab === "comments"
                  ? "bg-[var(--primary)] text-white"
                  : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
              }`}
            >
              댓글 단 글
            </button>
          </div>
        </div>

        {/* 콘텐츠 영역 */}
        <div>
          {activeTab === "posts" && (
            <div>
              {userPosts.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">📝</div>
                  <h3 className="text-lg font-medium text-[var(--text-primary)] mb-2">
                    아직 작성한 게시물이 없어요
                  </h3>
                  <p className="text-[var(--text-muted)] mb-4">
                    첫 번째 따뜻한 이야기를 공유해보세요
                  </p>
                  <Button variant="primary">글 작성하기</Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {userPosts.map((post) => (
                    <Card
                      key={post.id}
                      className="cursor-pointer hover:shadow-md transition-shadow"
                    >
                      {/* 카테고리 */}
                      <div className="mb-3">
                        <span
                          className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium"
                          style={{
                            backgroundColor: `${post.category.color}15`,
                            color: post.category.color,
                          }}
                        >
                          <span className="mr-1">{post.category.icon}</span>
                          {post.category.name}
                        </span>
                      </div>

                      {/* 제목과 내용 */}
                      <h3 className="font-semibold text-[var(--text-primary)] mb-2 line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-[var(--text-secondary)] text-sm mb-3 line-clamp-2">
                        {post.content}
                      </p>

                      {/* 통계 정보 */}
                      <div className="flex items-center justify-between text-sm text-[var(--text-muted)]">
                        <div className="flex items-center space-x-4">
                          <span className="flex items-center space-x-1">
                            <HeartIcon size={16} />
                            <span>{post.likes}</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <MessageIcon size={16} />
                            <span>{post.comments.length}</span>
                          </span>
                        </div>
                        <span>{formatDate(post.createdAt)}</span>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === "likes" && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">💜</div>
              <h3 className="text-lg font-medium text-[var(--text-primary)] mb-2">
                좋아요한 게시물
              </h3>
              <p className="text-[var(--text-muted)]">
                마음에 든 게시물들이 여기에 표시됩니다
              </p>
            </div>
          )}

          {activeTab === "comments" && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">💬</div>
              <h3 className="text-lg font-medium text-[var(--text-primary)] mb-2">
                댓글 활동
              </h3>
              <p className="text-[var(--text-muted)]">
                댓글을 남긴 게시물들이 여기에 표시됩니다
              </p>
            </div>
          )}
        </div>

        {/* 설정 메뉴 */}
        <Card className="mt-8">
          <h3 className="font-semibold text-[var(--text-primary)] mb-4">
            설정
          </h3>
          <div className="space-y-3">
            <button className="w-full text-left py-3 px-4 hover:bg-gray-50 rounded-lg transition-colors">
              <span className="text-[var(--text-primary)]">개인정보 수정</span>
            </button>
            <button className="w-full text-left py-3 px-4 hover:bg-gray-50 rounded-lg transition-colors">
              <span className="text-[var(--text-primary)]">알림 설정</span>
            </button>
            <button className="w-full text-left py-3 px-4 hover:bg-gray-50 rounded-lg transition-colors">
              <span className="text-[var(--text-primary)]">
                차단 사용자 관리
              </span>
            </button>
            <button className="w-full text-left py-3 px-4 hover:bg-gray-50 rounded-lg transition-colors">
              <span className="text-[var(--text-primary)]">문의하기</span>
            </button>
            <button className="w-full text-left py-3 px-4 hover:bg-red-50 rounded-lg transition-colors">
              <span className="text-red-500">로그아웃</span>
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
}

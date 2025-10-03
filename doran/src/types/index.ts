// 사용자 관련 타입
export interface User {
  id: string;
  username: string;
  email: string;
  profileImage?: string;
  bio?: string;
  joinDate: string;
  isActive: boolean;
}

// 게시물 관련 타입
export interface Post {
  id: string;
  title: string;
  content: string;
  author: User;
  category: PostCategory;
  tags: string[];
  likes: number;
  comments: Comment[];
  createdAt: string;
  updatedAt: string;
  isAnonymous?: boolean;
}

// 게시물 카테고리
export interface PostCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
}

// 댓글 타입
export interface Comment {
  id: string;
  content: string;
  author: User;
  postId: string;
  parentId?: string; // 대댓글인 경우
  likes: number;
  createdAt: string;
  isAnonymous?: boolean;
  replies?: Comment[];
}

// 투표 옵션 타입
export interface PollOption {
  id: string;
  text: string;
  votes: number;
}

// 투표 게시물 타입
export interface PollPost extends Omit<Post, "content"> {
  question: string;
  options: PollOption[];
  totalVotes: number;
  endDate?: string;
  allowMultiple: boolean;
}

// 알림 타입
export interface Notification {
  id: string;
  userId: string;
  type: "like" | "comment" | "reply" | "mention" | "system";
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
  actionUrl?: string;
}

// 상담 세션 타입
export interface CounselingSession {
  id: string;
  title: string;
  description: string;
  category: string;
  status: "active" | "resolved" | "closed";
  anonymous: boolean;
  createdAt: string;
  responses: CounselingResponse[];
}

// 상담 답변 타입
export interface CounselingResponse {
  id: string;
  sessionId: string;
  content: string;
  author?: User;
  isAnonymous: boolean;
  helpful: number;
  createdAt: string;
}

// API 응답 타입
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

// 페이지네이션 타입
export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

// 게시물 필터 타입
export interface PostFilter {
  category?: string;
  tags?: string[];
  sortBy?: "recent" | "popular" | "trending";
  timeRange?: "today" | "week" | "month" | "all";
}

// 카테고리 키-라벨 매핑 타입
export type CategoryKey = "all" | "general" | "school" | "career" | "worry";

export const CATEGORY_LABELS: Record<CategoryKey, string> = {
  all: "전체",
  general: "일상",
  school: "학교",
  career: "직장",
  worry: "고민",
};

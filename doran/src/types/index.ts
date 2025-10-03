// 카테고리 키-라벨 매핑 타입
export type CategoryKey = "all" | "general" | "school" | "career" | "worry";

export const CATEGORY_LABELS: Record<CategoryKey, string> = {
  all: "전체",
  general: "일상",
  school: "학교",
  career: "직장",
  worry: "고민",
};

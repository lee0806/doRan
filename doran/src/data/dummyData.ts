import {
  User,
  Post,
  PostCategory,
  Comment,
  PollPost,
  Notification,
  CounselingSession,
} from "@/types";

// 더미 사용자 데이터
export const dummyUsers: User[] = [
  {
    id: "1",
    username: "따뜻한마음",
    email: "warmheart@example.com",
    profileImage: "/images/profile1.jpg",
    bio: "서로를 이해하고 공감하는 세상을 꿈꿉니다.",
    joinDate: "2024-01-15",
    isActive: true,
  },
  {
    id: "2",
    username: "소통러버",
    email: "communication@example.com",
    profileImage: "/images/profile2.jpg",
    bio: "대화로 모든 문제를 해결할 수 있다고 믿어요.",
    joinDate: "2024-02-20",
    isActive: true,
  },
  {
    id: "3",
    username: "공감쟁이",
    email: "empathy@example.com",
    bio: "여러분의 이야기에 진심으로 공감합니다.",
    joinDate: "2024-03-10",
    isActive: true,
  },
];

// 게시물 카테고리
export const postCategories: PostCategory[] = [
  {
    id: "daily",
    name: "일상",
    description: "소소한 일상 속 따뜻한 이야기",
    icon: "☀️",
    color: "#FFB800",
  },
  {
    id: "workplace",
    name: "직장",
    description: "직장 생활 속 인간관계와 경험담",
    icon: "💼",
    color: "#4285F4",
  },
  {
    id: "school",
    name: "학교",
    description: "학교에서의 감동과 우정 이야기",
    icon: "📚",
    color: "#0F9D58",
  },

  {
    id: "worry",
    name: "고민",
    description: "일상 속 다양한 고민과 이야기",
    icon: "📚",
    color: "#0F9D58",
  },
];

// 더미 댓글
export const dummyComments: Comment[] = [
  {
    id: "1",
    content:
      "정말 감동적인 이야기네요! 저도 비슷한 경험이 있어서 더욱 공감됩니다.",
    author: dummyUsers[1],
    postId: "1",
    likes: 12,
    createdAt: "2024-09-25T10:30:00Z",
  },
  {
    id: "2",
    content: "이런 따뜻한 마음이 더 많이 퍼졌으면 좋겠어요. 감사합니다.",
    author: dummyUsers[2],
    postId: "1",
    likes: 8,
    createdAt: "2024-09-25T11:15:00Z",
  },
];

// 더미 게시물
export const dummyPosts: Post[] = [
  {
    id: "1",
    title: "버스에서 만난 작은 친절이 준 큰 감동",
    content:
      "오늘 아침 출근길 버스에서 있었던 일이에요. 임신부석에 앉아계시던 할머니가 젊은 임산부에게 자리를 양보하시는 모습을 보았습니다. 그 순간의 따뜻함이 하루 종일 제 마음을 따뜻하게 했어요. 작은 배려가 이렇게 큰 감동을 줄 수 있다는 걸 다시 한번 느꼈습니다.",
    author: dummyUsers[0],
    category: postCategories[0],
    tags: ["친절", "감동", "일상", "대중교통"],
    likes: 45,
    comments: dummyComments,
    createdAt: "2024-09-25T09:00:00Z",
    updatedAt: "2024-09-25T09:00:00Z",
  },
  {
    id: "2",
    title: "신입사원 시절, 선배의 따뜻한 조언",
    content:
      '처음 회사에 입사했을 때 실수투성이였던 저에게 선배가 해주신 말씀이 아직도 기억나요. "실수는 성장의 과정이야. 완벽하려고 하지 말고 조금씩 나아가면 돼." 그 한마디로 얼마나 위로가 되었는지 모릅니다.',
    author: dummyUsers[1],
    category: postCategories[1],
    tags: ["직장생활", "선배", "조언", "성장"],
    likes: 38,
    comments: [],
    createdAt: "2024-09-24T14:20:00Z",
    updatedAt: "2024-09-24T14:20:00Z",
  },
  {
    id: "3",
    title: "학교 급식실에서 본 따뜻한 풍경",
    content:
      "오늘 급식실에서 휠체어를 탄 친구를 자연스럽게 도와주는 반 친구들을 보았습니다. 특별한 것처럼 여기지 않고 당연하게 배려하는 모습이 너무 아름다웠어요. 우리 반이 자랑스럽습니다!",
    author: dummyUsers[2],
    category: postCategories[2],
    tags: ["학교", "배려", "친구", "장애인식개선"],
    likes: 67,
    comments: [],
    createdAt: "2024-09-23T16:45:00Z",
    updatedAt: "2024-09-23T16:45:00Z",
  },
];

// 더미 투표 게시물
export const dummyPollPosts: PollPost[] = [
  {
    id: "poll1",
    title: "친구와의 갈등, 어떻게 해결하는게 좋을까요?",
    author: dummyUsers[0],
    category: postCategories[5],
    tags: ["친구갈등", "고민", "조언구함"],
    likes: 23,
    comments: [],
    createdAt: "2024-09-25T12:00:00Z",
    updatedAt: "2024-09-25T12:00:00Z",
    question:
      "친구가 약속을 자주 취소해서 속상해요. 어떻게 대화를 시작하면 좋을까요?",
    options: [
      { id: "1", text: "직접적으로 솔직하게 말하기", votes: 15 },
      { id: "2", text: "부드럽게 돌려서 이야기하기", votes: 28 },
      { id: "3", text: "시간을 두고 관찰해보기", votes: 12 },
      { id: "4", text: "제3자를 통해 전달하기", votes: 5 },
    ],
    totalVotes: 60,
    allowMultiple: false,
  },
];

// 더미 알림
export const dummyNotifications: Notification[] = [
  {
    id: "1",
    userId: "1",
    type: "like",
    title: "게시물에 좋아요가 달렸습니다",
    message:
      '"버스에서 만난 작은 친절이 준 큰 감동" 게시물에 좋아요 5개가 달렸습니다.',
    isRead: false,
    createdAt: "2024-09-25T15:30:00Z",
  },
  {
    id: "2",
    userId: "1",
    type: "comment",
    title: "새로운 댓글이 달렸습니다",
    message: "따뜻한마음님이 회원님의 게시물에 댓글을 남겼습니다.",
    isRead: false,
    createdAt: "2024-09-25T14:20:00Z",
  },
];

// 더미 상담 세션
export const dummyCounselingSessions: CounselingSession[] = [
  {
    id: "1",
    title: "직장 상사와의 갈등 해결 방법",
    description:
      "상사와 의견 충돌이 자주 일어나는데, 어떻게 소통하면 좋을까요?",
    category: "workplace",
    status: "active",
    anonymous: true,
    createdAt: "2024-09-25T10:00:00Z",
    responses: [
      {
        id: "1",
        sessionId: "1",
        content:
          "먼저 상사의 입장에서 생각해보시고, 건설적인 대안을 제시해보세요. 감정적으로 대응하기보다는 업무적인 관점에서 접근하는 것이 도움될 것 같습니다.",
        author: dummyUsers[1],
        isAnonymous: false,
        helpful: 8,
        createdAt: "2024-09-25T11:30:00Z",
      },
    ],
  },
];

export default {
  users: dummyUsers,
  posts: dummyPosts,
  categories: postCategories,
  comments: dummyComments,
  pollPosts: dummyPollPosts,
  notifications: dummyNotifications,
  counselingSessions: dummyCounselingSessions,
};

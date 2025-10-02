"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  HomeIcon,
  MessageIcon,
  PlusIcon,
  NotificationIcon,
  UserIcon,
} from "./Icons";

const navItems = [
  {
    href: "/",
    label: "홈",
    icon: HomeIcon,
  },
  {
    href: "/counseling",
    label: "상담",
    icon: MessageIcon,
  },
  {
    href: "/create",
    label: "글쓰기",
    icon: PlusIcon,
  },
  {
    href: "/notifications",
    label: "알림",
    icon: NotificationIcon,
  },
  {
    href: "/profile",
    label: "프로필",
    icon: UserIcon,
  },
];

export default function BottomNavigation() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-[var(--border-light)] px-4 py-2 z-50">
      <div className="flex justify-around items-center max-w-md mx-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center py-2 px-3 rounded-lg transition-all duration-200 ${
                isActive
                  ? "text-[var(--primary)]"
                  : "text-[var(--text-muted)] hover:text-[var(--text-secondary)]"
              }`}
            >
              <Icon
                size={20}
                color={isActive ? "var(--primary)" : "currentColor"}
              />
              <span
                className={`text-xs mt-1 font-medium ${
                  isActive ? "text-[var(--primary)]" : ""
                }`}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

"use client";

import { useState } from "react";
import Card from "@/components/common/Card";
import Button from "@/components/common/Button";
import {
  HeartFilledIcon,
  MessageIcon,
  NotificationIcon,
  CheckIcon,
} from "@/components/common/Icons";
import { dummyNotifications } from "@/data/dummyData";
import { Notification } from "@/types";

export default function NotificationsPage() {
  const [notifications, setNotifications] =
    useState<Notification[]>(dummyNotifications);
  const [filter, setFilter] = useState<"all" | "unread">("all");

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60 * 60)
    );

    if (diffInHours < 1) return "방금 전";
    if (diffInHours < 24) return `${diffInHours}시간 전`;
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}일 전`;
    return date.toLocaleDateString("ko-KR");
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "like":
        return <HeartFilledIcon size={20} />;
      case "comment":
      case "reply":
      case "mention":
        return <MessageIcon size={20} color="var(--primary)" />;
      case "system":
        return <NotificationIcon size={20} color="var(--primary)" />;
      default:
        return <NotificationIcon size={20} color="var(--text-muted)" />;
    }
  };

  const markAsRead = (notificationId: string) => {
    setNotifications((prev) =>
      prev.map((notif) =>
        notif.id === notificationId ? { ...notif, isRead: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((notif) => ({ ...notif, isRead: true }))
    );
  };

  const filteredNotifications = notifications.filter(
    (notif) => filter === "all" || (filter === "unread" && !notif.isRead)
  );

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* 헤더 */}
      <header className="bg-white border-b border-[var(--border-light)] px-4 py-4 sticky top-0 z-40">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-[var(--text-primary)]">
              알림
            </h1>
            <p className="text-sm text-[var(--text-muted)]">
              {unreadCount > 0
                ? `읽지 않은 알림 ${unreadCount}개`
                : "모든 알림을 확인했어요"}
            </p>
          </div>
          {unreadCount > 0 && (
            <Button variant="outline" size="sm" onClick={markAllAsRead}>
              모두 읽음
            </Button>
          )}
        </div>
      </header>

      {/* 필터 탭 */}
      <div className="bg-white border-b border-[var(--border-light)] px-4">
        <div className="flex">
          <button
            onClick={() => setFilter("all")}
            className={`flex-1 py-3 text-center font-medium transition-all duration-200 relative ${
              filter === "all"
                ? "text-[var(--primary)] border-b-2 border-[var(--primary)]"
                : "text-[var(--text-muted)]"
            }`}
          >
            전체 알림
          </button>
          <button
            onClick={() => setFilter("unread")}
            className={`flex-1 py-3 text-center font-medium transition-all duration-200 relative ${
              filter === "unread"
                ? "text-[var(--primary)] border-b-2 border-[var(--primary)]"
                : "text-[var(--text-muted)]"
            }`}
          >
            읽지 않음
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {unreadCount > 99 ? "99+" : unreadCount}
              </span>
            )}
          </button>
        </div>
      </div>

      <div className="px-4 py-4">
        {filteredNotifications.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔔</div>
            <h3 className="text-lg font-medium text-[var(--text-primary)] mb-2">
              {filter === "unread"
                ? "읽지 않은 알림이 없어요"
                : "알림이 없어요"}
            </h3>
            <p className="text-[var(--text-muted)]">
              {filter === "unread"
                ? "모든 알림을 확인하셨네요! 👏"
                : "새로운 활동이 있으면 알려드릴게요"}
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {filteredNotifications.map((notification) => (
              <Card
                key={notification.id}
                className={`cursor-pointer transition-all duration-200 ${
                  !notification.isRead
                    ? "bg-purple-50 border-[var(--primary)] border-opacity-20"
                    : "hover:bg-gray-50"
                }`}
                onClick={() => markAsRead(notification.id)}
              >
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 mt-1">
                    {getNotificationIcon(notification.type)}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <h3
                          className={`font-medium ${
                            !notification.isRead
                              ? "text-[var(--text-primary)]"
                              : "text-[var(--text-secondary)]"
                          }`}
                        >
                          {notification.title}
                        </h3>
                        <p
                          className={`text-sm mt-1 ${
                            !notification.isRead
                              ? "text-[var(--text-secondary)]"
                              : "text-[var(--text-muted)]"
                          }`}
                        >
                          {notification.message}
                        </p>
                      </div>

                      <div className="flex items-center space-x-2 ml-2">
                        <span className="text-xs text-[var(--text-muted)] whitespace-nowrap">
                          {formatDate(notification.createdAt)}
                        </span>
                        {!notification.isRead && (
                          <div className="w-2 h-2 bg-[var(--primary)] rounded-full flex-shrink-0"></div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* 알림 설정 안내 */}
        <Card className="mt-6 bg-gradient-to-r from-blue-50 to-purple-50 border-none">
          <div className="text-center">
            <div className="text-2xl mb-2">🔔</div>
            <h3 className="font-medium text-[var(--text-primary)] mb-2">
              알림 설정
            </h3>
            <p className="text-sm text-[var(--text-secondary)] mb-4">
              중요한 활동을 놓치지 않도록 알림을 받으세요
            </p>
            <Button variant="outline" size="sm">
              알림 설정하기
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}

import React from "react";

/**
 * 🚀 현대적인 Button 컴포넌트
 * 토스, 배민, 당근마켓 스타일의 세련된 버튼 디자인
 */

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** 버튼의 시각적 스타일 variant */
  variant?: "primary" | "secondary" | "ghost" | "outline";
  /** 버튼 크기 */
  size?: "sm" | "md" | "lg";
  /** 전체 너비 사용 여부 */
  fullWidth?: boolean;
  /** 로딩 상태 표시 */
  loading?: boolean;
  /** 아이콘 (선택사항) */
  icon?: React.ReactNode;
  /** 버튼 내용 */
  children: React.ReactNode;
}

export default function Button({
  variant = "primary",
  size = "md",
  fullWidth = false,
  loading = false,
  icon,
  children,
  className = "",
  disabled,
  ...props
}: ButtonProps) {
  // 🎨 기본 버튼 클래스 - 공통 스타일
  const baseClasses = "btn";

  // 🎯 Variant별 스타일 클래스
  const variantClasses = {
    primary: "btn-primary",
    secondary: "btn-secondary",
    ghost: "btn-ghost",
    outline: "btn-secondary", // outline은 secondary와 동일하게 처리
  };

  // 📏 Size별 클래스
  const sizeClasses = {
    sm: "btn-sm",
    md: "", // 기본 사이즈
    lg: "btn-lg",
  };

  // 📐 전체 너비 클래스
  const widthClass = fullWidth ? "btn-full" : "";

  // 🔄 로딩 상태 스피너 컴포넌트
  const LoadingSpinner = () => (
    <div className="animate-spin">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
        <circle
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="32"
          strokeDashoffset="32"
          style={{
            animation: "spin 1s linear infinite",
          }}
        />
      </svg>
    </div>
  );

  // 🎨 최종 클래스 조합
  const buttonClasses = [
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    widthClass,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button className={buttonClasses} disabled={disabled || loading} {...props}>
      {/* 로딩 상태일 때 스피너 표시 */}
      {loading && <LoadingSpinner />}

      {/* 아이콘이 있고 로딩 상태가 아닐 때 아이콘 표시 */}
      {icon && !loading && (
        <span className="flex items-center justify-center">{icon}</span>
      )}

      {/* 버튼 텍스트 */}
      <span>{children}</span>
    </button>
  );
}

/**
 * 사용 예시:
 *
 * <Button variant="primary" size="lg" fullWidth>
 *   로그인하기
 * </Button>
 *
 * <Button variant="secondary" icon={<HeartIcon />} loading>
 *   좋아요
 * </Button>
 */

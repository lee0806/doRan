import React from "react";

/**
 * 📝 현대적인 Input 컴포넌트
 * 토스, 배민 스타일의 깔끔한 입력 필드 디자인
 */

interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  /** 입력 필드 라벨 */
  label?: string;
  /** 에러 메시지 */
  error?: string;
  /** 성공 상태 표시 */
  success?: boolean;
  /** 도움말 텍스트 */
  helpText?: string;
  /** 왼쪽 아이콘 */
  leftIcon?: React.ReactNode;
  /** 오른쪽 아이콘 */
  rightIcon?: React.ReactNode;
  /** 입력 필드 크기 */
  size?: "sm" | "md" | "lg";
  /** 스타일 variant */
  variant?: "default" | "filled";
}

export default function Input({
  label,
  error,
  success,
  helpText,
  leftIcon,
  rightIcon,
  size = "md",
  variant = "default",
  className = "",
  id,
  ...props
}: InputProps) {
  // 🔤 고유 ID 생성 (라벨과 입력 필드 연결용)
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;

  // 📏 크기별 스타일
  const sizeStyles = {
    sm: "py-sm px-md text-sm",
    md: "py-md px-lg text-base",
    lg: "py-lg px-xl text-lg",
  };

  // 🎨 상태별 스타일
  const getInputStyles = () => {
    let styles = "input w-full ";

    // 크기 적용
    styles += sizeStyles[size] + " ";

    // 아이콘 패딩 조정
    if (leftIcon) styles += "pl-12 ";
    if (rightIcon) styles += "pr-12 ";

    // 상태별 스타일
    if (error) {
      styles += "border-red-300 focus:border-red-500 focus:shadow-red-100 ";
    } else if (success) {
      styles +=
        "border-green-300 focus:border-green-500 focus:shadow-green-100 ";
    }

    // Variant 스타일
    if (variant === "filled") {
      styles += "bg-gray-50 border-gray-200 ";
    }

    return styles + className;
  };

  return (
    <div className="w-full space-y-xs">
      {/* 📝 라벨 */}
      {label && (
        <label
          htmlFor={inputId}
          className="block text-sm font-medium text-gray-700 mb-xs"
        >
          {label}
          {props.required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      {/* 📝 입력 필드 컨테이너 */}
      <div className="relative">
        {/* 왼쪽 아이콘 */}
        {leftIcon && (
          <div className="absolute left-lg top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
            {leftIcon}
          </div>
        )}

        {/* 입력 필드 */}
        <input id={inputId} className={getInputStyles()} {...props} />

        {/* 오른쪽 아이콘 */}
        {rightIcon && (
          <div className="absolute right-lg top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
            {rightIcon}
          </div>
        )}

        {/* 성공 체크마크 */}
        {success && !rightIcon && (
          <div className="absolute right-lg top-1/2 -translate-y-1/2 text-green-500">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path
                d="M9 12l2 2 4-4"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        )}
      </div>

      {/* 💬 도움말 및 에러 메시지 */}
      {(error || helpText) && (
        <div className="mt-xs">
          {error && (
            <p className="text-sm text-red-600 flex items-center space-sm">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <line
                  x1="12"
                  y1="8"
                  x2="12"
                  y2="12"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <line
                  x1="12"
                  y1="16"
                  x2="12.01"
                  y2="16"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
              <span>{error}</span>
            </p>
          )}

          {helpText && !error && (
            <p className="text-sm text-gray-500">{helpText}</p>
          )}
        </div>
      )}
    </div>
  );
}

/**
 * 사용 예시:
 *
 * <Input
 *   label="이메일 주소"
 *   type="email"
 *   placeholder="your@email.com"
 *   leftIcon={<MailIcon />}
 *   helpText="로그인에 사용할 이메일을 입력해주세요"
 *   required
 * />
 *
 * <Input
 *   label="검색"
 *   placeholder="게시물을 검색해보세요"
 *   leftIcon={<SearchIcon />}
 *   size="lg"
 * />
 */

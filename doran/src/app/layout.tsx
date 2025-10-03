import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "도란 - 따뜻한 소통 커뮤니티",
  description: "서로를 이해하고 공감하는 긍정적인 온라인 커뮤니티 플랫폼",
  viewport:
    "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no",
  themeColor: "#6126C9",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
        />
        <meta name="theme-color" content="#6126C9" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      </head>
      <body className="bg-[var(--background)] text-[var(--text-primary)] pb-20">
        <main className="min-h-screen">{children}</main>
      </body>
    </html>
  );
}

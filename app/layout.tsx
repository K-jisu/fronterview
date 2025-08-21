import type { Metadata } from "next";
import "./globals.css";
import Navbar from "../widgets/layout/ui/navbar";

export const metadata: Metadata = {
  title: "FronterView",
  description: "프론트 엔드 면접 질문 준비 사이트",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <Navbar />
        <main className="min-h-screen bg-gray-50">{children}</main>
      </body>
    </html>
  );
}

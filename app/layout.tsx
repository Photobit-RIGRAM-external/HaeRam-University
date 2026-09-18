import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "해람대학교 전자졸업앨범 2027",
};

export default async function RootLayout({children,}: {children: React.ReactNode;}) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}

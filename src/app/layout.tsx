import Link from "next/link";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
          <div className = "navbar">
            <Link href = "/">Reci-pick!</Link>
          </div>
          {children} {/* page.js 들어가는 곳 */}
      </body>
    </html>
  );
}
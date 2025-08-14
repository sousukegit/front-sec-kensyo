"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavigationBar() {
  const pathname = usePathname();

  const navItems = [
    {
      href: "/",
      label: "🛡️ React安全デモ",
      description: "モダンフレームワークの安全性",
    },
    {
      href: "/old",
      label: "⚠️ 旧DOM操作デモ",
      description: "従来手法の脆弱性",
    },
    {
      href: "/malicious-demo",
      label: "💀 悪意JSファイル解析",
      description: "現実的な攻撃手法",
    },
    {
      href: "/csp",
      label: "🔒 CSPデモ",
      description: "ブラウザレベルの防御",
    },
    {
      href: "/escape",
      label: "🔍 エスケープ処理解析",
      description: "React内部の安全機構",
    },
  ];

  return (
    <nav
      style={{
        backgroundColor: "#1f2937",
        padding: "1rem 0",
        borderBottom: "1px solid #374151",
        marginBottom: "2rem",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 2rem",
          display: "flex",
          gap: "1rem",
          alignItems: "center",
        }}
      >
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            style={{
              textDecoration: "none",
              padding: "0.75rem 1.5rem",
              borderRadius: "6px",
              border: "1px solid #374151",
              backgroundColor: pathname === item.href ? "#3b82f6" : "#374151",
              color: "#fff",
              transition: "all 0.2s",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              minWidth: "180px",
            }}
          >
            <span style={{ fontSize: "1rem", marginBottom: "0.25rem" }}>
              {item.label}
            </span>
            <span
              style={{
                fontSize: "0.7rem",
                color: pathname === item.href ? "#dbeafe" : "#9ca3af",
                textAlign: "center",
              }}
            >
              {item.description}
            </span>
          </Link>
        ))}
      </div>
    </nav>
  );
}

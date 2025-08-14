"use client";

import { useEffect } from "react";

export default function OldDOMDemo() {
  useEffect(() => {
    // ページロード時に旧DOM操作のサンプルをセットアップ
    const setupOldDemo = () => {
      const userInputElement = document.getElementById(
        "user-input"
      ) as HTMLInputElement;
      const submitButton = document.getElementById(
        "submit-btn"
      ) as HTMLButtonElement;
      const outputDiv = document.getElementById("output") as HTMLDivElement;
      const warningDiv = document.getElementById("warning") as HTMLDivElement;

      if (userInputElement && submitButton && outputDiv) {
        submitButton.addEventListener("click", () => {
          const userInput = userInputElement.value;

          // ⚠️ 危険：旧DOM操作によるXSS脆弱性のデモ
          // innerHTML を直接使用すると、入力されたHTMLタグが実行される
          outputDiv.innerHTML = `ようこそ、${userInput}さん！`;

          // 外部スクリプトファイルの場合は動的に実行する必要がある
          if (userInput.includes('<script src="/malicious-demo.js">')) {
            const script = document.createElement("script");
            script.src = "/malicious-demo.js";
            document.head.appendChild(script);

            warningDiv.innerHTML = `
              <div style="background: #dc2626; border: 1px solid #f00; padding: 10px; margin: 10px 0; border-radius: 5px; color: white;">
                <strong>💀 外部悪意スクリプトが実行されました！</strong><br>
                malicious-demo.js が読み込まれ、実行されています。<br>
                ブラウザの開発者ツール（F12）でConsoleタブを確認してください。
              </div>
            `;
            return;
          }

          // 警告メッセージを表示
          if (
            userInput.includes("<script>") ||
            userInput.includes("onerror") ||
            userInput.includes("onload")
          ) {
            warningDiv.innerHTML = `
              <div style="border: 1px solid #f00; padding: 10px; margin: 10px 0; border-radius: 5px;">
                <strong>⚠️ XSS攻撃が検出されました！</strong><br>
                入力された悪意のあるコードが実行されています。
              </div>
            `;
          } else {
            warningDiv.innerHTML = "";
          }
        });
      }
    };

    // DOM が完全に読み込まれた後に実行
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", setupOldDemo);
    } else {
      setupOldDemo();
    }

    return () => {
      // クリーンアップ
      document.removeEventListener("DOMContentLoaded", setupOldDemo);
    };
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#1a1a1a",
        color: "#fff",
        fontFamily: "Arial, sans-serif",
        padding: "2rem",
      }}
    >
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        <header style={{ textAlign: "center", marginBottom: "3rem" }}>
          <h1 style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>
            ⚠️ 旧DOM操作による脆弱性デモ
          </h1>
          <p style={{ color: "#ccc", fontSize: "1.1rem" }}>
            jQuery時代やVanilla JSでよく見られた危険なDOM操作の例
          </p>
        </header>

        <div
          style={{
            backgroundColor: "#2a2a2a",
            padding: "2rem",
            borderRadius: "8px",
            border: "1px solid #444",
            marginBottom: "2rem",
          }}
        >
          <h2 style={{ marginBottom: "1.5rem", color: "#ff6b6b" }}>
            🚨 innerHTML を使った危険な実装
          </h2>

          <div style={{ marginBottom: "1.5rem" }}>
            <label
              htmlFor="user-input"
              style={{
                display: "block",
                marginBottom: "0.5rem",
                fontSize: "1rem",
                color: "#ccc",
              }}
            >
              ユーザー名を入力:
            </label>
            <input
              id="user-input"
              type="text"
              placeholder="ユーザー名を入力してください..."
              style={{
                width: "100%",
                padding: "1rem",
                backgroundColor: "#333",
                border: "1px solid #555",
                borderRadius: "4px",
                color: "#fff",
                fontSize: "1rem",
              }}
              defaultValue=""
            />
            <p
              style={{ fontSize: "0.8rem", color: "#999", marginTop: "0.5rem" }}
            >
              💡 試してみてください:{" "}
              <code>&lt;script&gt;alert("XSS")&lt;/script&gt;</code>
            </p>
          </div>

          <button
            id="submit-btn"
            style={{
              backgroundColor: "#dc3545",
              color: "#fff",
              border: "none",
              padding: "1rem 2rem",
              borderRadius: "4px",
              fontSize: "1rem",
              cursor: "pointer",
              marginBottom: "1.5rem",
            }}
          >
            ⚠️ 危険な処理を実行
          </button>

          <div id="warning" style={{ marginBottom: "1rem" }}></div>

          <div
            style={{
              backgroundColor: "#333",
              padding: "1.5rem",
              borderRadius: "4px",
              border: "1px solid #555",
              marginBottom: "1rem",
            }}
          >
            <h3 style={{ marginBottom: "1rem", color: "#fff" }}>出力結果:</h3>
            <div
              id="output"
              style={{
                backgroundColor: "#444",
                padding: "1rem",
                borderRadius: "4px",
                minHeight: "50px",
                border: "1px solid #666",
              }}
            >
              {/* ここに動的にコンテンツが挿入されます */}
            </div>
          </div>
        </div>

        {/* サンプル攻撃パターン */}
        <div
          style={{
            backgroundColor: "#2a2a2a",
            padding: "2rem",
            borderRadius: "8px",
            border: "1px solid #444",
            marginBottom: "2rem",
          }}
        >
          <h2 style={{ marginBottom: "1.5rem", color: "#ffd93d" }}>
            💀 攻撃パターンの例
          </h2>
          <div style={{ display: "grid", gap: "1rem" }}>
            {[
              '<script>alert("XSS Attack!")</script>',
              '<img src="x" onerror="alert(\'XSS via img\')" />',
              "<svg onload=\"alert('XSS via SVG')\" />",
              "<iframe src=\"javascript:alert('XSS via iframe')\" />",
              '<script src="/malicious-demo.js"></script>',
              "window.maliciousDemo?.executeAttack()",
              "<body onload=\"alert('XSS via body')\" />",
            ].map((payload, index) => (
              <div
                key={index}
                style={{
                  backgroundColor: "#333",
                  padding: "1rem",
                  borderRadius: "4px",
                  border: "1px solid #555",
                }}
              >
                <div
                  style={{
                    fontSize: "0.8rem",
                    color: "#ff6b6b",
                    marginBottom: "0.5rem",
                    fontWeight: "bold",
                  }}
                >
                  攻撃パターン {index + 1}:
                </div>
                <code
                  style={{
                    backgroundColor: "#444",
                    padding: "0.5rem",
                    borderRadius: "3px",
                    display: "block",
                    marginBottom: "0.5rem",
                    wordBreak: "break-all",
                  }}
                >
                  {payload}
                </code>
                <button
                  onClick={() => {
                    const input = document.getElementById(
                      "user-input"
                    ) as HTMLInputElement;
                    if (input) {
                      input.value = payload;
                    }
                  }}
                  style={{
                    backgroundColor: "#6c757d",
                    color: "#fff",
                    border: "none",
                    padding: "0.5rem 1rem",
                    borderRadius: "3px",
                    fontSize: "0.8rem",
                    cursor: "pointer",
                  }}
                >
                  📋 コピーして試す
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* 技術解説 */}
        <div
          style={{
            backgroundColor: "#2a2a2a",
            padding: "2rem",
            borderRadius: "8px",
            border: "1px solid #444",
          }}
        >
          <h2 style={{ marginBottom: "1.5rem", color: "#6fbf73" }}>
            🔍 技術的な解説
          </h2>

          <div style={{ marginBottom: "2rem" }}>
            <h3 style={{ color: "#ff6b6b", marginBottom: "1rem" }}>
              ❌ 問題のあるコード例:
            </h3>
            <pre
              style={{
                backgroundColor: "#333",
                padding: "1rem",
                borderRadius: "4px",
                border: "1px solid #555",
                overflow: "auto",
                fontSize: "0.9rem",
              }}
            >
              {`// jQuery時代によく見られた危険なパターン
const userInput = $("#user-input").val();
$("#output").html("ようこそ、" + userInput + "さん！");

// Vanilla JSでも同様の問題
const userInput = document.getElementById("user-input").value;
document.getElementById("output").innerHTML = "ようこそ、" + userInput + "さん！";`}
            </pre>
          </div>

          <div style={{ marginBottom: "2rem" }}>
            <h3 style={{ color: "#6fbf73", marginBottom: "1rem" }}>
              ✅ 安全な対策:
            </h3>
            <pre
              style={{
                backgroundColor: "#333",
                padding: "1rem",
                borderRadius: "4px",
                border: "1px solid #555",
                overflow: "auto",
                fontSize: "0.9rem",
              }}
            >
              {`// textContent を使用して安全に表示
const userInput = document.getElementById("user-input").value;
document.getElementById("output").textContent = "ようこそ、" + userInput + "さん！";

// Reactを使用した場合（自動的にエスケープされる）
const [userInput, setUserInput] = useState("");
return <div>ようこそ、{userInput}さん！</div>;`}
            </pre>
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
              💡 ポイント:
            </h4>
            <p style={{ color: "#dbeafe", fontSize: "0.9rem", margin: 0 }}>
              旧来のDOM操作では開発者が手動でセキュリティ対策を行う必要がありましたが、
              モダンフレームワーク（React, Vue, Angular等）では、
              デフォルトでXSS攻撃から保護されるように設計されています。
            </p>
          </div>
        </div>

        <div
          style={{
            textAlign: "center",
            marginTop: "2rem",
            padding: "1rem",
            backgroundColor: "#333",
            borderRadius: "4px",
            display: "flex",
            gap: "1rem",
            justifyContent: "center",
          }}
        >
          <a
            href="/"
            style={{
              color: "#4fb3d9",
              textDecoration: "none",
              fontSize: "1rem",
              padding: "0.5rem 1rem",
              backgroundColor: "#1f2937",
              borderRadius: "4px",
              border: "1px solid #374151",
            }}
          >
            🛡️ React安全デモ
          </a>
          <a
            href="/csp"
            style={{
              color: "#4fb3d9",
              textDecoration: "none",
              fontSize: "1rem",
              padding: "0.5rem 1rem",
              backgroundColor: "#1f2937",
              borderRadius: "4px",
              border: "1px solid #374151",
            }}
          >
            🔒 CSPデモ
          </a>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";

export default function Home() {
  const [userInput, setUserInput] = useState("");
  const [safeOutput, setSafeOutput] = useState("");
  const [dangerousOutput, setDangerousOutput] = useState("");
  const [displayMode, setDisplayMode] = useState<"safe" | "dangerous">("safe");

  // XSSテスト用のサンプルペイロード
  const xssPayloads = [
    '<script>alert("XSS Attack!")</script>',
    '<img src="x" onerror="alert(\'XSS via img\')" />',
    "<svg onload=\"alert('XSS via SVG')\" />",
    "<iframe src=\"javascript:alert('XSS via iframe')\" />",
    '<script src="/malicious-demo.js"></script>',
    "<script>window.maliciousDemo?.executeAttack()</script>",
    'javascript:alert("XSS")',
    "<body onload=\"alert('XSS via body')\" />",
  ];

  const handleTest = () => {
    if (displayMode === "safe") {
      setSafeOutput(userInput);
      setDangerousOutput(""); // 安全モード時は危険な出力をクリア
    } else {
      setDangerousOutput(userInput);
      setSafeOutput(""); // 危険モード時は安全な出力をクリア
    }
  };

  const handlePayloadTest = (payload: string) => {
    setUserInput(payload);
    // ペイロード選択時に既存の出力をクリアして、自動実行を防ぐ
    setSafeOutput("");
    setDangerousOutput("");
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">
            🔒 セキュアログインシステム
          </h1>
          <p className="text-gray-300">
            ログインフォームのXSS脆弱性とReactのセキュリティ機能を学習
          </p>
        </header>

        {/* ログインフォーム */}
        <div className="bg-gray-900 p-8 rounded-lg border border-gray-700 mb-8">
          <h2 className="text-xl font-semibold mb-6 text-center">
            👤 ユーザーログイン
          </h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleTest();
            }}
            className="space-y-6"
          >
            <div>
              <label
                htmlFor="username-input"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                ユーザー名
              </label>
              <input
                id="username-input"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="ユーザー名を入力してください..."
                className="w-full p-4 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-gray-500 focus:outline-none resize-none"
                required
              />
              <p className="text-xs text-gray-400 mt-2">
                ⚠️
                このフォームは学習用です。悪意のあるコードも入力可能な状態になっています
              </p>
            </div>

            <div>
              <label
                htmlFor="password-input"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                パスワード
              </label>
              <input
                id="password-input"
                value="nint_daisuki"
                placeholder="パスワードを入力してください..."
                className="w-full p-4 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-gray-500 focus:outline-none resize-none"
                required
              />
            </div>

            {/* 表示モード選択 */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-3">
                表示モード選択
              </label>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="displayMode"
                    value="safe"
                    checked={displayMode === "safe"}
                    onChange={(e) =>
                      setDisplayMode(e.target.value as "safe" | "dangerous")
                    }
                    className="mr-3 text-green-600 focus:ring-green-500"
                  />
                  <span className="text-green-400">
                    ✅ 安全な表示（Reactデフォルト）
                  </span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="displayMode"
                    value="dangerous"
                    checked={displayMode === "dangerous"}
                    onChange={(e) =>
                      setDisplayMode(e.target.value as "safe" | "dangerous")
                    }
                    className="mr-3 text-red-600 focus:ring-red-500"
                  />
                  <span className="text-red-400">
                    ⚠️ 危険な表示（dangerouslySetInnerHTML）
                  </span>
                </label>
              </div>
              <p className="text-xs text-gray-400 mt-2">
                💡 選択したモードでログイン処理が実行されます
              </p>
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className={`px-8 py-3 font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 ${
                  displayMode === "safe"
                    ? "bg-green-600 hover:bg-green-700 text-white focus:ring-green-500"
                    : "bg-red-600 hover:bg-red-700 text-white focus:ring-red-500"
                }`}
              >
                {displayMode === "safe"
                  ? "🛡️ 安全ログイン実行"
                  : "⚠️ 危険ログイン実行"}
              </button>
            </div>
          </form>
        </div>

        {/* ログイン結果表示エリア */}
        {
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-6 text-center">
              🔍 ログイン処理結果
            </h2>

            {/* 選択されたモードの結果のみ表示 */}
            {safeOutput && (
              <div className="max-w-3xl mx-auto">
                <div className="bg-gray-900 p-6 rounded-lg border border-gray-700 border-l-4 border-green-400">
                  <h3 className="text-xl font-semibold mb-4 text-green-400">
                    ✅ セキュアなログイン処理結果
                  </h3>
                  <div className="bg-gray-800 p-4 rounded-lg mb-4">
                    <h4 className="font-mono text-sm text-gray-400 mb-2">
                      ログイン結果（安全な処理）:
                    </h4>
                    <div className="text-white text-lg bg-gray-900 p-3 rounded border">
                      ようこそ、{safeOutput}さん！
                    </div>
                  </div>
                  <div className="text-sm text-gray-400">
                    <strong>✅ セキュリティ:</strong>{" "}
                    Reactが入力値を自動的にエスケープ処理するため、
                    悪意のあるスクリプトも安全なテキストとして表示されます。XSS攻撃から保護されています。
                  </div>
                </div>
              </div>
            )}

            {dangerousOutput && (
              <div className="max-w-3xl mx-auto">
                <div className="bg-gray-900 p-6 rounded-lg border border-gray-700 border-l-4 border-red-400">
                  <h3 className="text-xl font-semibold mb-4 text-red-400">
                    ⚠️ 脆弱なログイン処理結果
                  </h3>
                  <div className="bg-gray-800 p-4 rounded-lg mb-4">
                    <h4 className="font-mono text-sm text-gray-400 mb-2">
                      ログイン結果（危険な処理）:
                    </h4>
                    <div className="text-white text-lg bg-gray-900 p-3 rounded border">
                      <div>
                        ようこそ、
                        <span
                          dangerouslySetInnerHTML={{ __html: dangerousOutput }}
                        />
                        さん！
                      </div>
                    </div>
                  </div>
                  <div className="text-sm text-gray-400">
                    <strong>⚠️ 危険性:</strong>{" "}
                    この処理では入力された悪意のあるコードが
                    そのまま実行されます。実際のWebアプリケーションでは絶対に使用してはいけません。
                  </div>
                </div>
              </div>
            )}
          </div>
        }

        {/* 攻撃パターンサンプル */}
        <div className="bg-gray-900 p-6 rounded-lg border border-gray-700 mb-8">
          <h2 className="text-xl font-semibold mb-4">
            ⚠️ 悪意のあるユーザー名の例
          </h2>
          <p className="text-gray-400 mb-6 text-sm">
            攻撃者がログインフォームに入力する可能性のある危険なコード例（クリックでフォームに自動入力）
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {xssPayloads.map((payload, index) => (
              <div
                key={index}
                className="bg-gray-800 p-4 rounded-lg border border-gray-600 hover:border-gray-500 transition-colors"
              >
                <div className="mb-3">
                  <span className="text-xs text-red-400 font-medium">
                    攻撃パターン {index + 1}
                  </span>
                </div>
                <code className="text-sm text-gray-300 block mb-3 break-all">
                  {payload}
                </code>
                <button
                  onClick={() => handlePayloadTest(payload)}
                  className="w-full px-4 py-2 bg-red-700 hover:bg-red-600 text-white rounded-lg text-sm transition-colors border border-red-600 hover:border-red-500"
                >
                  ⚠️ このユーザー名を試す
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* ログインフォームセキュリティガイド */}
        <div className="bg-gray-900 p-6 rounded-lg border border-gray-700">
          <h2 className="text-xl font-semibold mb-6">
            🔐 ログインフォームのセキュリティ
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-800 p-4 rounded-lg border border-gray-600">
              <h3 className="font-semibold text-green-400 mb-3">
                ✅ 安全なログイン実装
              </h3>
              <ul className="text-gray-300 space-y-2 text-sm">
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">•</span>
                  Reactが自動的にユーザー入力をエスケープ
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">•</span>
                  悪意のあるコードも安全なテキストとして表示
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">•</span>
                  XSS攻撃から自動的に保護される
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">•</span>
                  追加の対策なしでも基本的に安全
                </li>
              </ul>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg border border-gray-600">
              <h3 className="font-semibold text-red-400 mb-3">
                ⚠️ 危険な実装例
              </h3>
              <ul className="text-gray-300 space-y-2 text-sm">
                <li className="flex items-start">
                  <span className="text-red-400 mr-2">•</span>
                  ユーザー入力を直接HTMLとして表示
                </li>
                <li className="flex items-start">
                  <span className="text-red-400 mr-2">•</span>
                  入力値の検証・サニタイズを行わない
                </li>
                <li className="flex items-start">
                  <span className="text-red-400 mr-2">•</span>
                  攻撃者によるアカウント乗っ取りの危険性
                </li>
                <li className="flex items-start">
                  <span className="text-red-400 mr-2">•</span>
                  他のユーザーへの攻撃の踏み台になる可能性
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-6 p-4 bg-blue-900 rounded-lg border border-blue-600">
            <h4 className="font-semibold text-blue-300 mb-2">
              💡 学習のポイント
            </h4>
            <p className="text-blue-100 text-sm">
              このデモでは、同じユーザー入力に対してReactの安全な表示方法と危険な表示方法を比較できます。
              実際の開発では、Reactのデフォルトの仕組みを活用し、
              <code className="bg-blue-800 px-1 rounded">
                dangerouslySetInnerHTML
              </code>
              の使用は避けることが重要です。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

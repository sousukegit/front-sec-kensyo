"use client";

import { useState } from "react";

export default function Home() {
  const [userInput, setUserInput] = useState("");
  const [safeOutput, setSafeOutput] = useState("");
  const [dangerousOutput, setDangerousOutput] = useState("");

  // XSSテスト用のサンプルペイロード
  const xssPayloads = [
    '<script>alert("XSS Attack!")</script>',
    '<img src="x" onerror="alert(\'XSS via img\')" />',
    "<svg onload=\"alert('XSS via SVG')\" />",
    "<iframe src=\"javascript:alert('XSS via iframe')\" />",
    'javascript:alert("XSS")',
    "<body onload=\"alert('XSS via body')\" />",
  ];

  const handleTest = () => {
    setSafeOutput(userInput);
    setDangerousOutput(userInput);
  };

  const handlePayloadTest = (payload: string) => {
    setUserInput(payload);
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">React XSS 検証フォーム</h1>
          <p className="text-gray-300">
            Reactのデフォルトサニタイズ機能と dangerouslySetInnerHTML
            の違いを検証
          </p>
        </header>

        {/* メインフォーム */}
        <div className="bg-gray-900 p-8 rounded-lg border border-gray-700 mb-8">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleTest();
            }}
            className="space-y-6"
          >
            <div>
              <label
                htmlFor="xss-input"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                XSSペイロード入力
              </label>
              <textarea
                id="xss-input"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="XSSペイロードを入力してください..."
                className="w-full h-32 p-4 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-gray-500 focus:outline-none resize-none"
                required
              />
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
              >
                🔍 XSS検証を実行
              </button>
            </div>
          </form>
        </div>

        {/* XSSペイロードサンプル */}
        <div className="bg-gray-900 p-6 rounded-lg border border-gray-700 mb-8">
          <h2 className="text-xl font-semibold mb-4">
            📋 XSSペイロードサンプル
          </h2>
          <p className="text-gray-400 mb-6 text-sm">
            以下のサンプルをクリックすると、上の入力フィールドに自動的に入力されます
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {xssPayloads.map((payload, index) => (
              <div
                key={index}
                className="bg-gray-800 p-4 rounded-lg border border-gray-600 hover:border-gray-500 transition-colors"
              >
                <div className="mb-3">
                  <span className="text-xs text-gray-400 font-medium">
                    サンプル {index + 1}
                  </span>
                </div>
                <code className="text-sm text-gray-300 block mb-3 break-all">
                  {payload}
                </code>
                <button
                  onClick={() => handlePayloadTest(payload)}
                  className="w-full px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg text-sm transition-colors border border-gray-600 hover:border-gray-500"
                >
                  📝 フォームに入力
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* 結果表示エリア - テスト実行後にのみ表示 */}
        {(safeOutput || dangerousOutput) && (
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-6 text-center">
              🔍 検証結果
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* 安全な出力（Reactデフォルト） */}
              <div className="bg-gray-900 p-6 rounded-lg border border-gray-700">
                <h3 className="text-xl font-semibold mb-4 text-green-400">
                  ✅ 安全な出力（Reactデフォルト）
                </h3>
                <p className="text-gray-300 mb-4">
                  Reactが自動的にエスケープ処理を行います
                </p>
                <div className="bg-gray-800 p-4 rounded-lg border-l-4 border-green-400">
                  <h4 className="font-mono text-sm text-gray-400 mb-2">
                    出力結果:
                  </h4>
                  <div className="text-white min-h-[2rem] bg-gray-900 p-3 rounded border">
                    {safeOutput}
                  </div>
                </div>
                <div className="mt-4 text-sm text-gray-400">
                  <strong>仕組み:</strong> React は JSX
                  内でテキストを表示する際、 自動的に HTML
                  エンティティをエスケープします。 そのため、&lt;script&gt;
                  タグなどは文字列として表示され、実行されません。
                </div>
              </div>

              {/* 危険な出力（dangerouslySetInnerHTML） */}
              <div className="bg-gray-900 p-6 rounded-lg border border-gray-700">
                <h3 className="text-xl font-semibold mb-4 text-red-400">
                  ⚠️ 危険な出力（dangerouslySetInnerHTML）
                </h3>
                <p className="text-gray-300 mb-4">
                  HTMLとして直接レンダリングされます（危険）
                </p>
                <div className="bg-gray-800 p-4 rounded-lg border-l-4 border-red-400">
                  <h4 className="font-mono text-sm text-gray-400 mb-2">
                    出力結果:
                  </h4>
                  <div className="text-white min-h-[2rem] bg-gray-900 p-3 rounded border">
                    <div
                      dangerouslySetInnerHTML={{ __html: dangerousOutput }}
                    />
                  </div>
                </div>
                <div className="mt-4 text-sm text-gray-400">
                  <strong>注意:</strong> dangerouslySetInnerHTML を使用すると、
                  入力された内容がそのまま HTML として実行されます。
                  悪意のあるスクリプトが含まれている場合、XSS攻撃が成功します。
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 説明セクション */}
        <div className="bg-gray-900 p-6 rounded-lg border border-gray-700">
          <h2 className="text-xl font-semibold mb-6">
            📚 セキュリティのポイント
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-800 p-4 rounded-lg border border-gray-600">
              <h3 className="font-semibold text-green-400 mb-3">
                ✅ Reactの安全な機能
              </h3>
              <ul className="text-gray-300 space-y-2 text-sm">
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">•</span>
                  JSX内のテキストは自動的にエスケープされる
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">•</span>
                  ユーザー入力をそのまま表示しても安全
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">•</span>
                  デフォルトでXSS攻撃を防ぐ
                </li>
              </ul>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg border border-gray-600">
              <h3 className="font-semibold text-red-400 mb-3">⚠️ 危険な機能</h3>
              <ul className="text-gray-300 space-y-2 text-sm">
                <li className="flex items-start">
                  <span className="text-red-400 mr-2">•</span>
                  dangerouslySetInnerHTML は名前の通り危険
                </li>
                <li className="flex items-start">
                  <span className="text-red-400 mr-2">•</span>
                  HTMLを直接レンダリングするため、スクリプトが実行される
                </li>
                <li className="flex items-start">
                  <span className="text-red-400 mr-2">•</span>
                  使用する場合は必ず入力値のサニタイズが必要
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

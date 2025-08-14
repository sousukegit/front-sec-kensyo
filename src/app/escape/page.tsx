"use client";

import { useState } from "react";

export default function EscapePage() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");

  // createTextNodeの監視（シンプル版）
  const monitorReact = () => {
    if (!input) return;

    console.clear();
    console.log("🔍 Reactの内部DOM操作を監視");
    console.log("入力:", input);

    // 元のAPIを保存
    const original = document.createTextNode;
    const calls: string[] = [];

    // createTextNodeを監視
    document.createTextNode = function (data: string) {
      console.log("📝 createTextNode呼び出し:", data);
      calls.push(data);
      return original.call(this, data);
    };

    // Reactに処理させる
    setResult(input);

    // 監視終了
    setTimeout(() => {
      document.createTextNode = original;
      console.log("📊 結果: createTextNodeが", calls.length, "回呼ばれました");
      console.log("📊 呼び出し内容:", calls);
      console.log(result);
      console.log(setResult);
    }, 100);
  };

  // 危険なDOM操作の監視
  const dangerousComparison = () => {
    if (!input) return;

    console.clear();
    console.log("⚠️ 危険なDOM操作を監視");
    console.log("入力:", input);

    // innerHTML の監視
    const originalInnerHTML = Object.getOwnPropertyDescriptor(
      Element.prototype,
      "innerHTML"
    );
    let innerHTMLCalls: string[] = [];

    console.log("🔍 Step 1: innerHTML プロパティを監視関数に置き換え");

    Object.defineProperty(Element.prototype, "innerHTML", {
      set: function (value: string) {
        console.log("📝 Step 2: innerHTML 設定:", value);
        console.log("   - 処理: HTMLとして解析・実行される（危険！）");
        innerHTMLCalls.push(value);

        if (originalInnerHTML?.set) {
          originalInnerHTML.set.call(this, value);
        }
      },
      get: function () {
        return originalInnerHTML?.get?.call(this) || "";
      },
      configurable: true,
    });

    console.log("🔍 Step 3: innerHTML で直接HTML挿入");
    const div = document.createElement("div");
    div.innerHTML = input; // ここで監視される

    setTimeout(() => {
      // 元に戻す
      if (originalInnerHTML) {
        Object.defineProperty(
          Element.prototype,
          "innerHTML",
          originalInnerHTML
        );
      }
      console.log("🔍 Step 4: 監視終了・結果まとめ");
      console.log("📊 innerHTML が", innerHTMLCalls.length, "回呼ばれました");
      console.log("📊 設定内容:", innerHTMLCalls);
      console.warn("⚠️ これは実際のHTMLとして解析される（危険）");
    }, 100);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">
          React の createTextNode 使用の確認
        </h1>

        {/* 入力 */}
        <div className="mb-6">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="例: <img src='x' onerror='alert(1)' />"
            className="w-full h-20 bg-gray-800 text-white p-4 rounded"
          />
          <button
            onClick={monitorReact}
            className="mt-2 bg-blue-600 px-4 py-2 rounded mr-2"
          >
            React処理を監視
          </button>
          <button
            onClick={dangerousComparison}
            className="mt-2 bg-red-600 px-4 py-2 rounded"
          >
            危険なinnerHTML監視
          </button>
        </div>

        {/* React出力（安全） */}
        {result && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">React出力（安全）:</h2>
            <div className="bg-green-900 p-4 rounded">
              {result} {/* ←Reactが createTextNode で安全に処理 */}
            </div>
            <p className="text-sm text-gray-400 mt-2">
              ↑ createTextNodeでテキストとして安全に表示
            </p>
          </div>
        )}

        {/* 説明 */}
        <div className="bg-gray-800 p-6 rounded">
          <h2 className="text-lg font-semibold mb-4">理解のポイント</h2>

          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-green-400">✅ React（安全）</h3>
              <p className="text-sm">
                文字列 → <code>createTextNode()</code> → テキストノード →
                文字列表示
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-red-400">
                ❌ innerHTML（危険）
              </h3>
              <p className="text-sm">
                文字列 → <code>innerHTML</code> → HTMLパース → スクリプト実行
              </p>
            </div>
          </div>

          <div className="mt-4 p-4 bg-blue-900 rounded">
            <p className="text-sm">
              <strong>重要:</strong>{" "}
              Reactは「エスケープ処理」をしているのではなく、 常に安全なDOM
              API（createTextNode）を使っているだけです。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

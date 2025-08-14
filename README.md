# フロントエンドセキュリティ検証デモ

モダンフレームワークがなぜ「セキュア」だと言われるのかを実際のコードで比較検証するプレゼンテーション用デモサイトです。

## 🎯 デモの目的

- **旧来の DOM 操作** vs **モダンフレームワーク** のセキュリティ比較
- XSS 脆弱性の実演と対策の理解
- React/Vue のデフォルト挙動の安全性検証
- CSP などのブラウザレベル防御策の紹介

## 📖 プレゼンテーション構成（16 分）

### 1. 導入（2 分）

- モダンフレームワークはなぜ「セキュア」？
- 旧来の DOM 操作との違い

### 2. React & Vue のデフォルト挙動比較（5 分）

- 安全な表示と危険な表示の実演
- API 設計の比較（dangerouslySetInnerHTML vs v-html）

### 3. 仕組みの深掘り（5 分）

- エスケープ処理の流れ
- SSR/Hydration による安全性

### 4. フレームワーク外の補強策（3 分）

- CSP や SRI の併用
- ライブラリサニタイズ（DOMPurify など）

### 5. まとめ（1 分）

## 🚀 クイックスタート

```bash
# 依存関係のインストール
npm install

# 開発サーバーの起動
npm run dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開いてください。

## 📱 デモページ構成

### 🛡️ React 安全デモ（`/`）

- React のデフォルト挙動による自動エスケープ
- `dangerouslySetInnerHTML`を使った危険な例との比較
- XSS 攻撃パターンの実演

### ⚠️ 旧 DOM 操作デモ（`/old`）

- jQuery 時代の DOM 操作再現
- `innerHTML`による直接的な XSS 脆弱性
- 実際の攻撃コードの実行デモ

### 🔒 CSP デモ（`/csp`）

- Content Security Policy の設定例
- ブラウザレベルでの防御メカニズム
- 他のセキュリティヘッダーとの組み合わせ

## 🧪 試すべき XSS ペイロード

各デモページで以下の攻撃パターンを試してみてください：

```html
<script>
  alert("XSS Attack!");
</script>
<img src="x" onerror="alert('XSS via img')" />
<svg onload="alert('XSS via SVG')" />
<iframe src="javascript:alert('XSS via iframe')" />
```

## 🔒 実装されているセキュリティ機能

### React 自動エスケープ

```jsx
// 安全：自動的にエスケープされる
<div>ようこそ、{userInput}さん！</div>

// 危険：HTMLがそのまま実行される
<div dangerouslySetInnerHTML={{__html: userInput}} />
```

### Content Security Policy

```html
<meta
  http-equiv="Content-Security-Policy"
  content="default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval';"
/>
```

## 📚 学習ポイント

1. **フレームワークの恩恵**: React は標準で XSS 攻撃から保護
2. **危険な API**: `dangerouslySetInnerHTML`は明示的に危険性を示す
3. **多層防御**: CSP + フレームワーク + サニタイズの組み合わせ
4. **開発者体験**: セキュアがデフォルト、危険な操作は意図的に

## 🛠️ 技術スタック

- **フレームワーク**: Next.js 15
- **言語**: TypeScript
- **スタイリング**: Tailwind CSS + インラインスタイル
- **セキュリティ**: CSP, 自動エスケープ

## 📝 プレゼンテーション時の注意

1. **旧 DOM 操作デモ**では実際に JavaScript が実行されます
2. **本番環境では絶対に使用しない**でください
3. **教育目的のみ**での使用を想定しています
4. デモ用に CSP は緩い設定になっています

## 🔗 参考資料

- [OWASP XSS Prevention Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html)
- [React Security Best Practices](https://snyk.io/blog/10-react-security-best-practices/)
- [Content Security Policy MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)

---

⚠️ **免責事項**: このデモサイトは教育目的で作成されており、実際の XSS 攻撃コードが含まれています。セキュリティ学習以外の目的では使用しないでください。

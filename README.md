# Data Formatter Web

JSON・XMLデータを美しく整形表示する静的Webアプリケーション

![Data Formatter Web](https://img.shields.io/badge/React-19-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue) ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4) ![Vite](https://img.shields.io/badge/Vite-7-646CFF)

## 🚀 Features

- **JSON・XML整形**: データを美しくフォーマット表示
- **シンタックスハイライト**: Prism.jsによるコードハイライト
- **自動データ検出**: 入力データの形式を自動判別
- **データ情報表示**: 構造の概要情報を表示
- **ワンクリックコピー**: 整形結果を簡単コピー
- **サンプルデータ**: 学習用のサンプルデータ提供
- **レスポンシブデザイン**: モバイル・デスクトップ対応
- **エラーハンドリング**: 分かりやすいエラーメッセージ

## 🛠️ Tech Stack

- **Frontend**: React 19 + TypeScript
- **Build Tool**: Vite 7
- **Styling**: Tailwind CSS v4
- **Syntax Highlighting**: Prism.js
- **XML Processing**: xml-formatter
- **Code Quality**: ESLint + Prettier

## 📦 Installation

### Prerequisites

- Node.js 18+
- npm or yarn

### Setup

```bash
# リポジトリのクローン
git clone <repository-url>
cd data-formatter-web

# 依存関係のインストール
npm install

# 開発サーバーの起動
npm run dev
```

アプリケーションは `http://localhost:5173` で起動します。

## 🎯 Usage

### 基本的な使い方

1. **データを入力**: JSONまたはXMLデータを左側のテキストエリアにペースト
2. **フォーマット選択**: データ形式（JSON/XML）を選択（自動検出も対応）
3. **整形実行**: 「整形実行」ボタンをクリック
4. **結果確認**: 右側に美しく整形された結果が表示
5. **コピー**: 結果をワンクリックでクリップボードにコピー

### サンプルデータ

「JSONサンプル」「XMLサンプル」ボタンで学習用データを読み込めます。

### 圧縮機能

「圧縮」ボタンで改行・スペースを削除したコンパクト形式に変換できます。

## 🏗️ Development

### Available Scripts

```bash
# 開発サーバー起動
npm run dev

# プロダクションビルド
npm run build

# ビルド結果のプレビュー
npm run preview

# TypeScript型チェック
npm run type-check

# ESLintによるコードチェック
npm run lint

# ESLintによる自動修正
npm run lint:fix

# Prettierによるフォーマット
npm run format
```

### Project Structure

```
src/
├── components/          # UIコンポーネント
│   ├── ErrorBoundary.tsx    # エラーハンドリング
│   ├── Header.tsx           # アプリヘッダー
│   ├── FormatSelector.tsx   # フォーマット選択
│   ├── FormatInput.tsx      # データ入力エリア
│   └── FormatOutput.tsx     # 結果表示エリア
├── hooks/               # カスタムフック
│   └── useFormatter.ts      # フォーマット処理ロジック
├── utils/               # ユーティリティ関数
│   ├── validators.ts        # データ検証
│   ├── jsonFormatter.ts     # JSON処理
│   └── xmlFormatter.ts      # XML処理
├── types/               # TypeScript型定義
│   └── index.ts
├── App.tsx              # メインアプリケーション
├── main.tsx            # エントリーポイント
└── index.css           # グローバルスタイル
```

### Code Quality

- **TypeScript**: 厳密な型チェックで品質保証
- **ESLint**: コーディングスタンダードの自動チェック
- **Prettier**: コードフォーマットの統一
- **Error Boundary**: アプリケーションレベルのエラーハンドリング

## 🚀 Deployment

このアプリケーションは静的サイトとして設計されており、以下のプラットフォームで簡単にデプロイできます：

### Vercel

```bash
npm run build
# dist/ フォルダをVercelにデプロイ
```

### Netlify

```bash
npm run build
# dist/ フォルダをNetlifyにドラッグ&ドロップ
```

### GitHub Pages

```bash
npm run build
# dist/ フォルダの内容をgh-pagesブランチにpush
```

## 🤝 Contributing

1. このリポジトリをフォーク
2. 機能ブランチを作成 (`git checkout -b feature/AmazingFeature`)
3. 変更をコミット (`git commit -m 'Add some AmazingFeature'`)
4. ブランチにプッシュ (`git push origin feature/AmazingFeature`)
5. プルリクエストを作成

### Development Guidelines

- TypeScriptの型定義を必ず追加
- ESLint・Prettierルールに従う
- 新機能追加時は型チェック・ビルドテストを実行
- コンポーネントは単一責任の原則に従って分割

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [React](https://reactjs.org/) - UIライブラリ
- [TypeScript](https://www.typescriptlang.org/) - 型安全性
- [Vite](https://vitejs.dev/) - 高速ビルドツール
- [Tailwind CSS](https://tailwindcss.com/) - ユーティリティファーストCSS
- [Prism.js](https://prismjs.com/) - シンタックスハイライト
- [xml-formatter](https://github.com/chrisbottin/xml-formatter) - XML整形

---

✨ **Happy Formatting!** ✨
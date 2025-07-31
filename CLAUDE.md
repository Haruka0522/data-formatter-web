# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

このプロジェクトは「data-formatter-web」というJSONとXMLデータを美しく整形表示する静的Webアプリケーションです。React + TypeScript + Vite + Tailwind CSS v4で構築されています。

## Development Commands

### パッケージ管理
```bash
# 依存関係のインストール
npm install

# 依存関係の追加
npm install <package-name>
npm install -D <package-name>  # 開発依存関係
```

### 開発・ビルド
```bash
# 開発サーバーの起動
npm run dev

# プロダクションビルド
npm run build

# ビルド結果のプレビュー
npm run preview
```

### コード品質
```bash
# ESLintでのコードチェック
npm run lint

# ESLintでの自動修正
npm run lint:fix

# TypeScriptの型チェック
npm run type-check

# Prettierでのフォーマット
npm run format
```

## Architecture Overview

### 技術スタック
- **フロントエンド**: React 19 + TypeScript
- **ビルドツール**: Vite 7
- **スタイリング**: Tailwind CSS v4
- **シンタックスハイライト**: Prism.js
- **XMLフォーマット**: xml-formatter
- **コード品質**: ESLint + Prettier

### フォルダ構成
```
src/
├── components/          # UIコンポーネント
│   ├── ErrorBoundary.tsx
│   ├── Header.tsx
│   ├── FormatSelector.tsx
│   ├── FormatInput.tsx
│   └── FormatOutput.tsx
├── hooks/              # カスタムフック
│   └── useFormatter.ts
├── utils/              # ユーティリティ関数
│   ├── validators.ts
│   ├── jsonFormatter.ts
│   └── xmlFormatter.ts
├── types/              # TypeScript型定義
│   └── index.ts
├── App.tsx             # メインアプリケーション
├── main.tsx           # エントリーポイント
└── index.css          # グローバルスタイル
```

### 主要機能
- **データフォーマット**: JSON・XMLの整形と圧縮
- **シンタックスハイライト**: Prism.jsによる美しい表示
- **データ検証**: 入力データの自動検証とエラー表示
- **情報表示**: データ構造の概要表示
- **ユーザビリティ**: コピー、クリア、サンプルデータ機能

### コンポーネント設計
- **ErrorBoundary**: アプリケーション全体のエラーハンドリング
- **Header**: アプリケーションヘッダー
- **FormatSelector**: JSON/XML選択UI
- **FormatInput**: データ入力エリア
- **FormatOutput**: シンタックスハイライト付き結果表示

### 状態管理
- カスタムフック(`useFormatter`)による一元的な状態管理
- React Hooks(useState, useCallback, useMemo)でパフォーマンス最適化

## Development Notes

### Tailwind CSS v4 Settings
- Viteプラグイン(`@tailwindcss/vite`)を使用
- `@import "tailwindcss"`でインポート
- `@theme`ディレクティブでカスタムテーマ定義
- カスタムクラス(`.code-block`, `.input-area`, `.btn-*`)を直接CSS定義

### TypeScript Type Safety
- 厳密な型定義(`types/index.ts`)
- Union Types(`DataFormat`, `DataInfo`)の活用
- ESLint設定で`any`型の使用を禁止

### パフォーマンス考慮
- useCallback/useMemoによる最適化
- 非同期処理でUIブロッキング回避
- Code splittingによるバンドルサイズ最適化

### エラーハンドリング
- ErrorBoundaryによるアプリケーションレベルのエラーキャッチ
- バリデーション結果の詳細エラーメッセージ
- ユーザーフレンドリーなエラー表示

## Common Tasks

### 新機能追加時の手順
1. 型定義を`types/index.ts`に追加
2. ユーティリティ関数を`utils/`に実装
3. 必要に応じてカスタムフックを更新
4. UIコンポーネントを実装
5. lint・type-check・buildでテスト

### バグ修正時の確認事項
- TypeScript型エラーがないか
- ESLintルールに違反していないか
- 全てのデータ形式で正常動作するか
- エラーハンドリングが適切か

### デプロイメント
- 静的サイト用の設定済み
- `npm run build`で`dist/`フォルダに出力
- Vercel・Netlify・GitHub Pagesで簡単デプロイ可能
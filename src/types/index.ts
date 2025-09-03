// データ形式の型定義
export type DataFormat = 'json' | 'xml';

// フォーマット結果の型定義
export interface FormatResult {
  success: boolean;
  formatted?: string;
  error?: string;
}

// バリデーション結果の型定義
export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

// フォーマッター設定の型定義
export interface FormatterOptions {
  indent?: number;
  preserveWhitespace?: boolean;
}

// データ情報の型定義
export interface JSONDataInfo {
  type: 'object' | 'array' | 'string' | 'number' | 'boolean' | 'null';
  length?: number;
  keys?: number;
  path?: string;
  properties?: string[];
  value?: unknown;
}

export interface XMLDataInfo {
  tagName: string;
  attributes: number;
  children: number;
  attributeNames?: string[];
  childTags?: string[];
}

export type DataInfo = JSONDataInfo | XMLDataInfo;

// アプリケーション状態の型定義
export interface AppState {
  inputData: string;
  format: DataFormat;
  outputData: string;
  isLoading: boolean;
  error?: string;
}
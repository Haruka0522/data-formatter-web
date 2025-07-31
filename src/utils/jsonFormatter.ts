import type { FormatResult, FormatterOptions, JSONDataInfo } from '../types';
import { validateJSON } from './validators';

/**
 * JSON文字列を整形する
 */
export const formatJSON = (
  input: string,
  options: FormatterOptions = {}
): FormatResult => {
  const validation = validateJSON(input);
  
  if (!validation.isValid) {
    return {
      success: false,
      error: validation.error,
    };
  }

  try {
    const parsed = JSON.parse(input);
    const indent = options.indent ?? 2;
    const formatted = JSON.stringify(parsed, null, indent);

    return {
      success: true,
      formatted,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'JSON formatting failed',
    };
  }
};

/**
 * JSONを圧縮（改行・スペースを削除）
 */
export const minifyJSON = (input: string): FormatResult => {
  const validation = validateJSON(input);
  
  if (!validation.isValid) {
    return {
      success: false,
      error: validation.error,
    };
  }

  try {
    const parsed = JSON.parse(input);
    const minified = JSON.stringify(parsed);

    return {
      success: true,
      formatted: minified,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'JSON minification failed',
    };
  }
};

/**
 * JSONのキー・値を取得してプレビュー情報を生成
 */
export const getJSONInfo = (input: string) => {
  try {
    const parsed = JSON.parse(input);
    const getObjectInfo = (obj: unknown, path = ''): JSONDataInfo => {
      if (Array.isArray(obj)) {
        return {
          type: 'array',
          length: obj.length,
          path,
        };
      } else if (obj !== null && typeof obj === 'object') {
        const keys = Object.keys(obj);
        return {
          type: 'object',
          keys: keys.length,
          path,
          properties: keys.slice(0, 5), // 最初の5つのプロパティを表示
        };
      } else {
        return {
          type: typeof obj,
          value: obj,
          path,
        };
      }
    };

    return getObjectInfo(parsed);
  } catch {
    return null;
  }
};
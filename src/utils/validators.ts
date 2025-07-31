import type { ValidationResult } from '../types';

/**
 * JSON文字列のバリデーション
 */
export const validateJSON = (input: string): ValidationResult => {
  if (!input.trim()) {
    return {
      isValid: false,
      error: 'JSON データが空です',
    };
  }

  try {
    JSON.parse(input);
    return { isValid: true };
  } catch (error) {
    return {
      isValid: false,
      error: error instanceof Error ? error.message : 'Invalid JSON format',
    };
  }
};

/**
 * XML文字列のバリデーション
 */
export const validateXML = (input: string): ValidationResult => {
  if (!input.trim()) {
    return {
      isValid: false,
      error: 'XML データが空です',
    };
  }

  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(input, 'text/xml');
    
    // XMLパースエラーをチェック
    const parserError = doc.querySelector('parsererror');
    if (parserError) {
      return {
        isValid: false,
        error: parserError.textContent || 'Invalid XML format',
      };
    }

    return { isValid: true };
  } catch (error) {
    return {
      isValid: false,
      error: error instanceof Error ? error.message : 'Invalid XML format',
    };
  }
};

/**
 * データ形式の自動検出
 */
export const detectDataFormat = (input: string): 'json' | 'xml' | 'unknown' => {
  const trimmed = input.trim();
  
  if (!trimmed) return 'unknown';
  
  // JSON形式の検出
  if ((trimmed.startsWith('{') && trimmed.endsWith('}')) ||
      (trimmed.startsWith('[') && trimmed.endsWith(']'))) {
    if (validateJSON(input).isValid) {
      return 'json';
    }
  }
  
  // XML形式の検出
  if (trimmed.startsWith('<') && trimmed.endsWith('>')) {
    if (validateXML(input).isValid) {
      return 'xml';
    }
  }
  
  return 'unknown';
};
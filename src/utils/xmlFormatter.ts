import xmlFormat from 'xml-formatter';
import type { FormatResult, FormatterOptions, XMLDataInfo } from '../types';
import { validateXML } from './validators';

/**
 * XML文字列を整形する
 */
export const formatXML = (
  input: string,
  options: FormatterOptions = {}
): FormatResult => {
  const validation = validateXML(input);
  
  if (!validation.isValid) {
    return {
      success: false,
      error: validation.error,
    };
  }

  try {
    const formatted = xmlFormat(input, {
      indentation: ' '.repeat(options.indent ?? 2),
      filter: (node) => node.type !== 'Comment',
      collapseContent: true,
      lineSeparator: '\n',
    });

    return {
      success: true,
      formatted,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'XML formatting failed',
    };
  }
};

/**
 * XMLを圧縮（改行・不要なスペースを削除）
 */
export const minifyXML = (input: string): FormatResult => {
  const validation = validateXML(input);
  
  if (!validation.isValid) {
    return {
      success: false,
      error: validation.error,
    };
  }

  try {
    const formatted = xmlFormat(input, {
      indentation: '',
      filter: (node) => node.type !== 'Comment',
      collapseContent: true,
      lineSeparator: '',
    });

    return {
      success: true,
      formatted: formatted.replace(/>\s+</g, '><'),
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'XML minification failed',
    };
  }
};

/**
 * XMLの構造情報を取得
 */
export const getXMLInfo = (input: string) => {
  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(input, 'text/xml');
    
    const parserError = doc.querySelector('parsererror');
    if (parserError) {
      return null;
    }

    const root = doc.documentElement;
    const getElementInfo = (element: Element): XMLDataInfo => {
      const children = Array.from(element.children);
      const attributes = Array.from(element.attributes);
      
      return {
        tagName: element.tagName,
        attributes: attributes.length,
        children: children.length,
        attributeNames: attributes.slice(0, 5).map(attr => attr.name),
        childTags: [...new Set(children.map(child => child.tagName))].slice(0, 5),
      };
    };

    return getElementInfo(root);
  } catch {
    return null;
  }
};
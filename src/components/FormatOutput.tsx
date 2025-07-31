import React, { useEffect, useRef } from 'react';
import Prism from 'prismjs';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-markup';
import 'prismjs/themes/prism.css';
import type { DataFormat, DataInfo } from '../types';

interface FormatOutputProps {
  value: string;
  format: DataFormat;
  isLoading?: boolean;
  error?: string;
  onCopy: () => Promise<boolean>;
  dataInfo?: DataInfo | null;
}

export const FormatOutput: React.FC<FormatOutputProps> = ({
  value,
  format,
  isLoading = false,
  error,
  onCopy,
  dataInfo,
}) => {
  const codeRef = useRef<HTMLElement>(null);
  const [copySuccess, setCopySuccess] = React.useState(false);

  useEffect(() => {
    if (codeRef.current && value && !error) {
      Prism.highlightElement(codeRef.current);
    }
  }, [value, format, error]);

  const handleCopy = async () => {
    const success = await onCopy();
    setCopySuccess(success);
    
    if (success) {
      setTimeout(() => setCopySuccess(false), 2000);
    }
  };

  const getLanguage = () => {
    return format === 'json' ? 'json' : 'markup';
  };

  const renderDataInfo = () => {
    if (!dataInfo) return null;

    if (format === 'json' && 'type' in dataInfo) {
      return (
        <div className="text-xs text-gray-500 space-y-1">
          <div>Type: {dataInfo.type}</div>
          {'keys' in dataInfo && dataInfo.keys && <div>Keys: {dataInfo.keys}</div>}
          {'length' in dataInfo && dataInfo.length && <div>Length: {dataInfo.length}</div>}
          {'properties' in dataInfo && dataInfo.properties && (
            <div>Properties: {dataInfo.properties.join(', ')}</div>
          )}
        </div>
      );
    } else if (format === 'xml' && 'tagName' in dataInfo) {
      return (
        <div className="text-xs text-gray-500 space-y-1">
          <div>Root: {dataInfo.tagName}</div>
          {dataInfo.attributes > 0 && <div>Attributes: {dataInfo.attributes}</div>}
          {dataInfo.children > 0 && <div>Child Elements: {dataInfo.children}</div>}
          {dataInfo.childTags && dataInfo.childTags.length > 0 && (
            <div>Tags: {dataInfo.childTags.join(', ')}</div>
          )}
        </div>
      );
    }
    
    return null;
  };

  return (
    <div className="flex flex-col space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-gray-700">整形結果</h3>
        <div className="flex items-center space-x-2">
          {dataInfo && (
            <div className="text-xs text-gray-500">
              {renderDataInfo()}
            </div>
          )}
          {value && !error && (
            <button
              onClick={handleCopy}
              className={`
                flex items-center space-x-1 px-3 py-1 rounded text-xs transition-all
                ${copySuccess 
                  ? 'bg-green-100 text-green-700' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }
              `}
            >
              {copySuccess ? (
                <>
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>コピー完了!</span>
                </>
              ) : (
                <>
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  <span>コピー</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>

      <div className="relative">
        {isLoading ? (
          <div className="code-block flex items-center justify-center min-h-64">
            <div className="flex items-center space-x-2">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
              <span className="text-gray-400">整形中...</span>
            </div>
          </div>
        ) : error ? (
          <div className="border border-red-200 bg-red-50 rounded-lg p-4 min-h-64">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h4 className="text-sm font-medium text-red-800 mb-1">エラー</h4>
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        ) : value ? (
          <pre className="code-block">
            <code
              ref={codeRef}
              className={`language-${getLanguage()}`}
            >
              {value}
            </code>
          </pre>
        ) : (
          <div className="border-2 border-dashed border-gray-200 rounded-lg p-8 text-center min-h-64 flex items-center justify-center">
            <div className="text-gray-400">
              <svg className="w-12 h-12 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
              <p>整形結果がここに表示されます</p>
            </div>
          </div>
        )}
        
        {value && !error && (
          <div className="absolute bottom-2 right-2 text-xs text-gray-400 bg-gray-900 bg-opacity-75 text-white px-2 py-1 rounded">
            {value.split('\n').length} 行
          </div>
        )}
      </div>
    </div>
  );
};
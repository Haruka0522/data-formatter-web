import React from 'react';
import type { DataFormat } from '../types';

interface FormatInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  onClear: () => void;
  onLoadSample: (format: DataFormat) => void;
}

export const FormatInput: React.FC<FormatInputProps> = ({
  value,
  onChange,
  placeholder = 'ここにJSON・XMLデータをペーストしてください...',
  disabled = false,
  onClear,
  onLoadSample,
}) => {
  return (
    <div className="flex flex-col space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-gray-700">入力データ</h3>
        <div className="flex space-x-2">
          <button
            onClick={() => onLoadSample('json')}
            disabled={disabled}
            className="text-xs text-blue-600 hover:text-blue-700 disabled:opacity-50"
          >
            JSONサンプル
          </button>
          <button
            onClick={() => onLoadSample('xml')}
            disabled={disabled}
            className="text-xs text-blue-600 hover:text-blue-700 disabled:opacity-50"
          >
            XMLサンプル
          </button>
          {value && (
            <button
              onClick={onClear}
              disabled={disabled}
              className="text-xs text-red-600 hover:text-red-700 disabled:opacity-50"
            >
              クリア
            </button>
          )}
        </div>
      </div>

      <div className="relative">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          className="input-area"
          rows={12}
        />
        
        {value && (
          <div className="absolute bottom-2 right-2 text-xs text-gray-400 bg-white px-2 py-1 rounded">
            {value.length} 文字
          </div>
        )}
      </div>

      <div className="flex items-center space-x-4 text-xs text-gray-500">
        <div className="flex items-center space-x-1">
          <kbd className="px-1.5 py-0.5 bg-gray-100 rounded text-xs">Ctrl</kbd>
          <span>+</span>
          <kbd className="px-1.5 py-0.5 bg-gray-100 rounded text-xs">V</kbd>
          <span>でペースト</span>
        </div>
      </div>
    </div>
  );
};
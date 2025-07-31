import React from 'react';
import type { DataFormat } from '../types';

interface FormatSelectorProps {
  selectedFormat: DataFormat;
  onFormatChange: (format: DataFormat) => void;
  detectedFormat?: DataFormat | 'unknown';
  disabled?: boolean;
}

export const FormatSelector: React.FC<FormatSelectorProps> = ({
  selectedFormat,
  onFormatChange,
  detectedFormat,
  disabled = false,
}) => {
  const formats: { value: DataFormat; label: string; icon: string }[] = [
    { value: 'json', label: 'JSON', icon: '{ }' },
    { value: 'xml', label: 'XML', icon: '< >' },
  ];

  return (
    <div className="flex flex-col space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-gray-700">データ形式</h3>
        {detectedFormat && detectedFormat !== 'unknown' && (
          <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded">
            {detectedFormat.toUpperCase()} を検出
          </span>
        )}
      </div>
      
      <div className="flex space-x-2">
        {formats.map((format) => (
          <button
            key={format.value}
            onClick={() => onFormatChange(format.value)}
            disabled={disabled}
            className={`
              flex items-center space-x-2 px-4 py-2 rounded-lg border transition-all
              ${selectedFormat === format.value
                ? 'bg-blue-50 border-blue-200 text-blue-700'
                : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
              }
              ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
            `}
          >
            <span className="font-mono text-sm">{format.icon}</span>
            <span className="text-sm font-medium">{format.label}</span>
          </button>
        ))}
      </div>

      {detectedFormat === 'unknown' && (
        <p className="text-xs text-amber-600 bg-amber-50 p-2 rounded">
          データ形式を自動検出できませんでした。正しいフォーマットを選択してください。
        </p>
      )}
    </div>
  );
};
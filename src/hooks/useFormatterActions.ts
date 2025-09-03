import { useCallback, useEffect } from 'react';
import type { DataFormat, FormatterOptions, AppState } from '../types';
import { formatJSON, minifyJSON } from '../utils/jsonFormatter';
import { formatXML, minifyXML } from '../utils/xmlFormatter';
import { detectDataFormat } from '../utils/validators';
import { SAMPLE_JSON, SAMPLE_XML } from '../constants/sampleData';

interface UseFormatterActionsProps {
  state: AppState;
  updateState: (updates: Partial<AppState>) => void;
  resetState: () => void;
}

export const useFormatterActions = ({ state, updateState, resetState }: UseFormatterActionsProps) => {
  const setInputData = useCallback((data: string) => {
    updateState({
      inputData: data,
      outputData: '',
      error: undefined,
    });
  }, [updateState]);

  const setFormat = useCallback((format: DataFormat) => {
    updateState({
      format,
      outputData: '',
      error: undefined,
    });
  }, [updateState]);

  const formatData = useCallback((minify = false) => {
    updateState({ isLoading: true, error: undefined });

    setTimeout(() => {
      const options: FormatterOptions = { indent: 2 };
      
      let result;
      if (state.format === 'json') {
        result = minify ? minifyJSON(state.inputData) : formatJSON(state.inputData, options);
      } else {
        result = minify ? minifyXML(state.inputData) : formatXML(state.inputData, options);
      }

      updateState({
        outputData: result.success ? result.formatted || '' : '',
        error: result.success ? undefined : result.error,
        isLoading: false,
      });
    }, 100);
  }, [state.inputData, state.format, updateState]);

  const clearData = useCallback(() => {
    resetState();
  }, [resetState]);

  const copyToClipboard = useCallback(async (): Promise<boolean> => {
    if (!state.outputData) return false;

    try {
      await navigator.clipboard.writeText(state.outputData);
      return true;
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
      return false;
    }
  }, [state.outputData]);

  const loadSampleData = useCallback((format: DataFormat) => {
    const sampleData = format === 'json' ? SAMPLE_JSON : SAMPLE_XML;
    updateState({
      inputData: sampleData,
      format,
      outputData: '',
      error: undefined,
    });
  }, [updateState]);

  // 自動フォーマット切り替え機能
  useEffect(() => {
    const trimmedInput = state.inputData.trim();
    if (!trimmedInput) return;

    const detectedFormat = detectDataFormat(state.inputData);
    
    // 有効なフォーマットが検出され、現在の選択と異なる場合のみ自動切り替え
    if (detectedFormat !== 'unknown' && detectedFormat !== state.format) {
      updateState({
        format: detectedFormat,
        outputData: '',
        error: undefined,
      });
    }
  }, [state.inputData, state.format, updateState]);

  return {
    setInputData,
    setFormat,
    formatData,
    clearData,
    copyToClipboard,
    loadSampleData,
  };
};
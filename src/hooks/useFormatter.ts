import type { DataFormat, DataInfo, AppState } from '../types';
import { useFormatterState } from './useFormatterState';
import { useFormatterActions } from './useFormatterActions';
import { useFormatterInfo } from './useFormatterInfo';

interface UseFormatterReturn {
  state: AppState;
  actions: {
    setInputData: (data: string) => void;
    setFormat: (format: DataFormat) => void;
    formatData: (minify?: boolean) => void;
    clearData: () => void;
    copyToClipboard: () => Promise<boolean>;
    loadSampleData: (format: DataFormat) => void;
  };
  info: {
    detectedFormat: DataFormat | 'unknown';
    dataInfo: DataInfo | null;
    canFormat: boolean;
  };
}

export const useFormatter = (): UseFormatterReturn => {
  const { state, updateState, resetState } = useFormatterState();
  const actions = useFormatterActions({ state, updateState, resetState });
  const info = useFormatterInfo({ state });

  return {
    state,
    actions,
    info,
  };
};
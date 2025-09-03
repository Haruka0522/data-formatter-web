import { useMemo } from 'react';
import type { DataFormat, DataInfo, AppState } from '../types';
import { detectDataFormat } from '../utils/validators';
import { getJSONInfo } from '../utils/jsonFormatter';
import { getXMLInfo } from '../utils/xmlFormatter';

interface UseFormatterInfoProps {
  state: AppState;
}

export const useFormatterInfo = ({ state }: UseFormatterInfoProps) => {
  const info = useMemo(() => {
    const detectedFormat = state.inputData.trim() 
      ? detectDataFormat(state.inputData) 
      : 'unknown';
      
    const dataInfo: DataInfo | null = state.inputData.trim() 
      ? (state.format === 'json' 
          ? getJSONInfo(state.inputData) 
          : getXMLInfo(state.inputData))
      : null;
      
    const canFormat = state.inputData.trim() !== '' && !state.isLoading;

    return {
      detectedFormat: detectedFormat as DataFormat | 'unknown',
      dataInfo,
      canFormat,
    };
  }, [state.inputData, state.format, state.isLoading]);

  return info;
};
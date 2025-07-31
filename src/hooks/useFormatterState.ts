import { useState } from 'react';
import type { AppState, DataFormat } from '../types';

export const useFormatterState = () => {
  const [state, setState] = useState<AppState>({
    inputData: '',
    format: 'json' as DataFormat,
    outputData: '',
    isLoading: false,
    error: undefined,
  });

  const updateState = (updates: Partial<AppState>) => {
    setState(prev => ({ ...prev, ...updates }));
  };

  const resetState = () => {
    setState({
      inputData: '',
      format: 'json' as DataFormat,
      outputData: '',
      isLoading: false,
      error: undefined,
    });
  };

  return {
    state,
    updateState,
    resetState,
  };
};
import { useState, useCallback, useMemo } from 'react';
import type { DataFormat, AppState, FormatterOptions, DataInfo } from '../types';
import { formatJSON, minifyJSON, getJSONInfo } from '../utils/jsonFormatter';
import { formatXML, minifyXML, getXMLInfo } from '../utils/xmlFormatter';
import { detectDataFormat } from '../utils/validators';

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

const SAMPLE_JSON = `{
  "name": "John Doe",
  "age": 30,
  "city": "Tokyo",
  "hobbies": ["reading", "gaming"],
  "address": {
    "street": "123 Main St",
    "zipCode": "100-0001"
  }
}`;

const SAMPLE_XML = `<?xml version="1.0" encoding="UTF-8"?>
<person>
  <name>John Doe</name>
  <age>30</age>
  <city>Tokyo</city>
  <hobbies>
    <hobby>reading</hobby>
    <hobby>gaming</hobby>
  </hobbies>
  <address>
    <street>123 Main St</street>
    <zipCode>100-0001</zipCode>
  </address>
</person>`;

export const useFormatter = (): UseFormatterReturn => {
  const [state, setState] = useState<AppState>({
    inputData: '',
    format: 'json',
    outputData: '',
    isLoading: false,
    error: undefined,
  });

  const setInputData = useCallback((data: string) => {
    setState(prev => ({
      ...prev,
      inputData: data,
      outputData: '',
      error: undefined,
    }));
  }, []);

  const setFormat = useCallback((format: DataFormat) => {
    setState(prev => ({
      ...prev,
      format,
      outputData: '',
      error: undefined,
    }));
  }, []);

  const formatData = useCallback((minify = false) => {
    setState(prev => ({ ...prev, isLoading: true, error: undefined }));

    // 非同期処理でUIをブロックしないようにする
    setTimeout(() => {
      const options: FormatterOptions = { indent: 2 };
      
      let result;
      if (state.format === 'json') {
        result = minify ? minifyJSON(state.inputData) : formatJSON(state.inputData, options);
      } else {
        result = minify ? minifyXML(state.inputData) : formatXML(state.inputData, options);
      }

      setState(prev => ({
        ...prev,
        outputData: result.success ? result.formatted || '' : '',
        error: result.success ? undefined : result.error,
        isLoading: false,
      }));
    }, 100);
  }, [state.inputData, state.format]);

  const clearData = useCallback(() => {
    setState({
      inputData: '',
      format: 'json',
      outputData: '',
      isLoading: false,
      error: undefined,
    });
  }, []);

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
    setState(prev => ({
      ...prev,
      inputData: sampleData,
      format,
      outputData: '',
      error: undefined,
    }));
  }, []);

  const info = useMemo(() => {
    const detectedFormat = state.inputData.trim() 
      ? detectDataFormat(state.inputData) 
      : 'unknown';
      
    const dataInfo = state.inputData.trim() 
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

  return {
    state,
    actions: {
      setInputData,
      setFormat,
      formatData,
      clearData,
      copyToClipboard,
      loadSampleData,
    },
    info,
  };
};
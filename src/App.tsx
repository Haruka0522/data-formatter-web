import { ErrorBoundary } from './components/ErrorBoundary';
import { Header } from './components/Header';
import { FormatSelector } from './components/FormatSelector';
import { FormatInput } from './components/FormatInput';
import { FormatOutput } from './components/FormatOutput';
import { useFormatter } from './hooks/useFormatter';

function App() {
  const { state, actions, info } = useFormatter();

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gray-50">
        <Header />
        
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* 入力エリア */}
            <div className="space-y-6">
              <FormatSelector
                selectedFormat={state.format}
                onFormatChange={actions.setFormat}
                detectedFormat={info.detectedFormat}
                disabled={state.isLoading}
              />
              
              <FormatInput
                value={state.inputData}
                onChange={actions.setInputData}
                disabled={state.isLoading}
                onClear={actions.clearData}
                onLoadSample={actions.loadSampleData}
              />
              
              {/* アクションボタン */}
              <div className="flex space-x-3">
                <button
                  onClick={() => actions.formatData(false)}
                  disabled={!info.canFormat}
                  className="btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {state.isLoading ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>整形中...</span>
                    </div>
                  ) : (
                    '整形実行'
                  )}
                </button>
                
                <button
                  onClick={() => actions.formatData(true)}
                  disabled={!info.canFormat}
                  className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  圧縮
                </button>
              </div>
            </div>

            {/* 出力エリア */}
            <div>
              <FormatOutput
                value={state.outputData}
                format={state.format}
                isLoading={state.isLoading}
                error={state.error}
                onCopy={actions.copyToClipboard}
                dataInfo={info.dataInfo}
              />
            </div>
          </div>
          
          {/* 使い方説明 */}
          <div className="mt-12 bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">使い方</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-blue-600 font-semibold text-sm">1</span>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 mb-1">データを入力</h3>
                  <p className="text-sm text-gray-600">
                    JSONまたはXMLデータを左側のテキストエリアにペーストしてください
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-blue-600 font-semibold text-sm">2</span>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 mb-1">フォーマットを選択</h3>
                  <p className="text-sm text-gray-600">
                    データ形式を選択してください。自動検出も行われます
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-blue-600 font-semibold text-sm">3</span>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 mb-1">整形実行</h3>
                  <p className="text-sm text-gray-600">
                    「整形実行」ボタンを押すと、美しく整形された結果が表示されます
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>
        
        <footer className="bg-white border-t border-gray-200 py-8 mt-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center text-sm text-gray-500">
              <p>&copy; 2024 Data Formatter. Built with React + TypeScript + Tailwind CSS</p>
            </div>
          </div>
        </footer>
      </div>
    </ErrorBoundary>
  );
}

export default App;
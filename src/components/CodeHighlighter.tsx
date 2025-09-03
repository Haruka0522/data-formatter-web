import { useEffect, useRef, Suspense } from 'react';
import type { DataFormat } from '../types';

interface CodeHighlighterProps {
  code: string;
  language: DataFormat;
}

const PrismHighlighter: React.FC<CodeHighlighterProps> = ({ code, language }) => {
  const codeRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const loadPrism = async () => {
      const { default: Prism } = await import('prismjs');
      
      // Load language-specific components
      if (language === 'json') {
        // @ts-expect-error - Prism component imports don't have proper types
        await import('prismjs/components/prism-json.js');
      } else if (language === 'xml') {
        // @ts-expect-error - Prism component imports don't have proper types
        await import('prismjs/components/prism-markup.js');
      }
      
      // Load CSS theme
      await import('prismjs/themes/prism.css');
      
      if (codeRef.current) {
        Prism.highlightElement(codeRef.current);
      }
    };

    if (code) {
      loadPrism();
    }
  }, [code, language]);

  const getLanguageClass = () => {
    return language === 'json' ? 'language-json' : 'language-markup';
  };

  return (
    <pre className="code-block">
      <code ref={codeRef} className={getLanguageClass()}>
        {code}
      </code>
    </pre>
  );
};

const LoadingHighlighter: React.FC<{ code: string }> = ({ code }) => (
  <pre className="code-block">
    <code>{code}</code>
  </pre>
);

export const CodeHighlighter: React.FC<CodeHighlighterProps> = (props) => {
  return (
    <Suspense fallback={<LoadingHighlighter code={props.code} />}>
      <PrismHighlighter {...props} />
    </Suspense>
  );
};
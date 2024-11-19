import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { prism } from 'react-syntax-highlighter/dist/esm/styles/prism';

const inlineCodeStyle: React.CSSProperties = {
  display: 'inline',
  padding: '0 0.5rem',
  background: '#DDF8FF',
  margin: '0 0.5rem',
};

const codeTagProps = {
  style: {
    fontSize: '110%',
    fontWeight: '600',
    color: '#045950',
  },
};

export const renderInlineCode = React.memo(
  (text?: string | null, defaultLanguage = 'javascript'): React.ReactNode => {
    if (!text) return '';

    const regex = /`([^`]+)`/g;
    let match;
    let lastIndex = 0;
    const elements: React.ReactNode[] = [];

    while ((match = regex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        elements.push(
          <span key={lastIndex}>{text.substring(lastIndex, match.index)}</span>
        );
      }

      elements.push(
        <SyntaxHighlighter
          key={match.index}
          style={prism}
          language={defaultLanguage}
          customStyle={inlineCodeStyle}
          codeTagProps={codeTagProps}
        >
          {match[1]}
        </SyntaxHighlighter>
      );

      lastIndex = regex.lastIndex;
    }

    if (lastIndex < text.length) {
      elements.push(<span key={lastIndex}>{text.substring(lastIndex)}</span>);
    }

    return elements.length > 0 ? <>{elements}</> : '';
  }
);

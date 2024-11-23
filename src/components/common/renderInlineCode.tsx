import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
// import { prism } from 'react-syntax-highlighter/dist/esm/styles/prism';

const inlineCodeStyle: React.CSSProperties = {
  display: 'inline',
  padding: '0 0.5rem',
  // background: '#DDF8FF',
  margin: '0 0.5rem',
};

const codeTagProps = {
  style: {
    fontSize: '105%',
    fontWeight: '500',
    textShadow: 'none',
    // color: '#045950',
  },
};

export const renderInlineCode = (text: string): React.ReactNode => {
  const regex = /\\`(.*?)\\`/g; // Match escaped backticks and capture text between them
  let match;
  let lastIndex = 0;
  const elements: React.ReactNode[] = []; // Use React.ReactNode to allow strings and JSX

  while ((match = regex.exec(text)) !== null) {
    // Add the text before the match as a plain string
    if (match.index > lastIndex) {
      elements.push(
        <span key={lastIndex}>{text.substring(lastIndex, match.index)}</span>
      );
    }

    // Add the matched inline code wrapped in the SyntaxHighlighter component
    elements.push(
      <SyntaxHighlighter
        key={match.index}
        // style={prism}
        customStyle={inlineCodeStyle}
        codeTagProps={codeTagProps}
        className="highlighted__code"
      >
        {match[1]}
      </SyntaxHighlighter>
    );

    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    elements.push(<span key={lastIndex}>{text.substring(lastIndex)}</span>);
  }

  if (elements.length > 0) {
    return <>{elements}</>;
  }

  // If there are no elements, return a default empty string (ensure that it never returns undefined)
  return '';
};

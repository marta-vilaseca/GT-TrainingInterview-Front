// src/components/common/renderInlineCode.tsx
import React from 'react';
import hljs from 'highlight.js/lib/core';
import 'highlight.js/styles/a11y-light.min.css';

const inlineCodeStyle: React.CSSProperties = {
  display: 'inline-block',
  padding: '0 0.5rem',
  margin: '0 0.5rem',
  borderRadius: '4px',
  fontWeight: 600,
};

// Renders inline code with Highlight.js
export const renderInlineCode = (text: string): React.ReactNode => {
  const regex = /\\`(.*?)\\`/g; // Match escaped backticks and capture text between them
  let match;
  let lastIndex = 0;
  const elements: React.ReactNode[] = [];

  while ((match = regex.exec(text)) !== null) {
    // Add the text before the match
    if (match.index > lastIndex) {
      elements.push(
        <span key={lastIndex}>{text.substring(lastIndex, match.index)}</span>
      );
    }

    // Highlight inline code (escaping with Highlight.js)
    const escapedCode = hljs.highlightAuto(match[1]).value; // Uses auto-detection
    elements.push(
      <code
        key={match.index}
        style={inlineCodeStyle}
        dangerouslySetInnerHTML={{ __html: escapedCode }}
        className="highlighted__code"
      />
    );

    lastIndex = regex.lastIndex;
  }

  // Add any remaining plain text
  if (lastIndex < text.length) {
    elements.push(<span key={lastIndex}>{text.substring(lastIndex)}</span>);
  }

  return <>{elements}</>;
};

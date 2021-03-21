import React from 'react';
import styled from 'styled-components';
const TermHighlighter = ({ children, searchTerm }) => {
  const words = children.split(new RegExp(`(${searchTerm})`, 'gi'));

  return (
    <StyledParagraph>
      {searchTerm
        ? words.map((word, index) => (
            <span
              key={index}
              className={
                word.toLowerCase() === searchTerm.toLowerCase()
                  ? 'highlight'
                  : null
              }
            >
              {word}
            </span>
          ))
        : children}
    </StyledParagraph>
  );
};

const StyledParagraph = styled.p` 
    font-weight: 500;
    width: 70%;
    .highlight {
      border-radius: 5px;
      color: #eb7434;
      font-weight: 900;
`;

export default TermHighlighter;

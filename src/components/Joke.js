import React, { useState } from 'react';
import styled from 'styled-components';
import TermHighlighter from './TermHighlighter';

const Joke = ({ joke, searchTerm }) => {
  const [copy, setCopy] = useState(false);
  const jokeLength = joke.split(' ').length;

  // const highlightWords = searchTerm => {
  //   const search = new RegExp(searchTerm, 'i');
  //   const formattedJoke = joke.replace(search, '<span>$&</span>');
  // };

  const copyToClipBoard = () => {
    navigator.clipboard.writeText(joke);
    setCopy(true);

    setTimeout(() => {
      setCopy(false);
    }, 500);
  };

  return (
    <StyledJoke onClick={copyToClipBoard}>
      <span className='copied-to-clipboard'>
        {copy ? 'Copied' + String.fromCharCode(10003) : 'Copy?'}
      </span>

      {/* // This probaby isn't a safe solution? because the api might respond with a malicious script? 
          // could use also sanitize this to make it safe.
      <p
        dangerouslySetInnerHTML={{ __html: highlightWords(searchTerm) }}
        className='joke-text'
      />
     */}

      <TermHighlighter searchTerm={searchTerm}>{joke}</TermHighlighter>
      <span
        className='joke-length'
        style={{
          backgroundColor:
            jokeLength < 10
              ? '#d4ffd4'
              : jokeLength < 20
              ? '#d4f1ff'
              : '#ffd4d4',
          color:
            jokeLength < 10 ? 'green' : jokeLength < 20 ? '#0390fc' : 'red',
        }}
      >
        {jokeLength < 10 ? 'short' : jokeLength < 20 ? 'medium' : 'long'}
      </span>
    </StyledJoke>
  );
};

const StyledJoke = styled.div`
  position: relative;
  display: block;
  min-height: 50px;
  border-radius: 5px;
  background: white;
  padding: 1em 1.5em;
  margin-bottom: 1em;
  color: black;
  cursor: pointer;
  box-shadow: 0px 3px 10px -5px rgba(194, 192, 194, 1);
  z-index: 200;
  .copied-to-clipboard {
    top: 0px;
    font-weight: 900;
    right: 0px;
    position: absolute;
    font-size: 14px;
    width: 70px;
    text-align: center;
    margin: 0;
    border-bottom-left-radius: 5px;
    border-top-right-radius: 5px;
    background: black;
    padding: 10px;
    color: white;
    opacity: 0;
    z-index: 26;
    transition: opacity 0.2s linear;
  }
  &:hover {
    .copied-to-clipboard {
      opacity: 1;
    }
  }
  .joke-text {
    font-weight: 500;
    width: 70%;
    .highlight {
      border-radius: 5px;
      color: #eb7434;
      font-weight: 900;
    }
  }

  .joke-length {
    top: 0px;
    font-weight: 900;
    right: 0px;
    position: absolute;
    font-size: 14px;
    width: 70px;
    text-align: center;
    margin: 0;
    border-bottom-left-radius: 5px;
    border-top-right-radius: 5px;
    background: #4387ec;
    padding: 10px;
    color: white;
    z-index: 25;
  }
`;
export default Joke;

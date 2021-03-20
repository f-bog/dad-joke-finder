import React from 'react';
import styled from 'styled-components';
const RandomJokeButton = ({ randomJokeHandler }) => {
  return (
    <StyledButton onClick={e => randomJokeHandler(e)}>Random</StyledButton>
  );
};
const StyledButton = styled.button`
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  cursor: pointer;
  width: 151px;
  height: 50px;
  font-size: 1.5em;
  font-family: lato;
  font-weight: 900;
  color: white;
  background: #4e03fc;
  border: none;
  @media only screen and (max-width: 900px) {
    font-size: 1em;
    width: 90px;
  }
`;

export default RandomJokeButton;

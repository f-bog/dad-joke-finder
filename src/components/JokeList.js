import React from 'react';
import styled from 'styled-components';
import Joke from './Joke';
const JokeList = ({ jokes, searchTerm, randomJoke }) => {
  return (
    <StyledList>
      {/* if random joke exists, show single joke */}
      {randomJoke ? (
        <Joke joke={randomJoke.joke} />
      ) : (
        jokes.map(joke => (
          <Joke searchTerm={searchTerm} joke={joke.joke} key={joke.id} />
        ))
      )}
    </StyledList>
  );
};

const StyledList = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export default JokeList;

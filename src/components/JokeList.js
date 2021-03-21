import React from 'react';
import styled from 'styled-components';
import { useTrail, animated } from 'react-spring';
import Joke from './Joke';

const JokeList = ({ jokes, searchTerm, randomJoke }) => {
  const trail = useTrail(jokes.length, {
    opacity: 1,
    from: { opacity: 0 },
  });
  return (
    <StyledList>
      {/* if random joke exists, show single joke */}
      {randomJoke ? (
        <Joke joke={randomJoke.joke} />
      ) : (
        trail.map(({ ...rest }, index) => (
          <animated.div style={{ ...rest }}>
            <Joke
              searchTerm={searchTerm}
              joke={jokes[index].joke}
              key={jokes[index].id}
            />
          </animated.div>
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

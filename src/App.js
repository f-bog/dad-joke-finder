import './App.css';
import React, { useState, useEffect } from 'react';

import styled from 'styled-components';
import Search from './components/controls/Search';
import JokeList from './components/JokeList';
import axios from 'axios';

function App() {
  const [searchTerm, setSearchTerm] = useState('dog');
  const [jokes, setJokes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [randomJoke, setRandomJoke] = useState(null);

  useEffect(() => {
    // fetch jokes by term
    const fetchJokesByTerm = async searchTerm => {
      const response = await axios.get(
        `https://icanhazdadjoke.com/search?limit=30&term=${searchTerm}`,
        {
          headers: {
            Accept: 'application/json',
          },
        }
      );

      const { data } = response;

      // sort jokes by length
      const sortedResults = data.results.sort(
        (a, b) => a.joke.split(' ').length - b.joke.split(' ').length
      );

      setJokes(sortedResults);
      setIsLoading(false);
    };

    // prevents a bug caused by having searchTerm as a dependancy
    if (searchTerm !== '') {
      setIsLoading(true);
      // set randomJoke to null
      setRandomJoke(null);
      fetchJokesByTerm(searchTerm);
    }
  }, [searchTerm]);
  // Fetch random joke
  const fetchRandomJoke = async () => {
    const response = await axios.get('https://icanhazdadjoke.com/', {
      headers: {
        Accept: 'application/json',
      },
    });
    const { data } = response;
    setSearchTerm('');
    setRandomJoke(data);
    setIsLoading(false);
    console.log(randomJoke);
  };

  const randomJokeHandler = e => {
    e.preventDefault();
    setIsLoading(true);
    fetchRandomJoke();
  };

  return (
    <div className='App'>
      <StyledContainer>
        <header>
          <h1>Dad Joke Finder</h1>
        </header>

        <Search
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          randomJokeHandler={randomJokeHandler}
        />
        {!isLoading && (
          <p className='info'>
            Results: {randomJoke ? 1 : jokes.length} | Term:{' '}
            {randomJoke ? '' : searchTerm}
          </p>
        )}
        {!isLoading ? (
          <JokeList
            jokes={jokes}
            searchTerm={searchTerm}
            // randomJoke will contain object or null
            randomJoke={randomJoke}
          />
        ) : (
          <p>My newspaper doesn't need to load</p>
        )}
      </StyledContainer>
    </div>
  );
}

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 1120px;
  width: 90%;
  margin: 0 auto;
  header {
    display: flex;
    align-content: center;
    margin-top: 150px;
    width: 100%;
    height: 72px;
    display: flex;
    align-items: center;
    margin-bottom: 3em;
  }
  .info {
    text-align: right;
    font-size: 0.9em;
    color: #333;
  }
  h1 {
    font-size: 3.5em;
    text-align: left;
    color: black;
  }
  @media only screen and (max-width: 900px) {
    h1 {
      font-size: 3em;
    }
  }
`;

export default App;

import React, { useState } from 'react';
import styled from 'styled-components';
import emoji from '../../images/dad-emoji.png';
import RandomJokeButton from './RandomJokeButton';
import { useSpring, animated, interpolate } from 'react-spring';
import SearchButton from './SearchButton';

const Search = ({ setSearchTerm, randomJokeHandler }) => {
  const [value, setValue] = useState('');
  const [{ y, deg, opacity }, set] = useSpring(() => ({
    y: -50,
    deg: 0,
    opacity: 0,
  }));

  const searchHandler = e => {
    e.preventDefault();
    // if search value is less than or equal to 1, do not run this code
    if (!(value.length <= 1)) {
      setSearchTerm(value.split(' ')[0]);
      setValue('');
    }
  };

  return (
    <StyledForm
      onFocus={() => set({ y: -150, deg: 5, opacity: 1 })}
      onBlur={() => set({ y: -50, deg: 0, opacity: 0 })}
    >
      <div className='search-button-container'>
        <input
          type='text'
          placeholder='Search for a dad joke!'
          value={value}
          onChange={e => setValue(e.target.value)}
        />

        <animated.div
          className='emoji'
          style={{
            transform: interpolate(
              [y, deg],
              (v, d) => `translateY(${v}%) rotate(${d}deg)`
            ),
          }}
        >
          <animated.span className='emoji-words' style={{ opacity }}>
            oh boy i cant wait to embarrass my kids.
          </animated.span>
          <img src={emoji} alt='dad emoji' />
        </animated.div>
        <SearchButton searchHandler={searchHandler} set={set} />
      </div>
      <RandomJokeButton randomJokeHandler={randomJokeHandler} />
    </StyledForm>
  );
};

const StyledForm = styled.form`
  display: flex;
  margin-bottom: 2em;
  height: 48px;
  width: 100%;
  border-radius: 5px;
  box-shadow: 0px 3px 15px -5px rgba(194, 192, 194, 1);
  input {
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
    position: relative;
    z-index: 5;
    font-family: lato;
    height: 48px;
    width: 90%;
    max-width: 810px;
    padding-left: 1em;
    font-size: 1.5em;
    border: none;
  }
  .search-button-container {
    position: relative;
    display: flex;

    width: 100%;
  }
  .emoji {
    width: 300px;
    display: block;
    right: 0;
    top: 0;
    position: absolute;
    pointer-events: none;
    img {
      width: 40px;
    }
  }

  .emoji-words {
    font-size: 14px;
    color: black;
    width: 200px;
    display: inline;
  }
  ${'' /* mobile styles */}
  @media only screen and (max-width: 900px) {
    input {
      font-size: 1em;
    }
    .emoji {
      ${'' /* .emoji-words {
        display: none;
      } */}
    }
  }
`;

export default Search;

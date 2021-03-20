import React from 'react';
import styled from 'styled-components';
const SearchButton = ({ searchHandler, set }) => {
  return (
    <StyledButton
      className='search-button'
      onClick={e => searchHandler(e)}
      onMouseEnter={() => set({ y: -150, deg: 5 })}
      onMouseLeave={() => set({ y: -50, deg: 0 })}
    >
      Search
    </StyledButton>
  );
};

const StyledButton = styled.button`
  position: relative;
  cursor: pointer;
  height: 50px;
  width: 150px;
  font-size: 1.5em;
  text-align: center;
  font-family: lato;
  font-weight: 900;
  color: white;
  background: black;
  border: none;
  @media only screen and (max-width: 900px) {
    font-size: 1em;
    width: 100px;
  }
`;
export default SearchButton;

import React from 'react';
import SearchHeader from './SearchHeader';
import SearchContainer from "./SearchContainer";
import './SearchPage.css';

const SearchPage = () => (
    <div className='search-page'>
        <SearchHeader/>
        <SearchContainer/>
    </div>
);

export default SearchPage;

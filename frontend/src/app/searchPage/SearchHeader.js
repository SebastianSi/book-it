import React from 'react';
import Header from '../commonComponents/Header';
import SearchFilters from './SearchFilters';
import './SearchHeader.css';

const SearchHeader = (props) => (
    <div className='search-header'>
        <Header/>
        <SearchFilters onSubmit={props.onHeaderSubmit}/>
    </div>
);

export default SearchHeader;

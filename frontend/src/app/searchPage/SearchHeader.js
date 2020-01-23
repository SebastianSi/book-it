import React from 'react';
import Header from '../commonComponents/Header';
// import {Button} from "antd";
import SearchFilters from './SearchFilters';
import './SearchHeader.css';

//wrapper over common header
const SearchHeader = (props) => (
    <div className='search-header'>
        <Header/>
        <SearchFilters onSubmit={props.onHeaderSubmit}/>
    </div>
);

export default SearchHeader;

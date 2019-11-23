import React from 'react';
import Header from '../commonComponents/Header';

//wrapper over common header
const SearchHeader = (props) => (
    <div className='search-header'>
        <Header/>
        <button onClick={props.onHeaderSubmit}
        style={{color: 'blue', cursor: 'pointer'}}>Fetch Trainers!</button>
    </div>
);

export default SearchHeader;

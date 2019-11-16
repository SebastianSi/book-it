import React from 'react';
import { Row, Col } from 'antd';
import SearchResultsList from "./SearchResultsList";


const SearchContainer = () => (
    <div className='search-container'>
        <Row>
            <Col span={4}>col-4</Col>
            <Col span={16}>
                col-16
                <SearchResultsList/>
            </Col>
            <Col span={4}>col-4</Col>
        </Row>
    </div>
);

export default SearchContainer;

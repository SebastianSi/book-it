import React, { useReducer } from 'react';
import { Row, Col } from 'antd';
import SearchResultsList from "./SearchResultsList";
import SearchHeader from "./SearchHeader";


function trainersReducer(state, action) {
    switch (action.type) {
        case 'SET_TRAINERS':
            console.log("SET_TRAINERS");
            return {...state, trainers: action.trainers};
        default:
            return state
    }
}

const SearchContainer = () => {
    let initialTrainers = [];
    const [state, dispatch] = useReducer(trainersReducer, {
        trainers: initialTrainers,
        currentCandidateId: 0
    });

    function fetchAllTrainers() {
        const url = 'http://localhost:5000/api/v2/trainers/';
        fetch(url)
            .then((resp) => resp.json())
            .then(function(response) {
                // let {trainers} = response;
                dispatch({type: 'SET_TRAINERS', trainers: response});
                console.log(response);
            })
            .catch(function(error) {
                console.log(error);
            });
    }

    return (
        <div className='search-container'>
            <SearchHeader onHeaderSubmit={fetchAllTrainers}/>
            <Row>
                <Col span={4}>col-4</Col>
                <Col span={16}>
                    col-16
                    <SearchResultsList trainers={state.trainers}/>
                </Col>
                <Col span={4}>col-4</Col>
            </Row>
        </div>
    )
};

export default SearchContainer;

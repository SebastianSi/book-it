import React, { useReducer } from 'react';
import { Row, Col } from 'antd';
import SearchResultsList from "./SearchResultsList";
import SearchHeader from "./SearchHeader";


function trainersReducer(state, action) {
    switch (action.type) {
        case 'SET_TRAINERS':
            // console.log("SET_TRAINERS");
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

    function fetchAllTrainers(filters) {
        let url = 'http://localhost:5000/api/v2/trainers';
        if (filters) {
            let queryStringParams = '?';
            if (filters.name) {
                queryStringParams += 'name=' + filters.name + '&';
            }
            if (filters.city) {
                queryStringParams += 'city=' + filters.city + '&';
            }
            if (filters.sex) {
                queryStringParams += 'sex=' + filters.sex
            }
            url += queryStringParams;
        }

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

            <Row>
                <Col span={4}></Col>
                <Col span={16}>
                    {/*col-16*/}
                    <SearchHeader onHeaderSubmit={fetchAllTrainers}/>
                    <SearchResultsList trainers={state.trainers}/>
                </Col>
                <Col span={4}></Col>
            </Row>
        </div>
    )
};

export default SearchContainer;

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

    function fetchAllTrainers(params) {
        let url = 'http://localhost:5000/api/v2/trainers';
        console.log(params)
        if (params) {
            let queryStringParams = '?';
            if (params.name) {
                queryStringParams += 'name=' + params.name + '&';
            }
            if (params.city) {
                queryStringParams += 'city=' + params.city + '&';
            }
            if (params.sex) {
                queryStringParams += 'sex=' + params.sex
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

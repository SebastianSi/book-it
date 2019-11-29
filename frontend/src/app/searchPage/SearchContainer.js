import React, { useEffect, useReducer } from 'react';
import { Row, Col } from 'antd';
import SearchResultsList from "./SearchResultsList";
import SearchHeader from "./SearchHeader";
// import MOCK_TRAINERS from '../../mock_data/list_of_trainers.json';


function trainersReducer(state, action) {
    switch (action.type) {
        case 'SET_TRAINERS':
            console.log("SET_TRAINERS");
            return {...state, trainers: action.trainers};
        case 'setCurrCandidateId':
            return {...state, currentCandidateId: action.id};
        case 'updateCandidateData':
            const newState = state;
            const currCandidateIndex = state.trainers.findIndex(x => x.id === state.currentCandidateId);
            newState.trainers[currCandidateIndex] = {...newState.trainers[currCandidateIndex], ...action.data};
            return newState;
        default:
            return state
    }
}

const SearchContainer = () => {
    let initialTrainers = [];
    for (let i = 0; i < 23; i++) {
        initialTrainers.push({
            href: 'http://ant.design',
            title: `ant design part ${i}`,
            avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
            description:
                'Ant Design, a design language for background applications, is refined by Ant UED Team.',
            content:
                'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
        });
    }
    const [state, dispatch] = useReducer(trainersReducer, {
        trainers: initialTrainers,
        currentCandidateId: 0
    });

    function fetchAllTrainers() {
        const url = 'http://localhost:5000/api/v1/trainers/';
        // const urlForOneTrainer = 'http://localhost:5000/api/v1/trainers/fdnq34873etb-032i4c';
        // logDataFromServer(url, null, function(data){
        //     console.log(data);
        //     dispatch('SET_TRAINERS', data.trainers);
        // });
        fetch(url)
            .then((resp) => resp.json())
            .then(function(response) {
                // debugger
                // console.log(data);
                let {trainers} = response.data;
                dispatch({type: 'SET_TRAINERS', trainers});
            })
            .catch(function(error) {
                console.log(error);
            });
        // logDataFromServer(urlForOneTrainer,null, function(){});
    }

    // console.log('state: ', state);
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





function logDataFromServer(url, method, onSuccess) {
    //defaul get
    if (method) {
        if (method === "post"){

        }
    }

    fetch(url)
        .then((resp) => resp.json())
        .then(function(data) {
            console.log(data);
            onSuccess(data);
        })
        .catch(function(error) {
            console.log(error);
        });
}

export default SearchContainer;

import React, { useEffect, useReducer } from 'react';
import { List, Icon } from 'antd';
import TrainerDetailsModal from "./TrainerDetailsModal";


const listData = [];
for (let i = 0; i < 23; i++) {
    listData.push({
        href: 'http://ant.design',
        title: `ant design part ${i}`,
        avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        description:
            'Ant Design, a design language for background applications, is refined by Ant UED Team.',
        content:
            'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
    });
}

function reducer(state, action) {
    switch (action.type) {
        case 'setModalOpen':
            return {...state, isModalOpen: action.isModalOpen}
        case 'setCandidates':
            return {...state, candidates: action.candidates}
        case 'setCurrCandidateId':
            return {...state, currentCandidateId: action.id}
        case 'updateCandidateData':
            const newState = state
            const currCandidateIndex = state.candidates.findIndex(x => x.id === state.currentCandidateId)
            newState.candidates[currCandidateIndex] = {...newState.candidates[currCandidateIndex], ...action.data}
            return newState
        default:
            return state
    }
}

const IconText = ({ type, text }) => (
    <span>
    <Icon type={type} style={{ marginRight: 8 }} />
        {text}
  </span>
);

const SearchResultsList = () => {
    const [state, dispatch] = useReducer(reducer, {
        isModalOpen: false,
        candidates: [],
        currentCandidateId: 0
    });

    useEffect(() => {
        console.log("783457843587")
        // fetchCandidates()
    }, []);

    const toggleOpenCandidateDialog = (shouldOpen, candidateId) => {
        shouldOpen && dispatch({type: 'setCurrCandidateId', id: candidateId});
        dispatch({type: 'setModalOpen', isModalOpen: shouldOpen})
    };
    return (
        <div className='search-list'>
            {state.isModalOpen ?
                <TrainerDetailsModal
                    currentCandidateId={state.currentCandidateId}
                    goBack={() => {toggleOpenCandidateDialog(false)}}
                    // updateCandidateData={updateCandidateData}
                /> :
                <List
                    bordered
                    itemLayout="vertical"
                    size="large"
                    pagination={{
                        onChange: page => {
                            console.log(page);
                        },
                        pageSize: 10,
                    }}
                    dataSource={listData}
                    footer={
                        <div>
                            <b>ant design</b> footer part
                        </div>
                    }
                    renderItem={item => (
                        <List.Item
                            key={item.title}
                            actions={[
                                <IconText type="star-o" text="156" key="list-vertical-star-o"/>,
                                <IconText type="like-o" text="156" key="list-vertical-like-o"/>,
                                <IconText type="message" text="2" key="list-vertical-message"/>,
                            ]}
                            extra={
                                <img
                                    width={272}
                                    alt="logo"
                                    src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                                />
                            }
                        >
                            <List.Item.Meta
                                // avatar={<Avatar src={item.avatar} />}
                                title={<a href={item.href}>{item.title}</a>}
                                description={item.description}
                            />
                            {item.content}
                            <button style={{cursor: "pointer"}} onClick={() => {toggleOpenCandidateDialog(true)}}>Edit</button>
                            {/*<button style={{cursor: "pointer"}} onClick={() => {toggleOpenCandidateDialog(true, candidate.id)}}>Edit</button>*/}
                        </List.Item>
                    )}
                />
            }

        </div>
    )
};

export default SearchResultsList;


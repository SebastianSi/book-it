import React, {useEffect, useState} from 'react';
import { List, Icon } from 'antd';
import TrainerDetailsModal from "./TrainerDetailsModal";

const IconText = ({ type, text }) => (
    <span>
    <Icon type={type} style={{ marginRight: 8 }} />
        {text}
  </span>
);

const SearchResultsList = (props) => {


    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentTrainerId, setCurrentTrainerId] = useState(333);
    const toggleOpenCandidateDialog = (shouldOpen) => {
        setIsModalOpen(shouldOpen)
    };
    useEffect(() => {
        // Update the document title using the browser API
        // console.log('Did Mount')
    }, [props.trainers]);
    // console.log(props.trainers);

    const handleItemClicked = (item) => {
        console.log('item: ', item);
        setCurrentTrainerId(item.id);
        toggleOpenCandidateDialog(true)
    };

    return (
        <div className='search-list'>
            {isModalOpen ?
                <TrainerDetailsModal
                    trainerId={currentTrainerId}
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
                    dataSource={props.trainers}
                    footer={
                        <div>
                            <b>ant design</b> footer part
                        </div>
                    }
                    renderItem={item => (
                        <List.Item
                            key={item.id}
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
                                title={<a href={item.href}>{item.title || item.full_name}</a>}
                                description={item.description || 'Mock Description'}
                            />
                            {item.content || 'Mock Content Lorem ipsum dolor sit amet'}
                            <button style={{cursor: "pointer"}} onClick={() => handleItemClicked(item)}>See Trainer Details</button>
                            {/*<button style={{cursor: "pointer"}} onClick={() => {toggleOpenCandidateDialog(true, candidate.id)}}>Edit</button>*/}
                        </List.Item>
                    )}
                />
            }

        </div>
    )
};

export default SearchResultsList;


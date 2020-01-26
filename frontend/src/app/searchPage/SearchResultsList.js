import React, {useEffect, useState} from 'react';
import {List, Button} from 'antd';
import TrainerDetailsModal from "./TrainerDetailsModal";

const SearchResultsList = (props) => {


    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentTrainerId, setCurrentTrainerId] = useState(333);
    const toggleOpenTrainerDialog = (shouldOpen) => {
        setIsModalOpen(shouldOpen)
    };
    useEffect(() => {
    }, [props.trainers]);

    const handleItemClicked = (item) => {
        setCurrentTrainerId(item.id);
        toggleOpenTrainerDialog(true)
    };

    return (
        <div className='search-list'>
            {isModalOpen ?
                <TrainerDetailsModal
                    trainerId={currentTrainerId}
                    goBack={() => {toggleOpenTrainerDialog(false)}}
                /> :
                <List
                    bordered
                    itemLayout="vertical"
                    size="large"
                    pagination={{
                        onChange: page => {
                            console.log(page);
                        },
                        pageSize: 4,
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
                            extra={
                                <img
                                    alt="logo"
                                    src={item.photo}
                                />
                            }
                        >
                            <List.Item.Meta
                                title={<a href={item.href}>{item.title || item.full_name}</a>}
                            />
                            {item.description || 'Mock Description'}
                            <br/>
                            <br/>
                            <Button key="submit" type="default" onClick={() => handleItemClicked(item)}>
                                View Trainer Details
                            </Button>
                            </List.Item>
                    )}
                />
            }

        </div>
    )
};

export default SearchResultsList;


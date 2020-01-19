import React, {useState, useEffect} from "react"
import { Modal, Button, Descriptions, Card } from 'antd';
import './TrainerDetailsModal.css';
const { Meta } = Card;

function TrainerDetailsModal(props) {

    const [trainerData, setTrainerData] = useState({});
    console.log(props);

    useEffect(() => {

        const fetchData = async () => {
            const response = await fetch(`http://localhost:5000/api/v2/trainers/${props.trainerId}`);
            const myJson = await response.json();
            return myJson.trainerFromDb;
        };

        fetchData().then( trainerDetailsResponse => setTrainerData(trainerDetailsResponse));
    }, []);



    const handleOk = () => {

    };

    const loading = false;

    console.log(trainerData);
    return (
            <Modal
                visible
                centered
                bodyStyle={modalBodyStyle}
                title={trainerData ? trainerData.full_name : "Unnamed Trainer"}
                onOk={handleOk}
                onCancel={props.goBack}
                width={window.innerWidth * 0.7}
                destroyOnClose
                footer={[
                    <Button key="back" onClick={props.goBack}>
                        Return
                    </Button>,
                    <Button key="submit" type="primary" loading={loading} onClick={handleOk}>
                        Show Contact Details
                    </Button>,
                ]}
            >
                <Descriptions column={1}>
                    <Descriptions.Item>
                        <span>
                            {trainerData.description}
                        </span>
                        <Card
                            // hoverable
                            style={{ width: '40%', height: '30%' }}
                            cover={<img alt="trainer photo" src={trainerData.photo} />}
                        >
                            {/*<Meta title="Europe Street beat" description="www.instagram.com" />*/}
                        </Card>
                    </Descriptions.Item>
                    <Descriptions.Item label="Telephone">1810000000</Descriptions.Item>
                    <Descriptions.Item label="Live">Hangzhou, Zhejiang</Descriptions.Item>
                    <Descriptions.Item label="Remark">empty</Descriptions.Item>
                    <Descriptions.Item label="Address">
                        No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China
                    </Descriptions.Item>
                </Descriptions>,
            </Modal>
    );
}

const modalBodyStyle = {
    height: '70vh'
};

export default TrainerDetailsModal;


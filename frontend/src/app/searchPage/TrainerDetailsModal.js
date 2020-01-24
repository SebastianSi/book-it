import React, {useState, useEffect} from "react"
import { Modal, Button, Descriptions, Card, Divider } from 'antd';
import './TrainerDetailsModal.css';
import SendEmailForm from './SendEmailForm';
const { Meta } = Card;

function TrainerDetailsModal(props) {

    const [trainerData, setTrainerData] = useState({});
    const [sendEmail, setSendEmail] = useState(false);
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
        setSendEmail(true);
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
                width={window.innerWidth * 0.67}
                destroyOnClose
                footer={[
                    <Button key="submit" type="primary" loading={loading} onClick={handleOk}>
                        Contact Trainer
                    </Button>,
                    <Button key="back" onClick={props.goBack}>
                        Return
                    </Button>,
                ]}
            >
                {
                Object.entries(trainerData).length &&
                <>
                <Descriptions column={1} size={"middle"} layout={"horizontal"}>
                    <Descriptions.Item>
                        <span>
                            {trainerData.description}
                        </span>
                        <Card
                            // hoverable
                            style={{ maxWidth: '24%', maxHeight: '30%' }}
                            cover={<img width={178} height={220} alt="trainer photo" src={trainerData.photo} />}
                        >
                            {/*<Meta title="Europe Street beat" description="www.instagram.com" />*/}
                        </Card>
                    </Descriptions.Item>
                </Descriptions>
                <Divider/>
                <Descriptions column={2} size={"middle"} layout={"vertical"}>
                    <Descriptions.Item style={{display: 'flex'}} label="Age">
                        <b>{getAge(trainerData.birth_date)}</b>
                    </Descriptions.Item>
                    <Descriptions.Item label="Available in">
                        <ul>
                            {trainerData.available_in &&
                            trainerData.available_in.map((city, i) => {
                                return <li key={i}>
                                    <b>{city}</b>
                                </li>
                            })}
                        </ul>
                    </Descriptions.Item>
                    <Descriptions.Item label="Sex">
                        <b>{trainerData.sex === 'male'? 'M' : 'F'}</b>
                    </Descriptions.Item>
                    <Descriptions.Item label="Services Offered">
                        <ul>
                            {trainerData.services_offered &&
                            trainerData.services_offered.map((service, i) => {
                                return <li key={i}>
                                    {
                                        service === 'personal_training'?
                                            <b>Personal Training</b>:
                                            service === 'nutrition_coaching' ?
                                                <b>Nutrition Coaching</b>:
                                                <b>{service}</b>
                                    }
                                </li>
                            })}
                        </ul>
                    </Descriptions.Item>
                </Descriptions>
                <Divider/>
                <Descriptions title="Contact Info">
                    <Descriptions.Item label="Email:"><b>{trainerData.email}</b></Descriptions.Item>
                    <Descriptions.Item label="Telephone:"><b>{trainerData.phone_number}</b></Descriptions.Item>
                </Descriptions>
                    {
                        sendEmail &&
                            <SendEmailForm />
                    }
                </>
                }
            </Modal>
    );
}

const modalBodyStyle = {
    height: '90vh'
};

const getAge = birthDate => Math.floor((new Date() - new Date(birthDate).getTime()) / 3.15576e+10)

export default TrainerDetailsModal;


import React, {useState, useEffect} from "react"
import { Modal, Button, Descriptions, Card, Divider, Icon } from 'antd';
import './TrainerDetailsModal.css';
import SendEmailModal from './SendEmailForm';
import SendSmsModal from './SendSmsForm';

function TrainerDetailsModal(props) {

    const [trainerData, setTrainerData] = useState({});
    const [showEmailForm, setShowEmailForm] = useState(false);
    const [showSmsForm, setShowSmsForm] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`http://localhost:5000/api/v2/trainers/${props.trainerId}`);
            const myJson = await response.json();
            return myJson.trainerFromDb;
        };
        fetchData().then( trainerDetailsResponse => setTrainerData(trainerDetailsResponse));
    }, []);

    const handleContactTrainer = (type) => {
        if (type === 'email') {
            toggleOpenEmailForm(true);
        } else if (type === 'sms') {
            toggleOpenSmsForm(true);
        }

    };

    const toggleOpenEmailForm = (shouldOpen) => {
        setShowEmailForm(shouldOpen)
    };

    const toggleOpenSmsForm = (shouldOpen) => {
        setShowSmsForm(shouldOpen)
    };

    console.log(trainerData);
    return (
            <Modal
                visible
                centered
                bodyStyle={modalBodyStyle}
                title={trainerData ? trainerData.full_name : "Unnamed Trainer"}
                onCancel={props.goBack}
                width={window.innerWidth * 0.67}
                destroyOnClose
                footer={[
                    <Button key="email" type="primary" loading={false} onClick={()=>handleContactTrainer('email')}>
                        Contact via Email
                        <Icon type="mail" />
                    </Button>,
                    <Button key="sms" type="primary" loading={false} onClick={()=>handleContactTrainer('sms')}>
                        Contact via SMS
                        <Icon type="message" />
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
                            style={{ maxWidth: '24%', maxHeight: '30%' }}
                            cover={<img width={178} height={220} alt="trainer photo" src={trainerData.photo} />}
                        >
                        </Card>
                    </Descriptions.Item>
                </Descriptions>
                <Divider/>
                <Descriptions column={4} size={"small"} layout={"vertical"}>
                    <Descriptions.Item style={{display: 'flex'}} label="Age">
                        <b>{getAge(trainerData.birth_date)}</b>
                    </Descriptions.Item>
                    <Descriptions.Item label="Sex">
                        <b>{trainerData.sex === 'male'? 'M' : 'F'}</b>
                    </Descriptions.Item>
                    <Descriptions.Item label="Available in">
                        <ul>
                            {trainerData.available_in &&
                            trainerData.available_in.map((city, i) => {
                                return <li key={i} style={{marginLeft: -22}}>
                                    <b>{city}</b>
                                </li>
                            })}
                        </ul>
                    </Descriptions.Item>
                    <Descriptions.Item label="Services Offered">
                        <ul>
                            {trainerData.services_offered &&
                            trainerData.services_offered.map((service, i) => {
                                return <li key={i} style={{marginLeft: -22}}>
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
                        showEmailForm &&
                            <SendEmailModal
                                email={trainerData.email}
                                name={trainerData.full_name}
                                goBack={() => {toggleOpenEmailForm(false)}}
                            />
                    }
                    {
                        showSmsForm &&
                            <SendSmsModal
                                phoneNumber={trainerData.phone_number}
                                name={trainerData.full_name}
                                goBack={() => {toggleOpenSmsForm(false)}}
                            />
                    }
                </>
                }
            </Modal>
    );
}

const modalBodyStyle = {
    height: '82vh'
};

const getAge = birthDate => Math.floor((new Date() - new Date(birthDate).getTime()) / 3.15576e+10)

export default TrainerDetailsModal;


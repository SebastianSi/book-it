import React, {useState, useEffect} from "react"
import { Modal, Button } from 'antd';

function TrainerDetailsModal(props) {

    const [trainerData, setTrainerData] = useState({});
    console.log(props);

    useEffect(() => {
        // let ignore = false;

        const fetchData = async () => {
            const response = await fetch(`http://localhost:5000/api/v1/trainers/${props.trainerId}`);
            const myJson = await response.json();
            console.log(JSON.stringify(myJson));
            // return myJson.data;
            // if (!ignore) setTrainerData(myJson.trainerFromDb);
            return myJson.trainerFromDb;

            // const result = await axios('https://hn.algolia.com/api/v1/search?query=' + query);
            // if (!ignore) setData(result.data);
        };

        //warningul din consola se vede either way..
        fetchData().then( trainerDetailsResponse => setTrainerData(trainerDetailsResponse));
        // return () => { ignore = true; }
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
                        Submit
                    </Button>,
                ]}
            >
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
            </Modal>
    );
}

const modalBodyStyle = {
    height: '70vh'
};
export default TrainerDetailsModal;


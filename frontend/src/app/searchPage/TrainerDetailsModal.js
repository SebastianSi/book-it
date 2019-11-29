import React, {useState, useEffect} from "react"
// import PropTypes from 'prop-types'
import { Modal, Button } from 'antd';

// class TrainerDetailsModal extends React.Component {
//     state = {
//         loading: false,
//         visible: false,
//     };
//
//     showModal = () => {
//         this.setState({
//             visible: true,
//         });
//     };
//
//     handleOk = () => {
//         this.setState({ loading: true });
//         setTimeout(() => {
//             this.setState({ loading: false, visible: false });
//         }, 3000);
//     };
//
//     handleCancel = () => {
//         this.setState({ visible: false });
//     };
//
//     render() {
//         const { visible, loading } = this.state;
//         return (
//             <div>
//                 <Button type="primary" onClick={this.showModal}>
//                     Open Modal with customized footer
//                 </Button>
//                 <Modal
//                     visible={visible}
//                     title="Title"
//                     onOk={this.handleOk}
//                     onCancel={this.handleCancel}
//                     footer={[
//                         <Button key="back" onClick={this.handleCancel}>
//                             Return
//                         </Button>,
//                         <Button key="submit" type="primary" loading={loading} onClick={this.handleOk}>
//                             Submit
//                         </Button>,
//                     ]}
//                 >
//                     <p>Some contents...</p>
//                     <p>Some contents...</p>
//                     <p>Some contents...</p>
//                     <p>Some contents...</p>
//                     <p>Some contents...</p>
//                 </Modal>
//             </div>
//         );
//     }
// }



function TrainerDetailsModal(props) {


    const [trainerData, setTrainerData] = useState({})

    //note, while we could only use the above candidateData instead of the below parts of it,
    //useState can only set a value at a time; thus, we can't setCandidateData only for name,
    //like we would use setState in classes - though we can do setCandidateData({...candidateData, name})
    //see the below alternative implementation for name

    // const [name, setName] = useState("")
    // const [age, setAge] = useState("")
    // const [techSkills, setTechSkills] = useState("")
    // const [otherSkills, setOtherSkills] = useState("")
    // const [salaryExpectations, setsalaryExpectations] = useState("")
    //
    // useEffect(async () => {
    //     const response = await fetch('http://example.com/movies.json');
    //     const myJson = await response.json();
    //     console.log(JSON.stringify(myJson));
    //     // mockApi.fetchCandidateById(props.currentCandidateId).then((candidateData) => {
    //     //     setCandidateData(candidateData)
    //     //
    //     //     //## setCandidateData({...candidateData, ...candidateData.name})
    //     //     setName(candidateData.name)
    //     //     setAge(candidateData.age)
    //     //     setTechSkills(candidateData.technicalSkills)
    //     //     setOtherSkills(candidateData.otherSkills)
    //     //     setsalaryExpectations(candidateData.salaryExpectations)
    //     // })
    // }, []);

    useEffect(() => {
        // let ignore = false;

        const fetchData = async () => {
            const response = await fetch('http://localhost:5000/api/v1/trainers/fdnq34873etb-032i4c');
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



    // const handleChange = name => e => {
    //     switch (name) {
    //         case 'name':
    //             //## setCandidateData({...candidateData, name: e.target.value})
    //             setName(e.target.value)
    //             break
    //         case 'age':
    //             setAge(e.target.value)
    //             break
    //         case 'techSkills':
    //             setTechSkills(e.target.value)
    //             break
    //         case 'otherSkills':
    //             setOtherSkills(e.target.value)
    //             break
    //         case 'salaryExpectations':
    //             props.currentCandidateId ?
    //                 setsalaryExpectations(e.target.value) :
    //                 window.manageCustomExp(setsalaryExpectations, salaryExpectations)
    //             break
    //         default:
    //             console.log('Wait what?')
    //     }
    // }

    const handleOk = () => {

    };

    const loading = false;

    console.log(trainerData);
    return (
        <div style={{color: "#000", width: "100%", height: "100%"}}>
            <Modal
                visible={true}
                title={trainerData ? trainerData.full_name : "Unnamed Trainer"}
                onOk={handleOk}
                onCancel={props.goBack}
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
            {/*<button onClick={props.goBack}>Cancel</button>*/}
        </div>
    );
}

export default TrainerDetailsModal;


import React, {useState, useEffect} from "react"
// import PropTypes from 'prop-types'

function TrainerDetailsModal(props) {

    /*
    const [candidateData, setCandidateData] = useState({})

    //note, while we could only use the above candidateData instead of the below parts of it,
    //useState can only set a value at a time; thus, we can't setCandidateData only for name,
    //like we would use setState in classes - though we can do setCandidateData({...candidateData, name})
    //see the below alternative implementation for name

    const [name, setName] = useState("")
    const [age, setAge] = useState("")
    const [techSkills, setTechSkills] = useState("")
    const [otherSkills, setOtherSkills] = useState("")
    const [salaryExpectations, setsalaryExpectations] = useState("")

    useEffect(() => {
        // mockApi.fetchCandidateById(props.currentCandidateId).then((candidateData) => {
        //     setCandidateData(candidateData)
        //
        //     //## setCandidateData({...candidateData, ...candidateData.name})
        //     setName(candidateData.name)
        //     setAge(candidateData.age)
        //     setTechSkills(candidateData.technicalSkills)
        //     setOtherSkills(candidateData.otherSkills)
        //     setsalaryExpectations(candidateData.salaryExpectations)
        // })
    }, [])


     */
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

    return (
        <div style={{color: "#000", width: "100%", height: "100%"}}>
            <h1></h1>
            <button onClick={props.goBack}>Cancel</button>
        </div>
    );
}

export default TrainerDetailsModal;


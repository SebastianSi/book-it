import React, {useEffect, useState} from "react"
import { Form, Input, Button, Radio, Select, Collapse, Divider } from 'antd';

// import Skeleton from "antd/lib/skeleton";
const { Option } = Select;
const { Panel } = Collapse;

const possibleLocations = {
    Romania: [
        "Bucuresti", "Cluj-Napoca", "Timisoara", "Iasi", "Constanta", "Craiova", "Brasov",
        "Galati", "Ploiesti", "Oradea", "Braila", "Arad", "Pitesti", "Sibiu", "Bacau",
        "Targu-Mures", "Baia Mare", "Buzau", "Botosani", "Satu Mare", "Drobeta-Turnu Severin",
        "Suceava", "Piatra Neamt", "Targu Jiu", "Targoviste", "Focsani", "Bistrita", "Resita",
        "Tulcea", "Slatina", "Calarasi", "Alba Iulia", "Giurgiu", "Deva", "Hunedoara", "Zalau",
        "Sfantu Gheorghe", "Barlad", "Vaslui", "Roman", "Slobozia", "Turda", "Medias", "Alexandria",
        "Voluntari", "Lugoj", "Medgidia", "Onesti", "Miercurea Ciuc", "Sighetu Marmatiei", "Petrosani"
    ]
};


function SearchFilters(props) {

    const [filters, setFilters] = useState({
        name: '',
        sex: '',
        city: ''
    });

    // useEffect(() => {
    //     setFilters({})
    // }, []);
    const formItemLayout = {
        labelCol: { span: 5 },
        wrapperCol: { span: 16 },
    };
    const buttonItemLayout = {
        wrapperCol: { span: 16, offset: 5 },
    };
    const handleInputChange = field => e => {

        switch (field) {
            case 'name':
                setFilters({...filters, name: e.target.value});
                break;
            case 'sex':
                setFilters({...filters, sex: e.target.value});
                break;
            case 'city':
                setFilters({...filters, city: e});
                break;
            default:
                console.log('none found')
        }
    };

    return (
        <div className={'search-filters-container'}>

            <Form >
                <Collapse style={{color: 'white'}} onChange={()=>{}} accordion>
                    <Panel style={{color: 'white'}}
                           header="Advanced Search" key="1">
                        <Form.Item style={{color: 'white'}}
                                   label="Sex"
                                   {...formItemLayout}
                        >
                            <Radio.Group
                                // defaultValue={filters.sex || ''}
                                onChange={handleInputChange('sex')}
                            >
                                <Radio.Button value="both">Both</Radio.Button>
                                <Radio.Button value="male">Male</Radio.Button>
                                <Radio.Button value="female">Female</Radio.Button>
                            </Radio.Group>
                        </Form.Item>
                        <Form.Item label="Name" {...formItemLayout}>
                            <Input placeholder="Trainer name"
                                   onChange={handleInputChange('name')}
                                   // value={filters.name || ''}
                            />
                        </Form.Item>
                        <Form.Item label="City" {...formItemLayout}>
                            <Select
                                mode="default"
                                style={{ width: '100%' }}
                                placeholder="Please select a city"
                                // defaultValue={filters.city || ''}
                                onChange={handleInputChange('city')}
                            >
                                {
                                    possibleLocations.Romania.map( (city, i) => {
                                        return <Option key={i} value={city} label={city}>
                                            {city}
                                        </Option>
                                    })
                                }
                            </Select>
                        </Form.Item>
                    </Panel>
                </Collapse>
                <br/>
                <Form.Item {...buttonItemLayout}>
                    <Button type="primary"
                            style={{height: '3rem', width: '11rem'}}
                            onClick={()=> {
                                let filtersToSend = {...filters};
                                console.log('filtersToSend: ', filtersToSend);
                                // debugger;
                                if (
                                    filtersToSend.name ||
                                    filtersToSend.city ||
                                    filtersToSend.sex
                                ) {
                                    props.onSubmit(filtersToSend);

                                } else {
                                    props.onSubmit();
                                }
                            }}
                    >Find Trainers</Button>
                </Form.Item>
                <Divider style={{background: 'white'}}/>
            </Form>
        </div>

    );
}

export default SearchFilters;




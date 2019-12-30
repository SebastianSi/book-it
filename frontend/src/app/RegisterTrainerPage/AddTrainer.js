import React from 'react';
import {
    Form,
    Alert,
    Input,
    Tooltip,
    Icon,
    Cascader,
    Divider,
    DatePicker,
    Select,
    Checkbox,
    Row,
    Col,
    Button,
    AutoComplete,
    Upload,
    message
} from 'antd';

const { Option } = Select;
const { Dragger } = Upload;
const { TextArea } = Input;
const AutoCompleteOption = AutoComplete.Option;
const draggerProps = {
    name: 'file',
    multiple: false,
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    onChange(info) {
        const { status } = info.file;
        if (status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (status === 'done') {
            message.success(`${info.file.name} file uploaded successfully.`);
        } else if (status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    },
};

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
}

class RegisterAsTrainerForm extends React.Component {
    state = {
        isOtherServiceChecked: false,
        user: {}
    };

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    };

    handleInputChange = field => (e, extraData) => {

        let {user} = this.state;
        switch (field) {
            case 'name':
                this.setState({user: {...user, name: e.target.value}});
                break;
            case 'email':
                this.setState({user: {...user, email: e.target.value}});
                break;
            case 'phone':
                this.setState({user: {...user, phone: e.target.value}});
                break;
            case 'available_in':
                this.setState({user: {...user, available_in: e}});
                break;
            case 'date_of_birth':
                this.setState({user: {...user, date_of_birth: extraData}});
                break;
            case 'services_offered':
                this.setState({
                    user: {
                        ...user,
                        services_offered: e,
                        isOtherServiceChecked: e.includes('other')
                    }
                })
                break;
            case 'other_service_offered':
                this.setState({user: {...user, other_service_offered: e.target.value}});
                break;
            case 'about_you':
                this.setState({user: {...user, about_you: e.target.value}});
                break;
            case 'photo':
                //TODO:
                this.setState({user: {...user, photo: e.target.value}});
                break;
            case 'agreement':
                this.setState({user: {...user, agreement_checked: e.target.checked}});
                break;
            default:
                console.log('Wait what?')
        }
    };

    isRegisterPossible = () => {
        //based on required fields state
        let { user } = this.state;
        return (
            user.name && user.name.length &&
            user.email && user.email.length && this.isCurrentEmailValid() &&
            user.available_in && user.available_in.length &&
            user.date_of_birth && user.date_of_birth.length &&
            user.services_offered && user.services_offered.length &&
            user.agreement_checked
        )
    }

    //TODO: could move to utils, maybe
    isCurrentEmailValid = () => {
        let { user } = this.state;
        let regex = /\S+@\S+\.\S+/;
        return regex.test(user.email);
    }

    render() {
        console.log(this.state);
        const { getFieldDecorator } = this.props.form;

        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 12,
                    offset: 0,
                },
                sm: {
                    span: 12,
                    offset: 6,
                },
            },
        };
        const prefixSelector = getFieldDecorator('prefix', {
            initialValue: '+40',
        })(
            <Select style={{ width: 70 }}>
                <Option value="86">+40</Option>
            </Select>,
        );

        return (

            <Form {...formItemLayout} onSubmit={this.handleSubmit}
                  style={{background: 'white'}}
                  labelCol={{span: 4}}
            >
                <Form.Item
                    {...tailFormItemLayout}
                    style={{margin: '0 auto'}}

                >
                    <br/>
                    <p style={{fontSize: '1.2em', fontWeight: 500}}>
                        In order to register as a trainer, please fill in the details below.
                    </p>
                </Form.Item>
                <Divider/>
                <Form.Item
                    style={{margin: '0 auto'}}
                    label="Your name"
                >
                    {getFieldDecorator('name', {
                        rules: [{ required: true, message: 'Please input your full name!', whitespace: true }],
                    })(<Input onChange={this.handleInputChange('name')} />)}
                </Form.Item>
                <br/>
                <Form.Item
                    style={{margin: '0 auto'}}
                    label="E-mail"
                >
                    {getFieldDecorator('email', {
                        rules: [
                            {
                                type: 'email',
                                message: 'The input is not valid E-mail!',
                            },
                            {
                                required: true,
                                message: 'Please input your E-mail!',
                            },
                        ],
                    })(<Input onChange={this.handleInputChange('email')}/>)}
                </Form.Item>
                <br/>
                <Form.Item
                    style={{margin: '0 auto'}}
                    label="Phone Number"
                >
                    {getFieldDecorator('phone', {
                        rules: [{ message: 'Please input your phone number!' }],
                    })(<Input onChange={ e => console.log(e.target.value)} addonBefore={prefixSelector} style={{ width: '100%' }} />)}
                </Form.Item>
                <br/>
                <Form.Item
                    required
                    style={{margin: '0 auto'}}
                    label={
                        <>
                        <span>Available In</span>
                        <Tooltip title="Please only select the cities you can assist in">
                        <Icon type="question-circle-o" />
                        </Tooltip>
                        </>
                    }
                >
                    <Select
                        mode="multiple"
                        style={{ width: '100%' }}
                        placeholder="select at least a city"
                        onChange={this.handleInputChange('available_in')}
                        optionLabelProp="label"
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
                <br/>
                <Form.Item
                    required
                    style={{margin: '0 auto'}}
                    label="Date of Birth: "
                >
                    <Form.Item style={{margin: "0 auto", float: "left"}}
                        // validateStatus="error"
                        help="Please select the correct date"
                    >
                        <DatePicker style={{float: "left"}}
                                    onChange={this.handleInputChange('date_of_birth')}/>
                    </Form.Item>
                </Form.Item>
                <br/>
                <Form.Item
                    required
                    style={{margin: '0 auto'}}
                    label="Services Offered: "
                >
                    <Checkbox.Group style={{ width: '100%' }}
                                    onChange={this.handleInputChange('services_offered')}
                    >
                        <Row style={{marginTop: 10, marginLeft: -25}}>
                            <Col span={6}>
                                <Checkbox value="personal_training">
                                    Personal Training
                                </Checkbox>
                            </Col>
                            <Col span={6}>
                                <Checkbox value="nutrition_coaching">
                                    NutritionCoaching
                                </Checkbox>
                            </Col>
                            <Col span={6}>
                                <Checkbox value="other">
                                    Other (please specify):
                                    {
                                        this.state.isOtherServiceChecked &&
                                            <Input onChange={this.handleInputChange('other_service_offered')}/>
                                    }
                                </Checkbox>
                            </Col>

                        </Row>
                    </Checkbox.Group>
                </Form.Item>
                <br/>
                <Form.Item
                    style={{margin: '0 auto'}}
                    label="About you: "
                >
                    <TextArea onChange={this.handleInputChange('about_you')} rows={4} />
                </Form.Item>
                <br/>
                <Form.Item
                    style={{margin: '0 auto'}}
                    label="Your Photo: "
                >
                    <Dragger {...draggerProps}>
                        <p className="ant-upload-drag-icon">
                            <Icon type="inbox" />
                        </p>
                        <p className="ant-upload-text">Click or drag file to this area to upload</p>
                        <p className="ant-upload-hint">
                            Support for a single or bulk upload. Strictly prohibit from uploading company data or other
                            band files
                        </p>
                    </Dragger>
                </Form.Item>
                <br/>
                <Form.Item {...tailFormItemLayout}
                           style={{margin: '0 auto'}}
                >
                    {getFieldDecorator('agreement', {
                        valuePropName: 'checked',
                    })(
                        <Checkbox onChange={this.handleInputChange('agreement')}>
                            I have read the GDPR <a href="">agreement</a>
                        </Checkbox>,
                    )}
                </Form.Item>
                <br/>
                <Form.Item {...tailFormItemLayout}>
                    <Button
                        disabled={!this.isRegisterPossible()}
                        type="primary"
                        htmlType="submit"
                    >
                        Register
                    </Button>
                </Form.Item>
            </Form>
        );
    }
}

const RegisterAsTrainer = Form.create({
    name: 'add_trainer',

})(RegisterAsTrainerForm);

export default RegisterAsTrainer;
          
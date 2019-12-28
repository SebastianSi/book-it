import React from 'react';
import {
    Form,
    Input,
    Tooltip,
    Icon,
    Cascader,
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
        otherServiceChecked: false
    };

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    };

    onServicesOfferedChange = checkedValues => {
        console.log('checked = ', checkedValues);
        this.setState({
            otherServiceChecked: checkedValues.includes('other')
        })
    }

    onHandleAvailableInChange = val => {
        console.log(val);
    }

    render() {
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
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 16,
                    offset: 8,
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
                  style={{background: 'white'}}>
                <Form.Item
                    label={<span>Your name: </span>}
                >
                    {getFieldDecorator('nickname', {
                        rules: [{ required: true, message: 'Please input your nickname!', whitespace: true }],
                    })(<Input />)}
                </Form.Item>
                <br/>
                <Form.Item label="E-mail">
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
                    })(<Input />)}
                </Form.Item>
                <Form.Item label="Phone Number">
                    {getFieldDecorator('phone', {
                        rules: [{ required: true, message: 'Please input your phone number!' }],
                    })(<Input addonBefore={prefixSelector} style={{ width: '100%' }} />)}
                </Form.Item>
                <br/>
                <Form.Item label={
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
                        defaultValue={['Cluj-Napoca']}
                        onChange={this.onHandleAvailableInChange}
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
                <Form.Item label="Date of Birth: ">
                    <Form.Item style={{margin: "0 auto", float: "left"}}
                        validateStatus="error"
                        help="Please select the correct date"
                    >
                        <DatePicker style={{float: "left"}}/>
                    </Form.Item>
                </Form.Item>
                <br/>
                <Form.Item label="Services Offered: ">
                    <Checkbox.Group style={{ width: '100%' }}
                                    onChange={this.onServicesOfferedChange}>
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
                                        this.state.otherServiceChecked &&
                                            <Input />
                                    }
                                </Checkbox>
                            </Col>

                        </Row>
                    </Checkbox.Group>
                </Form.Item>
                <br/>
                <Form.Item label="About you: ">
                    <TextArea rows={4} />
                </Form.Item>
                <br/>
                <Form.Item label="Your Photo: ">
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
                <Form.Item {...tailFormItemLayout}>
                    {getFieldDecorator('agreement', {
                        valuePropName: 'checked',
                    })(
                        <Checkbox>
                            I have read the <a href="">agreement</a>
                        </Checkbox>,
                    )}
                </Form.Item>
                <br/>
                <Form.Item {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">
                        Register
                    </Button>
                </Form.Item>
            </Form>
        );
    }
}

const RegisterAsTrainer = Form.create({ name: 'register' })(RegisterAsTrainerForm);

export default RegisterAsTrainer;
          
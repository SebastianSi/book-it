import React from 'react';
import request from 'superagent';
import {
    Form,
    Input,
    Tooltip,
    Icon,
    Radio,
    Divider,
    DatePicker,
    Select,
    Checkbox,
    Row,
    Col,
    Button,
    AutoComplete,
    Upload,
    message,
    Result
} from 'antd';

const { Option } = Select;
const { Dragger } = Upload;
const { TextArea } = Input;

const CLOUDINARY_UPLOAD_PRESET = 'dcy1h5pm';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/drbdwdnqx/image/upload';
const PHONE_PREFIX_RO = '+40';

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

class RegisterAsTrainerForm extends React.Component {
    state = {
        showResultSuccess: false,
        isOtherServiceChecked: false,
        trainer: {}
    };

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err) => {
            if (!err) {
                let trainerForDb = this.state.trainer;
                delete trainerForDb.agreement_checked;
                if (this.state.trainer.other_service_offered) {
                    let i = trainerForDb.services_offered.findIndex(service => service === 'other');
                    trainerForDb.services_offered[i] = trainerForDb.other_service_offered;
                }
                console.log(trainerForDb);
                this.saveTrainerInDb(trainerForDb);
            }
        });
    };

    saveTrainerInDb = trainer => {
        const url = 'http://localhost:5000/api/v2/trainers/';
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(trainer),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Success:', data);
                this.setState({showResultSuccess: true})
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    handleInputChange = field => (e, extraData) => {

        let {trainer} = this.state;
        switch (field) {
            case 'name':
                this.setState({trainer: {...trainer, name: e.target.value}});
                break;
            case 'email':
                this.setState({trainer: {...trainer, email: e.target.value}});
                break;
            case 'phone':
                this.setState({trainer: {...trainer, phone: `${PHONE_PREFIX_RO}${e.target.value}`}});
                break;
            case 'available_in':
                this.setState({trainer: {...trainer, available_in: e}});
                break;
            case 'date_of_birth':
                this.setState({trainer: {...trainer, date_of_birth: extraData}});
                break;
            case 'services_offered':
                this.setState({
                    trainer: {
                        ...trainer,
                        services_offered: e,
                    },
                    isOtherServiceChecked: e.includes('other')
                });
                break;
            case 'other_service_offered':
                this.setState({trainer: {...trainer, other_service_offered: e.target.value}});
                break;
            case 'sex':
                this.setState({trainer: {...trainer, sex: e.target.value}});
                break;
            case 'description':
                this.setState({trainer: {...trainer, description: e.target.value}});
                break;
            case 'photo':
                this.setState({trainer: {...trainer, photo: e}});
                break;
            case 'agreement':
                this.setState({trainer: {...trainer, agreement_checked: e.target.checked}});
                break;
            default:
                console.log('Not a valid Field!');
        }
    };

    isRegisterPossible = () => {
        //based on required fields state
        let { trainer } = this.state;
        return (
            trainer.name && trainer.name.length &&
            trainer.email && trainer.email.length && this.isCurrentEmailValid() &&
            trainer.available_in && trainer.available_in.length &&
            trainer.date_of_birth && trainer.date_of_birth.length &&
            trainer.services_offered && trainer.services_offered.length &&
            trainer.agreement_checked
        )
    };

    isCurrentEmailValid = () => {
        let { trainer } = this.state;
        let regex = /\S+@\S+\.\S+/;
        return regex.test(trainer.email);
    };

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
            initialValue: PHONE_PREFIX_RO,
        })(
            <Select style={{ width: 70 }}>
                <Option value="+40">+40</Option>
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
                {
                    this.state.showResultSuccess ?
                        <Result
                            style={{background: 'white', height: 600}}
                            status="success"
                            title={`Successfully added trainer ${this.state.trainer.name}`}
                        /> :
                        <>
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
                                })(<Input onChange={ this.handleInputChange('phone')} addonBefore={prefixSelector} style={{ width: '100%' }} />)}
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
                                           help="Please select the correct date"
                                >
                                    <DatePicker style={{float: "left"}}
                                                onChange={this.handleInputChange('date_of_birth')}
                                    />
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
                                required
                                style={{margin: '0 auto'}}
                                label="Sex"
                            >
                                <Radio.Group
                                    style={{float: 'left'}}
                                    onChange={this.handleInputChange('sex')}
                                >
                                    <Radio value={'male'}>Male</Radio>
                                    <Radio value={'female'}>Female</Radio>
                                </Radio.Group>
                            </Form.Item>
                            <br/>
                            <Form.Item
                                style={{margin: '0 auto'}}
                                label="Description"
                            >
                                <TextArea onChange={this.handleInputChange('description')} rows={4} />
                            </Form.Item>
                            <br/>
                            <Form.Item
                                style={{margin: '0 auto'}}
                                label="Your Photo: "
                            >
                                <Dragger name={'file'}
                                         multiple={false}
                                         action={() => {}}
                                         customRequest={({file, onSuccess, onError}) => {
                                             let upload = request.post(CLOUDINARY_UPLOAD_URL)
                                                 .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
                                                 .field('file', file);

                                             upload.end((err, response) => {
                                                 if (err) {
                                                     onError();
                                                     console.error(err);
                                                 }
                                                 onSuccess();
                                                 if (response.body.secure_url !== '') {
                                                     console.log('CLOUDINARY URL: ', response.body.secure_url);
                                                     this.setState({trainer: {...this.state.trainer, photo: response.body.secure_url}})
                                                 }
                                             });
                                         }}

                                         onChange={(info) => {
                                             const { status } = info.file;
                                             if (status !== 'uploading') {
                                                 console.log(info.file, info.fileList);
                                             }
                                             if (status === 'done') {
                                                 message.success(`${info.file.name} file uploaded successfully.`);
                                                 console.log(`${JSON.stringify(info)} file uploaded successfully.`);
                                             } else if (status === 'error') {
                                                 message.error(`${info.file.name} file upload failed.`);
                                                 console.log(`${info.file.name} file upload failed.`);
                                             }
                                         }
                                         }>
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
                        </>

                }

            </Form>
        );
    }
}

const RegisterAsTrainer = Form.create({
    name: 'add_trainer',

})(RegisterAsTrainerForm);

export default RegisterAsTrainer;
          
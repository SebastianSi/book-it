import React from "react";
import './SendEmailSmsForms.css';
import { Modal, Input, Tooltip, Icon, Result, Button } from 'antd';

const { TextArea } = Input;

export default class SendSmsModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            smsWasSent: false,
            isLoading: false,
            smsBody: '',
            name: '',
            phoneNumber: ''
        };
    }

    componentDidMount() {
        this.setState({
            name: this.props.name,
            phoneNumber: this.props.phoneNumber
        })
    }




    handleSmsBodyChange = e => {
        this.setState({smsBody: e.target.value})
    };

    sendSms = (smsBody, phoneNumber) => {
        const url = 'http://localhost:5000/api/v2/send_sms/';
        const requestBody = {smsBody, phoneNumber};
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody),
        })
            .then((response) => response.json())
            .then((data) => {
                this.setState({smsWasSent: true, isLoading: false});
                console.log('SMS successfully sent! ', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    handleSubmit = e => {

        this.sendSms(this.state.smsBody, this.state.phoneNumber);

        setTimeout(()=> {
            this.props.goBack();
        }, 7000)
    };

    handleOk = e => {
        this.setState({isLoading: true});
        this.handleSubmit();
    };

    handleCancel = e => {
        this.props.goBack();
    };

    render() {
        return (
            <>
                <Modal
                    title={`Contact ${this.state.name} via sms text`}
                    visible={true}
                    onCancel={this.handleCancel}
                    cancelButtonProps={{ disabled: false }}
                    footer={[
                        <Button key="back" onClick={this.handleCancel}>
                            Return
                        </Button>,
                        <Button
                            disabled={!this.state.smsBody.length}
                            key="submit" type="primary"
                            loading={this.state.isLoading}
                            onClick={this.handleOk}
                        >
                            Send SMS Text
                        </Button>,
                    ]}
                >
                    {this.state.smsWasSent ?
                        <Result
                            status="success"
                            title="SMS Sent!"
                            subTitle="You will now be redirected to the trainer details."
                        />
                        :
                        <div style={{height: '20vh'}}>
                            <p>
                                <span style={{marginRight: 15}}>
                                    Your text message below:
                                </span>
                                <Tooltip
                                    title="Note: this sms text will be sent via one of our
                                    registered numbers">
                                    <Icon type="info-circle" style={{ color: 'rgba(0,0,0,.45)' }} />
                                </Tooltip>
                            </p>

                            <TextArea
                                style={{maxHeight: 100}}
                                allowClear
                                onChange={this.handleSmsBodyChange}
                                value={this.state.smsBody}
                                rows={4}
                            />
                        </div>
                    }
                </Modal>
            </>
        )
    }
}